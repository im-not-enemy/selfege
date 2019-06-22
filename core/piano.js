// require Tone.js !!
import {getRandomInt} from './general.js';

export default class Piano {
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

    setPrimaryKeys(type){
        switch(type.length){
            case 0:
                return "error";
            case 1:
                if (type[0] == "flat"){
                    this.primaryKeys = this.flatKeys;
                } else if (type[0] == "sharp"){
                    this.primaryKeys = this.sharpKeys;
                }
            case 2:
                let value = type[getRandomInt(0,1)];
                if (value == "flat"){
                    this.primaryKeys = this.flatKeys;
                } else if (value == "sharp"){
                    this.primaryKeys = this.sharpKeys;
                }
        }
    }
    getPrimaryKeys(){
        return this.primaryKeys;
    }
    pushKey(sound,time){
        // Tone.jsのお作法
        let synth = new Tone.Synth().toMaster();
        synth.triggerAttackRelease(sound,time);
        Tone.Transport.start();
    }
}