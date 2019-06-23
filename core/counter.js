export default class Counter{
    count = {
        all: 0,
        succeed: 0,
        failed: 0
    }
    max;
    setMax(max){
        this.max = max;
        console.log("max setted." + this.max);
    }
    add(result){
        this.count.all++;
        if (result == 'succeed'){
            this.count.succeed++;
        } else if (result == 'failed'){
            this.count.failed++;
        }
        if (this.count.all >= this.max){
            return false;
        }
        console.log(this.count);
        return true;
    }
    get(){
        return this.count;
    }
    getMax(){
        return this.max;
    }
    reset(){
        this.count.all = 0;
        this.count.succeed = 0;
        this.count.failed = 0;
        this.max = 0;
    }
}