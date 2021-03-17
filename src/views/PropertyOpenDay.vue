<template>
  <div class="openHomeBody">
    <div class="login-form">
      <el-switch
        style="float: right"
        v-model="ifLink"
        :active-text="ifLinkTest"
      >
      </el-switch>
      <div class="logoimg">
        <img
          src="../../public/logo.jpg"
          style="margin: 0.5rem"
          width="60"
          height="60"
          alt=""
        />
        <h3 style="font-family: Lucida Family">Open Home Register</h3>
      </div>
      <div class="loginarea" v-if="!ifLink">
        <VAlert :text="alert.text" :type="alert.type" :ifshow="alert.ifshow" />
        <div class="openhomebox">
          <div
            style="
              display: flex;
              width: 90%;
              margin-left: 20px;
              margin-right: 20px;
            "
          >
            <span class="input-group-text inputSpan" style="width: 150px"
              >Full Name</span
            >
            <b-form-input
              class="form-control inputtext"
              :state="!firstNameState"
              aria-describedby="input-live-help input-live-feedback"
              style="width: 33%"
              placeholder="firstname(required)"
              v-model="firstName"
              v-on:input="
                checkState(functions.ifEmpty, 'firstNameState', firstName)
              "
            />
            <b-form-input
              class="form-control inputtext"
              style="width: 33%"
              placeholder="middlename(optional)"
              v-model="middleName"
            />
            <b-form-input
              class="form-control inputtext"
              :state="!lastNameState"
              style="width: 33%"
              placeholder="lastname(required)"
              v-model="lastName"
              v-on:input="
                checkState(functions.ifEmpty, 'lastNameState', lastName)
              "
            />
          </div>
          <div>
            <p v-if="!namealert" style="color: red">
              please input firstname and lastname
            </p>
          </div>
        </div>

        <div class="openhomebox">
          <div
            style="
              display: flex;
              width: 90%;
              margin-left: 20px;
              margin-right: 20px;
            "
          >
            <span class="input-group-text inputSpan" style="width: 150px"
              >Email</span
            >
            <b-form-input
              class="form-control inputtext"
              :state="emailState"
              style="width: 99%"
              placeholder="email(required)"
              v-model="openemail"
              v-on:input="
                checkState(functions.emailcheck, 'emailState', openemail)
              "
            />
          </div>
          <div>
            <p v-if="!emailState" style="color: red">
              please input right format email
            </p>
          </div>
        </div>

        <div class="openhomebox">
          <div
            style="
              display: flex;
              width: 90%;
              margin-left: 20px;
              margin-right: 20px;
            "
          >
            <span class="input-group-text inputSpan" style="width: 150px"
              >Mobile</span
            >
            <b-form-input
              class="form-control inputtext"
              :state="mobileState"
              style="width: 99%"
              placeholder="mobile(required)"
              v-model="mobile"
              v-on:input="checkState(functions.checkNum, 'mobileState', mobile)"
            />
          </div>
          <div>
            <p v-if="!mobileState" style="color: red">
              please right phone number
            </p>
          </div>
        </div>

        <div class="openhomebox">
          <div
            style="
              display: flex;
              width: 90%;
              margin-left: 20px;
              margin-right: 20px;
            "
          >
            <span class="input-group-text inputSpan" style="width: 150px"
              >Post Address</span
            >
            <b-form-input
              class="form-control inputtext"
              style="width: 99%"
              placeholder="post address(optional)"
              v-model="postaddress"
            />
          </div>
        </div>
        <div style="margin: 1rem">
          <b-button style="width: 40%" @click="save">Save</b-button>
        </div>
      </div>

      <div class="loginarea" v-if="ifLink">
        <VAlert :text="alert.text" :type="alert.type" :ifshow="alert.ifshow" />

        <div class="openhomebox">
          <div
            style="
              display: flex;
              width: 90%;
              margin-left: 20px;
              margin-right: 20px;
            "
          >
            <span class="input-group-text inputSpan" style="width: 150px"
              >Email</span
            >
            <b-form-input
              class="form-control inputtext"
              :state="emailState"
              style="width: 99%"
              placeholder="email(required)"
              v-model="openemail"
            />
            <el-button
              type="primary"
              style="float: right"
              @click="searchCustomerWithEmail"
              >search</el-button
            >
          </div>
        </div>

        <div class="openhomebox">
          <div
            style="
              display: flex;
              width: 90%;
              margin-left: 20px;
              margin-right: 20px;
            "
          >
            <span class="input-group-text inputSpan" style="width: 150px"
              >Mobile</span
            >
            <b-form-input
              class="form-control inputtext"
              :state="mobileState"
              style="width: 99%"
              placeholder="mobile(required)"
              v-model="mobile"
            />
            <el-button
              type="primary"
              style="float: right"
              @click="searchCustomerWithPhone"
              >search</el-button
            >
          </div>
        </div>

        <div class="openhomebox">
          <div
            style="
              display: flex;
              width: 90%;
              margin-left: 20px;
              margin-right: 20px;
            "
          >
            <span class="input-group-text inputSpan" style="width: 150px"
              >Post Address</span
            >
            <b-form-input
              class="form-control inputtext"
              style="width: 99%"
              placeholder="post address(optional)"
              v-model="postaddress"
            />
          </div>
        </div>

        <div class="openhomebox">
          <div
            style="
              display: flex;
              width: 90%;
              margin-left: 20px;
              margin-right: 20px;
            "
          >
            <span class="input-group-text inputSpan" style="width: 150px"
              >Full Name</span
            >
            <b-form-input
              class="form-control inputtext"
              :state="!firstNameState"
              aria-describedby="input-live-help input-live-feedback"
              style="width: 33%"
              placeholder="firstname(required)"
              v-model="firstName"
              v-on:input="
                checkState(functions.ifEmpty, 'firstNameState', firstName)
              "
            />
            <b-form-input
              class="form-control inputtext"
              style="width: 33%"
              placeholder="middlename(optional)"
              v-model="middleName"
            />
            <b-form-input
              class="form-control inputtext"
              :state="!lastNameState"
              style="width: 33%"
              placeholder="lastname(required)"
              v-model="lastName"
              v-on:input="
                checkState(functions.ifEmpty, 'lastNameState', lastName)
              "
            />
          </div>
        </div>

        <div style="margin: 1rem">
          <b-button style="width: 40%" @click="saveLink">Save</b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import store from "@/store";
import checkFunctions from "../../functions/checkFunctions";
import customerApi from "@/api/customerApi";
import otherFunctions from "../../functions/otherFunctions";
import viewHistoryApi from "@/api/viewHistoryApi";
import AlertModel from "../../db-models/alertModel";
import VAlert from "@/components/VAlert.vue";
import leadApi from "@/api/leadApi";
import modelCreate from "../../db-models/modelCreate";
import { getStoreUser, User } from "../../db-models/db-userManagement";
import { getUpdatedClient } from "../../db-models/db-customer";
import { getEditCustomer } from "../../db-models/edit-customer";
import propertyLabelapi from "@/api/propertyLabelApi";

@Component({
  components: {
    VAlert,
  },
})
export default class PropertyOpenDay extends Vue {
  private alert = new AlertModel();
  private functions = checkFunctions;

  private propertyId: any;
  private firstName: any = "";
  private middleName: any = "";
  private lastName: any = "";
  private openemail: any = "";
  private mobile: any = "";
  private postaddress: any = "";
  private firstNameState: any = null;
  private lastNameState: any = null;
  private emailState: any = null;
  private mobileState: any = null;
  private namealert: any = false;

  private ifLink: any = false;
  private ifLinkTest: any = "Link Close";
  private searchedCustomer: any = [];
  private ifSearch: any = false;

  created() {
    this.propertyId = this.$route.query.Propertyid
  }

  @Watch("ifLink")
  updateState(new_val: any) {
    if (this.ifLink == true) {
      this.ifLinkTest = "Link Open";
    } else {
      this.ifLinkTest = "Link Close";
    }
    this.mobile = "";
    this.firstName = "";
    this.middleName = "";
    this.lastName = "";
    this.postaddress = "";
    this.openemail = "";
  }

  async searchCustomerWithEmail() {
    const customer = await customerApi.getCustomerByEmail(this.openemail);
    this.mobile = customer.data.phonestring;
    this.firstName = customer.data.name[0];
    this.middleName = customer.data.name[1];
    this.lastName = customer.data.name[2];
    this.postaddress = customer.data.postAddress;
  }

  async searchCustomerWithPhone() {
    const customer = await customerApi.getCustomerByPhone(this.mobile);
    this.openemail = customer.data.email;
    this.firstName = customer.data.name[0];
    this.middleName = customer.data.name[1];
    this.lastName = customer.data.name[2];
    this.postaddress = customer.data.postAddress;
  }

  async save() {
    if (
      this.firstNameState == false &&
      this.lastNameState == false &&
      this.emailState == true &&
      this.mobileState == true
    ) {
      let context = `name:${this.firstName}_${this.lastName},
                     email: ${this.openemail},
                     mobile:${this.mobile}`;
      let today = new Date();
      let time = otherFunctions.getRightTimezone(today);
      let timestring = otherFunctions.getDataTimeId(time);
      let customerId = "";
      //if customer
      let client = await this.ifClientExist(this.mobile, this.openemail);
      if (client != null) {
        customerId = client.customerID;
      } else {
        customerId = "empty";
        this.addLead();
      }

      let newObj = {
        ViewHistory_ID: `C${customerId}T${timestring}`,
        Context: context,
        VH_Time: new Date(
          today.getTime() - today.getTimezoneOffset() * 60000
        ).toISOString(),
        Customer_ID: customerId,
        Property_ID: this.propertyId,
      };
      let result = await viewHistoryApi.addviewHistory(newObj);

      // property labels
      if (customerId != "empty" && customerId !="") {
        let customer = await customerApi.getCustomer(customerId);
        customer = await getUpdatedClient(customer);

        let labelValue = await propertyLabelapi.getLabelByPropertyId(
          this.propertyId
        );
        if (!customer.propertyLabels.includes(labelValue.labelNumber)) {
          customer.propertyLabels += "," + labelValue.labelNumber;
          let editCustomer = getEditCustomer(customer);
          const loginUser: User = getStoreUser();
          editCustomer.update(loginUser.email);
        }
      }

      if (result.status == 201) {
        this.alert.showSuccess("success", this.alert);
        this.success();
      }
    }
  }

  async saveLink() {
      let context = `name:${this.firstName}_${this.lastName},
                     email: ${this.openemail},
                     mobile:${this.mobile}`;
      let today = new Date();
      let time = otherFunctions.getRightTimezone(today);
      let timestring = otherFunctions.getDataTimeId(time);
      let customerId = "";
      //if customer
      let client = await this.ifClientExist(this.mobile, this.openemail);
      if (client != null) {
        customerId = client.customerID;
      } else {
        customerId = "empty";
        this.addLead();
      }

      let newObj = {
        ViewHistory_ID: `C${customerId}T${timestring}`,
        Context: context,
        VH_Time: new Date(
          today.getTime() - today.getTimezoneOffset() * 60000
        ).toISOString(),
        Customer_ID: customerId,
        Property_ID: this.propertyId,
      };
      let result = await viewHistoryApi.addviewHistory(newObj);

      // property labels
      if (customerId != "empty" && customerId !="") {
        let customer = await customerApi.getCustomer(customerId);
        customer = await getUpdatedClient(customer);
        console.log("1label",customer)

        let labelValue = await propertyLabelapi.getLabelByPropertyId(
          this.propertyId
        );
        if (!customer.propertyLabels.includes(labelValue.labelNumber)) {
          customer.propertyLabels += "," + labelValue.labelNumber;
          let editCustomer = getEditCustomer(customer);
          const loginUser: User = getStoreUser();
          editCustomer.update(loginUser.email);
        }
      }

      if (result.status == 201) {
        this.alert.showSuccess("success", this.alert);
        this.success();
      }
  }

  async addLead() {
    let loginuser: User = getStoreUser();
    let date = new Date();
    let utcDate = date.toISOString().replace(/Z/, "+12");
    let onedata = {
      Lead_ID: `${loginuser.email}${this.mobile}${this.openemail}`,
      LeadName: this.firstName + this.lastName,
      Phone: this.mobile,
      Email: this.openemail,
      Note: "",
      Address: this.postaddress,
      Archive: false,
      UploadDate: utcDate,
      Team_ID: loginuser.teamId,
      User_ID: loginuser.email,
    };
    let result = await leadApi.addleads([onedata]);
  }

  success() {
    this.firstName = "";
    this.middleName = "";
    this.lastName = "";
    this.openemail = "";
    this.mobile = "";
    this.postaddress = "";
  }

  checkState(
    checkFucntion: Function,
    state: string,
    value: string | number
  ): void {
    let result = checkFucntion(value);
    if (this.firstNameState == false || this.lastNameState == false) {
      this.namealert = true;
    }
    this[state] = result;
  }

  async ifClientExist(phone: string, email: string) {
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
  }
}
</script>

<style lang="scss" scoped>
.login-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: rgba(171, 178, 185, 0.8);
  width: 1000px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.logoimg {
  text-align: center;
}
.login-button {
  width: 90%;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-top: 3rem;
}
.input-group-prepend {
  display: flex;
  margin-top: 2rem;
  margin-left: 20px;
  margin-right: 20px;
}
.inputLabel {
  margin: 0;
  padding: 1rem;
}
.inputSpan {
  width: 150px;
}
.openHomeBody {
  background-image: url("~@/assets/openhome_background.jpg");
  background-size: cover;
  width: 100%;
  height: 100%;
}
.openhomebox {
  margin: 1rem;
}
</style>
