import Lesson from '../core/lesson.js';
import Piano from '../core/piano.js';
import * as general from '../core/general.js';
import {convertToMessage} from '../core/abcWrapper.js';

let lesson2 = new Lesson();
let piano = new Piano();
let ssu = new SpeechSynthesisUtterance();
let forms = document.forms.requests;
let first = new Object();
let second = new Object();
let duration;
let loop;

let playButton = document.getElementById('playButton');
let stopButton = document.getElementById('stopButton');

function setSounds(){
    //フォームの状態を取得
    lesson2.setFormStatus(forms);
    let formStatus = lesson2.getFormStatus();
    console.log(formStatus);

    //第一音と第二音を取得
    first = lesson2.getInitSound(formStatus.intervals,formStatus.direction,formStatus.type);
    second = lesson2.getNextSound(first,formStatus.intervals,formStatus.direction,formStatus.type);
    console.log(first);
    console.log(second);

    // 後続処理: TTSの台詞設定
    ssu.text = convertToMessage(first.nextSoundInterval);
    ssu.lang = 'ja-JP';
}

function playSound(mode){
    //長さを決定
    lesson2.setFormStatus(forms);
    let formStatus = lesson2.getFormStatus();
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

//イベントリスナーセット
document.getElementById('playButton').addEventListener('click',function(){
    general.switchPage(playButton,stopButton);
    setSounds();
    loop = true;
    start();
});
document.getElementById('stopButton').addEventListener('click',function(){
    stop();
    general.switchPage(stopButton,playButton);
});

//起動
function start(){
    if(loop == true){
        setSounds();
        playSound("first");
        setTimeout(
            function(){playSound("second");},(duration*1000) //第一音が鳴り終わったら発声
        );
        setTimeout(
            function(){speechSynthesis.speak(ssu);},(duration*1000*2+2000) //第二音が鳴り終わってから2秒後に発生
        );
        setTimeout(
            function(){start();},(duration*1000*2+2000+2000) //解答が鳴り終わってから2秒後に発声
        );
    }
}
//停止
function stop(){
    loop = false;
    console.log("loop: " + loop);
}
