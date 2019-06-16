class General{
    constructor (element){
        this.element = element;
    }
    getCheckboxStatus(){
        let checkboxStatus = [];
        for (let i=0; i<this.element.length; i++){
           if (this.element[i].checked == true){
               checkboxStatus.push(this.element[i].value);
           } 
        }
        return checkboxStatus;

        /* Usage
        <form id="requests">
            <input type="checkbox" name="interval" value="P1">P1</input>
            <input type="checkbox" name="interval" value="m2">m2</input>
            <input type="checkbox" name="interval" value="M2">M2</input>
        </form>
        <script>
            checkbox = forms.requests.interval;
            let general = new General(checkbox);
            console.log(general.getCheckboxStatus()); --> logging checked box's values[list].
        </script>
        */
    }
    getRandomInt(min, max) {
        let result = Math.floor(Math.random() * (max + 1 - min)) + min ;
        return result;
        /* Usage
        <script>
            let general = new General(checkbox);
            console.log(general.getRandomInt(0,10)); --> logging random number (min:0,max10).
        */
    }
}