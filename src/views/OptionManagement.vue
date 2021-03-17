<template>
  <div class="backGround">
    <h3
      style="
        color: white;
        height: 60px;
        padding-top: 13px;
        background-color: #0074d9;
        margin-left: 5%;
        margin-right: 5%;
        margin-top: 1rem;
        margin-bottom: 1rem;
      "
    >
      Option Management
    </h3>
    <div
      style="
        padding-top: 13px;
        margin-left: 5%;
        margin-right: 5%;
        margin-top: 1rem;
        margin-bottom: 1rem;
        dispaly: flex;
      "
    >
      <div style="display: flex">
        <VInput
          class="rowlabel"
          :titleWidth="'width:120px;font-weight: normal'"
          :textWidth="'width:200px'"
          :labelstring="'Option Choose'"
          :contextstring="''"
          :inputtype="'options'"
          :type="'select'"
          :selectOption="options_type"
          @fieldChanged="selectChange"
        />
        <el-button
          class="editbutton"
          style="margin-left: 15px"
          type="success"
          data-toggle="modal"
          data-target="#optionValueAdd"
          >Add Option</el-button
        >
        <el-button
          class="editbutton"
          style="margin-left: 15px"
          type="danger"
          data-toggle="modal"
          data-target="#optionValueDelete"
          >Delete Option</el-button
        >
      </div>
      <VOPtionDialogue
        :idstring="'optionValueAdd'"
        :titlestring="'Option Add'"
        :width="'width:25%'"
        :ifAddValue="true"
        :optionType="optionType"
        :optionDeleteArr="readyDeleteArr"
      />
      <VOPtionDialogue
        :idstring="'optionValueDelete'"
        :titlestring="'Option Delete'"
        :width="'width:25%'"
        :ifAddValue="false"
        :optionDeleteArr="readyDeleteArr"
        :optionType="optionType"
      />

      <div class="scrollboxless">
        <div v-for="member in this.option_context" :key="member.index">
          <b-card style="margin-top: 10px">
            <div style="display: flex">
              <div style="width: 90%">
                <p class="childBoxPleft">{{ member }}</p>
              </div>
            </div>
          </b-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import VAlert from "../components/VAlert.vue";
import VLabel from "../components/VLabel.vue";
import AlertModel from "../../db-models/alertModel";
import store from "@/store";
import LoadModel from "../../db-models/loaddingModel";
import VLoadding from "@/components/VLoadding.vue";
import VInput from "@/components/VInput.vue";
import otherFunctions from "../../functions/otherFunctions";
import {
  noteTypeOptions,
  propertyGaragingOptions,
  propertyRoofOptions,
  propertySchoolZoneOptions,
  propertyTypeOptions,
  statusOptions,
  titleOptions,
} from "../../data/options_data";
import VOPtionDialogue from "../components/OPtionDialogue.vue";

@Component({
  components: {
    VAlert,
    VLoadding,
    VInput,
    VOPtionDialogue,
  },
})
export default class OptionManagement extends Vue {
  private options_type: any[] = [
    "PropertyType",
    "Title",
    "Status",
    "Exterior",
    "Roof",
    "Garaging",
    "SchoolZone",
    "NoteType",
  ];
  private option_context: any[] = [""];
  private readyDeleteArr: any[] = [""];
  private optionType = "";

  created() {
    this.options_type = otherFunctions.addValuetoOption(this.options_type);
  }

  async selectChange(obj: any) {
    switch (obj.text) {
      case "PropertyType":
        this.option_context = await propertyTypeOptions();
        break;
      case "Title":
        this.option_context = await titleOptions();
        break;
      case "Status":
        this.option_context = await statusOptions();
        break;
      case "Exterior":
        this.option_context = await propertyTypeOptions();
        break;
      case "Roof":
        this.option_context = await propertyRoofOptions();
        break;
      case "Garaging":
        this.option_context = await propertyGaragingOptions();
        break;
      case "SchoolZone":
        this.option_context = await propertySchoolZoneOptions();
        break;
      case "NoteType":
        this.option_context = await noteTypeOptions();
        break;
    }
    this.optionType = obj.text;
    this.readyDeleteArr = this.option_context;
  }
  addOption() {
    //
  }
  deleteOption() {
    //
  }
}
</script>

<style scoped>
.scrollboxless {
  position: relative;
  overflow-y: auto;
  max-height: 700px;
}

.childBoxPleft {
  text-align: left;
  margin-bottom: 10px;
  margin-left: 1px;
}
.backGround {
  background-color: #f7f7f7;
  width: 90%;
  position: absolute;
}
.rowlabel {
  width: 70%;
}
.card-body {
  padding: 10px;
}
</style>
