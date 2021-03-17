import familyApi from "../src/api/familyApi";
import appointmentApi from "../src/api/appointmentApi";
import noteApi from "../src/api/noteApi";
import viewHistoryApi from "../src/api/viewHistoryApi";
import appraisalApi from "../src/api/appraisalApi";
import otherFunctions from "./otherFunctions";
import DialogueArr from "./DialogueArr";
import propertyApi from "../src/api/propertyApi";
import filesApi from "../src/api/filesApi";
import messageApi from "../src/api/messageAlertApi";

export default {
  async addNewValue(obj: any, IDs: any, file?: any) {
    let newObj: any = {};
    let timestring = "";
    let result: any = "";
    let time: any = "";
    let defaultTime: any = "";
    switch (obj.type) {
      case "familyadd":
        time = otherFunctions.getRightTimezone(obj.arr[1][0][2]);
        timestring = otherFunctions.getDataTimeId(
          otherFunctions.getRightTimezone(time)
        );
        newObj = {
          Family_ID: `C${IDs.customerID}T${obj.arr[1][0][3]}`,
          Name: obj.arr[1][0][0],
          BrithDay: new Date(
            time.getTime() - time.getTimezoneOffset() * 60000
          ).toISOString(),
          Relationship: obj.arr[1][0][1],
          Phone: obj.arr[1][0][3],
          Email: obj.arr[1][0][4],
          Customer_ID: IDs.customerID,
        };
        result = await familyApi.addfamily(newObj);
        break;
      case "Appointmentadd":
        defaultTime = new Date(obj.arr[1][0][0]);
        time = otherFunctions.getRightTimezone(defaultTime);
        timestring = otherFunctions.getDataTimeId(time);
        newObj = {
          Appointment_ID: `C${IDs.customerID}T${timestring}`,
          Task: obj.arr[1][0][1],
          A_Time: new Date(
            time.getTime() - time.getTimezoneOffset() * 60000
          ).toISOString(),
          Customer_ID: IDs.customerID,
        };
        result = await appointmentApi.addAppointment(newObj);
        await this.addMessageAlert(
          `Alert${IDs.customerID}T${timestring}`,
          "today's appointment",
          "appointment",
          IDs.userId,
          IDs.customerID,
          new Date(time.getTime() - time.getTimezoneOffset() * 60000)
        );
        break;
      case "Noteadd":
        defaultTime = new Date(obj.arr[1][0][0]);
        time = otherFunctions.getRightTimezone(defaultTime);
        timestring = otherFunctions.getDataTimeId(time);
        newObj = {
          Note_ID: `C${IDs.customerID}T${timestring}`,
          Context: obj.arr[1][0][2],
          Type: obj.arr[1][0][1],
          N_Time: new Date(
            time.getTime() - time.getTimezoneOffset() * 60000
          ).toISOString(),
          Customer_ID: IDs.customerID,
        };
        result = await noteApi.addnote(newObj);
        break;
      case "PropertyViewHistoryadd":
        time = otherFunctions.getRightTimezone(obj.arr[1][0][0]);
        timestring = otherFunctions.getDataTimeId(time);
        newObj = {
          ViewHistory_ID: `C${IDs.customerID}P${obj.arr[1][0][1]}T${timestring}`,
          Context: obj.arr[1][0][2],
          VH_Time: new Date(
            time.getTime() - time.getTimezoneOffset() * 60000
          ).toISOString(),
          Customer_ID: obj.arr[1][0][1],
          Property_ID: IDs.propertyID,
        };
        result = await viewHistoryApi.addviewHistory(newObj);
        result.propertyVH = true;
        result.propertyId = IDs.propertyID;
        result.customerId = obj.arr[1][0][1];
        break;
      case "ClientViewHistoryadd":
        time = otherFunctions.getRightTimezone(obj.arr[1][0][0]);
        timestring = otherFunctions.getDataTimeId(time);
        newObj = {
          ViewHistory_ID: `C${IDs.customerID}P${obj.arr[1][0][1]}T${timestring}`,
          Context: obj.arr[1][0][2],
          VH_Time: new Date(
            time.getTime() - time.getTimezoneOffset() * 60000
          ).toISOString(),
          Customer_ID: IDs.customerID,
          Property_ID: obj.arr[1][0][1],
        };
        result = await viewHistoryApi.addviewHistory(newObj);
        result.clientVH = true;
        result.propertyId = obj.arr[1][0][1];
        break;
      case "Appraisaladd":
        time = otherFunctions.getRightTimezone(obj.arr.time);
        timestring = otherFunctions.getDataTimeId(time);
        newObj = {
          Appraisal_ID: `P${IDs.propertyID}T${timestring}`,
          Ap_Time: new Date(
            time.getTime() - time.getTimezoneOffset() * 60000
          ).toISOString(),
          Range: obj.arr.range,
          Document: file.name,
          U_email: obj.arr.email,
          Property_ID: IDs.propertyID,
        };
        result = await appraisalApi.addappraisal(newObj);
        if (result.status == 201) {
          await filesApi.uploadFile(file);
        }
        result = await propertyApi.updatePropertyBudget(
          obj.arr.range,
          IDs.propertyID
        );
        break;
    }
    return result;
  },
  async UpdateArrValue(obj: any, IDs: any) {
    let readySendData: any = null;
    let result = "";
    switch (obj.type) {
      case "appraisal":
        readySendData = DialogueArr.getApparaisalUpdateModel(
          obj.arr,
          IDs.propertyID
        );
        readySendData.forEach((value: any) => {
          let time = new Date(value.A_Time);
          value.A_Time = new Date(
            time.getTime() - time.getTimezoneOffset() * 60000
          );
        });
        result = await appraisalApi.updateAllappraisals(readySendData);
        break;
      case "viewhistory":
        readySendData = DialogueArr.getViewHistoryUpdateModel(
          obj.arr,
          IDs.customerID
        );
        readySendData.forEach((value: any) => {
          let time = new Date(value.VhTime);
          value.VhTime = new Date(
            time.getTime() - time.getTimezoneOffset() * 60000
          );
        });
        result = await viewHistoryApi.updateAllviewHistory(readySendData);
        break;
      case "viewhistoryP":
        readySendData = DialogueArr.getPrpertyViewHistoryUpdateModel(
          obj.arr,
          IDs.propertyID
        );
        readySendData.forEach((value: any) => {
          let time = new Date(value.VhTime);
          value.VhTime = new Date(
            time.getTime() - time.getTimezoneOffset() * 60000
          );
        });
        result = await viewHistoryApi.updateAllviewHistory(readySendData);
        break;
      case "family":
        readySendData = DialogueArr.getFamilyUpdateModel(
          obj.arr,
          IDs.customerID
        );
        readySendData.forEach((value: any) => {
          let time = new Date(value.Brithday);
          value.Brithday = new Date(
            time.getTime() - time.getTimezoneOffset() * 60000
          ).toISOString();
        });
        result = await familyApi.updateAllfamiles(readySendData);
        break;
      case "note":
        readySendData = DialogueArr.getNoteUpdateModel(obj.arr, IDs.customerID);
        readySendData.forEach((value: any) => {
          let time = new Date(value.N_Time);
          value.N_Time = new Date(
            time.getTime() - time.getTimezoneOffset() * 60000
          ).toISOString();
        });
        result = await noteApi.updateAllnotes(readySendData);
        break;
      case "appointment":
        readySendData = DialogueArr.getAppointmentUpdateModel(
          obj.arr,
          IDs.customerID
        );
        readySendData.forEach((value: any) => {
          let time = new Date(value.A_Time);
          value.A_Time = new Date(
            time.getTime() - time.getTimezoneOffset() * 60000
          ).toISOString();
        });
        result = await appointmentApi.updateAllappointments(readySendData);
        break;
    }
    return result;
  },
  async deleteValue(objId: string, type: string) {
    let result = "";
    switch (type) {
      case "family":
        result = await familyApi.deletefamily(objId);
        break;
      case "appraisal":
        result = await appraisalApi.deleteappraisal(objId);
        break;
      case "viewhistory":
        result = await viewHistoryApi.deleteViewHistory(objId);
        break;
      case "note":
        result = await noteApi.deletenote(objId);
        break;
      case "appointment":
        result = await appointmentApi.deleteAppointment(objId);
        break;
    }
    return result;
  },
  async addMessageAlert(
    id: string,
    context: string,
    type: string,
    userId: string,
    customerId: string,
    time: Date
  ) {
    const alertMessage = {
      Alert_ID: id,
      Time: time,
      Context: context,
      Type: type,
      IfRead: "false",
      User_ID: userId,
      Customer_ID: customerId,
    };
    await messageApi.addMessageAlert(alertMessage);
  },
};
