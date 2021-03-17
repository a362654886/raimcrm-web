import { Vue } from "vue-property-decorator";
import modelCreate from "../../db-models/modelCreate";
import { Customer } from "../../db-models/db-customer";
import googlePeopleApi from "@/api/googlePeopleApi";
import store from "@/store";
import { getTeamToken, ifClientExist } from "../../functions/publicFn";

const basicURL = process.env.VUE_APP_API_ADDRESS + "customer";
export default {
  async ifClientExist(customerId: string) {
    const endpoint = basicURL + "/ifExist/" + customerId;
    let result: any;
    await Vue.axios
      .get(endpoint)
      .then((response) => {
        result = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
    return result;
  },
  //get functions
  async getAllcustomer(paramater: string) {
    const endpoint = basicURL + paramater;
    let result: any;
    await Vue.axios
      .get(endpoint)
      .then((response) => {
        result = response;
      })
      .catch((error) => {
        console.log(error);
      });
    return result;
  },
  async getCustomerMessages(paramater: string) {
    const endpoint = basicURL + "/customerAllMessage"+paramater;
    let result: any;
    await Vue.axios
      .get(endpoint)
      .then((response) => {
        result = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
    return result;
  },
  async getCustomersByProperty(paramater: string) {
    const endpoint = basicURL + "/getcustomerByProperty" + paramater;
    let result: any;
    await Vue.axios
      .get(endpoint)
      .then((response) => {
        result = response;
      })
      .catch((error) => {
        console.log(error);
      });
    return result;
  },
  async getCustomer(customerID: string) {
    const endpoint = basicURL + `/${customerID}`;
    let result: any = "";
    await Vue.axios
      .get(endpoint)
      .then((response) => {
        result = modelCreate.getcustomer(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    return result;
  },
  async getCustomerByPhone(phoneNumber: string) {
    const endpoint = basicURL + `/getCustomerByPhone/${phoneNumber}`;
    let result: any = "";
    await Vue.axios
      .get(endpoint)
      .then((response) => {
        result = {
          status: response.status,
          data: modelCreate.getcustomer(response.data),
        };
      })
      .catch((error) => {
        result = 404;
      });
    return result;
  },
  async getCustomerByEmail(email: string) {
    const endpoint = basicURL + `/getCustomerByEmail/${email}`;
    let result: any = "";
    await Vue.axios
      .get(endpoint)
      .then((response) => {
        result = {
          status: response.status,
          data: modelCreate.getcustomer(response.data),
        };
      })
      .catch((error) => {
        result = 404;
      });
    return result;
  },
  async getCustomerId(value: string) {
    const endpoint = basicURL + `/getCustomerId/${value}`;
    let result: any = "";
    await Vue.axios
      .get(endpoint)
      .then((response) => {
        result = response.data;
      })
      .catch((error) => {
        result = 404;
      });
    return result;
  },
  async getCustomerIds(value: string) {
    const endpoint = basicURL + `/getcustomerIds/` + value;
    let result: any = "";
    await Vue.axios
      .get(endpoint)
      .then((response) => {
        result = { status: response.status, data: response.data };
      })
      .catch((error) => {
        result = 404;
      });
    return result;
  },
  async getCHcustomeres(data: any) {
    const endpoint = basicURL + "/customerVH";
    let result: any = "";
    await Vue.axios
      .post(endpoint, data)
      .then((response) => {
        result = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
    return result;
  },
  async searchCustomeresByPhone(phone: string) {
    const endpoint = basicURL + "/searchCustomerByPhone/" + phone;
    let result: any = "";
    await Vue.axios
      .get(endpoint)
      .then((response) => {
        result = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
    return result;
  },
  async searchCustomeresByEmail(email: string) {
    const endpoint = basicURL + "/searchCustomerByEmail/" + email;
    let result: any = "";
    await Vue.axios
      .get(endpoint)
      .then((response) => {
        result = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
    return result;
  },
  async updateCustomer(customerData: any) {
    const endpoint = basicURL + "/" + customerData.Customer_ID;
    let result: any = "";
    let etag: any = await googlePeopleApi.getEtag(customerData.ResourceName);
    customerData.Etag = etag.data.etag;
    let googleResult: any = await this.updateGoogleCustomer(customerData);
    if (googleResult.status == 200) {
      customerData.Etag = googleResult.data.etag;
      await Vue.axios
        .put(endpoint, customerData)
        .then((response) => {
          result = modelCreate.getcustomer(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    return result;
  },
  async updateCustomerPostAddress(address: string, customerId: string) {
    const endpoint = basicURL + "/" + customerId;
    let para: any = [
      {
        op: "replace",
        path: "/Post_Address",
        value: address,
      },
    ];
    let result: any = "";
    await Vue.axios
      .patch(endpoint, para, {
        headers: {
          "Content-Type": "application/json-patch+json",
        },
      })
      .then((response) => {
        result = response;
      })
      .catch((error) => {
        console.log(error);
      });
    return result;
  },
  async addCustomer(customerData: any, ifGoogle: boolean) {
    const endpoint = basicURL;
    let result: any = "";
    let googleResult;
    if (ifGoogle == true) {
      googleResult = await this.addGoogleCustomer(customerData);
    } else {
      //?
      googleResult = 200;
    }
    if (googleResult.status == 200) {
      customerData.ResourceName = googleResult.data.resourceName;
      customerData.Etag = googleResult.data.etag;
      await Vue.axios
        .post(endpoint, customerData)
        .then((response) => {
          result = {
            state: response.status,
            value: modelCreate.getcustomer(response.data),
          };
        })
        .catch((error) => {
          result = {
            state: 400,
            value: "wrong",
          };
        });
    } else {
      // alert wrong email
    }
    return result;
  },
  async addCustomerWithoutGoogle(customerData: any) {
    const endpoint = basicURL;
    let result: any = "";
    customerData.Etag = "";
    await Vue.axios
      .post(endpoint, customerData)
      .then((response) => {
        result = {
          state: response.status,
          value: modelCreate.getcustomer(response.data),
        };
      })
      .catch((error) => {
        result = {
          state: 400,
          value: "wrong",
        };
      });
    return result;
  },
  async deleteCustomer(customerID: string, resourceName: string) {
    const endpoint = basicURL + `/${customerID}`;
    let result: any = "";
    googlePeopleApi
      .deletePeople(resourceName)
      .then(async (r) => {
        console.log(r);
      })
      .catch(async (e) => {
        console.log(e);
      });
    await Vue.axios
      .delete(endpoint)
      .then((response) => {
        result = response.status;
      })
      .catch((error) => {
        console.log(error);
      });
    return result;
  },
  async addGoogleCustomer(customerData: any) {
    let token: any = await getTeamToken();
    let result: any = null;
    if (token) {
      let body = {
        firstName: customerData?.First_Name,
        middleName: customerData?.Middle_Name,
        lastName: customerData?.Last_Name,
        labels: this.getLabelIds(customerData.Customer_Label),
        Byear: new Date(customerData.BrithDay).getFullYear(),
        Bmonth: new Date(customerData.BrithDay).getMonth() + 1,
        Bday: new Date(customerData.BrithDay).getDate(),
        address: customerData?.Post_Address,
        email: customerData?.Email,
        homeNumber: customerData?.Customer_Phone?.Home,
        workNumber: customerData?.Customer_Phone?.Work,
        otherNumber: customerData?.Customer_Phone?.Mobile,
      };
      result = await googlePeopleApi.postPeople(body);
    }
    return result;
  },
  getLabelIds(Label: any) {
    let result: any[] = [];
    result.push({
      contactGroupMembership: {
        contactGroupResourceName: "contactGroups/myContacts",
      },
    });
    if (Label.Buyer == "Buyer") {
      result.push({
        contactGroupMembership: {
          // @ts-ignore
          contactGroupResourceName: store.state.labelIds?.buyId,
        },
      });
    }
    if (Label.Vender == "Vender") {
      result.push({
        contactGroupMembership: {
          // @ts-ignore
          contactGroupResourceName: store.state.labelIds?.venderId,
        },
      });
    }
    if (Label.Solicitors == "Solicitors") {
      result.push({
        contactGroupMembership: {
          // @ts-ignore
          contactGroupResourceName: store.state.labelIds?.solicitorId,
        },
      });
    }
    if (Label.Potential_Vender == "Potential_Vender") {
      result.push({
        contactGroupMembership: {
          // @ts-ignore
          contactGroupResourceName: store.state.labelIds?.potential_venderId,
        },
      });
    }
    return result;
  },
  async updateGoogleCustomer(customerData: any) {
    let token: any = await getTeamToken();
    let result: any = null;
    if (token) {
      let body = {
        resourceName: customerData?.ResourceName,
        etag: customerData?.Etag,
        firstName: customerData?.First_Name,
        middleName: customerData?.Middle_Name,
        lastName: customerData?.Last_Name,
        labels: this.getLabelIds(customerData.Customer_Label),
        Byear: new Date(customerData.BrithDay).getFullYear(),
        Bmonth: new Date(customerData.BrithDay).getMonth() + 1,
        Bday: new Date(customerData.BrithDay).getDate(),
        address: customerData?.Post_Address,
        email: customerData?.Email,
        homeNumber: customerData?.Customer_Phone?.Home,
        workNumber: customerData?.Customer_Phone?.Work,
        otherNumber: customerData?.Customer_Phone?.Mobile,
      };
      customerData.PropertyLabels.forEach((element: any) => {
        body.labels.push({
          contactGroupMembership: {
            contactGroupResourceName: element,
          },
        })
      });
      result = await googlePeopleApi.updatePeople(
        "names%2Cmemberships%2C" +
          "birthdays%2Caddresses%2C" +
          "emailAddresses%2CphoneNumbers",
        body
      );
    }
    return result;
  },
};
