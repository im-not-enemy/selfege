import Lesson from '../core/lesson.js';
import Piano from '../core/piano.js';
import Counter from '../core/counter.js';
import * as general from '../core/general.js';

let lesson1 = new Lesson();
let piano = new Piano();
let forms = document.forms.requests;
let first = new Object();
let second = new Object();
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
    //フォームの状態を取得
    lesson1.setFormStatus(forms);
    let formStatus = lesson1.getFormStatus();
    console.log(formStatus);

    //第一音と第二音を取得
    first = lesson1.getInitSound(formStatus.intervals,formStatus.direction,formStatus.type);
    second = lesson1.getNextSound(first,formStatus.intervals,formStatus.direction,formStatus.type);
    console.log(first);
    console.log(second);

    //楽譜を表示
    let sounds = [first.sound,second.sound];
    lesson1.renderAbc("first_note",sounds[0],"single","0.8","55");
    lesson1.renderAbc("second_note",sounds[1],"single","0.8","55");
    lesson1.renderAbc("both_note",sounds,"code","0.8","55");
}

function playSound(mode){
    //長さを決定
    lesson1.setFormStatus(forms);
    let formStatus = lesson1.getFormStatus();
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
        case 'both':
            piano.pushKey(first.sound,duration);
            piano.pushKey(second.sound,duration);
            console.log(first.sound + " & " + second.sound + " played. [duration: " + duration + "]");
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
    general.switchPage(welcomePage,playingPage);
    setSounds();
});
document.getElementById('play_first').addEventListener('click',function(){playSound('first')});
document.getElementById('play_second').addEventListener('click',function(){playSound('second')});
document.getElementById('play_both').addEventListener('click',function(){playSound('both')});

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