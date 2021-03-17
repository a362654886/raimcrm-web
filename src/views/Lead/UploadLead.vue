<template>
  <div>
    <div id="customerFilter_background">
      <form id="customerFilter">
        <div class="form-group" style="width: 50%; margin: 1rem">
          <label class="filtertext">Choose File</label>
          <input
            type="file"
            ref="upload"
            accept=".xls,.xlsx"
            class="outputlist_upload form-control"
          />
        </div>
        <div class="form-group" style="width: 50%; margin: 1rem; display: flex">
          <div style="width: 50%; margin-top: 2rem">
            <b-button style="width: 90%" @click="setAttribute"
              >Attribute Choose</b-button
            >
          </div>
          <div style="width: 50%; margin-top: 2rem">
            <b-button
              style="background-color: #dc143c; width: 90%"
              @click="showTable"
              >Show</b-button
            >
          </div>
        </div>
      </form>
    </div>
    <div
      v-if="attributesOption"
      id="attributeChoose"
      style="background-color: #0074d9"
    >
      <div class="PUploadBox">
        <VInput
          style="width: 50%; margin: 0.5rem"
          :textWidth="'width:250px'"
          :titleWidth="'width:150px;color :white;font-weight:normal;font-size:20px'"
          :labelstring="'Client Name'"
          :inputtype="'choosedClientName'"
          :type="'select'"
          :selectOption="hearderValues"
          @fieldChanged="selectChange"
        />
        <VInput
          style="width: 50%; margin: 0.5rem"
          :textWidth="'width:250px'"
          :titleWidth="'width:150px;color :white;font-weight:normal;font-size:20px'"
          :labelstring="'Phone Number'"
          :inputtype="'choosedPhoneNumber'"
          :type="'select'"
          :selectOption="hearderValues"
          @fieldChanged="selectChange"
        />
      </div>
      <div class="PUploadBox">
        <VInput
          style="width: 50%; margin: 0.5rem"
          :textWidth="'width:250px'"
          :titleWidth="'width:150px;color :white;font-weight:normal;font-size:20px'"
          :labelstring="'Email'"
          :inputtype="'choosedEmail'"
          :type="'select'"
          :selectOption="hearderValues"
          @fieldChanged="selectChange"
        />
        <VInput
          style="width: 50%; margin: 0.5rem"
          :textWidth="'width:250px'"
          :titleWidth="'width:150px;color :white;font-weight:normal;font-size:20px'"
          :labelstring="'Address'"
          :inputtype="'choosedAddress'"
          :type="'select'"
          :selectOption="hearderValues"
          @fieldChanged="selectChange"
        />
      </div>
      <div class="PUploadBox">
        <VInput
          style="width: 50%; margin: 0.5rem"
          :textWidth="'width:250px'"
          :titleWidth="'width:150px;color :white;font-weight:normal;font-size:20px'"
          :labelstring="'Note'"
          :inputtype="'choosedNote'"
          :type="'select'"
          :selectOption="hearderValues"
          @fieldChanged="selectChange"
        />
      </div>
    </div>
    <VLoadding :ifshow="loading.ifshow" :precentage="precentage" />
    <div v-if="!loading.ifshow">
      <VSelectTable
        v-if="ifshowTable"
        :items="showTables"
        :fields="outputfield"
        :rows="rows"
        :perPage="20"
        :pagination="true"
        @passValue="SaveData"
      />
    </div>
    <VAlert :text="alert.text" :type="alert.type" :ifshow="alert.ifshow" />
  </div>
</template>

<script>
import { Component, Prop, Vue } from "vue-property-decorator";

/* eslint-disable */
import XLSX from "xlsx";
import VSelectTable from "@/components/VSelectTable.vue";
import leadApi from "../../api/leadApi";
import VInput from "../../components/VInput.vue";
import VAlert from "@/components/VAlert";
import AlertModel from "../../../db-models/alertModel";
import VLoadding from "@/components/VLoadding.vue";
import LoadModel from "../../../db-models/loaddingModel";
import { sliceArray,toPercent } from "../../../functions/publicFn";

@Component({
  components: {
    VSelectTable,
    VAlert,
    VInput,
    VLoadding,
  },
})
export default class UploadLead extends Vue {
  output = [];
  attributes = "";
  outputfield = [];
  rows = 0;
  ifshowTable = false;
  alert = new AlertModel();
  hearder = [];
  hearderValues = [];
  showTables = [];
  attributesOption = false;
  loading = new LoadModel();

  precentage = 0;

  defaultTitles = {
    Lead_ID: "",
    ClientName: "",
    PhoneNumber: "",
    Email: "",
    Address: "",
    Note: "",
    Team_ID: "Team1",
    User_ID: "User1",
    Archive: false,
    UploadDate: new Date(),
  };

  mounted() {
    // eslint-disable-next-line
    this.$refs.upload.addEventListener("change", (e) => {
      //绑定监听表格导入事件
      this.readExcel(e);
    });
    this.rows = this.output.length;
  }

  get_header_row(sheet) {
    const headers = [];
    const range = XLSX.utils.decode_range(sheet["!ref"]);
    let C;
    const R = range.s.r;
    for (C = range.s.c; C <= range.e.c; ++C) {
      var cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })];
      var hdr = "UNKNOWN " + C;
      if (cell && cell.t) hdr = XLSX.utils.format_cell(cell);
      headers.push(hdr);
    }
    return headers;
  }

  readExcel(e) {
    var that = this;
    const files = e.target.files;
    if (files.length <= 0) {
      //如果没有文件名
      return false;
    } else if (!/\.(xls|xlsx)$/.test(files[0].name.toLowerCase())) {
      this.$Message.error("上传格式不正确，请上传xls或者xlsx格式");
      return false;
    }

    const fileReader = new FileReader();
    fileReader.onload = (ev) => {
      try {
        const data = ev.target.result;
        const workbook = XLSX.read(data, {
          type: "binary",
        });
        const wsname = workbook.SheetNames[0]; //取第一张表
        const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]);
        const worksheet = workbook.Sheets[wsname];
        const header = that.get_header_row(worksheet);
        that.output = ws;
        that.header = header;
      } catch (e) {
        return false;
      }
    };
    fileReader.readAsBinaryString(files[0]);
  }

  setAttribute() {
    this.attributesOption = true;
    this.ifshowTable = false;
    this.hearderValues = [];
    for (var i = 0; i < this.header.length; i++) {
      let newAttribute = {
        text: this.header[i],
        value: this.header[i],
        sortable: true,
      };
      this.hearderValues.push(newAttribute);
    }
  }

  selectChange(obj) {
    let newAttribute;
    switch (obj.type) {
      case "choosedClientName":
        this.defaultTitles.ClientName = obj.text;
        newAttribute = {
          key: "ClientName",
          label: "ClientName",
          sortable: true,
        };
        this.outputfield.push(newAttribute);
        break;
      case "choosedPhoneNumber":
        this.defaultTitles.PhoneNumber = obj.text;
        newAttribute = {
          key: "PhoneNumber",
          label: "PhoneNumber",
          sortable: true,
        };
        this.outputfield.push(newAttribute);
        break;
      case "choosedEmail":
        this.defaultTitles.Email = obj.text;
        newAttribute = { key: "Email", label: "Email", sortable: true };
        this.outputfield.push(newAttribute);
        break;
      case "choosedAddress":
        this.defaultTitles.Address = obj.text;
        newAttribute = { key: "Address", label: "Address", sortable: true };
        this.outputfield.push(newAttribute);
        break;
      case "choosedNote":
        this.defaultTitles.Note = obj.text;
        newAttribute = { key: "Note", label: "Note", sortable: true };
        this.outputfield.push(newAttribute);
        break;
    }
  }

  showTable() {
    this.ifshowTable = true;
    this.rows = this.output.length;
    this.showTables = [];
    for (let i = 0; i < this.output.length; i++) {
      let newMember = {
        ClientName: this.output[i][this.defaultTitles.ClientName],
        PhoneNumber: this.output[i][this.defaultTitles.PhoneNumber],
        Email: this.output[i][this.defaultTitles.Email],
        Address: this.output[i][this.defaultTitles.Address],
        Note: this.output[i][this.defaultTitles.Note],
      };
      this.showTables.push(newMember);
    }

    this.attributesOption = false;
  }

  async SaveData(data) {
    this.loading.show();
    const LeadDatas = [];
    if (data != undefined) {
      for (const value of data) {
        let date = new Date();
        let utcDate = date.toISOString().replace(/Z/, "+12");
        let onedata = {
          Lead_ID: `${value.teamId}${value.userId}${value.PhoneNumber}${value.Email}`,
          LeadName: value.ClientName,
          Phone: value.PhoneNumber == undefined ? null : value.PhoneNumber,
          Email: value.Email == undefined ? null : value.Email,
          Note: value.Note == undefined ? null : value.Note,
          Address: value.Address == undefined ? null : value.Address,
          Archive: false,
          UploadDate: utcDate,
          Team_ID: value.teamId,
          User_ID: value.userId,
          ResourceName: "",
        };
        LeadDatas.push(onedata);
      }

      const sliceArr = sliceArray(LeadDatas, 10);
      let result = 200;

      for (let i = 0; i < sliceArr.length; i++) {
        if (result == 200) {
          result = await leadApi.addleads(sliceArr[i]);
          this.precentage = toPercent(i / sliceArr.length);
        }
      }
      if (result == 200) {
        this.alert.showSuccess("success", this.alert);
      } else {
        this.alert.showfail("fail", this.alert);
      }
    } else {
      console.log("wrong");
    }
    this.loading.disappear();
  }
}
</script>

<style scoped></style>
