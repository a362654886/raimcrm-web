<template>
  <div class="customerinfo">
    <VAlert :text="alert.text" :type="alert.type" :ifshow="alert.ifshow" />
    <VLoadding :ifshow="loading.ifshow" />
    <div style="display: flex">
      <div class="clientBox">
        <div style="height: 250px">
          <div class="clientTitle" style="display: flex">
            <h5 style="width: 80%; margin-top: 10px">Contact</h5>
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              @click="showEdit('contact')"
              v-if="!this.clientInfos.contact"
            ></el-button>
            <el-button
              type="success"
              icon="el-icon-back"
              circle
              @click="showInfo('contact')"
              v-if="this.clientInfos.contact"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-refresh"
              circle
              @click="saveUpdate(editCustomer)"
              v-if="this.clientInfos.contact"
            ></el-button>
          </div>

          <div style="margin-top: 10px" v-if="!this.clientInfos.contact">
            <p class="clientText">{{ `Email:     ${customer.email}` }}</p>
            <p class="clientText">
              {{ `Phone(home): ${ifZero(customer.customerphone.home)}` }}
            </p>
            <p class="clientText">
              {{ `Phone(mobile):   ${ifZero(customer.customerphone.mobile)}` }}
            </p>
            <p class="clientText">
              {{ `Phone(work):  ${ifZero(customer.customerphone.work)}` }}
            </p>
          </div>
          <div style="margin-top: 10px" v-if="this.clientInfos.contact">
            <VInput
              class="rowlabel"
              :titleWidth="'width:80px;font-weight: normal'"
              :textWidth="'width:220px'"
              :labelstring="'Email'"
              :inputtype="'Email'"
              :type="'input'"
              :contextstring="this.editCustomer.Email"
              @fieldChanged="customerChange"
            />
            <div style="display: flex">
              <p class="clientText" style="width: 170px">phone(home):</p>
              <input
                class="form-control"
                v-model="editCustomer.Customer_Phone.Home"
              />
            </div>
            <div style="display: flex">
              <p class="clientText" style="width: 170px">phone(mobile):</p>
              <input
                class="form-control"
                v-model="editCustomer.Customer_Phone.Mobile"
              />
            </div>
            <div style="display: flex">
              <p class="clientText" style="width: 170px">phone(work):</p>
              <input
                class="form-control"
                v-model="editCustomer.Customer_Phone.Work"
              />
            </div>
          </div>
        </div>
        <div style="height: 150px">
          <div class="clientTitle" style="display: flex">
            <h5 style="width: 80%; margin-top: 10px">Lable</h5>
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              @click="showEdit('label')"
              v-if="!this.clientInfos.label"
            ></el-button>
            <el-button
              type="success"
              icon="el-icon-back"
              circle
              @click="showInfo('label')"
              v-if="this.clientInfos.label"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-refresh"
              circle
              @click="saveUpdate(editCustomer)"
              v-if="this.clientInfos.label"
            ></el-button>
          </div>

          <div style="margin-top: 10px" v-if="!this.clientInfos.label">
            <p class="clientText">{{ customer.labelstring }}</p>
          </div>
          <div style="margin-top: 10px" v-if="this.clientInfos.label">
            <Multiselect
              v-model="editCustomer.LabelChoose"
              :options="label_options"
              multiple
            ></Multiselect>
          </div>
        </div>
        <div>
          <div class="clientTitle" style="display: flex">
            <h5 style="width: 80%; margin-top: 10px">Basic Info</h5>
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              @click="showEdit('basic')"
              v-if="!this.clientInfos.basic"
            ></el-button>
            <el-button
              type="success"
              icon="el-icon-back"
              circle
              @click="showInfo('basic')"
              v-if="this.clientInfos.basic"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-refresh"
              circle
              @click="saveUpdate(editCustomer)"
              v-if="this.clientInfos.basic"
            ></el-button>
          </div>

          <div style="margin-top: 10px" v-if="!this.clientInfos.basic">
            <p class="clientText">{{ `Name:     ${customer.nameString}` }}</p>
            <p class="clientText">
              {{ `Brithday: ${functions.getFormatData(customer.brithday)}` }}
            </p>
            <p class="clientText">{{ `Source:   ${customer.source}` }}</p>
            <p class="clientText">{{ `Address:  ${customer.postAddress}` }}</p>
          </div>

          <div style="margin-top: 10px" v-if="this.clientInfos.basic">
            <div style="display: flex">
              <p class="clientText" style="width: 170px">First name:</p>
              <input class="form-control" v-model="editCustomer.First_Name" />
            </div>
            <div style="display: flex">
              <p class="clientText" style="width: 170px">Middle name:</p>
              <input class="form-control" v-model="editCustomer.Middle_Name" />
            </div>
            <div style="display: flex">
              <p class="clientText" style="width: 170px">Last name:</p>
              <input class="form-control" v-model="editCustomer.Last_Name" />
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
              :titleWidth="'width:80px;font-weight: normal'"
              :textWidth="'width:220px'"
              :labelstring="'Source'"
              :inputtype="'Source'"
              :type="'input'"
              :contextstring="this.editCustomer.Source"
              @fieldChanged="customerChange"
            />
            <VInput
              :titleWidth="'width:100%;font-weight: normal'"
              style="display: inline"
              :labelstring="'Address'"
              :inputtype="'Post_Address'"
              :type="'input'"
              :contextstring="this.editCustomer.Post_Address"
              @fieldChanged="customerChange"
            />
          </div>
        </div>

        <div style="height: 150px">
          <div class="clientTitle" style="display: flex">
            <h5 style="width: 80%; margin-top: 10px">Property Lables</h5>
          </div>

          <div v-for="member in this.propertyLabels" :key="member.index">
            <p>{{ member.labelName }},</p>
          </div>
        </div>
      </div>

      <div class="contextBox" v-if="this.loadingOthers">
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
          <el-menu-item index="property">Property</el-menu-item>
          <el-menu-item index="viewhistory">View History</el-menu-item>
          <div v-if="this.clientAttributes.note" class="buttons">
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              data-toggle="modal"
              data-target="#noteModal"
              @click="iniDialogue()"
            ></el-button>
            <el-button
              type="success"
              icon="el-icon-plus"
              circle
              data-toggle="modal"
              data-target="#noteAdd"
              @click="iniDialogue()"
            ></el-button>
          </div>
          <div v-if="this.clientAttributes.relationship" class="buttons">
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              data-toggle="modal"
              data-target="#familyModal"
              @click="iniDialogue()"
            ></el-button>
            <el-button
              type="success"
              icon="el-icon-plus"
              circle
              data-toggle="modal"
              data-target="#familyAdd"
              @click="iniDialogue()"
            ></el-button>
          </div>
          <div v-if="this.clientAttributes.appointment" class="buttons">
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              data-toggle="modal"
              data-target="#appointmentModal"
              @click="iniDialogue()"
            ></el-button>
            <el-button
              type="success"
              icon="el-icon-plus"
              circle
              data-toggle="modal"
              data-target="#appointmentAdd"
              @click="iniDialogue()"
            ></el-button>
          </div>
          <div v-if="this.clientAttributes.viewhistory" class="buttons">
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              data-toggle="modal"
              data-target="#viewHistoryModal"
              @click="iniDialogue()"
            ></el-button>
            <el-button
              type="success"
              icon="el-icon-plus"
              circle
              data-toggle="modal"
              data-target="#viewHistoryAdd"
              @click="iniDialogue()"
            ></el-button>
          </div>
        </el-menu>

        <div class="childBox" v-if="this.clientAttributes.note">
          <div>
            <VDialogue
              :idstring="'noteModal'"
              :titlestring="'Notes Edit'"
              :inputtype="'note'"
              :dialogueGroup="notearr"
              :width="'width:33%'"
              :saveResult="saveResult"
              @dislogueChanged="getDialogueVal"
            />
            <VDialogue
              :idstring="'noteAdd'"
              :titlestring="'Note Add'"
              :inputtype="'Noteadd'"
              :dialogueGroup="newNote"
              :width="'width:50%'"
              :saveText="'Add'"
              :saveResult="saveResult"
              @dislogueChanged="addNewVaule"
              @saveAppointment="addNewAppointment"
            />
          </div>
          <div class="childBoxTitle">
            <div style="width: 25%">
              <p class="childBoxP">Time:</p>
            </div>
            <div style="width: 15%">
              <p class="childBoxP">Type:</p>
            </div>
            <div style="width: 53%">
              <p class="childBoxP">Context:</p>
            </div>
            <div style="width: 7%">
              <p class="childBoxP">Delete</p>
            </div>
          </div>
          <div class="scrollbox">
            <div v-for="member in this.customer.note" :key="member.index">
              <b-card style="margin-top: 10px">
                <div style="display: flex">
                  <div style="width: 25%">
                    <p>{{ functions.getDateTimeString(member.nTime) }}</p>
                  </div>
                  <div style="width: 15%">
                    <p>{{ member.type }}</p>
                  </div>
                  <div style="width: 53%">
                    <p>{{ member.context }}</p>
                  </div>
                  <div style="width: 7%">
                    <el-button
                      type="danger"
                      icon="el-icon-delete"
                      circle
                      @click="deleteItem(member.Id, 'note')"
                    ></el-button>
                  </div>
                </div>
              </b-card>
            </div>
          </div>
        </div>

        <div class="childBox" v-if="this.clientAttributes.relationship">
          <div>
            <VDialogue
              :idstring="'familyModal'"
              :titlestring="'Relationship Edit'"
              :inputtype="'family'"
              :dialogueGroup="familyarr"
              :width="'width:25%'"
              :saveResult="saveResult"
              @dislogueChanged="getDialogueVal"
            />
            <VDialogue
              :idstring="'familyAdd'"
              :titlestring="'Families Add'"
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
            <div style="width: 18%">
              <p class="childBoxPleft">Brithday:</p>
            </div>
            <div style="width: 15%">
              <p class="childBoxPleft">Phone:</p>
            </div>
            <div style="width: 20%">
              <p class="childBoxPleft">Email:</p>
            </div>
            <div style="width: 7%">
              <p class="childBoxP">Delete</p>
            </div>
          </div>
          <div class="scrollboxless">
            <div v-for="member in this.customer.family" :key="member.index">
              <b-card style="margin-top: 10px">
                <div style="display: flex">
                  <div style="width: 20%">
                    <div v-if="member.ifclient == false">
                      <p class="childBoxPleft">{{ member.name }}</p>
                    </div>
                    <div v-if="member.ifclient">
                      <p
                        class="childBoxPleft"
                        @click="toClientPage(member.ifclient)"
                      >
                        <a href="#">{{ member.name }}</a>
                      </p>
                    </div>
                  </div>
                  <div style="width: 20%">
                    <p class="childBoxPleft">{{ member.relationship }}</p>
                  </div>
                  <div style="width: 18%">
                    <p class="childBoxPleft">
                      {{ functions.getDateString(member.brithday) }}
                    </p>
                  </div>
                  <div style="width: 15%">
                    <p class="childBoxPleft">{{ member.phone }}</p>
                  </div>
                  <div style="width: 20%">
                    <p class="childBoxPleft">{{ member.email }}</p>
                  </div>
                  <div style="width: 7%">
                    <el-button
                      type="danger"
                      icon="el-icon-delete"
                      circle
                      @click="deleteItem(member.Id, 'family')"
                    ></el-button>
                  </div>
                </div>
              </b-card>
            </div>
          </div>
        </div>

        <div class="childBox" v-if="this.clientAttributes.appointment">
          <div>
            <VDialogue
              :idstring="'appointmentModal'"
              :titlestring="'Appointments Edit'"
              :inputtype="'appointment'"
              :dialogueGroup="appointmentarr"
              :width="'width:50%'"
              :saveResult="saveResult"
              @dislogueChanged="getDialogueVal"
            />
            <VDialogue
              :idstring="'appointmentAdd'"
              :titlestring="'Appointment Add'"
              :inputtype="'Appointmentadd'"
              :dialogueGroup="newAppointment"
              :width="'width:50%'"
              :saveText="'Add'"
              :saveResult="saveResult"
              @dislogueChanged="addNewVaule"
            />
          </div>
          <div class="childBoxTitle">
            <div style="width: 25%">
              <p class="childBoxP">Time:</p>
            </div>
            <div style="width: 61%">
              <p class="childBoxP">Task:</p>
            </div>
            <div style="width: 7%">
              <p class="childBoxP">Delete</p>
            </div>
            <div style="width: 7%">
              <p class="childBoxP">Finish</p>
            </div>
          </div>
          <div class="scrollboxless">
            <div
              v-for="member in this.customer.appointment"
              :key="member.index"
            >
              <b-card style="margin-top: 10px">
                <div style="display: flex">
                  <div style="width: 25%">
                    <p class="childBoxP">
                      {{ functions.getDateTimeString(member.aTime) }}
                    </p>
                  </div>
                  <div style="width: 68%">
                    <p class="childBoxP">{{ member.task }}</p>
                  </div>
                  <div style="width: 7%">
                    <el-button
                      type="danger"
                      icon="el-icon-delete"
                      circle
                      @click="deleteItem(member.appointmentId, 'appointment')"
                    ></el-button>
                  </div>
                  <div style="width: 7%">
                    <el-button
                      type="success"
                      icon="el-icon-check"
                      circle
                      @click="finishItem(member.appointmentId, 'appointment')"
                    ></el-button>
                  </div>
                </div>
              </b-card>
            </div>
          </div>
        </div>

        <div class="childBox" v-if="this.clientAttributes.property">
          <div class="childBoxTitle">
            <div style="width: 20%">
              <p class="childBoxPleft">Property Id:</p>
            </div>
            <div style="width: 10%">
              <p class="childBoxPleft">Status:</p>
            </div>
            <div style="width: 15%">
              <p class="childBoxPleft">Type:</p>
            </div>
            <div style="width: 25%">
              <p class="childBoxPleft">Title:</p>
            </div>
            <div style="width: 30%">
              <p class="childBoxPleft">Address:</p>
            </div>
          </div>
          <div class="scrollboxless">
            <div v-for="member in this.customer.property" :key="member.index">
              <b-card style="margin-top: 10px">
                <div style="display: flex">
                  <div style="width: 20%">
                    <p
                      class="childBoxPleft"
                      @click="toPropertyPage(member.propertyId)"
                    >
                      <a href="#">{{ member.propertyId }}</a>
                    </p>
                  </div>
                  <div style="width: 10%">
                    <p class="childBoxPleft">{{ member.status }}</p>
                  </div>
                  <div style="width: 15%">
                    <p class="childBoxPleft">{{ member.propertyType }}</p>
                  </div>
                  <div style="width: 25%">
                    <p class="childBoxPleft">{{ member.titlestring }}</p>
                  </div>
                  <div style="width: 30%">
                    <p class="childBoxPleft">{{ member.fullAddress }}</p>
                  </div>
                </div>
              </b-card>
            </div>
          </div>
        </div>

        <div class="childBox" v-if="this.clientAttributes.viewhistory">
          <div>
            <VDialogue
              :idstring="'viewHistoryModal'"
              :titlestring="'View Histories Edit'"
              :inputtype="'viewhistory'"
              :dialogueGroup="viewhistoryarr"
              :width="'width:33%'"
              :saveResult="saveResult"
              @dislogueChanged="getDialogueVal"
            />
            <VDialogue
              :idstring="'viewHistoryAdd'"
              :titlestring="'ViewHistory Add'"
              :inputtype="'ClientViewHistoryadd'"
              :dialogueGroup="clientViewHistory"
              :width="'width:33%'"
              :saveText="'Add'"
              :saveResult="saveResult"
              @dislogueChanged="addNewVaule"
            />
          </div>
          <div class="childBoxTitle">
            <div style="width: 15%">
              <p class="childBoxPleft">Time:</p>
            </div>
            <div style="width: 25%">
              <p class="childBoxPleft">Property:</p>
            </div>
            <div style="width: 58%">
              <p class="childBoxPleft">Context:</p>
            </div>
            <div style="width: 7%">
              <p class="childBoxPleft">Delete:</p>
            </div>
          </div>
          <div class="scrollboxless">
            <div v-for="member in this.viewhistory" :key="member.index">
              <b-card style="margin-top: 10px">
                <div style="display: flex">
                  <div style="width: 15%">
                    <p class="childBoxPleft">
                      {{ functions.getDateString(member.VhTime) }}
                    </p>
                  </div>
                  <div style="width: 25%">
                    <p
                      class="childBoxPleft"
                      @click="toPropertyPage(member.propertyId)"
                    >
                      <a a href="#">{{ member.propertyId }}</a>
                    </p>
                  </div>
                  <div style="width: 58%">
                    <p class="childBoxPleft">{{ member.context }}</p>
                  </div>
                  <div style="width: 7%">
                    <el-button
                      type="danger"
                      icon="el-icon-delete"
                      circle
                      @click="deleteItem(member.VHId, 'viewhistory')"
                    ></el-button>
                  </div>
                </div>
              </b-card>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import {
  Appointment,
  Customer,
  Family,
  getUpdatedClient,
  Note,
} from "../../../db-models/db-customer";
import {
  EditCustomer,
  getEditCustomer,
} from "../../../db-models/edit-customer";
import VLabel from "@/components/VLabel.vue";
import { Property } from "../../../db-models/db-property";
import { getViewHistoryByCustomer } from "@/api/viewHistoryApi";
import otherFunctions from "../../../functions/otherFunctions";
import {
  ifClientExist,
  deleteValue,
  allFalse,
} from "../../../functions/publicFn";
import customerApi from "@/api/customerApi";
import VAlert from "../../components/VAlert.vue";
import AlertModel from "../../../db-models/alertModel";
import apiFunctions from "../../../functions/apiFunctions";
import { toClient, toProperty } from "../../../functions/toPageFunction";
import appointmentApi from "@/api/appointmentApi";
import propertyLabelapi from "@/api/propertyLabelApi";
import VDialogue from "@/components/VDialogue.vue";
import VLoadding from "@/components/VLoadding.vue";
import Multiselect from "vue-multiselect";
import { ViewHistory } from "@/db-models/db-viewhistory";
import DialogueArr from "../../../functions/DialogueArr";
import { Models } from "../../../data/newAttribute_model";
import VInput from "@/components/VInput.vue";
import LoadModel from "../../../db-models/loaddingModel";
import store from "@/store";
import { getStoreUser, User } from "../../../db-models/db-userManagement";
import noteApi from "@/api/noteApi";

@Component({
  components: {
    VLabel,
    VAlert,
    VDialogue,
    VLoadding,
    Multiselect,
    VInput,
  },
})
export default class VCustomerInfo extends Vue {
  @Prop()
  private propCustomer!: Customer;

  private label_options = ["Vender", "Buyer", "Solicitors", "Potential_Vender"];

  private functions = otherFunctions;
  private alert = new AlertModel();
  private loading = new LoadModel();

  private clientAttributes = {
    relationship: false,
    appointment: false,
    note: false,
    property: false,
    viewhistory: false,
  };

  private clientInfos = {
    basic: false,
    contact: false,
    label: false,
  };

  private objValue = {
    Source: "",
    Post_Address: "",
    BrithDay: new Date(),
    Email: "",
  };
  //dialogue
  private familyarr: Family[] = [];
  private appointmentarr: Appointment[] = [];
  private notearr: Note[] = [];
  private viewhistoryarr: ViewHistory[] = [];
  //add
  private newFamily: any[] = Models.getNewFamilyModel();
  private newAppointment: any[] = Models.getNewAppointmentModel();
  private newNote: any[] = Models.getNewNoteModel();
  private clientViewHistory: any[] = Models.getClientViewHistoryModel();

  //viewhistory
  private viewhistory: ViewHistory[];

  private saveResult = "true";
  private customer: Customer = this.propCustomer;
  private editCustomer: EditCustomer = getEditCustomer(this.customer);

  private loadingOthers = false;

  //property Llabels
  private propertyLabels: any[] = [];

  async created() {
    this.loading.show();
    // update client from google
    this.customer = await getUpdatedClient(this.customer);
    this.editCustomer = getEditCustomer(this.customer);
    this.propertyLabels = await propertyLabelapi.getLabelsByLabelNum(
      this.editCustomer.PropertyLabels
    );

    const loginUser: User = getStoreUser();
    await this.editCustomer.initialupdate(loginUser.email);

    this.objValue.Source = this.editCustomer.Source;
    this.objValue.Post_Address = this.editCustomer.Post_Address;
    this.objValue.BrithDay = this.editCustomer.BrithDay;
    this.objValue.Email = this.editCustomer.Email;

    //get view histories
    this.viewhistory = await this.getViewHistory();

    //set client family according if client exist
    if (this.customer.family.length != 0) {
      for (const item of this.customer.family) {
        let client = await ifClientExist(item.phone, item.email);
        client != null ? (item.ifclient = client) : (item.ifclient = false);
      }
    }

    //initial dialogues including note, appointment, family and viewhistory

    this.familyarr = DialogueArr.getFamilyArr(this.customer.family);
    this.appointmentarr = DialogueArr.getAppointMentArr(
      this.customer.appointment
    );
    this.notearr = DialogueArr.getNoteArr(this.customer.note);
    this.viewhistoryarr = DialogueArr.getViewHistoryArrClientPage(
      this.viewhistory
    );
    this.clientAttributes.note = true;
    this.loadingOthers = true;
    this.loading.disappear();
  }

  showInfo = (attribute: string) => (this.clientInfos[attribute] = false);

  showEdit = (attribute: string) => (this.clientInfos[attribute] = true);

  saveUpdate = async (edit_client: any) => {
    edit_client.Source = this.objValue.Source;
    edit_client.Post_Address = this.objValue.Post_Address;
    edit_client.BrithDay = this.objValue.BrithDay;
    edit_client.Email = this.objValue.Email;
    this.loading.show();
    const loginUser: User = getStoreUser();
    if (edit_client.check(this)) {
      return;
    }

    /*if (!this.editCustomer.auth(loginUser.email, this)) {
      return;
    }*/

    await edit_client.update(loginUser.email);
    this.loading.disappear();
    await this.success();
    this.alert.showSuccess("success", this.alert);
  };

  getViewHistory = async () =>
    await getViewHistoryByCustomer(this.customer.customerID);

  customerChange = (data: any) => {
    this.objValue[data.type] = data.text;
  };

  ifZero = (phone: string) => (phone == "0" ? "none" : phone);

  handleSelect(event: any) {
    this.clientAttributes = allFalse(this.clientAttributes);
    this.clientAttributes[event] = true;
  }

  toPropertyPage = async (propertyId: string) =>
    await toProperty(propertyId, this);

  toClientPage = async (Client: Customer) =>
    await toClient(Client.customerID, this);

  async getDialogueVal(obj: any) {
    this.saveResult = "true";
    this.saveResult = "loadding";
    const result: any = await apiFunctions.UpdateArrValue(obj, {
      customerID: this.customer.customerID,
    });
    await this.authResult(result, 204, "success");
  }

  iniDialogue() {
    this.saveResult = "true";
  }

  async success() {
    let index = await otherFunctions.findCustomerIndex(
      this.customer.customerID
    );
    let aCustomer = await customerApi.getCustomer(this.customer.customerID);
    let customers = store.state.searcherCustomers;
    customers[index] = aCustomer;

    this.customer = aCustomer;
    this.viewhistory = await this.getViewHistory();

    store.commit("saveCustomerSearchResult", customers);
    this.$emit("updateParentData", index);

    this.clientInfos = allFalse(this.clientInfos);
    this.saveResult = "success";

    this.newFamily = Models.getNewFamilyModel();
    this.newAppointment = Models.getNewAppointmentModel();
    this.newNote = Models.getNewNoteModel();
    this.clientViewHistory = Models.getClientViewHistoryModel();
  }

  async addNewVaule(obj: any) {
    this.saveResult = "true";
    this.saveResult = "loadding";
    const loginUser: User = getStoreUser();
    const result: any = await apiFunctions.addNewValue(obj, {
      customerID: this.customer.customerID,
      userId: loginUser.email,
    });
    //then get property id and update client
    if (result.clientVH) {
      let labelValue = await propertyLabelapi.getLabelByPropertyId(
        result.propertyId
      );
      if (!this.customer.propertyLabels.includes(labelValue.labelNumber)) {
        this.customer.propertyLabels += "," + labelValue.labelNumber;
        this.editCustomer = getEditCustomer(this.customer);
        const loginUser: User = getStoreUser();
        this.editCustomer.update(loginUser.email);

        this.propertyLabels = await propertyLabelapi.getLabelsByLabelNum(
          this.editCustomer.PropertyLabels
        );
      }
    }

    await this.authResult(result, 201, "success");
  }

  authResult = async (result: any, status: number, resultString: string) => {
    if (result.status == status) {
      this.saveResult = resultString;
      await this.success();
    } else {
      this.saveResult = "fail";
    }
  };

  async addNewAppointment(obj: any) {
    this.saveResult = "true";
    this.saveResult = "loadding";
    const loginUser: User = getStoreUser();

    const defaultTime = new Date(obj.time);
    const time = otherFunctions.getRightTimezone(defaultTime);
    const timestring = otherFunctions.getDataTimeId(time);
    const newObj = {
      Appointment_ID: `C${this.customer.customerID}T${timestring}`,
      Task: obj.task,
      A_Time: new Date(
        time.getTime() - time.getTimezoneOffset() * 60000
      ).toISOString(),
      Customer_ID: this.customer.customerID,
    };

    const result = await appointmentApi.addAppointment(newObj);

    await apiFunctions.addMessageAlert(
      `Alert${this.customer.customerID}T${timestring}`,
      "today's appointment",
      "appointment",
      loginUser.email,
      this.customer.customerID,
      new Date(time.getTime() - time.getTimezoneOffset() * 60000)
    );

    await this.authResult(result, 201, "appointmentSuccess");
    this.saveResult = "success";
  }

  deleteItem = async (obj: any, type: string) =>
    await deleteValue(obj, type, this);

  finishItem = async (obj: any, type: string) => {
    //transfer to note
    const appointment: any = await appointmentApi.getAppointment(obj);
    console.log(appointment.data);

    let defaultTime = new Date();
    let time = otherFunctions.getRightTimezone(defaultTime);
    let newObj = {
      Note_ID: appointment.data.appointment_ID,
      Context: appointment.data.task,
      Type: "appointment",
      N_Time: new Date(
        time.getTime() - time.getTimezoneOffset() * 60000
      ).toISOString(),
      Customer_ID: appointment.data.customer_ID,
    };
    let result = await noteApi.addnote(newObj);
    if (result.status == 201) {
      await appointmentApi.deleteAppointment(obj);
      await this.success();
    }
  };
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
  height: 100%;
}
.title {
  font-weight: bold;
  text-align: left;
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
  margin-bottom: 1rem;
  margin-top: 1rem;
}

a:hover {
  background-color: yellow;
  cursor: pointer;
}

.clientBox {
  width: 370px;
}

.contextBox {
  width: 70%;
}

.clientTitle {
  font-size: large;
  font-weight: bold;
  border-bottom: 1px solid #6b6a6a;
  text-align: left;
  background-color: rgb(233, 233, 233);
}
.childBoxTitle {
  margin-top: 10px;
  border-bottom: 1px solid #6b6a6a;
  display: flex;
}

.img {
  width: 20px;
  margin-right: 0.5rem;
}

.clientText {
  text-align: left;
}

.el-menu-demo {
  height: 40px;
  margin-left: 10%;
  width: 90%;
}

.childBox {
  margin-left: 10%;
  width: 90%;
}
.el-menu--horizontal > .el-menu-item {
  height: 40px;
  line-height: 40px;
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
</style>
