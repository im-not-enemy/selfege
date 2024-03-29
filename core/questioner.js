import {getRandomInt} from './general.js';
export default class Questioner {
    intervalList = ["P1","m2","M2","m3","M3","P4","Tr","P5","m6","M6","m7","M7","P8"];

    getInterval(intervals){
        let interval;
        interval = intervals[getRandomInt(0,intervals.length-1)];
        return interval;
    }
    decideDirection(direction){
        return direction[getRandomInt(0,direction.length-1)];
    }
    getInitSound(intervals,direction,primaryKeys){
        let nextSoundInterval = this.getInterval(intervals);
        let ascOrDesc = this.decideDirection(direction);
        let initRange = this.getRange(nextSoundInterval,ascOrDesc,primaryKeys);
        let init = {
            sound: primaryKeys[getRandomInt(initRange.min,initRange.max)],
            nextSoundInterval: nextSoundInterval,
            nextDirection: ascOrDesc
        }
        return init;
    }
    getNextSound(previous,intervals,direction,primaryKeys){
        let next = Object();
        let preSoundIndex = primaryKeys.indexOf(previous.sound);

        if (previous.nextDirection == "asc"){
            next.sound = primaryKeys[preSoundIndex + this.intervalList.indexOf(previous.nextSoundInterval)];
        } else if (previous.nextDirection == "desc"){
            next.sound = primaryKeys[preSoundIndex - this.intervalList.indexOf(previous.nextSoundInterval)];
        }
        
        next.nextSoundInterval = intervals[getRandomInt(0,intervals.length-1)];
        next.nextDirection = this.decideDirection(direction);

        // 将来の音が配列をオーバーする場合には将来の音を初期化する
        let nextSoundIndex = primaryKeys.indexOf(next.sound);
        let nextSoundIntervalIndex = this.intervalList.indexOf(next.nextSoundInterval);
        let futureSoundIndex;
        if (next.nextDirection == "asc"){
            futureSoundIndex = nextSoundIndex + nextSoundIntervalIndex;
        } else if (next.nextDirection == "desc"){
            futureSoundIndex = nextSoundIndex - nextSoundIntervalIndex;
        }
        if (futureSoundIndex < 0 || primaryKeys.length-1 < futureSoundIndex){
            next.nextSoundInterval = undefined;
            next.nextDirection = undefined;
        }
        return next;
    }
    getRange(interval,ascOrDesc,primaryKeys){
        let range = Object();
        if (ascOrDesc == "asc"){
            range.min = 0;
            range.max = primaryKeys.length-1 - this.intervalList.indexOf(interval);
        } else if (ascOrDesc == "desc"){
            range.min = this.intervalList.indexOf(interval);
            range.max = primaryKeys.length-1;
        }
        return range;
    }
}