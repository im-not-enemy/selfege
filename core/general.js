export function getRandomInt(min, max){
    let result = Math.floor(Math.random() * (max + 1 - min)) + min ;
    return result;
    /* Usage
    <script>
        let general = new General(checkbox);
        console.log(general.getRandomInt(0,10)); --> logging random number (min:0,max10).
    */
}
export function switchPage(prePage,nextPage){
    prePage.style.display = "none"; //非表示
    nextPage.style.display = "block"; //表示
}