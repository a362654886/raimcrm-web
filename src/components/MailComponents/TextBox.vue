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
          <VLoadding :ifshow="loading.ifshow" />
          <div id="mailto">
            <h6 style="font-weight: bold; width: 5%; text-align: left">To:</h6>
            <p>{{ textto }}</p>
          </div>
          <div id="mailtext">
            <h6 style="font-weight: bold; text-align: left">Context:</h6>
            <textarea v-model="textContext" />
          </div>
        </div>

        <div class="modal-footer" v-if="!loading.ifshow">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            Close
          </button>
          <button type="button" class="btn btn-primary" @click="sendSMS">
            Send
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import VAlert from "@/components/VAlert.vue";
import AlertModel from "../../../db-models/alertModel";
import VLoadding from "@/components/VLoadding.vue";
import LoadModel from "../../../db-models/loaddingModel";
import MailContext from "./MailContext.vue";

@Component({
  components: {
    VAlert,
    MailContext,
    VLoadding,
  },
})
export default class TextBox extends Vue {
  @Prop()
  private idstring!: string;
  @Prop()
  private titlestring!: string;
  @Prop()
  private textto!: string;
  @Prop()
  private ifloading!: string;
  @Prop()
  private textresult!: string;

  private textContext = "";
  private send = false;

  private alert = new AlertModel();
  private loading = new LoadModel();

  @Watch("textresult")
  updateAlert(new_val: string) {
    if (new_val == "true") {
      this.alert.showSuccess("success", this.alert);
      this.textContext = "";
    }
    if (new_val == "false") {
      this.alert.showfail("something wrong", this.alert);
    }
    if (new_val == "prohibate") {
      this.alert.showfail("prohibate", this.alert);
    }
  }

  @Watch("ifloading")
  updateLoading(new_val: string) {
    if (new_val == "true") {
      this.loading.show();
    } else {
      this.loading.disappear();
    }
  }

  sendSMS(obj: any) {
    const sms = {
      to: this.textto,
      context: this.textContext,
    };
    this.$emit("passValue", sms);
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
#mailto {
  display: flex;
}
#mailtitle,
#mailto,
#mailtext,
#attachment {
  margin: 1rem;
}
</style>
