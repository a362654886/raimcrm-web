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
          <div style="display: flex">
            <div :style="width">
              <h6>Oprion Value</h6>
            </div>
            <div>
              <div v-if="ifAddValue">
                <textarea
                  aria-label="With textarea"
                  style="width: 90%"
                  v-model="OptionMVaule"
                />
              </div>
              <div v-if="!ifAddValue">
                <b-form-input
                  list="my-list-id"
                  v-model="OptionMVaule"
                ></b-form-input>
                <datalist id="my-list-id">
                  <option v-for="(size, index) in optionDeleteArr" :key="index">
                    {{ size }}
                  </option>
                </datalist>
              </div>
            </div>
          </div>
          <div class="modal-footer" v-if="!loading.ifshow">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
            <button
              v-if="ifAddValue"
              type="button"
              class="btn btn-secondary"
              @click="Save"
            >
              Save
            </button>
            <button
              v-if="!ifAddValue"
              type="button"
              class="btn btn-secondary"
              @click="Delete"
            >
              Delete
            </button>
          </div>
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
import filesApi from "../api/filesApi";
import store from "@/store";
import otherFunctions from "../../functions/otherFunctions";
import VLoadding from "@/components/VLoadding.vue";
import LoadModel from "../../db-models/loaddingModel";
import $ from "jquery";

@Component({
  components: {
    VAlert,
    MailBox,
    VLoadding,
  },
})
export default class OptionDialogue extends Vue {
  @Prop()
  width;
  @Prop()
  idstring;
  @Prop()
  titlestring;
  @Prop()
  optionDeleteArr;
  @Prop()
  ifAddValue;
  @Prop()
  width;
  @Prop()
  optionType;

  OptionMVaule = "";
  alert = new AlertModel();
  loading = new LoadModel();

  async created() {
    this.childwidth = this.width + ";margin-top: 0.5rem";
  }

  async Save() {
    this.optionDeleteArr.push(this.OptionMVaule);
    const arrString = otherFunctions.ArrToArrstring(this.optionDeleteArr)
    const result = await filesApi.uploadFile({
      fileName: this.optionType,
      fileContext: arrString
    })
    if(result.status == 200){
      $(`#${this.idstring}`).modal("hide");
    }
  }

  async Delete(){
    const newArr = []
    for(let i=0;i<this.optionDeleteArr.length;i++){
      if(this.optionDeleteArr[i] != this.OptionMVaule){
        newArr.push(this.optionDeleteArr[i])
      }
    }
    const arrString = otherFunctions.ArrToArrstring(newArr)
    const result = await filesApi.uploadFile({
      fileName: this.optionType,
      fileContext: arrString
    })
    if(result.status == 200){
      $(`#${this.idstring}`).modal("hide");
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
.appraisalBox {
  witdh: 25%;
}

#edit-div {
  border: 1px solid #bbb;
  width: 95%;
  height: 200px;
}
</style>
