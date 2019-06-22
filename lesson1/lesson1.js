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
}

function playSound(mode,time){
    switch(mode){
        case 'first':
            piano.pushKey(first.sound,time);
            break;
        case 'second':
            piano.pushKey(second.sound,time);
            break;
        case 'both':
            piano.pushKey(first.sound,time);
            piano.pushKey(second.sound,time);
            break;
    }
};

//イベントリスナーセット
document.getElementById('start').addEventListener('click',function(){
    setQuestionAmount();
    general.switchPage(welcomePage,requestPage);
    general.switchPage(welcomePage,playingPage);
});
document.getElementById('play').addEventListener('click',function(){setSounds();});
document.getElementById('next').addEventListener('click',function(){setSounds();});
document.getElementById('play_first').addEventListener('click',function(){playSound('first',2)});
document.getElementById('play_second').addEventListener('click',function(){playSound('second',2)});
document.getElementById('play_both').addEventListener('click',function(){playSound('both',2)});

document.getElementById('succeed').addEventListener('click',function(){
    if(counter.add('succeed') == false){
        general.switchPage(requestPage,resultPage);
        general.switchPage(playingPage,resultPage);
    };
});
document.getElementById('failed').addEventListener('click',function(){
    if(counter.add('failed') == false){
        general.switchPage(requestPage,resultPage);
        general.switchPage(playingPage,resultPage);
    };
});

document.getElementById('retry').addEventListener('click',function(){
    general.switchPage(resultPage,welcomePage);
    counter.reset();
});