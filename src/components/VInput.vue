<template>
  <div class="labelbox">
    <div>
      <p class="title" :style="titleWidth">{{ title }}</p>
    </div>
    <div v-if="ifshowtext">
      <textarea
        class="form-control inputbox"
        :style="textWidth"
        aria-label="With inputbox"
        :placeholder="defaultstring"
        v-model="showstring"
        v-on:input="onTextFieldUpdated"
      />
    </div>
    <div v-if="ifshowinput">
      <input
        class="form-control inputbox"
        :placeholder="defaultstring"
        :style="textWidth"
        v-model="showstring"
        :readonly="ifdisable"
        v-on:input="onTextFieldUpdated"
      />
    </div>
    <div v-if="ifshowinputNum">
      <input
        class="form-control inputbox"
        :placeholder="defaultstring"
        :style="textWidth"
        :v-model="functions.moneyFormat(showstring)"
        :readonly="ifdisable"
        v-on:input="onTextFieldUpdated"
      />
    </div>
    <div v-if="ifshowinputMoney">
      <input
        class="form-control inputbox"
        :placeholder="defaultstring"
        :style="textWidth"
        v-model="showstring"
        :readonly="ifdisable"
        v-on:input="onTextFieldUpdated"
      />
    </div>
    <div v-if="ifshowselect">
      <select
        class="custom-select inputbox"
        id="inputGroupSelect02"
        :style="textWidth"
        v-model="showstring"
        v-on:input="onSelectFieldUpdated"
      >
        <option
          v-for="member in this.selectOption"
          :key="member.index"
          :value="member.value"
        >
          {{ member.text }}
        </option>
      </select>
    </div>
    <div v-if="ifshowtime">
      <el-date-picker
        class="inputbox"
        v-model="showstring"
        type="date"
        placeholder="select"
        format="dd/MM/yyyy"
        @change="onTimeFieldUpdated"
      >
      </el-date-picker>
    </div>
    <div v-if="ifshowInputSelect">
      <b-form-input
        list="my-list-id"
        v-model="showstring"
        v-on:input="onTextFieldUpdated"
        @input="reSearch(showstring)"
        :readonly="ifdisable"
      ></b-form-input>
      <datalist :style="textWidth" id="my-list-id">
        <option v-for="(size, index) in propertyArr" :key="index">
          {{ size }}
        </option>
      </datalist>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import otherFunctions from "../../functions/otherFunctions";
import propertyApi from "../api/propertyApi";

@Component
export default class VInput extends Vue {
  @Prop()
  private sizes!: any[];

  @Prop()
  private labelstring!: string;

  @Prop()
  private contextstring!: string;

  @Prop()
  private defaultstring!: string;

  @Prop()
  private inputtype!: string;

  @Prop()
  private type!: string;

  @Prop()
  private selectOption!: [];

  @Prop()
  private titleWidth!: string;

  @Prop()
  private textWidth!: string;

  @Prop()
  private ifdisable!: string;

  private showstring: any = this.contextstring;
  private title = "";
  private textstring = "";
  private ifshowinput = false;
  private ifshowselect = false;
  private ifshowtime = false;
  private ifshowInputSelect = false;
  private ifshowtext = false;
  private ifshowinputMoney = false;
  private ifshowinputNum = false;

  private propertyArr: any[];

  created() {
    this.propertyArr = this.sizes;
    this.title = this.labelstring + ":  ";
    this.gettype(this.type);
  }

  @Watch("contextstring")
  updateMobile(new_val: string) {
    if (this.type == "time") {
      let date = new Date(new_val);
      this.showstring = date;
    } else {
      this.showstring = new_val;
    }
  }

  @Watch("selectOption")
  updateSelections(new_val: []) {
    this.selectOption = new_val;
  }

  onTextFieldUpdated(newVal: any) {
    if (this.inputtype == "Cv") {
      this.showstring = otherFunctions.moneyFormat(
        otherFunctions.moneyRemoveFormat(this.showstring),
        true
      );
    }
    this.textstring += newVal.data;
    this.$emit("fieldChanged", { type: this.inputtype, text: this.showstring });
  }

  async reSearch(value: string) {
    let result: any;
    if(value.trim() != "" &&value.trim() != undefined){
      result = await propertyApi.getPropertyAddresses(value);
    }else{
      result = await propertyApi.getPropertyAddresses("...");
    }
    this.propertyArr = result.data
  }

  onSelectFieldUpdated(newVal: any) {
    this.$emit("fieldChanged", {
      type: this.inputtype,
      text: newVal.target.value,
      index: newVal.target.selectedIndex,
    });
  }

  onTimeFieldUpdated() {
    let outputdate: any = new Date(this.showstring);
    let resultdate = otherFunctions.getRightTimezone(outputdate);

    this.$emit("fieldChanged", { type: this.inputtype, text: resultdate });
  }

  gettype(type: string) {
    switch (type) {
      case "input":
        this.ifshowinput = true;
        this.showstring = this.contextstring;
        break;
      case "select":
        this.ifshowselect = true;
        this.showstring = this.contextstring;
        break;
      case "time":
        this.ifshowtime = true;
        this.showstring = this.contextstring;
        break;
      case "inputselect":
        this.ifshowInputSelect = true;
        this.showstring = this.contextstring;
        break;
      case "text":
        this.ifshowtext = true;
        this.showstring = this.contextstring;
        break;
      case "inputMoney":
        this.ifshowinputMoney = true;
        this.showstring = this.contextstring;
        break;
      case "inputNum":
        this.ifshowinputNum = true;
        this.showstring = this.contextstring;
        break;
    }
  }
}
</script>

<style scoped>
.labelbox {
  display: flex;
  font-size: normal;
}
.title {
  font-weight: bold;
  margin-top: 7px;
  display: flex;
}
.inputbox {
  margin-left: 30px;
  width: 90%;
}
#time {
  font-weight: lighter;
}
</style>
