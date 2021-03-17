<template>
  <div>
    <div id="selectMailT">
      <div id="selectMailTP1">
        <div id="selectMailTP1Float">
          <b-button
            v-if="selectAll"
            class="tableButton"
            variant="primary"
            size="sm"
            @click="selectAllRows"
            >Select all</b-button
          >
          <b-button
            class="tableButton"
            variant="primary"
            size="sm"
            @click="selectPageRows"
            >Select This Page</b-button
          >
          <b-button
            class="tableButton"
            variant="primary"
            size="sm"
            @click="clearSelected"
            >Clear selected</b-button
          >

          <b-button
            v-if="download"
            class="tableButton"
            variant="primary"
            size="sm"
            @click="downLoadAddress"
            >Donwload</b-button
          >
        </div>
      </div>
      <div id="selectMailTP3" v-if="ifMail">
        <label style="margin-right: 10px; margin-top: 8px; width: 100px"
          >Mail Template</label
        >
        <div id="selectMailTP3P">
          <select class="custom-select inputbox" v-model="mailtemplate">
            <option
              v-for="(member, index) in this.mailTemplateSelection"
              :key="index"
              :value="member.key"
            >
              {{ member.key }}
            </option>
          </select>
        </div>
        <div style="margin-left: 1rem">
          <b-button
            id="openButton"
            style="background-color: #dc143c; width: 150px"
            data-toggle="modal"
            data-target="#mailbox"
            @click="passValueToParents"
            >Open</b-button
          >
        </div>
      </div>
      <div style="margin-top: 13px;margin-left:30%" v-if="!ifMail">
        <div style="margin-left: 1rem">
          <b-button
            id="openButton"
            style="background-color: #dc143c; width: 150px"
            data-toggle="modal"
            data-target="#textbox"
            @click="passValueToParents"
            >Open</b-button
          >
        </div>
      </div>
    </div>
    <div class="overflow-auto">
      <b-table
        ref="selectableTable"
        selectable
        :select-mode="'multi'"
        :items="items"
        :fields="fields"
        @row-selected="onRowSelected"
        :per-page="localPerPage"
        :current-page="currentPage"
        responsive="sm"
      >
        <template #cell(selected)="{ rowSelected }">
          <template v-if="rowSelected">
            <span aria-hidden="true">&check;</span>
            <span class="sr-only">Selected</span>
          </template>
          <template v-else>
            <span aria-hidden="true">&nbsp;</span>
            <span class="sr-only">Not selected</span>
          </template>
        </template>
      </b-table>
      <div id="selectMailTP2">
        <b-pagination
          style="width: 85%"
          v-model="cPage"
          :total-rows="localRows"
          :per-page="localPerPage"
          aria-controls="my-table"
          align="center"
          v-if="pagination"
          @input="show"
        ></b-pagination>
        <div style="display: flex; width: 15%; margin-right: 10px">
          <p style="margin-top: 20px; margin-right: 20px">Items/page :</p>
          <b-form-select
            v-model="localPerPage"
            :options="[
              { value: '5', text: '5' },
              { value: '10', text: '10' },
              { value: '20', text: '20' },
              { value: '30', text: '30' },
            ]"
            size="sm"
            class="mt-3"
            @input="watchLocalPage"
          ></b-form-select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import CSV from "comma-separated-values";
import store from "@/store";

@Component
export default class VSelectMailTable extends Vue {
  currentPage = 1;

  @Prop({ default: 1 })
  currentPage;

  @Prop({default:false})
  selectAll;

  @Prop() fields;

  @Prop() items;

  @Prop()
  rows;

  @Prop()
  perPage;

  @Prop()
  mailTemplateSelection;

  @Prop() pagination;

  @Prop({ default: false })
  download;

  @Prop({ default: false })
  ifMail;

  selected = [];
  mailtemplate = "";

  cPage = 0;
  localPerPage;
  localFields;
  localRows;

  created() {
    this.localPerPage = this.perPage;
    this.localRows = this.rows;
    this.cPage = this.currentPage
    this.localFields = this.fields;
  }

  show(){
    const items = store.state.selectedItem
    this.selected.forEach(v=>{
      if(!items.includes(v)){
        items.push(v)
      }
    })
    store.commit("saveSelectedItem", items)
    this.$emit("passPage", this.cPage,this.localPerPage);
  }

  onRowSelected(items) {
    this.selected = items;
  }

  selectPageRows() {
    this.$refs.selectableTable.$el.style.backgroundColor = "";
    this.selected = [];
    // eslint-disable-next-line
    this.$refs.selectableTable.$el.style.backgroundColor = "rgba(0,0,0,.075)";
    this.selected = this.items;
  }

  selectAllRows() {
    this.$refs.selectableTable.$el.style.backgroundColor = "rgba(0,0,0,.075)";
    this.selected = ["all"];
  }
  clearSelected() {
    this.$refs.selectableTable.$el.style.backgroundColor = "";
    this.selected = [];
    // eslint-disable-next-line
    this.$refs.selectableTable.clearSelected();
  }
  passValueToParents() {
    const items = store.state.selectedItem
    this.selected.forEach(v=>{
      if(!items.includes(v)){
        items.push(v)
      }
    })
    store.commit("saveSelectedItem", items)
    this.$emit("passValue", store.state.selectedItem, this.mailtemplate);
  }

  generateArray(propertyArr) {
    const propertyResult = [];
    propertyArr.forEach((p) => {
      if (p.legalOwner?.length != 0 && p.legalOwner != null) {
        let newObj = [
          p.legalOwner[0].postalSuburb,
          p.legalOwner[0].mailName,
          p.legalOwner[0].ownerName,
          p.legalOwner[0].dearName,
          p.fullAddress,
        ];
        propertyResult.push(newObj);
      }
    });
    return propertyResult;
  }

  downLoadAddress() {
    const arr = this.generateArray(this.selected);
    const data = new CSV(arr, {
      header: ["PostalSuburb", "MailName", "OwnerName", "DearName", "Address"],
    }).encode();
    this.downloadCsv("physicalAddress.csv", data);
  }

  has(browser) {
    const ua = navigator.userAgent;
    if (browser === "ie") {
      const isIE = ua.indexOf("compatible") > -1 && ua.indexOf("MSIE") > -1;
      if (isIE) {
        const reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(ua);
        return parseFloat(RegExp["$1"]);
      } else {
        return false;
      }
    } else {
      return ua.indexOf(browser) > -1;
    }
  }

  _isEdge() {
    return /Edge/.test(navigator.userAgent);
  }

  _getDownloadUrl(text) {
    const BOM = "\uFEFF";
    // Add BOM to text for open in excel correctly
    if (window.Blob && window.URL && window.URL.createObjectURL) {
      const csvData = new Blob([BOM + text], { type: "text/csv" });
      return URL.createObjectURL(csvData);
    } else {
      return (
        "data:attachment/csv;charset=utf-8," + BOM + encodeURIComponent(text)
      );
    }
  }

  downloadCsv(filename, text) {
    if (this.has("ie") && this.has("ie") < 10) {
      // has module unable identify ie11 and Edge
      const oWin = window.top.open("about:blank", "_blank");
      oWin.document.charset = "utf-8";
      oWin.document.write(text);
      oWin.document.close();
      oWin.document.execCommand("SaveAs", filename);
      oWin.close();
    } else if (this.has("ie") === 10 || this._isEdge()) {
      const BOM = "\uFEFF";
      const csvData = new Blob([BOM + text], { type: "text/csv" });
      navigator.msSaveBlob(csvData, filename);
    } else {
      const link = document.createElement("a");
      link.download = filename;
      link.href = this._getDownloadUrl(text);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  /*@Watch('cPage')
  updateMobile(new_val) {
    console.log(new_val)
    this.$emit("passPage", this.cPage,this.localPerPage);
  }*/

  @Watch("rows")
  updateRows(new_val) {
    this.localRows = new_val;
  }

  @Watch("fields")
  updateFields(new_val) {
    this.localFields = new_val;
  }

  watchLocalPage(){
    this.localPerPage = parseInt(this.localPerPage);
    this.$emit("passPage", this.cPage,this.localPerPage);
  }
}
</script>

<style scoped>
.tableButton {
  margin: 1rem;
}
#selectMailT {
  display: flex;
}
#selectMailTP1 {
  width: 50%;
}
#selectMailTP2 {
  width: 100%;
  display: flex;
}
#selectMailTP3 {
  width: 50%;
  display: flex;
  margin-top: 10px;
}
#selectMailTP1Float {
  float: left;
  margin-left: 1rem;
  display: flex;
}
#selectMailTP3P {
  margin-left: 1rem;
  width: 60%;
}

/* ipad */
@media screen and (max-width: 1200px) {
  #selectMailTP1 {
    width: 30%;
  }
  .tableButton {
    margin-left: 0;
    margin-top: 1rem;
    width: 90%;
  }
  #selectMailTP3 {
    margin-top: 25px;
    width: 70%;
  }
}

/* phone */
@media screen and (max-width: 595px) {
  #selectMailT {
    display: inline;
  }
  #selectMailTP1 {
    width: 100%;
  }
  #selectMailTP2 {
    display: flex;
    width: 100%;
  }
  #selectMailTP1Float {
    float: none;
    margin-left: 1rem;
  }
  #selectMailTP3 {
    width: 100%;
    display: inline;
    margin: 0.5rem;
  }
  #openButton {
    margin-top: 1rem;
  }
  #selectMailTP3P {
    width: 95%;
  }
}
</style>
