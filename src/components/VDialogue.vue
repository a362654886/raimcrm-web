<template>
  <div class="modal fade" :id="idstring" aria-hidden="true">
    <div class="dialogbox modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ titlestring }}</h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <VAlert
            :text="alert.text"
            :type="alert.type"
            :ifshow="alert.ifshow"
          />
          <div style="display: flex">
            <div
              :style="width"
              v-for="(member, index) in this.dialogueGroup[0]"
              :key="index"
            >
              <div>
                <h6 class="elementtitle">{{ dialogueGroup[0][index][0] }}</h6>
              </div>
            </div>
          </div>

          <div
            style="display: flex"
            v-for="(contexts, index) in this.dialogueGroup[1]"
            :key="index"
          >
            <div
              :style="childwidth"
              v-for="(member, childindex) in contexts"
              :key="childindex"
            >
              <div
                v-if="getType(dialogueGroup[0][childindex][1], defaultValText)"
              >
                <textarea
                  aria-label="With textarea"
                  style="width: 90%"
                  v-model="dialogueGroup[1][index][childindex]"
                />
              </div>
              <div
                v-if="
                  getType(dialogueGroup[0][childindex][1], defaultValNoChange)
                "
              >
                <p>{{ dialogueGroup[1][index][childindex] }}</p>
              </div>
              <div
                v-if="getType(dialogueGroup[0][childindex][1], defaultValInput)"
              >
                <input v-model="dialogueGroup[1][index][childindex]" />
              </div>
              <div
                v-if="getType(dialogueGroup[0][childindex][1], defaultValDay)"
              >
                <el-date-picker
                  class="inputbox"
                  v-model="dialogueGroup[1][index][childindex]"
                  type="date"
                  placeholder="select"
                >
                </el-date-picker>
              </div>
              <div
                v-if="getType(dialogueGroup[0][childindex][1], defaultValTime)"
              >
                <datetime
                  type="datetime"
                  v-model="dialogueGroup[1][index][childindex]"
                ></datetime>
              </div>
              <div
                v-if="
                  getType(
                    dialogueGroup[0][childindex][1],
                    defaultValinputselect
                  )
                "
              >
                <b-form-input
                  list="my-list-id"
                  v-model="dialogueGroup[1][index][childindex]"
                  @input="reSearch(dialogueGroup[1][index][childindex])"
                ></b-form-input>
                <datalist id="my-list-id">
                  <option v-for="(size, index) in historyArr" :key="index">
                    {{ size }}
                  </option>
                </datalist>
              </div>
              <div
                v-if="
                  getType(dialogueGroup[0][childindex][1], defaultValupload)
                "
              >
                <form>
                  <input type="file" v-on:change="getFile($event)" />
                </form>
              </div>
              <div
                v-if="
                  getType(dialogueGroup[0][childindex][1], defaultValButton)
                "
              >
                <form>
                  <b-button
                    @click="openemail"
                    data-toggle="modal"
                    data-target="#mailchildbox"
                    >Send Email</b-button
                  >
                </form>
                <MailBox
                  :idstring="'mailchildbox'"
                  :titlestring="'Mail'"
                  :trmplate="'normal'"
                  :mailto="'leilu0229@outlook.com'"
                  :nameString="'name'"
                  :mailresult="mailResult"
                  @passValue="sendmail"
                />
              </div>
              <div
                v-if="
                  getType(dialogueGroup[0][childindex][1], defaultValSelect)
                "
              >
                <select
                  class="custom-select inputbox"
                  id="inputGroupSelect02"
                  v-model="dialogueGroup[1][index][childindex]"
                >
                  <option
                    v-for="member in selectOption"
                    :key="member.index"
                    :value="member"
                  >
                    {{ member }}
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div v-if="ifEmail"></div>
        </div>
        <VLoadding :ifshow="loading.ifshow" />
        <div class="modal-footer" v-if="!loading.ifshow">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            Close
          </button>
          <button type="button" class="btn btn-primary" @click="Save">
            {{ saveText }}
          </button>
        </div>
      </div>

      <div class="modal-content" v-if="ifShowAppointment">
        <div class="modal-header">
          <h5 class="modal-title">New Appointment</h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div style="display: flex">
            <div style="width: 50%">
              <h6 class="elementtitle">Time</h6>
            </div>
            <div style="width: 50%">
              <h6 class="elementtitle">Task</h6>
            </div>
          </div>
          <div style="display: flex">
            <div style="width: 50%">
              <datetime type="datetime" v-model="appointmetTime"></datetime>
            </div>
            <div style="width: 50%">
              <textarea
                aria-label="With textarea"
                style="width: 90%"
                v-model="appointmentTask"
              />
            </div>
          </div>
        </div>
        <VLoadding :ifshow="loading.ifshow" />
        <div class="modal-footer" v-if="!loading.ifshow">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            Close
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="SaveAppointment"
          >
            {{ saveText }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import VAlert from "@/components/VAlert.vue";
import AlertModel from "../../db-models/alertModel";
import checkFunctions from "../../functions/checkFunctions";
import MailBox from "@/components/MailComponents/MailBox.vue";
import googleApi from "../api/googleAPI";
import store from "@/store";
import otherFunctions from "../../functions/otherFunctions";
import VLoadding from "@/components/VLoadding.vue";
import LoadModel from "../../db-models/loaddingModel";
import $ from "jquery";
import { Datetime } from "vue-datetime";
import "vue-datetime/dist/vue-datetime.css";
import customerApi from "../api/customerApi";
import propertyApi from "../api/propertyApi";
import {
  noteTypeOptions
} from "../../data/options_data";

@Component({
  components: {
    VAlert,
    MailBox,
    VLoadding,
    Datetime,
  },
})
export default class VDialogue extends Vue {
  @Prop()
  idstring;
  @Prop()
  titlestring;
  @Prop()
  dialogueGroup;
  @Prop()
  inputtype;
  @Prop()
  width;
  @Prop({ default: "Change" })
  saveText;

  @Prop()
  saveResult;

  childwidth = "";

  defaultValText = "text";
  defaultValNoChange = "notchange";
  defaultValInput = "input";
  defaultValDay = "day";
  defaultValTime = "daytime";
  defaultValinputselect = "inputselect";
  defaultValupload = "upload";
  defaultValButton = "button";
  defaultValSelect = "select";

  appointmetTime = "2000-01-01";
  appointmentTask = "";

  ifEmail = false;
  alert = new AlertModel();

  file = "";

  mailResult = "ini";
  customer = null;

  ifShowAppointment = false;
  historyArr = [];

  loading = new LoadModel();
  selectOption = ["none"];

  async created() {
    this.historyArr = this.dialogueGroup[0][1][2];
    this.childwidth = this.width + ";margin-top: 0.5rem";
    this.selectOption = await noteTypeOptions()
    
    let index = store.state.showProperty;
    let propertyCustomer = store.state.searcherProperties[index];
    if (
      propertyCustomer?.customerId != "empty" &&
      propertyCustomer?.customerId != undefined &&
      propertyCustomer?.customerId
    ) {
      let para = [{ customerId: propertyCustomer.customerId }];
      this.customer = await otherFunctions.getcustomeremailsByProperty(para);
    }
  }

  async reSearch(value) {
    if (value == "" || value == undefined) {
      value = "...";
    }
    if (this.dialogueGroup[0][1][0] == "Client name or phone") {
      const reault = await customerApi.getCustomerIds(value);
      this.historyArr = reault.data;
    }

    if (this.dialogueGroup[0][1][0] == "Property Address") {
      const reault = await propertyApi.getPropertyIds(value);
      this.historyArr = reault.data;
    }

    if (this.dialogueGroup[0][1][0] == "notType") {
      console.log("Asd");
    }
  }

  @Watch("saveResult")
  updateState(new_val) {
    console.log(new_val);
    switch (new_val) {
      case "true":
        this.loading.disappear();
        this.alert.disappear();
        this.ifShowAppointment = false;
        break;
      case "loadding":
        this.loading.show();
        this.alert.disappear();
        break;
      case "success":
        this.alert.showSuccess("success", this.alert);
        this.loading.disappear();
        if (this.idstring == "noteAdd") {
          this.ifShowAppointment = true;
        } else {
          $(`#${this.idstring}`).modal("hide");
        }
        break;
      case "appointmentSuccess":
        this.alert.showSuccess("success", this.alert);
        this.loading.disappear();
        $(`#${this.idstring}`).modal("hide");
        break;
      case "fail":
        this.alert.showfail("something wrong on server", this.alert);
        this.loading.disappear();
        break;
    }
  }

  async Save() {
    let testResult = await checkFunctions.checkAttributes({
      type: this.inputtype,
      arr: this.dialogueGroup,
    });
    if (testResult == true) {
      this.$emit("uploadFile", this.file);
      this.$emit("dislogueChanged", {
        type: this.inputtype,
        arr: this.dialogueGroup,
      });
    } else {
      this.alert.showfail(testResult, this.alert);
    }
  }

  async SaveAppointment() {
    this.$emit("saveAppointment", {
      time: this.appointmetTime,
      task: this.appointmentTask,
    });
  }

  getType(inputval, defaultval) {
    if (inputval == defaultval) {
      return true;
    }
    return false;
  }

  getFile(event) {
    this.file = event.target.files[0];
  }

  openemail() {
    //this.$bvModal.hide(this.idstring)
    //this.$bvModal.show("mailchildbox");
  }

  async sendmail(obj) {
    this.mailResult = "ini";
    let team = store.state.loginTeam;

    if (this.customer != null) {
      let tonamearr = this.customer.tostring.split(";");
      let toemailarr = this.customer.namestring.split(";");
      let emailbodys = {
        fromname: team.teamName,
        fromemail: team.teamId,
        tonamearr: tonamearr,
        toemailarr: toemailarr,
        subject: obj.subject,
        context: obj.context,
        attachment: obj.attachment,
      };
      this.loading.show();
      let result = await googleApi.sendEmails(emailbodys);
      this.mailResult = result == 200 ? "true" : "false";
      this.loading.disappear();
      //save appraisal
      this.$emit("uploadFile", obj.attachment);
      this.$emit("dislogueChanged", {
        type: this.inputtype,
        arr: this.dialogueGroup,
      });
    } else {
      this.mailResult = "prohibate";
    }
  }
}
</script>

<style scoped>
.dialogbox {
  max-width: 100%;
  min-width: 90%;
  margin-left: 5%;
  position: absolute;
  top: 30%;
  transform: translate(0, -50%);
}
.inputbox {
  width: 80%;
}
</style>
