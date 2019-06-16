let count = 0;
let succeed = 0;
let failed = 0;
let general = new General();
let piano = new Piano();
let firstSound;
let secondSound;
let ascOrDesc;
let primaryKeys;

function prepare(){
    //Prepare (暫定対処:今後は何らかのボタンで指定可能にする予定)
    let flag1 = general.getRandomInt(0,1);
    if (flag1 == 0){
        piano.setPrimaryKeys("flat");
    } else {
        piano.setPrimaryKeys("sharp");
    }
    primaryKeys = piano.getPrimaryKeys();

    //Prepare (暫定対処:LESSON3ではasc,descの指定はランダム)
    let flag2 = general.getRandomInt(0,1);
    if (flag2 == 0){
        ascOrDesc = "asc";
    } else {
        ascOrDesc = "desc";
    }
}

//Main
//フォームに入力された値を取得
function setRequest(mode){
    let forms = document.forms;
    let checkbox = forms.requests.interval;
    let general = new General(checkbox);
    let checkboxStatus = general.getCheckboxStatus();

    let index = general.getRandomInt(0,checkboxStatus.length-1);
    let interval = checkboxStatus[index];

    // 最初に呼び出された時だけ実行
    if (mode == "initial"){
        questionAmount = forms.requests.questionAmount.value;
    }

    prepare();

    //後続処理: 音の設定
    let core = new Core(ascOrDesc,interval,primaryKeys);
    let sounds = core.setSounds(4,checkboxStatus);
    firstSound = sounds[0];
    secondSound = sounds[1];
    thirdSound = sounds[2];
    fourthSound = sounds[3];

    firstNote = core.convertToNote(firstSound);
    secondNote = core.convertToNote(secondSound);
    thirdNote = core.convertToNote(thirdSound);
    fourthNote = core.convertToNote(fourthSound);
    abc = "L: 1/4\n" +
    "I: papersize A3\n" +
    "%%scale 1.5\n" +
    firstNote + "|" + secondNote + "|" + thirdNote + "|" + fourthNote;
    ABCJS.renderAbc("sheet", abc);

    //DEBUG
    console.log("checkboxStatus: " + checkboxStatus);
    console.log("interval: " + interval);
    console.log("ascOrDesc: " + ascOrDesc);
    console.log("firstSound: " + firstSound);
    console.log("secondSound: " + secondSound);
    console.log("thirdSound: " + thirdSound);
    console.log("fourthSound: " + fourthSound);
}

//第一音/第二音/第三音/第四音の発声
function playSound(sound){
    switch(sound){
        case "first":
            piano.pushKey(firstSound);
            break;
        case "second":
            piano.pushKey(secondSound);
            break;
        case "third":
            piano.pushKey(thirdSound);
            break;
        case "fourth":
            piano.pushKey(fourthSound);
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