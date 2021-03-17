import { Vue } from "vue-property-decorator";
import configfn from "@/api/config";
import { getTeamToken } from "../../functions/publicFn";

export default {
    async sendEmail(emailbody: any){
        let result = 0;
        let token: any = await getTeamToken();
        let config = configfn.getconfig(token);
        let enpoint = this.getenpoint(emailbody.fromemail);
        let body = await this.getformdata(emailbody)
        await Vue.axios.post(enpoint, body,config)
            .then(response => {
                result = response.status;
            })
            .catch(error => {
                console.log(error)
            })
        return result;
    },
    async sendEmails(emailbodys: any){
        let emailbodies  = []
        for(let i=0;i<emailbodys.tonamearr.length;i++){
            let emailbody = {
                fromname:emailbodys.fromname,
                fromemail:emailbodys.fromemail,
                toname:emailbodys.tonamearr[i],
                toemail:emailbodys.toemailarr[i],
                subject:emailbodys.subject,
                context:emailbodys.context,
                attachment:emailbodys.attachment
            }
            let context = emailbody.context.html.replace("$firstName",emailbody.toname)
            context = this.b64EncodeUnicode(context);
            emailbody.context.imagesarr.forEach((value: any) =>{
                context +=value;
            })
            emailbody.context = context
            emailbodies.push(emailbody);
        }
        let result = 200;
        for(let i=0;i<emailbodies.length;i++){
            if(emailbodies[i].toemail != ""){
                result = await this.sendEmail(emailbodies[i]);
                console.log(result)
                if(result != 200){
                    break;
                }
            }
        }
        return result;
    },
    b64EncodeUnicode(str: any) {
        return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
            // function toSolidBytes(match, p1) {
            (match, p1) => {
                // console.debug('match: ' + match);
                return String.fromCharCode(("0x" + p1) as any);
            }));
    },
    getenpoint(email: string){
        return `https://gmail.googleapis.com/gmail/v1/users/${email}/messages/send?AIzaSyBDzFv2a_ztAgCj1788xHLkktKEScmqhj4`
    },
    async getformdata(emailbody: any){
        let base64file: any = "";
        if(emailbody.attachment.length != 0) {
            await this.getbase64file(emailbody.attachment).then((result: any)=>{
                base64file = result.substring(result.indexOf(',')+1)
            })
        }

let raw =
`Content-Type: multipart/mixed; boundary="foo_bar_baz"
MIME-Version: 1.0
From: ${emailbody.fromname} <${emailbody.fromemail}> 
To: ${emailbody.toname} <${emailbody.toemail}>
Subject: ${emailbody.subject}

--foo_bar_baz
Content-Type: text/html; charset="UTF-8"
MIME-Version: 1.0
Content-Transfer-Encoding: base64
${emailbody.context}


--foo_bar_baz
Content-Type: ${emailbody.attachment.type}
MIME-Version: 1.0
Content-Transfer-Encoding: base64
Content-Disposition: attachment; filename="${emailbody.attachment.name}"
${base64file}
`
        let formdata = {
            "raw": this.b64EncodeUnicode(raw)
        }
        return formdata
    },
    async getbase64file(file: any){

        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = (res: any) => {
                resolve(res.target.result);
            };

            reader.readAsDataURL(file);
        });
    }
}