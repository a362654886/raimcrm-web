<template>
  <div class="modal fade" :id="'appraisalAdd'" aria-hidden="true">
    <div class="dialogbox modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Appraisal Add</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <VAlert
              :text="alert.text"
              :type="alert.type"
              :ifshow="alert.ifshow"
          />
          <VLoadding
              :ifshow="loading.ifshow"
          />
          <div style=display:flex>
            <div :style = "width">
              <h6>Time</h6>
            </div>
            <div :style = "width">
              <h6>Range</h6>
            </div>
            <div :style = "width">
              <h6 class="elementtitle">File</h6>
            </div>
            <div :style = "width">
              <h6 class="elementtitle">Email</h6>
            </div>
          </div>
          <div style=display:flex>
            <div :style = "width" >
              <el-date-picker
                  class="inputbox"
                  v-model="appraisalTime"
                  type="date"
                  placeholder="select">
              </el-date-picker>
            </div>
            <div :style = "width" >
              <input v-model="appraisalRange">
            </div>
            <div :style = "width" >
              <form>
                <input type="file" v-on:change="getFile($event)">
              </form>
            </div>
            <div :style = "width" >
              <button type="button" class="btn btn-secondary" @click="sendmail" v-if = "!ifdisable">Send</button>
              <h6 v-if = "ifdisable">Success</h6>
            </div>
          </div>
          <div>
            <h6>Email contact</h6>
            <textarea
                id = "edit-div"
                v-model = "emailContext"
            />
          </div>
          <div class="modal-footer" v-if="!loading.ifshow">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-secondary" @click="Save">Save</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {Component, Prop, Vue, Watch} from "vue-property-decorator";
import VAlert from "@/components/VAlert.vue";
import AlertModel from "../../db-models/alertModel";
import checkFunctions from "../../functions/checkFunctions";
import MailBox from "@/components/MailComponents/MailBox.vue";
import googleApi from "../api/googleAPI";
import store from "@/store";
import otherFunctions from "../../functions/otherFunctions";
import VLoadding from "@/components/VLoadding.vue";
import LoadModel from "../../db-models/loaddingModel";
import {getStoreTeam} from "../../db-models/db-team";
import $ from 'jquery';

@Component({
  components: {
    VAlert,
    MailBox,
    VLoadding
  },
})
export default class VAppraisalDislogue extends Vue {

  @Prop()
  width;


  appraisalTime = new Date();
  appraisalRange = ""
  file = [];
  emailContext= "Hello $firstName, this is appraisal"

  alert = new AlertModel();
  loading = new LoadModel();
  ifemail = "false";
  ifdisable = false

  customer = null;

  async created(){
    this.childwidth = this.width + ";margin-top: 0.5rem";
    let index =  store.state.showProperty;
    let propertyCustomer = store.state.searcherProperties[index];
    if(propertyCustomer?.customerId != "empty"&&propertyCustomer?.customerId != undefined&&propertyCustomer?.customerId ) {
      let para = [{customerId: propertyCustomer.customerId}]
      this.customer = await otherFunctions.getcustomeremailsByProperty(para);
    }
  }

  getFile(event) {
    this.file = event.target.files[0];
  }

  async Save(){
    let obj = {
      time: this.appraisalTime,
      range: this.appraisalRange,
      file: this.file,
      email: this.ifemail
    }
    let testResult = await checkFunctions.checkAttributes({type:"Appraisaladd",arr:obj});
    if(testResult == true){
      this.$emit("uploadFile", this.file);
      this.$emit("dislogueChanged", {type:"Appraisaladd",arr:obj});

      this.appraisalTime = new Date();
      this.appraisalRange = ""
      this.file = [];
      this.emailContext= "Hello $firstName, this is appraisal"
      this.ifemail = "false";
      this.ifdisable = false

      this.customer = null;

      $(`#appraisalAdd`).modal('hide')
    }else{
      this.alert.showfail(testResult,this.alert)
    }
  }

  async sendmail(){
    const team = getStoreTeam();

    if(this.customer != null){
      let tonamearr = this.customer.tostring.split(";")
      let toemailarr = this.customer.namestring.split(";")
      let context = {
        html:this.emailContext,
        imagesarr: []
      }
      let emailbody = {
        fromname:team.teamName,
        fromemail:team.teamId,
        tonamearr:tonamearr,
        toemailarr:toemailarr,
        subject:"Appraisal",
        context:context,
        attachment:this.file
      }
      this.loading.show();
      let result = await googleApi.sendEmails(emailbody);
      this.mailResult = (result == 200)?"true":"false";
      if(result == 200){
        this.alert.showSuccess("Success",this.alert);
        this.ifdisable = true;
        this.ifemail = "send";
      }
      this.loading.disappear();
    }else{
      this.alert.showfail("this property dont have customer",this.alert)
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
.appraisalBox{
  witdh:25%;
}

#edit-div{
   border: 1px solid #bbb;
   width:95%;
   height: 200px;
 }
</style>