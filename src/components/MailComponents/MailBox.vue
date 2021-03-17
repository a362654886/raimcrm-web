<template>
  <div class="modal fade" :id="idstring" aria-hidden="true">
    <div class="dialogbox modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{titlestring}}</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <VAlert
              :text = "alert.text"
              :type = "alert.type"
              :ifshow="alert.ifshow"
          />
          <VLoadding
              :ifshow="loading.ifshow"
          />
          <div id = "mailto">
            <h6 style="font-weight: bold;width:5%;text-align: left">To: </h6>
            <p class = "mailP">{{mailto}}</p>
          </div >
          <div id = "mailtitle">
            <h6 style="font-weight: bold;text-align: left">Subject: </h6>
            <input class="form-control inputbox"
                   placeholder="add a subject"
                   v-model="mailsubject">
          </div>
          <div id = "mailtext">
            <h6 style="font-weight: bold;text-align: left">Context: </h6>
            <MailContext
                :send = send
                @passValue = "sendEmails"
                :template = template
            />
          </div>
          <div id = "attachment">
            <h6 style="font-weight: bold;text-align: left">Attachment: </h6>
            <form>
              <input type="file" v-on:change="getFile($event)" >
            </form>
          </div>
        </div>

        <div class="modal-footer" v-if = "!loading.ifshow">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" @click = "getContext">Send</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from "vue-property-decorator";
import VAlert from "@/components/VAlert.vue";
import AlertModel from "../../../db-models/alertModel";
import VLoadding from "@/components/VLoadding.vue";
import LoadModel from "../../../db-models/loaddingModel";
import MailContext from "./MailContext.vue";

@Component({
  components:{
    VAlert,
    MailContext,
    VLoadding
  }
})
export default class MailBox extends Vue{

  @Prop()
  private idstring!: string;
  @Prop()
  private titlestring!: string;
  @Prop()
  private template!: string;
  @Prop()
  private mailto!: string;
  @Prop()
  private nameString!: string;
  @Prop()
  private mailresult!: string;
  @Prop()
  private ifloading!: string;

  private send = false;

  private alert = new AlertModel();
  mailsubject = "";
  mailcontext = "";
  file: any = [];
  private loading = new LoadModel();

  getFile(event: any) {
    this.file = event.target.files[0];
  }

  @Watch("mailresult")
  updateAlert(new_val: string) {
    if(new_val == "true"){
      this.alert.showSuccess("success",this.alert)
      this.mailsubject = "";
      this.mailcontext = "";
    }
    if(new_val == "false"){
      this.alert.showfail("something wrong",this.alert)
    }
    if(new_val == "prohibate"){
      this.alert.showfail("prohibate",this.alert)
    }
  }

  @Watch("ifloading")
  updateLoading(new_val: string){
    if(new_val == "true"){
      this.loading.show();
    }else{
      this.loading.disappear();
    }
  }

  sendEmails(obj: any){
    this.mailcontext = obj
    if(this.mailresult != "prohibate"){
      let namearr = this.nameString.split(";");
      let mailtoearr = this.mailto.split(";");
      let emails = {
        toarr: mailtoearr,
        subject: this.mailsubject,
        context: this.mailcontext,
        attachment: this.file,
        nameArray:namearr
      }
      this.$emit("passValue", emails);
    }else{
      this.alert.showfail("prohibate",this.alert)
    }
  }

  getContext(){
    this.send = !this.send;
  }

}
</script>

<style scoped>
.dialogbox{
  max-width:100%;
  min-width:90%;
  margin-left:5%;
  position: absolute;
  top: 30%;
  transform: translate(0, -50%);
}
#mailto{
  display: flex;
}
#mailtitle,#mailto,#mailtext,#attachment{
  margin: 1rem;
}

.mailP{
  width:900px;
  text-overflow: ellipsis;
  word-wrap: break-word;
  overflow: hidden;
  max-height: 3.6em;
  line-height: 1.8em;
}

</style>