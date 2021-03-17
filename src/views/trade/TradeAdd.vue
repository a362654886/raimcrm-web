<template>
  <div>
    <div class="tradeBack">
      <div class="tradeInfo">
        <h3
            style="
              color: white;
              height: 60px;
              padding-top: 13px;
              background-color: #0074d9;
            "
          >
            Property Trade
          </h3>
        <VAlert :text="alert.text" :type="alert.type" :ifshow="alert.ifshow" />
        <div style="margin-top:20px">
          <h4 class="clientTitle">Property Choose :</h4>
          <VInput
            :titleWidth="'width:150px;font-weight: normal'"
            :textWidth="'width:500px'"
            :labelstring="'Property'"
            :contextstring="choosedProperty"
            :inputtype="'choosedProperty'"
            :type="'inputselect'"
            :sizes="Properties"
            :ifdisable="ifdisable"
            @fieldChanged="selectChange"
          />
          <h4 class="clientTitle">Seller :</h4>
          <div style="margin-top: 1rem">
            <div class="otherbox">
              <div style="display: flex">
                <h5
                  style="
                    font-weight: bold;
                    text-align: left;
                    width: 33%;
                    text-align: left;
                    font-family: Georgia;
                    font-weight: normal;
                    font-size: medium;
                  "
                >
                  name:{{ owner.first_Name }}{{ owner.last_Name }}
                </h5>
                <h5
                  style="
                    font-weight: bold;
                    text-align: left;
                    width: 33%;
                    text-align: left;
                    font-family: Georgia;
                    font-weight: normal;
                    font-size: medium;
                  "
                >
                  mobile:{{ owner.phone.mobile }}
                </h5>
                <h5
                  style="
                    font-weight: bold;
                    text-align: left;
                    width: 33%;
                    text-align: left;
                    font-family: Georgia;
                    font-weight: normal;
                    font-size: medium;
                  "
                >
                  email:{{ owner.email }}
                </h5>
              </div>
            </div>
          </div>
          <div style="margin-top: 1rem">
            <h4 class="clientTitle">Buyer :</h4>
            <div style="display: flex; margin: 1rem 0 0 0">
              <VInput
                style="width: 50%"
                :titleWidth="'width:150px;font-family: Georgia;font-weight:normal;font-size:medium'"
                :textWidth="'width:200px'"
                :labelstring="'BuyerMobile'"
                :inputtype="'ownerMobile'"
                :type="'input'"
                :contextstring="''"
                :ifdisable="ifdisable"
                @fieldChanged="setCustomeritem"
              />
              <VInput
                style="width: 40%"
                :titleWidth="'width:150px;font-family: Georgia;font-weight:normal;font-size:medium'"
                :textWidth="'width:200px;'"
                :labelstring="'BuyerEmail'"
                :inputtype="'ownerEmail'"
                :type="'input'"
                :contextstring="''"
                :ifdisable="ifdisable"
                @fieldChanged="setCustomeritem"
              />
              <el-button
                type="primary"
                style="padding: 5px; height: 35px"
                @click="getCustomer"
                >LinkOwner</el-button
              >
            </div>
            <div v-if="ifowner">
              <VTable
                :items="[customer]"
                :fields="customerfield"
                :rows="10"
                :perPage="10"
                :pagination="false"
              />
            </div>
            <div v-if="ifaddNewClient" style="margin-top: 1rem">
              <b-alert show>
                This customer isn't exist in system, do you want to add a new
                client?
                <button
                  type="button"
                  class="btn btn-outline-primary"
                  data-toggle="modal"
                  data-target="#customerAdd"
                  @click="addno"
                >
                  add
                </button>
                <button
                  type="button"
                  class="btn btn-outline-primary"
                  @click="addno"
                >
                  No
                </button>
              </b-alert>
            </div>
            <VDialogueAdd
              :idstring="'customerAdd'"
              :titlestring="'Client Add'"
            />
          </div>
          <div style="margin-top: 1rem">
            <h4 class="clientTitle">Trade and Value :</h4>
            <div style="display: flex">
              <VInput
                style="width: 50%"
                :titleWidth="'width:150px;font-weight: normal'"
                :textWidth="'width:200px'"
                :labelstring="'Trade Time'"
                :inputtype="'tradeTime'"
                :type="'time'"
                :contextstring="tradeTime"
                :ifdisable="ifdisable"
                @fieldChanged="selectChange"
              />
              <VInput
                style="width: 50%"
                :titleWidth="'width:150px;font-weight: normal'"
                :textWidth="'width:200px'"
                :labelstring="'Value'"
                :inputtype="'tradeValue'"
                :type="'input'"
                :contextstring="tradevalue"
                :ifdisable="ifdisable"
                @fieldChanged="selectChange"
              />
            </div>
          </div>
          <div v-if="ifdisable" style="margin-top: 1rem">
            <h4 class="clientTitle">Addresses Change :</h4>
            <div style="display: flex; margin-top: 20px">
              <div style="width: 180px; font-weight: normal; text-align: left">
                <p>Buyer Address(old):</p>
              </div>
              <div>
                <p>
                  {{ oldbuyeraddress }}
                </p>
              </div>
            </div>
            <VInput
              style="border-bottom: 1px solid #6b6a6a"
              :titleWidth="'width:150px;font-weight: normal'"
              :textWidth="'width:600px'"
              :labelstring="'Buyer Address(new)'"
              :inputtype="'newBuyerAddress'"
              :type="'input'"
              :contextstring="newbuyeraddress"
              @fieldChanged="selectChange"
            />
            <div style="display: flex; margin-top: 20px">
              <div style="width: 180px; font-weight: normal; text-align: left">
                <p>Seller Address(old):</p>
              </div>
              <div>
                <p>
                  {{ oldselleraddress }}
                </p>
              </div>
            </div>
            <VInput
              style="width: 100%"
              :titleWidth="'width:150px;font-weight: normal'"
              :textWidth="'width:600px'"
              :labelstring="'Seller Address(new)'"
              :inputtype="'newSellerAddress'"
              :type="'input'"
              :contextstring="newselleraddress"
              @fieldChanged="selectChange"
            />
          </div>
          <VLoadding :ifshow="loading.ifshow" />
          <div v-if="!loading.ifshow">
            <b-button
              style="width: 40%; margin-top: 40px; background-color: #dc143c"
              @click="addTrade"
              v-if="ifnodisable"
              >Trade</b-button
            >
            <b-button
              style="width: 40%; margin-top: 40px; background-color: #dc143c"
              @click="changeAddress"
              v-if="ifdisable"
              >Change</b-button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import VAlert from "../../components/VAlert.vue";
import VInput from "../../components/VInput.vue";
import VLabel from "../../components/VLabel.vue";
import AlertModel from "../../../db-models/alertModel";
import propertyApi from "@/api/propertyApi";
import { customerfield, tradefield } from "../../../data/options_data";
import VTable from "@/components/VTable.vue";
import customerApi from "@/api/customerApi";
import tradeApi from "@/api/tradeApi";
import VDialogueAdd from "@/components/VDialogueAdd.vue";
import otherFunctions from "../../../functions/otherFunctions";
import store from "@/store";
import LoadModel from "../../../db-models/loaddingModel";
import VLoadding from "@/components/VLoadding.vue";

@Component({
  components: {
    VAlert,
    VInput,
    VTable,
    VDialogueAdd,
    VLabel,
    VLoadding,
  },
})
export default class TradeAdd extends Vue {
  private choosedProperty = "";
  private Properties: any[] = [];
  private propertyResult: any = {
    data: [
      {
        property_ID: "",
        post_Address: "",
      },
    ],
  };
  private alert = new AlertModel();
  private owner = {
    customer_ID: "",
    first_Name: "",
    last_Name: "",
    email: "",
    phone: {},
  };
  private Buyer: any[] = [];
  private tradevalue = "";
  private tradeTime = new Date();
  private customerSearchPhone = "";
  private customerSearchEmail = "";

  private ifowner = false;
  private ifaddNewClient = false;
  private customer: any = {
    nameString: "",
  };

  private ifdisable = false;
  private ifnodisable = true;

  customerfield = customerfield;

  private oldbuyeraddress = "";
  private newbuyeraddress = "";
  private oldselleraddress = "";
  private newselleraddress = "";
  private loading = new LoadModel();

  async created() {
    let propertyResult = await propertyApi.getPropertyAddresses("...");
    this.Properties = propertyResult.data;
    let tradeProperty: any = store.state.tradeProperty;
    if (tradeProperty != "null") {
      this.choosedProperty = `${tradeProperty.housenumer} ${tradeProperty.streetName},${tradeProperty.suburb},${tradeProperty.city}`;
      if (tradeProperty.customerId != "empty") {
        let customer = await customerApi.getCustomer(tradeProperty.customerId);
        if (!customer.customerphone) {
          this.owner.phone = {
            mobile: "",
          };
        } else {
          this.owner.phone = {
            mobile: customer.customerphone.mobile,
          };
        }
        if (!customer.email) {
          this.owner.email = "";
        } else {
          this.owner.email = customer.email;
        }
        this.owner.first_Name = customer.name[0];
        this.owner.last_Name = customer.name[2];
        this.propertyResult.data[0].property_ID = tradeProperty.propertyId;
        this.owner.customer_ID = customer.customerID;
        this.oldselleraddress = customer.postAddress;
        this.newselleraddress = customer.postAddress;
      } else {
        this.owner.first_Name = "empty";
        this.owner.last_Name = "empty";
        this.propertyResult.data[0].property_ID = tradeProperty.propertyId;
        this.owner.customer_ID = "empty";
        this.oldselleraddress = "empty";
        this.newselleraddress = "empty";
      }
    }
  }

  setSeller(owner: any) {
    if (!owner.phone) {
      this.owner.phone = {
        mobile: "",
      };
    }
    if (!owner.email) {
      this.owner.email = "";
    }
  }

  destroyed() {
    store.commit("saveTradeProperty", "null");
  }

  async selectChange(obj: any) {
    switch (obj.type) {
      case "choosedProperty":
        if (obj.text != "") {
          this.propertyResult = await propertyApi.getPropertyByAddress(
            obj.text
          );
          if (this.propertyResult.data.length > 0) {
            this.owner = this.propertyResult.data[0].customer;
            if (!this.owner.phone) {
              this.owner.phone = {
                mobile: "",
              };
            }
            if (!this.owner.email) {
              this.owner.email = "";
            }
          }
        }
        if (this.propertyResult.data.length > 0) {
          this.oldselleraddress = this.propertyResult.data[0].customer.post_Address;
          this.newselleraddress = this.propertyResult.data[0].customer.post_Address;
        }
        break;
      case "tradeValue":
        this.tradevalue = obj.text;
        this.tradevalue = otherFunctions.moneyFormat(
          otherFunctions.moneyRemoveFormat(this.tradevalue),
          true
        );
        break;
      case "tradeTime":
        this.tradeTime = obj.text;
        break;
      case "newBuyerAddress":
        this.newbuyeraddress = obj.text;
        break;
      case "newSellerAddress":
        this.newselleraddress = obj.text;
        break;
    }
  }

  setCustomeritem(data: any) {
    switch (data.type) {
      case "ownerMobile":
        this.customerSearchPhone = data.text;
        break;
      case "ownerEmail":
        this.customerSearchEmail = data.text;
        break;
    }
  }

  async getCustomer() {
    this.ifowner = false;
    this.ifaddNewClient = false;
    let result;
    if (this.customerSearchEmail != "") {
      result = await customerApi.getCustomerByEmail(this.customerSearchEmail);
      if (result.status == 200) {
        this.customer = result.data;
        this.oldbuyeraddress = this.customer.postAddress;
        this.newbuyeraddress = this.customer.postAddress;
        this.ifowner = true;
        this.alert.disappear();
      } else {
        this.ifaddNewClient = true;
        //this.alert.showfail("please input right email")
      }
    } else if (this.customerSearchPhone != "") {
      result = await customerApi.getCustomerByPhone(this.customerSearchPhone);
      if (result.status == 200) {
        this.customer = result.data;
        this.oldbuyeraddress = this.customer.postAddress;
        this.newbuyeraddress = this.customer.postAddress;
        this.ifowner = true;
        this.alert.disappear();
      } else {
        this.ifaddNewClient = true;
        //this.alert.showfail("please input right phone")
      }
    } else {
      this.alert.showfail("please input right phone or email", this.alert);
    }
  }

  addno() {
    this.ifaddNewClient = false;
  }

  chooseTrade() {
    //
  }
  async addTrade() {
    this.loading.show();
    let righttime = new Date(
      this.tradeTime.getTime() - this.tradeTime.getTimezoneOffset() * 60000
    ).toISOString();
    let newTrade = {
      Trade_ID:
        this.propertyResult.data[0].property_ID +
        otherFunctions.getFormatData(this.tradeTime),
      Property_ID: this.propertyResult.data[0].property_ID,
      Time: righttime,
      Buyer: `${this.customer.nameString}%${this.customer.customerID}`,
      Seller: `${this.owner.first_Name}${this.owner.last_Name}%${this.owner.customer_ID}`,
      Value: this.tradevalue,
    };
    //add trade
    let result = await tradeApi.addTrade(newTrade);
    if (result.status == 200) {
      //update property info
      result = await propertyApi.updatePropertyTrade(
        this.customer.customerID,
        "Lead",
        righttime,
        this.propertyResult.data[0].property_ID
      );
      if (result.status == 201) {
        this.alert.showSuccess("success", this.alert);
        this.ifdisable = true;
        this.ifnodisable = false;
      } else {
        this.alert.showfail("something wrong", this.alert);
      }
    } else {
      this.alert.showfail("something wrong", this.alert);
    }
    this.loading.disappear();
  }

  async changeAddress() {
    let result = await customerApi.updateCustomerPostAddress(
      this.newselleraddress,
      this.owner.customer_ID
    );
    if (result.status == 201) {
      result = await customerApi.updateCustomerPostAddress(
        this.newbuyeraddress,
        this.customer.customerID
      );
      if (result.status == 201) {
        this.$router.push("propertyfilter").catch((err) => {
          err;
        });
      }
    }
  }
}
</script>

<style scoped>
.tradeBack {
  background-color: #f7f7f7;
  width: 90%;
  margin: 2rem 5% 0 5%;
  position: absolute;
}
.tradeInfo {
  margin: 1rem 1rem 2rem 1rem;
}

.clientTitle {
  font-size: large;
  font-weight: bold;
  border-bottom: 1px solid #6b6a6a;
  text-align: left;
  font-family: Didot;
  background-color: rgb(233, 233, 233);
}
</style>
