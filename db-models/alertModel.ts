export default class AlertModel {
    text: string;
    type: string;
    ifshow: boolean;
    constructor($text = "", $type = "",$ifshow=false) {
        this.text = $text
        this.type = $type
        this.ifshow = $ifshow
    }
    alertmiss(alert: any) {
        setTimeout(function(){
            alert.disappear();
        }, 2000);
    }
    showfail(text: string,alert: any){
        this.text = text;
        this.type = "fail";
        this.ifshow = true;
        this.alertmiss(alert);
    }
    showSuccess(text: string,alert: any){
        this.text = text;
        this.type = "success";
        this.ifshow = true;
        this.alertmiss(alert);
    }
    showAlert(text: string,alert: any){
        this.text = text;
        this.type = "warning";
        this.ifshow = true;
        this.alertmiss(alert);
    }
    disappear(){
        this.ifshow = false;
    }
}