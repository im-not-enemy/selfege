import Lesson from '../core/lesson.js';
import Piano from '../core/piano.js';
import Counter from '../core/counter.js';
import * as general from '../core/general.js';

let lesson3 = new Lesson();
let piano = new Piano();
let forms = document.forms.requests;
let first = new Object();
let second = new Object();
let third = new Object();
let fourth = new Object();
let counter = new Counter();
let duration;

let welcomePage = document.getElementById('welcomePage');
let requestPage = document.getElementById('requestPage');
let playingPage = document.getElementById('playingPage');
let resultPage = document.getElementById('resultPage');

function setQuestionAmount(){
    counter.setMax(document.forms.welcome.questionAmount.value);
}

function setSounds(){
    //音の状態を初期化
    first = undefined;
    second.nextSoundInterval = undefined;
    third.nextSoundInterval = undefined;
    fourth.nextSoundInterval = undefined;

    //フォームの状態を取得
    lesson3.setFormStatus(forms);
    let formStatus = lesson3.getFormStatus();
    console.log(formStatus);

    //第一音と第二音を取得
    lesson3.setPrimaryKeys(formStatus.type);
    first = lesson3.getInitSound(formStatus.intervals,formStatus.direction);
    console.log("set first");
    console.log(first);
    while (second.nextSoundInterval == undefined){
        second = lesson3.getNextSound(first,formStatus.intervals,formStatus.direction);
        console.log("set second");
        console.log(second);
    };
    while (third.nextSoundInterval == undefined){
        third = lesson3.getNextSound(second,formStatus.intervals,formStatus.direction);
        console.log("set third");
        console.log(third);
    };
    while (fourth.nextSoundInterval == undefined){
        fourth = lesson3.getNextSound(third,formStatus.intervals,formStatus.direction);
        console.log("set fourth");
        console.log(fourth);
    };

    //楽譜を表示
    let sounds = [first.sound,second.sound,third.sound,fourth.sound];
    let mode = "melody";
    let scale = "1.0";
    let staffwidth = "230";
    lesson3.renderAbc("notes",sounds,mode,scale,staffwidth);

    //イベントリスナー設置
    let button_array = [];
    let svg_array = document.getElementById("notes").children[0].children;
    for (let i=0; i<svg_array.length; i++){
        if (svg_array[i].outerHTML.match(/rect/)){
            button_array.push(svg_array[i]);
        }
    }
    button_array[1].addEventListener('click',function(){playSound('first')})
    button_array[2].addEventListener('click',function(){playSound('second')})
    button_array[3].addEventListener('click',function(){playSound('third')})
    button_array[4].addEventListener('click',function(){playSound('fourth')})
}

function playSound(mode){
    //長さを決定
    lesson3.setFormStatus(forms);
    let formStatus = lesson3.getFormStatus();
    duration = formStatus.duration;
    switch(mode){
        case 'first':
            piano.pushKey(first.sound,duration);
            console.log(first.sound + " played. [duration: " + duration + "]");
            break;
        case 'second':
            piano.pushKey(second.sound,duration);
            console.log(second.sound + " played. [duration: " + duration + "]");
            break;
        case 'third':
            piano.pushKey(third.sound,duration);
            console.log(third.sound + " played. [duration: " + duration + "]");
            break;
        case 'fourth':
            piano.pushKey(fourth.sound,duration);
            console.log(fourth.sound + " played. [duration: " + duration + "]");
            break;
    }
}

function getCount(){
    let result = counter.get();
    let percent = Math.round((result.succeed/result.all*100)*10)/10;
    let message = result.succeed + "/" + result.all + " (" + percent + "%)";
    document.getElementById('result').innerHTML = message;
}

//イベントリスナーセット
document.getElementById('start').addEventListener('click',function(){
    setQuestionAmount();
    general.switchPage(welcomePage,requestPage);
    general.switchPage(welcomePage,playingPage);
    setSounds();
});

document.getElementById('succeed').addEventListener('click',function(){
    if(counter.add('succeed') == false){
        general.switchPage(requestPage,resultPage);
        general.switchPage(playingPage,resultPage);
        getCount();
    } else {
        setSounds();
    };
});
document.getElementById('failed').addEventListener('click',function(){
    if(counter.add('failed') == false){
        general.switchPage(requestPage,resultPage);
        general.switchPage(playingPage,resultPage);
        getCount();
    } else {
        setSounds();
    };
});

document.getElementById('retry').addEventListener('click',function(){
    general.switchPage(resultPage,welcomePage);
    general.switchPage(resultPage,requestPage);
    counter.reset();
});