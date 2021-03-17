import { Property } from "../db-models/db-property";
import otherFunctions from "./otherFunctions";
import store from "../src/store";

export const toProperty = async (propertyId: string, that: any) => {
  let index = await otherFunctions.findPropertyIndex(propertyId);
  store.commit("saveProperty", index);
  that.$router.push("propertyshow").catch((err: any) => {
    err;
  });
};

export const toClient = async (clientId: string, that: any) => {
  let index = await otherFunctions.findCustomerIndex(clientId);
  if (index == -2) {
    // show alert
    that.alert.showAlert(
      "you don't have the authority to access this client",
      that.alert
    );
  } else {
    store.commit("saveCustomer", index);
    that.$router
      .push({
        path: "customershow",
        query: {
          id: Math.ceil(Math.random() * 100).toString(),
        },
      })
      .catch((err: any) => {
        err;
      });
    //location.reload();
  }
};
