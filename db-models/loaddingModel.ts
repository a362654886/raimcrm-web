export default class LoaddingModel {
    ifshow: boolean;
    constructor($ifshow=false) {
        this.ifshow = $ifshow
    }
    disappear(){
        this.ifshow = false;
    }
    show(){
        this.ifshow = true;
    }
}