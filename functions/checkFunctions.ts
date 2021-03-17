import * as EmailValidator from 'email-validator';
import customerApi from "../src/api/customerApi";
import otherFunctions from "./otherFunctions";

export default {
    checkUser(data: any){
        let result: any = true;
        if((!EmailValidator.validate(data.email.trim()))||(data.email.trim() == "")){
            return "Please input right format email";
        }
        if(this.ifEmpty(data.name)){
            return "Please input name";
        }
        if(this.ifEmpty(data.role)){
            return "Please choose role";
        }
        if(this.ifEmpty(data.teamId)){
            return "Please choose team";
        }
        return result
    },
    checkClientEdit(data: any){
        let result: any = "true";
        if(this.ifEmpty(data.First_Name)){
            return "Please input first name";
        }
        if(this.ifEmpty(data.Last_Name)){
            return "Please input last name";
        }
        if((!EmailValidator.validate(data.Email))&&(data.Email?.trim() != "")){
            return "Please input right format email";
        }
        if((this.ifPhoneEmpty(data.Customer_Phone))&&(data.Email?.trim() == "")){
            return "Please input mobile number or email";
        }
        return result
    },
    checkProperty(data: any){
        let result: any = true;
        if(this.ifEmpty(data.HouseNumber)||
           this.ifEmpty(data.Suburb)||
           this.ifEmpty(data.StreetName)||
           this.ifEmpty(data.City)){
            return "Please input property address";
        }
        return result
    },
    async checkAttributes(data: any){
        let result: any = true;
        let childresult: any = true;
        switch(data.type){
            case "familyadd":
                result = this.familycheck(data.arr[1][0])
                break;
            case "family":
                for(let i = 0;i<data.arr[1].length;i++){
                    childresult = this.familycheck(data.arr[1][i]);
                    if(childresult != true){
                        result = childresult;
                    }
                }
                break;
            case "PropertyViewHistoryadd":
                if(data.arr[1][0][1] == ""||data.arr[1][0][1]== undefined){
                    result = "please choose client"
                    break;
                }
                result = await this.ifClientExist(data.arr[1][0][1])
                if(result == false){
                    result = "this client isn't exist";
                }else{
                    result = true;
                }
                break;
            case "appraisal":
                for(let i = 0;i<data.arr[1].length;i++){
                    childresult = this.checkAppraisalRange(data.arr[1][i][1]);
                    if(childresult != true){
                        result = childresult;
                    }
                }
                break;
            case "Appraisaladd":
                result = this.checkAppraisalRange(data.arr.range);
                if(data.arr.email != "send"){
                    result = "please send email"
                }
                if(data.arr.file.length == 0){
                    result = "please attach your appraisal"
                }
                break;
        }
        return result;
    },
    emailcheck(email: string){
        return EmailValidator.validate(email);
    },
    familycheck(familyarr: any){
        let result: any = true;
        if(this.ifEmpty(familyarr[4])||!EmailValidator.validate(familyarr[4])){
            result = "Please input format email";
        }
        if(this.ifEmpty(familyarr[3].toString())||(this.checkNum(familyarr[3].toString()) == false)){
            result = "Please input right phone";
        }
        if(this.ifEmpty(familyarr[1])){
            result = "Please input Relationship";
        }
        if(this.ifEmpty(familyarr[0])){
            result = "Please input Name";
        }
        return result;
    },
    ifEmpty(testString: string){
        let test = testString.trim();
        if(test == ""||test ==null){
            return true;
        }else{
            return false;
        }
    },
    ifPhoneEmpty(phone: any){
        if(phone.Home.trim() == ""
           &&phone.Mobile.trim() == ""
           &&phone.Work.trim() == ""){
            return true;
        }else{
            return false;
        }
    },
    checkNum(input: any){
        let reg=/^[0-9]+.?[0-9]*$/;
        return reg.test(input);
    },
    async ifClientExist(id: string){
        let result = await customerApi.ifClientExist(id);
        return result;
    },
    checkAppraisalRange(range: string){
        if(range.search("-") == -1 ){
            return "please input right format(0,000-0,000)"
        }
        let moneyarr = range.split("-");
        let moneyMin = otherFunctions.moneyRemoveFormat(moneyarr[0]);
        let moneyMax = otherFunctions.moneyRemoveFormat(moneyarr[1]);
        if(this.checkNum(moneyMin) == false||this.checkNum(moneyMax) == false){
            return "please input right format(0,000-0,000)"
        }
        if(moneyMax < moneyMin){
            return "second number should bigger than first number"
        }
        return true
    }
}
