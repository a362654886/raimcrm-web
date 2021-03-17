import apiFunctions from "../functions/apiFunctions";
import checkFunctions from "../functions/checkFunctions";
import otherFunctions from "../functions/otherFunctions";
import customerApi from "../src/api/customerApi";
import { getViewHistoryByCustomer } from "../src/api/viewHistoryApi";
import { Customer } from "./db-customer";

interface CustomerLabel {
  Label_ID: string;
  Vender: string;
  Buyer: string;
  Solicitors: string;
  Potential_Vender: string;
  Customer_ID: string;
}

interface CustomerPhone {
  Phone_ID: string;
  Mobile: string;
  Home: string;
  Work: string;
  Customer_ID: string;
}

const ifArrayContain = (arr: any[], item: any) => {
  let result = false;
  arr.forEach((value) => {
    if (value == item) {
      result = true;
    }
  });
  return result;
};

export class EditCustomer {
  ResourceName: string;
  Etag: string;
  Customer_ID: string;
  First_Name: string;
  Middle_Name: string;
  Last_Name: string;
  Email: string;
  BrithDay: Date;
  Source: string;
  Post_Address: string;
  Customer_Phone: CustomerPhone;
  Team_ID: string;
  User_ID: string;
  Customer_Label: CustomerLabel;
  LabelChoose: any[];
  PropertyLabels: any[];

  constructor(
    $ResourceName = "",
    $Etag = "",
    $Customer_ID = "",
    $First_Name = "",
    $Middle_Name = "",
    $Last_Name = "",
    $Email = "",
    $BrithDay = new Date(),
    $Source = "",
    $Post_Address = "",
    $Customer_Phone = {
      Phone_ID: "",
      Mobile: "",
      Home: "",
      Work: "",
      Customer_ID: "",
    },
    $Team_ID = "",
    $User_ID = "",
    $Customer_Label = {
      Label_ID: "",
      Vender: "",
      Buyer: "",
      Solicitors: "",
      Potential_Vender: "",
      Customer_ID: "",
    },
    $LabelChoose: any[] = [],
    $PropertyLabels: any[] = []
  ) {
    (this.ResourceName = $ResourceName),
      (this.Etag = $Etag),
      (this.Customer_ID = $Customer_ID),
      (this.First_Name = $First_Name),
      (this.Middle_Name = $Middle_Name),
      (this.Last_Name = $Last_Name),
      (this.Email = $Email),
      (this.BrithDay = $BrithDay),
      (this.Source = $Source),
      (this.Post_Address = $Post_Address),
      (this.Customer_Phone = $Customer_Phone),
      (this.Team_ID = $Team_ID),
      (this.User_ID = $User_ID),
      (this.Customer_Label = $Customer_Label),
      (this.LabelChoose = $LabelChoose);
      (this.PropertyLabels = $PropertyLabels);
  }

  customerChange = (data: any, id: string) => {
    if (data.type == "Customer_Label") {
      let cLabel = ["", "", "", ""];
      cLabel[data.index] = data.text;
      this["Customer_Label"] = {
        Label_ID: id,
        Vender: cLabel[0],
        Buyer: cLabel[1],
        Solicitors: cLabel[2],
        Potential_Vender: cLabel[3],
        Customer_ID: this.Customer_ID,
      };
    } else {
      this[data.type] = data.text;
    }
  };

  setLabel = () => {
    ifArrayContain(this.LabelChoose, "Vender")
      ? (this.Customer_Label.Vender = "Vender")
      : (this.Customer_Label.Vender = "");

    ifArrayContain(this.LabelChoose, "Buyer")
      ? (this.Customer_Label.Buyer = "Buyer")
      : (this.Customer_Label.Buyer = "");

    ifArrayContain(this.LabelChoose, "Solicitors")
      ? (this.Customer_Label.Solicitors = "Solicitors")
      : (this.Customer_Label.Solicitors = "");

    ifArrayContain(this.LabelChoose, "Potential_Vender")
      ? (this.Customer_Label.Potential_Vender = "Potential_Vender")
      : (this.Customer_Label.Potential_Vender = "");
  };

  check = (that: any) => {
    const result = checkFunctions.checkClientEdit(this);
    if (result !== "true") {
      that.loading.disappear();
      that.alert.showfail(result, that.alert);
      return true;
    } else {
      return false;
    }
  };

  auth = (loginUserId: string, that: any) => {
    if (this.User_ID == loginUserId) {
      return true;
    } else {
      that.alert.showfail(
        "you dont have the authorization to do update this user",
        that.alert
      );
      that.loading.disappear();
      return false;
    }
  };

  getRightTime = () => {
    let rightTime = otherFunctions.getRightTimezone(new Date(this.BrithDay));
    this.BrithDay = new Date(
      rightTime.getTime() - rightTime.getTimezoneOffset() * 60000
    );
  };

  checkBuyer = async (c: Customer, loginUserId: string) => {
    if (c.label.buyer == "Buyer") {
      let r = await otherFunctions.sendBuyRequirementEmail(
        c.email,
        `${c.nameString}`,
        c.customerID,
        c.buyRequirement.length + 1,
        loginUserId
      );
    }
  };

  update = async (loginUserId: string) => {
    this.getRightTime();
    this.setLabel();
    const result: Customer = await customerApi.updateCustomer(this);
    await this.checkBuyer(result, loginUserId);
  };

  initialupdate = async (loginUserId: string) => {
    this.getRightTime();
    this.setLabel();
    const result: Customer = await customerApi.updateCustomer(this);
  };

  setIds = (userId: string, teamId: string) => {
    this.Customer_ID = this.generateCustomerId();
    this.Customer_Label.Customer_ID = this.generateCustomerId();
    this.Customer_Label.Label_ID = this.generateCustomerId() + "Label";
    this.Customer_Phone.Customer_ID = this.generateCustomerId();
    this.Customer_Phone.Phone_ID = this.generateCustomerId() + "Phone";
    this.User_ID = userId;
    this.Team_ID = teamId;
  };

  save = async (loginUserId: string, teamId: string) => {
    this.getRightTime();
    this.setLabel();
    this.setIds(loginUserId, teamId);
    this.Customer_ID = this.generateCustomerId();
    const result = await customerApi.addCustomer(this, true);
    if (result.state == 400) {
      return false;
    } else {
      await this.checkBuyer(result.value, loginUserId);
      return true;
    }
  };

  addValue = async (loginUserId: string, obj: any) => {
    this.getRightTime();
    this.setLabel();
    const customerId = this.generateCustomerId();
    const body: any = await apiFunctions.addNewValue(obj, {
      customerID: customerId,
      userId: loginUserId,
    });
    if (body.status == 201) {
      return {
        status: 201,
        customer: await customerApi.getCustomer(customerId),
        viewHistory: await getViewHistoryByCustomer(customerId),
      };
    } else {
      return false;
    }
  };

  generateCustomerId() {
    let customerId = `${this.First_Name}_${this.Last_Name},${this.Email},${this.Customer_Phone.Mobile}`;
    return customerId;
  }
}

const getPropertyLabelArr = (labelString: string): any[] =>{
  const labelArr = labelString.split(",");
  const resultArr: any[] = [];
  labelArr.forEach(label =>{
    if(label != "contactGroups/myContacts" && label != "" ){
      resultArr.push(label)
    }
  })
  return resultArr
}

export const getEditCustomer = (customer: Customer) =>{

  const arr: any[] = getPropertyLabelArr(customer.propertyLabels)
  const result = new EditCustomer(
    customer.resourceName,
    customer.eTag,
    customer.customerID,
    customer.name[0],
    customer.name[1],
    customer.name[2],
    customer.email,
    customer.brithday,
    customer.source,
    customer.postAddress,
    {
      Phone_ID: customer.customerphone.Id,
      Mobile: customer.customerphone.mobile,
      Home: customer.customerphone.home,
      Work: customer.customerphone.work,
      Customer_ID: customer.customerID,
    },
    customer.teamId,
    customer.userId,
    {
      Label_ID: customer.label.Id,
      Vender: customer.label.vender,
      Buyer: customer.label.buyer,
      Solicitors: customer.label.solicitors,
      Potential_Vender: customer.label.potentialVender,
      Customer_ID: customer.customerID,
    },
    customer.labelstring.split(",")
  );
  result.PropertyLabels = arr
  return result
}
