import customerApi from "../src/api/customerApi";
import teamTokenApi from "../src/api/teamTokenApi";
import otherFunctions from "./otherFunctions";
import apiFunctions from "./apiFunctions";
import { dialogueType } from "@/type/enum";
import { getStoreTeam } from "../db-models/db-team";
import store from "@/store";

export const ifClientExist = async (phone: string, email: string) => {
  let result;
  result = await customerApi.getCustomerByPhone(phone);
  if (result.status == 200) {
    return result.data;
  }
  result = await customerApi.getCustomerByEmail(email);
  if (result.status == 200) {
    return result.data;
  }
  return null;
};

export const deleteValue = async (obj: any, type: string, that: any) => {
  let confirm = await otherFunctions.confirmBox(
    that,
    `Are you sure you want to delete this ${type}?`
  );
  if (confirm == true) {
    let result: any = await apiFunctions.deleteValue(obj, type);
    if (result == 200) {
      that.alert.showSuccess("success", that.alert);
      await that.success();
    }
  }
};

export const allFalse = (obj: any) => {
  const result = obj;
  for (let key of Object.keys(obj)) {
    result[key] = false;
  }
  return result;
};

export const checkOptions = (arr: any[], value: string) => {
  const result = arr;
  const index = result.indexOf(value);
  if (result.length > 1 && index != -1) {
    result.splice(index, 1);
  }

  if (result.length == 0) {
    result.push(value);
  }
  return result;
};

export const sliceArray = (arr: any[], size: number) => {
  const result = [];
  for (let x = 0; x < Math.ceil(arr.length / size); x++) {
    const start = x * size;
    const end = start + size;
    result.push(arr.slice(start, end));
  }
  return result;
};

export const toPercent = (point: any) => {
  let str: any = Number(point * 100).toFixed(2);
  str += "%";
  return str;
};

export const insertRightPage = (pageNum: any, pageSize: any, arr: any[]) => {
  const result = [];
  const total = (pageNum-1) * pageSize + arr.length;
  const startNum = (pageNum-1) * (pageSize);
  let num = 0;
  for (let i = 0; i < total; i++) {
    if (i < startNum) {
      result.push(arr[0]);
    } else {
      result.push(arr[num]);
      num++;
    }
  }
  return result;
};

export const getTeamToken = async () => {
  // time 
  const storeTeam = getStoreTeam();
  const tokenBody = await teamTokenApi.getTeamToken(storeTeam.teamId);
  return tokenBody.data.token
};

export const getGoogleLabel = (googleMemberships: any) => {
  const arr = googleMemberships.map((x: any) => x.contactGroupMembership.contactGroupResourceName)
  const ids: any = store.state.labelIds
  let resultArr = ""
  arr.forEach((x: any)=>{
    if(x == ids.buyId){
      resultArr += "Buyer,";
    }
    if(x == ids.potential_venderId){
      resultArr += "Potential_Vender,";
    }
    if(x == ids.solicitorId){
      resultArr += "Solicitors,";
    }
    if(x == ids.venderId){
      resultArr += "Vender,";
    }
  })
  return resultArr
};

export const defaultPropertyAttributes = {
  viewHistory: false,
  appraisal: false,
  tradeHistory: false,
  owner: false,
  legalOwner: false,
  matchClient: false,
  editOwner: false,
};

export const dialogueValue: dialogueType = dialogueType.TRUE;
