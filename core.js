class Core extends General{
    constructor(ascOrDesc,interval,primaryKeys){
        super(); //ES6の継承のお作法
        this.ascOrDesc = ascOrDesc;
        this.interval = interval;
        this.primaryKeys = primaryKeys;
    }

    limits = Object();
    intervals = [
        "P1","m2","M2","m3","M3","P4","Tr","P5","m6","M6","m7","M7","P8"
    ];

    getLimit(ascOrDesc,interval){
        if (ascOrDesc == "asc"){
            this.limits.min = 0;
            this.limits.max = this.primaryKeys.length-1 - this.intervals.indexOf(interval);
        } else if (ascOrDesc == "desc"){
            this.limits.min = this.intervals.indexOf(interval);
            this.limits.max = this.primaryKeys.length-1;
        }
        return this.limits;
    }
    setSounds(numberOfSound,checkboxStatus){
        let sounds = [];
        let limits = this.getLimit(this.ascOrDesc,this.interval);
        let firstSoundIndex = general.getRandomInt(limits.min,limits.max);
        let firstSound = this.primaryKeys[firstSoundIndex];
        let intervalIndex = this.intervals.indexOf(this.interval);

        sounds.push(firstSound);
        let secondSound = this.getNextSound(firstSound);
        sounds.push(secondSound);

        if (numberOfSound == 4){
            let index = general.getRandomInt(0,checkboxStatus.length-1);
            this.interval = checkboxStatus[index]
            let thirdSound = this.getNextSound(secondSound);

            index = general.getRandomInt(0,checkboxStatus.length-1);
            this.interval = checkboxStatus[index]
            let fourthSound = this.getNextSound(thirdSound);
            sounds.push(thirdSound);
            sounds.push(fourthSound);
        }

        // DEBUG
        console.log(limits);
        console.log("ascOrDesc: " + this.ascOrDesc);
        console.log("intervalIndex: " + intervalIndex + " (" + typeof(this.intervalIndex) + ")");

        return(sounds);
    }
    getNextSound(preSound,checkboxStatus){
        let preIndex = this.primaryKeys.indexOf(preSound);
        let intervalIndex = this.intervals.indexOf(this.interval);
        let nextIndex;

        //prepare
        let flag = general.getRandomInt(0,1);
            if (flag == 0){
            this.ascOrDesc = "asc";
        } else {
            this.ascOrDesc = "desc";
        }
        console.log("##preSound:" + preSound);
        console.log("##preIndex:" + preIndex);
        console.log("##index:" + this.interval);
        console.log("##intervalIndex: " + intervalIndex);

        if (this.ascOrDesc == "asc"){
            nextIndex = preIndex + intervalIndex;
        } else if (this.ascOrDesc == "desc"){
            nextIndex = preIndex - intervalIndex;
        }
        //範囲を超えた場合は反転
        if (nextIndex > this.limits.max){
            nextIndex = preIndex - intervalIndex;
        } else if (nextIndex < this.limits.min){
            nextIndex = preIndex + intervalIndex;
        }
        let nextSound = primaryKeys[nextIndex];
        return nextSound;
    }
    convertToMessage(interval){
        let type = interval.substr(0,1);
        let degree = interval.substr(1,1);

        if (type == "P"){
          type = "カンゼン";
        } else if (type == "M"){
          type = "チョウ";
        } else if (type == "m"){
          type = "タン";
        }

        let message = type + degree + "度";
        console.log("Message is "+message);
        return message;
    }
    convertToNote(sound){
        let letter = [];
        let note;
        for (let i=0; i<sound.length; i++){
            letter.push(sound.substr(i,1));
        }
        if (letter[1] == "#"){
            note = "^"+letter[0];
        } else if (letter[1] == "b"){
            note = "_"+letter[0];
        } else {
            note = letter[0];
        }
        let letterTail = letter[letter.length - 1];
        if (letterTail == "3"){
            note = note + ",";
        } else if (letterTail == "5"){
            note = note.toLowerCase(note);
        } else if (letterTail == "6"){
            note = note + "'";
        }   
        console.log("convert:" + "from:" + sound + " to:" + note);
        return note;
    }
}