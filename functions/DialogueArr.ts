import {Appointment, Family, Note} from "../db-models/db-customer";
import otherFunctions from "../functions/otherFunctions";
import {ViewHistory} from "../db-models/db-viewhistory";
import {Appraisal} from "../db-models/db-property";

export default {
    getFamilyArr(familyarr: Family[]){
        let resultarr: any[] =
            [
                [
                    ["Name","input"],
                    ["Relationship","input"],
                    ["Brithday","day"],
                    ["Phone","input"],
                    ["Email",'input']
                ],
                [

                ],
                [

                ]
            ];
        familyarr.forEach(family=>{
            let familyarr: any[] = [family.name,family.relationship,family.brithday,family.phone,family.email];
            resultarr[1].push(familyarr);
            resultarr[2].push(family.Id);
        })
        return resultarr;
    },
    getAppointMentArr(appointmentarr: Appointment[]){
        let resultarr: any[] =
            [
                [
                    ["Time","daytime"],
                    ["Task","text"]
                ],
                [

                ],
                [

                ]
            ];
        appointmentarr.forEach(appointment=>{
            let appointmentarr: any[] = [appointment.aTime,appointment.task];
            resultarr[1].push(appointmentarr);
            resultarr[2].push(appointment.appointmentId);
        })
        return resultarr;
    },
    getNoteArr(notearr: Note[]){
        let resultarr: any[] =
            [
                [
                    ["Time","daytime"],
                    ["Context","text"],
                    ["Type","select"]
                ],
                [

                ],
                [

                ]
            ];
        notearr.forEach(note=>{
            let notearr: any[] = [note.nTime,note.context,note.type];
            resultarr[1].push(notearr);
            resultarr[2].push(note.Id);
        })
        return resultarr;
    },
    getViewHistoryArr(viewHistoryarr: ViewHistory[]){
        let resultarr: any[] =
            [
                [
                    ["Time","day"],
                    ["Client","notchange"],
                    ["Context","text"]
                ],
                [

                ],
                [

                ]
            ];
        viewHistoryarr.forEach(viewHistory=>{
            let viewHistoryarr: any[] = [viewHistory.VhTime,viewHistory.customerId,viewHistory.context];
            resultarr[1].push(viewHistoryarr);
            resultarr[2].push(viewHistory.VHId);
        })
        return resultarr;
    },
    getViewHistoryArrClientPage(viewHistoryarr: ViewHistory[]){
        let resultarr: any[] =
            [
                [
                    ["Time","day"],
                    ["Property","notchange"],
                    ["Context","text"]
                ],
                [

                ],
                [

                ]
            ];
        viewHistoryarr.forEach(viewHistory=>{
            let viewHistoryarr: any[] = [viewHistory.VhTime,viewHistory.propertyId,viewHistory.context];
            resultarr[1].push(viewHistoryarr);
            resultarr[2].push(viewHistory.VHId);
        })
        return resultarr;
    },
    getAppraisalArr(appraisalarr: Appraisal[]){
        let resultarr: any[] =
            [
                [
                    ["Time","daytime"],
                    ["Range","input"],
                    ["User Email","input"],
                    ["Document","notchange"]
                ],
                [

                ],
                [

                ]
            ];
        appraisalarr.forEach(appraisal=>{
            let appraisalarr: any[] = [appraisal.apTime,appraisal.range,appraisal.uEmail,appraisal.document];
            resultarr[1].push(appraisalarr);
            resultarr[2].push(appraisal.appraisalId);
        })
        return resultarr;
    },
    getFamilyUpdateModel(familyarr: any,customerId: string) {
        let resultarr: any[] = [];
        for(let i = 0;i<familyarr[1].length;i++){
            let familyObj = {
                "Family_ID":familyarr[2][i],
                "Customer_ID":customerId,
                "Name":familyarr[1][i][0],
                "Phone":familyarr[1][i][3],
                "Brithday":familyarr[1][i][2],
                "Relationship":familyarr[1][i][1],
                "Email":familyarr[1][i][4]
            }
            resultarr.push(familyObj);
        }
        return resultarr;
    },
    getNoteUpdateModel(notearr: any,customerId: string){
        let resultarr: any[] = [];
        for(let i = 0;i<notearr[1].length;i++){
            let noteObj = {
                "Note_ID":notearr[2][i],
                "Context":notearr[1][i][1],
                "Next_Step":notearr[1][i][2],
                "N_Time":notearr[1][i][0],
                "Customer_ID":customerId
            }
            resultarr.push(noteObj);
        }
        return resultarr;
    },
    getAppointmentUpdateModel(appointmentarr: any,customerId: string) {
        let resultarr: any[] = [];
        for(let i = 0;i<appointmentarr[1].length;i++){
            let noteObj = {
                "Task":appointmentarr[1][i][1],
                "A_Time":appointmentarr[1][i][0],
                "Appointment_ID":appointmentarr[2][i],
                "Customer_ID":customerId
            }
            resultarr.push(noteObj);
        }
        return resultarr;
    },
    getViewHistoryUpdateModel(viewHistoryarr: any,customerId: string) {
        let resultarr: any[] = [];
        for(let i = 0;i<viewHistoryarr[1].length;i++){
            let viewHistorObj = {
                "Context":viewHistoryarr[1][i][2],
                "VH_Time":viewHistoryarr[1][i][0],
                "ViewHistory_ID":viewHistoryarr[2][i],
                "Customer_ID":customerId,
                "Property_ID":viewHistoryarr[1][i][1]
            }
            resultarr.push(viewHistorObj);
        }
        return resultarr;
    },
    getPrpertyViewHistoryUpdateModel(viewHistoryarr: any,propertyId: string) {
        let resultarr: any[] = [];
        for(let i = 0;i<viewHistoryarr[1].length;i++){
            let viewHistorObj = {
                "Context":viewHistoryarr[1][i][2],
                "VH_Time":viewHistoryarr[1][i][0],
                "ViewHistory_ID":viewHistoryarr[2][i],
                "Customer_ID":viewHistoryarr[1][i][1],
                "Property_ID":propertyId
            }
            resultarr.push(viewHistorObj);
        }
        return resultarr;
    },
    getApparaisalUpdateModel(apparaisalarr: any,propertyId: string)
    {
        let resultarr: any[] = [];
        for(let i = 0;i<apparaisalarr[1].length;i++){
            let apparaisalObj = {
                "Range":apparaisalarr[1][i][1],
                "Ap_Time":apparaisalarr[1][i][0],
                "Appraisal_ID":apparaisalarr[2][i],
                "Document":apparaisalarr[1][i][3],
                "U_email":apparaisalarr[1][i][2],
                "Property_ID":propertyId
            }
            resultarr.push(apparaisalObj);
        }
        return resultarr;
    }
}