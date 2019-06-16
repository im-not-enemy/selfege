// require Tone.js !!
class Piano {
    sharpKeys = [
        "G3","G#3","A3","A#3","B3",
        "C4","C#4","D4","D#4","E4","F4","F#4","G4","G#4","A4","A#4","B4",
        "C5","C#5","D5","D#5","E5","F5","F#5","G5","G#5","A5","A#5","B5",
        "C6"
    ];
    flatKeys = [
        "G3","Ab3","A3","Bb3","B3",
        "C4","Db4","D4","Eb4","E4","F4","Gb4","G4","Ab4","A4","Bb4","B4",
        "C5","Db5","D5","Eb5","E5","F5","Gb5","G5","Ab5","A5","Bb5","B5",
        "C6"
    ];
    primaryKeys;

    setPrimaryKeys(keyType){
        if (keyType == "flat"){
            this.primaryKeys = this.flatKeys;
            console.log("flatKeys was set");
        } else if (keyType == "sharp"){
            this.primaryKeys = this.sharpKeys;
            console.log("sharpKeys was set");
        }
    }
    getPrimaryKeys(){
        return this.primaryKeys;
    }
    getIntervals(){
        return this.intervals;
    }
    getSoundId(sound){
        return this.primaryKeys.indexOf[sound];
    }
    pushKey(key){
        // Tone.jsのお作法
        let sound = new Tone.Synth().toMaster();
        sound.triggerAttackRelease(key,1);
        Tone.Transport.start();
        console.log(key + " was pushed.");
    }
}