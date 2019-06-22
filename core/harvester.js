export default class Harvester {
    getCheckboxStatus(obj){
        let checkboxStatus = [];
        for (let i=0; i<obj.length; i++){
           if ( obj[i].checked == true){
               checkboxStatus.push(obj[i].value);
           } 
        }
        return checkboxStatus;
    }
}