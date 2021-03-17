<template>
  <div>
    <div id="customerFilter_background">
      <form id="customerFilter">
        <div class="form-group form-namebox">
          <div class="namebox">
            <input
              class="form-control othername"
              placeholder="First Name"
              v-model="customer_firstname"
            />
          </div>
          <div class="namebox">
            <label class="filtertext" id="customername">Name</label>
            <input
              class="form-control"
              placeholder="Middle Name"
              v-model="customer_middlename"
            />
          </div>
          <div class="namebox">
            <input
              class="form-control othername"
              placeholder="Last Name"
              v-model="customer_lastname"
            />
          </div>
        </div>
        <div class="form-group form-item">
          <label class="filtertext">Email</label>
          <input
            class="form-control"
            placeholder="Customer Email"
            v-model="customer_email"
          />
        </div>
        <div class="form-group form-item">
          <label class="filtertext">Phone</label>
          <input
            class="form-control"
            placeholder="Customer Phone"
            v-model="customer_phone"
          />
        </div>
      </form>
      <div class="secondline">
        <div class="form-group form-secondline-items">
          <label class="filtertext">Label</label>
          <Multiselect
            v-model="customer_label"
            :options="label_options"
            multiple
          ></Multiselect>
        </div>
        <div class="form-group form-secondline-items">
          <label class="filtertext">Source</label>
          <Multiselect
            v-model="customer_source"
            :options="source_options"
            multiple
          ></Multiselect>
        </div>
        <div class="form-group form-secondline-items">
          <label class="filtertext">User</label>
          <div style="margin-left: 1rem">
            <select class="custom-select inputbox" v-model="userId">
              <option
                v-for="(member, index) in this.userSelection"
                :key="index"
                :value="member.value"
              >
                {{ member.text }}
              </option>
            </select>
          </div>
        </div>
      </div>
      <div>
        <div>
          <b-button id="button" @click="searchCustomers(1, 10)"
            >Search</b-button
          >
        </div>
      </div>
    </div>
    <VLoadding :ifshow="loading.ifshow" />
    <div v-if="!loading.ifshow">
      <div style="display: flex; background-color: #101010; margin-top: 1rem">
        <div
          style="
            display: flex;
            margin-left: 80%;
            margin-top: 0.8rem;
            float: right;
          "
        >
          <label class="filtertext" style="margin-right: 10px"
            >Mail Merge</label
          >
          <b-form-checkbox
            id="checkbox-1"
            v-model="ifMailmerge"
            name="checkbox-1"
            value="true"
            unchecked-value="false"
          >
          </b-form-checkbox>
        </div>
        <div
          style="
            display: flex;
            margin-left: 2%;
            margin-top: 0.8rem;
            float: right;
          "
        >
          <label class="filtertext" style="margin-right: 10px"
            >Text Merge</label
          >
          <b-form-checkbox
            id="checkbox-2"
            v-model="ifTextmerge"
            name="checkbox-2"
            value="true"
            unchecked-value="false"
          >
          </b-form-checkbox>
        </div>
      </div>
      <div v-if="ifshowchooseTable & ifshowTextTable">
        <VTable
          :items="customers"
          :fields="customerfield"
          :rows="allrows"
          :perPage="localPerPage"
          :pagination="true"
          :tableName="'customer'"
          :currentPage="cPage"
          @passValue="chooseCustomer"
          @passPage="searchCustomers"
        />
      </div>
      <div v-if="!ifshowchooseTable">
        <VSelectMailTable
          :selectAll="true"
          :ifMail="true"
          :items="customers"
          :fields="customerfield"
          :mailTemplateSelection="mailtemplateSelections"
          :rows="allrows"
          :perPage="localPerPage"
          :currentPage="cPage"
          :download="true"
          :pagination="true"
          @passValue="openmail"
          @passPage="searchCustomers"
        />
      </div>
      <div v-if="!ifshowTextTable">
        <VSelectMailTable
          :selectAll="true"
          :items="customers"
          :fields="customerfield"
          :mailTemplateSelection="mailtemplateSelections"
          :rows="allrows"
          :perPage="localPerPage"
          :currentPage="cPage"
          :pagination="true"
          @passValue="openText"
          @passPage="searchCustomers"
        />
      </div>
    </div>
    <MailBox
      :idstring="'mailbox'"
      :titlestring="'Mail'"
      :template="mailtemplate"
      :mailto="mailToString"
      :nameString="mailNameString"
      :mailresult="mailResult"
      :tableName="'customer'"
      :ifloading="ifloadingMail"
      @passValue="sendmail"
    />
    <TextBox
      :idstring="'textbox'"
      :titlestring="'Text'"
      :textto="textToString"
      :textresult="textResult"
      :ifloading="ifloadingText"
      @passValue="sendSMS"
    />
  </div>
</template>

<script>
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import VTable from "@/components/VTable.vue";
import Multiselect from "vue-multiselect";
import customerApi from "../../api/customerApi";
import googleApi from "../../api/googleAPI";
import smsApi from "../../api/smsAPI";
import store from "@/store";
import { customerfield } from "../../../data/options_data";
import VSelectMailTable from "@/components/VSelectMailTable.vue";
import MailBox from "@/components/MailComponents/MailBox.vue";
import TextBox from "@/components/MailComponents/TextBox.vue";
import otherFunctions from "../../../functions/otherFunctions";
import VLoadding from "@/components/VLoadding.vue";
import LoadModel from "../../../db-models/loaddingModel";
import { insertRightPage } from "../../../functions/publicFn";
import modelCreate from "../../../db-models/modelCreate";
import {
  getUserSelection,
  getStoreUser,
} from "../../../db-models/db-userManagement";

@Component({
  components: {
    VTable,
    Multiselect,
    VSelectMailTable,
    MailBox,
    VLoadding,
    TextBox,
  },
})
export default class CustomerFilter extends Vue {
  cPage = 1;
  allrows = 0;
  localPerPage = 10;

  date = "2019-01-01 14:30";
  rows = 0;
  customer_firstname = "";
  customer_middlename = "";
  customer_lastname = "";
  customer_email = "";
  customer_phone = "";
  customer_label = [];
  customer_source = [];
  label_options = ["Vender", "Buyer", "Solicitors", "Potential_Vender"];
  source_options = ["trademe", "test"];
  customers = [];
  customerfield = customerfield;

  ifMailmerge = false;
  ifshowchooseTable = true;
  ifTextmerge = false;
  ifshowTextTable = true;

  mailtemplate = "";
  mailToString = "";
  mailNameString = "";
  mailResult = "ini";
  mailtemplateSelections = [];

  textToString = "";
  textResult = "ini";

  ifloadingMail = "false";
  ifloadingText = "false";

  loading = new LoadModel();

  userSelection = [];
  userId = "";
  teamId = "";

  async created() {
    // default value
    this.cPage = store.state.cpage;
    this.customers = store.state.searcherCustomers;
    this.rows = this.customers.length;
    this.mailtemplateSelections = await otherFunctions.getMailTemplateOptions();

    const storeUser = getStoreUser();
    this.teamId = storeUser.teamId;
    this.userSelection = await getUserSelection(storeUser.teamId);
    this.userSelection.push({ value: "all", text: "all" });
    this.userId = "all";
  }

  chooseCustomer(customerIndex) {
    store.commit("saveCustomer", customerIndex);
    this.$router
      .push({
        path: "customershow",
        query: {
          id: Math.ceil(Math.random() * 100),
        },
      })
      .catch((err) => {
        err;
      });
  }
  async searchCustomers(PageNum, PageSize) {
    this.localPerPage = PageSize;
    this.loading.show();
    this.cPage = PageNum;
    store.commit("saveClientSearchURL", this.getApiparamaters());
    const urlValue = `${this.getApiparamaters()}&PageNum=${PageNum}&PageSize=${PageSize}`;
    const apiResult = await customerApi.getAllcustomer(urlValue);
    this.customers = insertRightPage(
      PageNum,
      PageSize,
      modelCreate.getCustomers(apiResult.data.customer)
    );
    this.setTable(apiResult.data.paginationMetadata);
    this.loading.disappear();
    if (this.customers.length != undefined) {
      this.rows = this.customers.length;
    }
    store.commit("saveCustomerSearchResult", this.customers);
    store.commit("savecPage", PageNum);
    store.commit("savecSize", PageSize);
  }

  setTable(pageApi) {
    const pagination = JSON.parse(pageApi);
    this.allrows = pagination.totalCount;
  }

  getApiparamaters() {
    let labelstring = "";
    if (this.ifarraycontain(this.customer_label, "Vender")) {
      labelstring = "Vender,";
    } else {
      labelstring = "n,";
    }

    if (this.ifarraycontain(this.customer_label, "Buyer")) {
      labelstring += "Buyer,";
    } else {
      labelstring += "n,";
    }

    if (this.ifarraycontain(this.customer_label, "Solicitors")) {
      labelstring += "Solicitors,";
    } else {
      labelstring += "n,";
    }

    if (this.ifarraycontain(this.customer_label, "Potential_Vender")) {
      labelstring += "Potential_Vender";
    } else {
      labelstring += "n";
    }
    let sourcestring = "";
    this.customer_source.forEach((value) => {
      sourcestring += `${value},`;
    });
    let name = `${this.customer_firstname},${this.customer_middlename},${this.customer_lastname}`;
    if (this.userId != "all") {
      return `?name=${name}&email=${this.customer_email}&phone=${this.customer_phone}&label=${labelstring}&source=${sourcestring}&&User_Id=${this.userId}&&Team_Id=${this.teamId}`;
    } else {
      return `?name=${name}&email=${this.customer_email}&phone=${this.customer_phone}&label=${labelstring}&source=${sourcestring}&&Team_Id=${this.teamId}`;
    }
  }

  @Watch("ifMailmerge")
  showDifferentTable() {
    this.ifshowchooseTable = this.ifMailmerge == "true" ? false : true;
    if (this.ifMailmerge == "true") {
      this.ifTextmerge = "false";
    }
  }

  @Watch("ifTextmerge")
  showDifferentTextTable() {
    this.ifshowTextTable = this.ifTextmerge == "true" ? false : true;
    if (this.ifTextmerge == "true") {
      this.ifMailmerge = "false";
    }
  }

  ifarraycontain(arr, item) {
    let result = false;
    arr.forEach((value) => {
      if (value == item) {
        result = true;
      }
    });
    return result;
  }

  async openmail(data, mailtemlate) {
    this.mailtemplate = mailtemlate;
    if (data[0] != "all") {
      let tostring = "";
      let namestring = "";
      data.forEach((value) => {
        if (value.email != "") {
          tostring += `${value.email};`;
          namestring += `${value.nameString};`;
        }
      });
      this.mailToString = tostring;
      this.mailNameString = namestring;
      store.commit("saveSelectedItem", []);
    } else {
      //
      const apiResult = await customerApi.getCustomerMessages(
        this.getApiparamaters()
      );
      this.mailToString = apiResult.mailToString;
      this.mailNameString = apiResult.mailNameString;
      store.commit("saveSelectedItem", []);
    }
  }

  async openText(data) {
    if (data[0] != "all") {
      let tostring = "";
      data.forEach((value) => {
        if (value.phonestring != "") {
          tostring += `${value.phonestring};`;
        }
      });
      this.textToString = tostring;
      store.commit("saveSelectedItem", []);
    } else {
      //
      const apiResult = await customerApi.getCustomerMessages(
        this.getApiparamaters()
      );
      this.textToString = apiResult.phoneString;
      store.commit("saveSelectedItem", []);
    }
  }

  async sendmail(obj) {
    this.mailResult = "ini";
    let emailbodys = {
      fromname: store.state.loginTeam.teamName,
      fromemail: store.state.loginTeam.teamId,
      tonamearr: obj.nameArray,
      toemailarr: obj.toarr,
      subject: obj.subject,
      context: obj.context,
      attachment: obj.attachment,
    };
    this.ifloadingMail = "true";
    let result = await googleApi.sendEmails(emailbodys);
    this.ifloadingMail = "false";
    this.mailResult = result == 200 ? "true" : "false";
  }

  async sendSMS(obj) {
    this.textResult = "ini";
    const phoneNumber = obj.to.split(";");
    const textObj = [];
    let result;
    this.ifloadingText = "true";
    for (let i = 0; i < phoneNumber.length - 1; i++) {
      const textBody = {
        message: obj.context,
        to: "64" + phoneNumber[i],
        from: "64272091817",
      };
      //textObj.push(textBody);
      result = await smsApi.sendSMS(textBody);
    }
    this.ifloadingText = "false";
    this.textResult = result == 200 ? "true" : "false";
  }
}
</script>
<style>
.form-item {
  width: 33%;
  margin: 1rem;
}
.form-namebox {
  width: 33%;
  margin: 1rem;
  display: flex;
}

.namebox {
  width: 33%;
}
#customerFilter {
  display: flex;
}
.form-secondline-items {
  margin-left: 1rem;
  margin-right: 1rem;
  width: 50%;
}
.secondline {
  display: flex;
  height: 80px;
}
#customerFilter_background {
  background-color: #0074d9;
}
.filtertext {
  color: white;
  margin-bottom: 8px;
}
#button {
  width: 40%;
  margin-top: 40px;
  background-color: #dc143c;
}
#customername {
  margin-bottom: 8px;
}
.othername {
  margin-top: 32px;
}

/* phone */
@media screen and (max-width: 595px) {
  .form-namebox {
    display: inline;
    width: 100%;
  }
  .namebox,
  .form-secondline-items,
  .form-item {
    width: 90%;
    margin: 1rem;
  }
  #customerFilter {
    display: inline;
  }
  .secondline {
    display: inline;
    height: 80px;
  }
}
</style>
