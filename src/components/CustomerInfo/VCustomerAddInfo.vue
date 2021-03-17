<template>
  <div class="customerinfo">
    <VAlert :text="alert.text" :type="alert.type" :ifshow="alert.ifshow" />

    <div style="display: flex">
      <div class="clientBox">
        <div>
          <h5 class="clientTitle">Basic Info</h5>
          <div style="display: flex">
            <p class="clientText" style="width: 170px">First name:</p>
            <input
              class="form-control"
              v-model="editCustomer.First_Name"
              :readonly="ifdisable"
            />
          </div>
          <div style="display: flex">
            <p class="clientText" style="width: 170px">Middle name:</p>
            <input
              class="form-control"
              v-model="editCustomer.Middle_Name"
              :readonly="ifdisable"
            />
          </div>
          <div style="display: flex">
            <p class="clientText" style="width: 170px">Last name:</p>
            <input
              class="form-control"
              v-model="editCustomer.Last_Name"
              :readonly="ifdisable"
            />
          </div>
          <VInput
            :titleWidth="'width:80px;font-weight: normal'"
            :textWidth="'width:150px'"
            :labelstring="'Brithday'"
            :inputtype="'BrithDay'"
            :type="'time'"
            :contextstring="new Date(this.editCustomer.BrithDay)"
            @fieldChanged="customerChange"
          />
          <VInput
            class="rowlabel"
            :titleWidth="'width:80px;font-weight: normal'"
            :textWidth="'width:220px'"
            :labelstring="'Source'"
            :inputtype="'Source'"
            :type="'input'"
            :contextstring="this.editCustomer.Source"
            :ifdisable="ifdisable"
            @fieldChanged="customerChange"
          />
          <p style="text-align: left">Address :</p>
          <b-form-input
            list="my-list-id"
            v-model="googleAddress"
            placeholder="Address"
            v-on:input="googleAddressUpdate"
          ></b-form-input>
          <datalist id="my-list-id">
            <option v-for="(size, index) in googleaddresses" :key="index">
              {{ size }}
            </option>
          </datalist>
        </div>
        <div style="margin-top: 20px">
          <h5 class="clientTitle">Contact</h5>
          <VInput
            class="rowlabel"
            :titleWidth="'width:80px;font-weight: normal'"
            :textWidth="'width:220px'"
            :labelstring="'Email'"
            :inputtype="'Email'"
            :type="'input'"
            :contextstring="this.editCustomer.Email"
            :ifdisable="ifdisable"
            @fieldChanged="customerChange"
          />
          <div style="display: flex">
            <p class="clientText" style="width: 170px">Phone(home):</p>
            <input
              class="form-control"
              v-model="editCustomer.Customer_Phone.Home"
              :ifdisable="ifdisable"
            />
          </div>
          <div style="display: flex">
            <p class="clientText" style="width: 170px">Phone(mobile):</p>
            <input
              class="form-control"
              v-model="editCustomer.Customer_Phone.Mobile"
              :ifdisable="ifdisable"
            />
          </div>
          <div style="display: flex">
            <p class="clientText" style="width: 170px">Phone(work):</p>
            <input
              class="form-control"
              v-model="editCustomer.Customer_Phone.Work"
              :ifdisable="ifdisable"
            />
          </div>
        </div>
        <div style="margin-top: 20px">
          <h5 class="clientTitle">Lable</h5>
          <Multiselect
            v-model="editCustomer.LabelChoose"
            :options="label_options"
            multiple
          ></Multiselect>
        </div>
      </div>
      <div class="contextBox" v-if="othervalue">
        <el-menu
          :default-active="'note'"
          class="el-menu-demo"
          mode="horizontal"
          background-color="rgb(233, 233, 233)"
          @select="handleSelect"
        >
          <el-menu-item index="note">Note</el-menu-item>
          <el-menu-item index="relationship">Relationship</el-menu-item>
          <el-menu-item index="appointment">Appointment</el-menu-item>
          <el-menu-item index="viewHistory">View History</el-menu-item>
          <div v-if="this.clientAttributes.note" class="buttons">
            <el-button
              type="success"
              icon="el-icon-plus"
              circle
              data-toggle="modal"
              data-target="#noteAdd"
            ></el-button>
          </div>
          <div v-if="this.clientAttributes.relationship" class="buttons">
            <el-button
              type="success"
              icon="el-icon-plus"
              circle
              data-toggle="modal"
              data-target="#familyAdd"
            ></el-button>
          </div>
          <div v-if="this.clientAttributes.appointment" class="buttons">
            <el-button
              type="success"
              icon="el-icon-plus"
              circle
              data-toggle="modal"
              data-target="#appointmentAdd"
            ></el-button>
          </div>
          <div v-if="this.clientAttributes.viewhistory" class="buttons">
            <el-button
              type="success"
              icon="el-icon-plus"
              circle
              data-toggle="modal"
              data-target="#viewHistoryAdd"
            ></el-button>
          </div>
        </el-menu>
        <div class="childBox" v-if="this.clientAttributes.note">
          <div>
            <VDialogue
              :idstring="'noteAdd'"
              :titlestring="'Note Add'"
              :inputtype="'Noteadd'"
              :dialogueGroup="newNote"
              :width="'width:25%'"
              :saveText="'Add'"
              :saveResult="saveResult"
              @dislogueChanged="addNewVaule"
            />
          </div>
          <div class="childBoxTitle">
            <div style="width: 25%">
              <p class="childBoxP">Time:</p>
            </div>
            <div style="width: 50%">
              <p class="childBoxP">Context:</p>
            </div>
            <div style="width: 25%">
              <p class="childBoxP">Next Plan</p>
            </div>
          </div>
          <div class="scrollbox">
            <div v-for="member in this.addCustomer.note" :key="member.index">
              <b-card style="margin-top: 10px">
                <div style="display: flex">
                  <div style="width: 25%">
                    <p>{{ functions.getDateTimeString(member.nTime) }}</p>
                  </div>
                  <div style="width: 68%">
                    <p>{{ member.context }}</p>
                  </div>
                  <div style="width: 25%">
                    <p>{{ member.nextStep }}</p>
                  </div>
                </div>
              </b-card>
            </div>
          </div>
        </div>

        <div class="childBox" v-if="this.clientAttributes.relationship">
          <div>
            <VDialogue
              :idstring="'familyAdd'"
              :titlestring="'Relationship Add'"
              :inputtype="'familyadd'"
              :dialogueGroup="newFamily"
              :width="'width:25%'"
              :saveText="'Add'"
              :saveResult="saveResult"
              @dislogueChanged="addNewVaule"
            />
          </div>
          <div class="childBoxTitle">
            <div style="width: 20%">
              <p class="childBoxPleft">Name:</p>
            </div>
            <div style="width: 20%">
              <p class="childBoxPleft">Relation:</p>
            </div>
            <div style="width: 20%">
              <p class="childBoxPleft">Brithday:</p>
            </div>
            <div style="width: 20%">
              <p class="childBoxPleft">Phone:</p>
            </div>
            <div style="width: 20%">
              <p class="childBoxPleft">Email:</p>
            </div>
          </div>
          <div class="scrollboxless">
            <div v-for="member in this.addCustomer.family" :key="member.index">
              <b-card style="margin-top: 10px">
                <div style="display: flex">
                  <div style="width: 20%">
                    <div v-if="member.ifclient == false">
                      <p class="childBoxPleft">{{ member.name }}</p>
                    </div>
                    <div v-if="member.ifclient">
                      <p
                        class="childBoxPleft"
                        @click="toClient(member.ifclient)"
                      >
                        <a href="#">{{ member.name }}</a>
                      </p>
                    </div>
                  </div>
                  <div style="width: 20%">
                    <p class="childBoxPleft">{{ member.relationship }}</p>
                  </div>
                  <div style="width: 20%">
                    <p class="childBoxPleft">
                      {{ functions.getDateString(member.brithday) }}
                    </p>
                  </div>
                  <div style="width: 20%">
                    <p class="childBoxPleft">{{ member.phone }}</p>
                  </div>
                  <div style="width: 20%">
                    <p class="childBoxPleft">{{ member.email }}</p>
                  </div>
                </div>
              </b-card>
            </div>
          </div>
        </div>

        <div class="childBox" v-if="this.clientAttributes.appointment">
          <div>
            <VDialogue
              :idstring="'appointmentAdd'"
              :titlestring="'Appointment Add'"
              :inputtype="'Appointmentadd'"
              :dialogueGroup="newAppointment"
              :width="'width:25%'"
              :saveText="'Add'"
              :saveResult="saveResult"
              @dislogueChanged="addNewVaule"
            />
          </div>
          <div class="childBoxTitle">
            <div style="width: 25%">
              <p class="childBoxP">Time:</p>
            </div>
            <div style="width: 75%">
              <p class="childBoxP">Task:</p>
            </div>
          </div>
          <div class="scrollboxless">
            <div
              v-for="member in this.addCustomer.appointment"
              :key="member.index"
            >
              <b-card style="margin-top: 10px">
                <div style="display: flex">
                  <div style="width: 25%">
                    <p class="childBoxP">
                      {{ functions.getDateTimeString(member.aTime) }}
                    </p>
                  </div>
                  <div style="width: 75%">
                    <p class="childBoxP">{{ member.task }}</p>
                  </div>
                </div>
              </b-card>
            </div>
          </div>
        </div>

        <div class="childBox" v-if="this.clientAttributes.viewhistory">
          <div>
            <VDialogue
              :idstring="'viewHistoryAdd'"
              :titlestring="'ViewHistory Add'"
              :inputtype="'ClientViewHistoryadd'"
              :dialogueGroup="clientViewHistory"
              :width="'width:25%'"
              :saveText="'Add'"
              :saveResult="saveResult"
              @dislogueChanged="addNewVaule"
            />
          </div>
          <div class="childBoxTitle">
            <div style="width: 20%">
              <p class="childBoxPleft">Time:</p>
            </div>
            <div style="width: 25%">
              <p class="childBoxPleft">Property:</p>
            </div>
            <div style="width: 60%">
              <p class="childBoxPleft">Context:</p>
            </div>
          </div>
          <div class="scrollboxless">
            <div v-for="member in this.viewhistory" :key="member.index">
              <b-card style="margin-top: 10px">
                <div style="display: flex">
                  <div style="width: 20%">
                    <p class="childBoxPleft">
                      {{ functions.getDateString(member.VhTime) }}
                    </p>
                  </div>
                  <div style="width: 25%">
                    <p
                      class="childBoxPleft"
                      @click="toPropertyId(member.propertyId)"
                    >
                      <a a href="#">{{ member.propertyId }}</a>
                    </p>
                  </div>
                  <div style="width: 60%">
                    <p class="childBoxPleft">{{ member.context }}</p>
                  </div>
                </div>
              </b-card>
            </div>
          </div>
        </div>
      </div>
    </div>
    <VLoadding :ifshow="loading.ifshow" />
    <div v-if="!loading.ifshow">
      <div style="width: 100%; text-align: center" v-if="save">
        <button
          type="button"
          class="btn btn-primary"
          style="width: 40%; margin-top: 40px; background-color: #dc143c"
          @click="saveNewClient"
        >
          Save
        </button>
        <button
          type="button"
          class="btn btn-primary"
          style="width: 40%; margin-top: 40px; background-color: #dc143c"
          @click="Cancel"
        >
          Cancel
        </button>
      </div>
      <div style="width: 100%; text-align: center" v-if="addanother">
        <button
          type="button"
          class="btn btn-primary"
          style="width: 40%; margin-top: 40px; background-color: #dc143c"
          @click="Cancel"
        >
          Add Another
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import VLabel from "@/components/VLabel.vue";
import VInput from "@/components/VInput.vue";
import VDialogue from "@/components/VDialogue.vue";
import viewHistoryApi, { getViewHistoryByCustomer } from "@/api/viewHistoryApi";
import customerApi from "@/api/customerApi";
import otherFunctions from "../../../functions/otherFunctions";
import { Models } from "../../../data/newAttribute_model";
import apiFunctions from "../../../functions/apiFunctions";
import store from "@/store";
import VAlert from "@/components/VAlert.vue";
import AlertModel from "../../../db-models/alertModel";
import checkFunctions from "../../../functions/checkFunctions";
import propertyApi from "@/api/propertyApi";
import LoadModel from "../../../db-models/loaddingModel";
import VLoadding from "@/components/VLoadding.vue";
import Multiselect from "vue-multiselect";
import googleMapApi from "@/api/googleMapApi";
import { EditCustomer } from "../../../db-models/edit-customer";
import { Customer } from "../../../db-models/db-customer";
import { allFalse } from "../../../functions/publicFn";
import { getStoreUser, User } from "../../../db-models/db-userManagement";

@Component({
  components: {
    VLabel,
    VInput,
    VDialogue,
    VAlert,
    VLoadding,
    Multiselect,
  },
})
export default class VCustomerAddInfo extends Vue {
  private alert = new AlertModel();

  private functions = otherFunctions;

  private addCustomer: object;

  private editCustomer: EditCustomer = new EditCustomer();
  private googleAddress = "";

  label_options = ["Vender", "Buyer", "Solicitors", "Potential_Vender"];

  private clientAttributes = {
    relationship: false,
    appointment: false,
    note: false,
    property: false,
    viewhistory: false,
  };

  //add
  private newFamily: any = [];
  private newAppointment: any = [];
  private newNote: any = [];
  private clientViewHistory: any = [];

  //viewhistory
  private viewhistory: any = [];

  //disable
  private ifdisable = false;
  private othervalue = false;
  private save = true;
  private addanother = false;

  private saveResult = "true";
  private loading = new LoadModel();

  private googleaddresses: any[] = [];

  async created() {
    //new models
    this.newFamily = Models.getNewFamilyModel();
    this.newAppointment = Models.getNewAppointmentModel();
    this.newNote = Models.getNewNoteModel();
    this.clientViewHistory = Models.getClientViewHistoryModel();
    this.addCustomer = store.state.newCustomer;
    await this.addIdsToViewHistory();
  }

  async addIdsToViewHistory() {
    let iddata = await propertyApi.getPropertyIds("...");
    for (let i = 0; i < iddata.data.length; i++) {
      this.clientViewHistory[0][1][2].push(iddata.data[i]);
    }
  }

  customerChange = (data: any) => this.editCustomer.customerChange(data, "");

  async addNewVaule(obj: any) {
    this.saveResult = "true";
    this.saveResult = "loadding";

    let loginUser: User = getStoreUser();

    const result = await this.editCustomer.addValue(loginUser.email, obj);
    if (result == false) {
      this.saveResult = "fail";
    } else {
      this.addCustomer = result.customer;
      this.viewhistory = result.viewHistory;

      this.newFamily = Models.getNewFamilyModel();
      this.newAppointment = Models.getNewAppointmentModel();
      this.newNote = Models.getNewNoteModel();
      this.clientViewHistory = Models.getClientViewHistoryModel();
      this.saveResult = "success";
    }
  }

  async saveNewClient() {
    this.loading.show();
    const loginUser: User = getStoreUser();
    this.editCustomer.Post_Address = this.googleAddress;

    if (this.editCustomer.check(this)) {
      return;
    }
    
    const apiResult = await this.editCustomer.save(loginUser.email, loginUser.teamId);
    if (apiResult == true) {
      this.loading.disappear();
      this.alert.showSuccess("success", this.alert);
      this.othervalue = true;
      this.clientAttributes.note = true;
    } else {
      this.loading.disappear();
      this.alert.showfail("this client already exist", this.alert);
    }
  }

  async googleAddressUpdate() {
    this.googleaddresses = ["loadding..."];
    let resultArr: any[] = [];
    let result: any = await googleMapApi.getGoogleAddress(this.googleAddress);
    result.predictions.forEach((a: any) => {
      resultArr.push(a.description);
    });
    this.googleaddresses = resultArr;
  }

  handleSelect(event: any) {
    this.clientAttributes = allFalse(this.clientAttributes);
    this.clientAttributes[event] = true;
  }

  Cancel() {
    store.commit("saveNewCustomer", { Customer_Email: "newone" });
    location.reload();
  }
}
</script>

<style scoped>
.rows {
  display: flex;
}

.rowlabel {
  width: 50%;
}

.customerinfo {
  margin: 1rem 1rem 2rem 1rem;
}

.title {
  font-weight: bold;
  text-align: left;
  margin-top: 7px;
  width: 150px;
}

.divisionthreebox {
  display: flex;
  width: 33%;
}

.familybox {
  display: flex;
  width: 20%;
}

.appointmentbox {
  display: flex;
  width: 50%;
}

.propertybox {
  display: flex;
  width: 17%;
  margin-left: 1rem;
}

h6 {
  font-size: large;
  word-wrap: break-word;
  text-align: left;
}

.otherbox {
  margin-bottom: 1.5rem;
}

.elementtitle {
  font-weight: bold;
  margin-bottom: 1rem;
  margin-top: 1rem;
}

a:hover {
  background-color: yellow;
  cursor: pointer;
}

.edit-form-namebox {
  width: 50%;
  display: flex;
}

.edit-namebox {
  width: 25%;
}

.edit-label-namebox {
  width: 15%;
}

.phonetitle {
  text-align: left;
  margin-top: 7px;
}

.phonebox {
  margin-right: 1rem;
  margin-left: 10px;
}

.editbutton {
  margin: 5px 0 6px 20px;
  width: 100px;
  height: 28px;
}

.modal-dialog {
  height: 100%;
}

.clientBox {
  width: 350px;
}

.clientTitle {
  font-size: large;
  font-weight: bold;
  border-bottom: 1px solid #6b6a6a;
  text-align: left;
  background-color: rgb(233, 233, 233);
}

.clientText {
  text-align: left;
  width: 200px;
  margin-top: 5px;
}

.contextBox {
  margin-left: 5%;
  width: 70%;
}

.childBoxTitle {
  margin-top: 10px;
  border-bottom: 1px solid #6b6a6a;
  display: flex;
}

.childBox {
  width: 100%;
}
.el-menu--horizontal > .el-menu-item {
  height: 50px;
  line-height: 50px;
}

.card-body {
  padding: 5px;
}

.childBoxP {
  text-align: center;
  margin-bottom: 10px;
}

.childBoxPleft {
  text-align: left;
  margin-bottom: 10px;
  margin-left: 1px;
}
.buttons {
  display: flex;
  float: right;
  margin: 5px;
}
</style>
