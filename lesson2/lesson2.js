let count = 0;
let succeed = 0;
let failed = 0;
let general = new General();
let piano = new Piano();
let ssu = new SpeechSynthesisUtterance();
let firstSound;
let secondSound;

//Prepare (暫定対処:今後は何らかのボタンで指定可能にする予定)
let flag = general.getRandomInt(0,1);
if (flag == 0){
    piano.setPrimaryKeys("flat");
} else {
    piano.setPrimaryKeys("sharp");
}
let primaryKeys = piano.getPrimaryKeys();

//Main
//フォームに入力された値を取得
function setRequest(mode){
    let forms = document.forms;
    let checkbox = forms.requests.interval;
    let general = new General(checkbox);
    let checkboxStatus = general.getCheckboxStatus();

    let index = general.getRandomInt(0,checkboxStatus.length-1);
    let interval = checkboxStatus[index];
    let ascOrDesc = forms.requests.ascOrDesc.value;

    //後続処理: 第一音と第二音の設定
    let core = new Core(ascOrDesc,interval,primaryKeys);
    let sounds = core.setSounds();
    firstSound = sounds[0];
    secondSound = sounds[1];

    // 後続処理: TTSの台詞設定
    ssu.text = core.convertToMessage(interval);
    ssu.lang = 'ja-JP';
    
    //DEBUG
    console.log("checkboxStatus: " + checkboxStatus);
    console.log("interval: " + interval);
    console.log("ascOrDesc: " + ascOrDesc);
    console.log("firstSound: " + firstSound);
    console.log("secondSound: " + secondSound);
}

//第一音/第二音の発声
function playSound(firstOrSecond){
    switch(firstOrSecond){
        case "first":
            piano.pushKey(firstSound);
            break;
        case "second":
            piano.pushKey(secondSound);
            break;
        case "both":
            piano.pushKey(firstSound);
            piano.pushKey(secondSound);
            break;
    }
}

//起動
function start(){
    console.log("loop: " + loop);
    if(loop == true){
        setRequest();
        playSound("first");
        setTimeout(
            function(){playSound("second");},2000 //2000ミリ秒待ってから
        );
        setTimeout(
            function(){speechSynthesis.speak(ssu);},6000 //6000ミリ秒待ってから発生
        );
        setTimeout(
            function(){start();},8000 //8000ミリ秒待ってから発生
        );
    }
}
//停止
function stop(){
    loop = false;
    console.log("loop: " + loop);
}
