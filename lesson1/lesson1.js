let count = 0;
let succeed = 0;
let failed = 0;
let general = new General();
let piano = new Piano();
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

    // 最初に呼び出された時だけ実行
    if (mode == "initial"){
        questionAmount = forms.requests.questionAmount.value;
    }
    //後続処理: 第一音と第二音の設定
    let core = new Core(ascOrDesc,interval,primaryKeys);
    let sounds = core.setSounds();
    firstSound = sounds[0];
    secondSound = sounds[1];
    
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

//結果情報のセット
function setResult(result){
    if (result == "succeed"){
        succeed++;
        count++;
        console.log("result: succeed");
    } else if (result == "failed"){
        failed++;
        count++;
        console.log("result: failed");
    }
}
