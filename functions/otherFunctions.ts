import mailTemplateApi from "../src/api/mailTemplateApi";
import customerApi from "@/api/customerApi";
import store from "@/store";
import googleAPI from "@/api/googleAPI";

export default {
  getDateString(data: Date) {
    let newdate = new Date(data);
    return this.getFormatData(newdate);
  },
  getDateTimeString(data: Date) {
    let newdate = new Date(data);
    let month = "";
    if (
      newdate.getMonth() + 1 == 10 ||
      newdate.getMonth() + 1 == 11 ||
      newdate.getMonth() + 1 == 12
    ) {
      month = (newdate.getMonth() + 1).toString();
    } else {
      month = "0" + (newdate.getMonth() + 1).toString();
    }
    let day = "";
    if (newdate.getDate() < 10) {
      day = "0" + newdate.getDate().toString();
    } else {
      day = newdate.getDate().toString();
    }
    let hour = "";
    if (newdate.getHours() < 10) {
      hour = "0" + newdate.getHours().toString();
    } else {
      hour = newdate.getHours().toString();
    }
    let minute = "";
    if (newdate.getMinutes() < 10) {
      minute = "0" + newdate.getMinutes().toString();
    } else {
      minute = newdate.getMinutes().toString();
    }

    return `${day}/${month}/${newdate.getFullYear()},${hour}:${minute}`;
  },
  getDataTimeId(data: Date) {
    let newdate = new Date(data);
    let month = "";
    if (
      newdate.getMonth() + 1 == 10 ||
      newdate.getMonth() + 1 == 11 ||
      newdate.getMonth() + 1 == 12
    ) {
      month = (newdate.getMonth() + 1).toString();
    } else {
      month = "0" + (newdate.getMonth() + 1).toString();
    }
    let day = "";
    if (newdate.getDate() < 10) {
      day = "0" + newdate.getDate().toString();
    } else {
      day = newdate.getDate().toString();
    }
    let hour = "";
    if (newdate.getHours() < 10) {
      hour = "0" + newdate.getHours().toString();
    } else {
      hour = newdate.getHours().toString();
    }
    let minute = "";
    if (newdate.getMinutes() < 10) {
      minute = "0" + newdate.getMinutes().toString();
    } else {
      minute = newdate.getMinutes().toString();
    }

    return `${day}${month}${newdate.getFullYear()}${hour}${minute}`;
  },
  getDataId(data: Date) {
    let newdate = new Date(data);
    let month = "";
    if (
      newdate.getMonth() + 1 == 10 ||
      newdate.getMonth() + 1 == 11 ||
      newdate.getMonth() + 1 == 12
    ) {
      month = (newdate.getMonth() + 1).toString();
    } else {
      month = "0" + (newdate.getMonth() + 1).toString();
    }
    let day = "";
    if (newdate.getDate() < 10) {
      day = "0" + newdate.getDate().toString();
    } else {
      day = newdate.getDate().toString();
    }
    return `${day}${month}${newdate.getFullYear()}`;
  },
  getFormatData(data: Date) {
    let newdate = new Date(data);
    let month = "";
    if (
      newdate.getMonth() + 1 == 10 ||
      newdate.getMonth() + 1 == 11 ||
      newdate.getMonth() + 1 == 12
    ) {
      month = (newdate.getMonth() + 1).toString();
    } else {
      month = "0" + (newdate.getMonth() + 1).toString();
    }
    let day = "";
    if (newdate.getDate() < 10) {
      day = "0" + newdate.getDate().toString();
    } else {
      day = newdate.getDate().toString();
    }
    return `${day}/${month}/${newdate.getFullYear()}`;
  },
  getStringToData(data: string) {
    return data.replace("/", "-").replace("/", "-");
  },
  getRightTimezone(time: Date) {
    //time zone
    let timezone = 13;
    let offset_GMT = new Date().getTimezoneOffset();
    let nowDate = time.getTime();
    let targetDate = new Date(
      nowDate + offset_GMT * 60 * 1000 + timezone * 60 * 60 * 1000
    );
    return targetDate;
  },
  addValuetoOption(arr: any[]) {
    let resultArr: any = [];
    arr.forEach((value) => {
      let obj = { value: value, text: value };
      resultArr.push(obj);
    });
    return resultArr;
  },
  stringToArr(data: any) {
    if (data.trim() != "") {
      let dataarr: any[] = data.split(",");
      let resultarr: any[] = [];
      dataarr.forEach((value) => {
        resultarr.push(value);
      });
      return resultarr;
    } else {
      return [];
    }
  },
  ArrToArrstring(data: any[]) {
    let result = "";
    data.forEach((value) => {
      result = result + value + ",";
    });
    return result.substring(0, result.length - 1).trim();
  },
  transferArrToString(arr: any[]) {
    if (arr[0] == "0" && arr[1] == "0") {
      return "";
    }
    let result = "";
    arr.forEach((value) => {
      result += value + ",";
    });
    return result.substring(0, result.length - 1).trim();
  },
  transferTitleToDataTitle(titlearr: any[]) {
    let result = "";
    titlearr.forEach((value) => {
      switch (value) {
        case "CrossLease(Freehold)":
          result += "CrossLease(F)" + ",";
          break;
        case "CrossLease(Leasehold)":
          result += "CrossLease(L)" + ",";
          break;
        default:
          result += value + ",";
      }
    });
    return result.substring(0, result.length - 1);
  },
  transferDataTitleToTitle(title: string) {
    let titlearr = title.split(",");
    let result = "";
    titlearr.forEach((value) => {
      switch (value) {
        case "CrossLease(F)":
          result += "CrossLease(Freehold)" + ",";
          break;
        case "CrossLease(L)":
          result += "CrossLease(Leasehold)" + ",";
          break;
        default:
          result += value + ",";
      }
    });
    return result.substring(0, result.length - 1);
  },
  transferDataTitleToTitle2(title: string) {
    let titlearr = title.split(",");
    let result = "";
    titlearr.forEach((value) => {
      switch (value) {
        case "CrossLease(Freehold)":
          result += "CrossLease(F)" + ",";
          break;
        case "CrossLease(Leasehold)":
          result += "CrossLease(L)" + ",";
          break;
        default:
          result += value + ",";
      }
    });
    return result.substring(0, result.length - 1);
  },
  moneyFormat(num: string, moneyFormat: boolean) {
    if (num == "0") {
      return num;
    }
    let r =
      num.toString().indexOf(".") !== -1
        ? num.toLocaleString()
        : num.toString().replace(/(\d)(?=(?:\d{3})+$)/g, "$1,");
    const ifMoney = moneyFormat ? "$" + r : r;
    return ifMoney;
  },
  moneyRemoveFormat(num: string) {
    return num.toString().replace(/[,]+/g, "").replace("$", "");
  },
  getYesAndNo(value: string) {
    let result = "";
    switch (value) {
      case "true":
        result = "Yes";
        break;
      case "false":
        result = "No";
        break;
      case "N/A":
        result = "N/A";
        break;
    }
    return result;
  },
  async confirmBox(that: any, text: string) {
    let result: any = "";
    await that.$bvModal
      .msgBoxConfirm(text, {
        title: "Please Confirm",
        size: "sm",
        buttonSize: "sm",
        okVariant: "danger",
        okTitle: "YES",
        cancelTitle: "NO",
        footerClass: "p-2",
        hideHeaderClose: false,
        centered: true,
      })
      .then((value: any) => {
        result = value;
      })
      .catch((value: any) => {
        result = false;
      });
    return result;
  },
  getYesAndNofromDB(input: string) {
    if (input == "Yes") {
      return "true";
    }
    if (input == "No") {
      return "false";
    }
    if (input == "N/A") {
      return "N/A";
    }
  },
  async getMailTemplateOptions() {
    let templates = await mailTemplateApi.getMailTs();
    let result: any[] = [];
    templates.forEach((template: any) => {
      result.push({
        key: template.templateName,
        label: template.templateName,
        sortable: true,
      });
    });
    return result;
  },
  async getcustomeremailsByProperty(data: any) {
    let customerIds: any[] = [];
    data.forEach((value: any) => {
      if (
        customerIds.includes(value.customerId) == false &&
        value.customerId != "empty"
      ) {
        customerIds.push(value.customerId);
      }
    });
    let tostring = "";
    let namestring = "";
    for (const value of customerIds) {
      let customer = await customerApi.getCustomer(value);
      tostring += `${customer.email};`;
      namestring += `${customer.nameString};`;
    }
    return {
      tostring: tostring,
      namestring: namestring,
    };
  },
  async getcustomerphonesByProperty(data: any) {
    let customerIds: any[] = [];
    data.forEach((value: any) => {
      if (
        customerIds.includes(value.customerId) == false &&
        value.customerId != "empty"
      ) {
        customerIds.push(value.customerId);
      }
    });
    let tostring = "";
    for (const value of customerIds) {
      let customer = await customerApi.getCustomer(value);
      tostring += `${customer.phonestring};`;
    }
    return tostring;
  },
  async findCustomerIndex(CustomerId: string) {
    let aCustomer = await customerApi.getCustomer(CustomerId);
    let index = 0;
    let rightIndex = 0;
    store.state.searcherCustomers.forEach((value) => {
      if (value.customerID == aCustomer.customerID) {
        rightIndex = index;
        if (rightIndex == 0) {
          rightIndex = -1;
        }
      }
      index++;
    });
    /*if (rightIndex == 0) {
      store.state.searcherCustomers.push(aCustomer)
            rightIndex = (store.state.searcherCustomers.length-1);
      rightIndex = -2;
    }*/
    if (rightIndex == -1) {
      rightIndex = 0;
    }
    return rightIndex;
  },
  async findPropertyIndex(PropertyId: string) {
    let index = 0;
    let rightIndex = 0;
    store.state.searcherProperties.forEach((value) => {
      if (value.propertyId == PropertyId) {
        rightIndex = index;
        if (rightIndex == 0) {
          rightIndex = -1;
        }
      }
      index++;
    });
    if (rightIndex == -1) {
      rightIndex = 0;
    }
    return rightIndex;
  },
  async sendBuyRequirementEmail(
    customerEmail: string,
    Cname: string,
    Cid: string,
    Cn: number,
    Uid: string
  ) {
    let user: any = store.state.loginUser;
    //let link = `https://raincrm.australiaeast.cloudapp.azure.com/customerBuyRequirement?name=${Cname}&id=${Cid}&Num=${Cn}&Uid=${Uid}`;
    //let link = `http://localhost:8080/customerBuyRequirement?name=${Cname}&id=${Cid}&Num=${Cn}`
    let link = `https://www.thefarmingcrm.com/customerBuyRequirement?name=${Cname}&id=${Cid}&Num=${Cn}&Uid=${Uid}`;
    let result = await mailTemplateApi.getMailT("Buy Requirement for New Buyer");
    let context = `
    <div>
    ${result.templateValue}
    </div>
    `;
    context = context.replace("linkUrl",link);
    context = context.replace("$firstName",Cname);
    let googleresult = await googleAPI.sendEmail({
      fromname: "Rain CRM",
      fromemail: user.teamId,
      toname: "",
      toemail: customerEmail,
      subject: `Buy Requirement`,
      context: context,
      attachment: "",
    });
    return googleresult;
  },
};
