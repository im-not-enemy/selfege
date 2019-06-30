import Piano from './piano.js';
import Harvester from './harvester.js';
import Questioner from './questioner.js';
import * as abcWrapper from './abcWrapper.js';

export default class Lesson {
    formStatus = new Object();
    harvester = new Harvester();
    piano = new Piano();
    questioner = new Questioner();

    setFormStatus(forms){
        //フォームの状態取得
        this.formStatus.duration = forms.duration.value;
        this.formStatus.intervals = this.harvester.getCheckboxStatus(forms.interval);
        this.formStatus.direction = this.harvester.getCheckboxStatus(forms.direction);
        this.formStatus.type = this.harvester.getCheckboxStatus(forms.type);
    }
    getFormStatus(){
        return this.formStatus;
    }
    getInitSound(intervals,direction,type){
        //フォームの状態から、使うピアノを選択
        this.piano.setPrimaryKeys(type);
        //第一音を取得
        let first = this.questioner.getInitSound(intervals,direction,this.piano.getPrimaryKeys());
        return first;
    }
    getNextSound(previous,intervals,direction,type){
        //第二音以降を取得
        let second = this.questioner.getNextSound(previous,intervals,direction,this.piano.getPrimaryKeys());
        return second;
    }
    renderAbc(element,sounds,mode,scale,staffwidth){
        abcWrapper.renderAbc(element,sounds,mode,scale,staffwidth);
    }
}