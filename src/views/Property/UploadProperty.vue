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
          :labelstring="'HouseNumber'"
          :inputtype="'choosedHouseNumber'"
          :type="'select'"
          :selectOption="hearderValues"
          @fieldChanged="selectChange"
        />
        <VInput
          style="width: 50%; margin: 0.5rem"
          :textWidth="'width:250px'"
          :titleWidth="'width:150px;color :white;font-weight:normal;font-size:20px'"
          :labelstring="'StreetName'"
          :inputtype="'choosedStreetName'"
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
          :labelstring="'Suburb'"
          :inputtype="'choosedSuburb'"
          :type="'select'"
          :selectOption="hearderValues"
          @fieldChanged="selectChange"
        />
        <VInput
          style="width: 50%; margin: 0.5rem"
          :textWidth="'width:250px'"
          :titleWidth="'width:150px;color :white;font-weight:normal;font-size:20px'"
          :labelstring="'City'"
          :inputtype="'choosedCity'"
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
          :labelstring="'Property_Type'"
          :inputtype="'choosedProperty_Type'"
          :type="'select'"
          :selectOption="hearderValues"
          @fieldChanged="selectChange"
        />
        <VInput
          style="width: 50%; margin: 0.5rem"
          :textWidth="'width:250px'"
          :titleWidth="'width:150px;color :white;font-weight:normal;font-size:20px'"
          :labelstring="'Title'"
          :inputtype="'choosedTitle'"
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
          :labelstring="'Status'"
          :inputtype="'choosedStatus'"
          :type="'select'"
          :selectOption="hearderValues"
          @fieldChanged="selectChange"
        />
        <VInput
          style="width: 50%; margin: 0.5rem"
          :textWidth="'width:250px'"
          :titleWidth="'width:150px;color :white;font-weight:normal;font-size:20px'"
          :labelstring="'Exterior'"
          :inputtype="'choosedExterior'"
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
          :labelstring="'Roof'"
          :inputtype="'choosedRoof'"
          :type="'select'"
          :selectOption="hearderValues"
          @fieldChanged="selectChange"
        />
        <VInput
          style="width: 50%; margin: 0.5rem"
          :textWidth="'width:250px'"
          :titleWidth="'width:150px;color :white;font-weight:normal;font-size:20px'"
          :labelstring="'Garaging'"
          :inputtype="'choosedGaraging'"
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
          :labelstring="'Land'"
          :inputtype="'choosedLand'"
          :type="'select'"
          :selectOption="hearderValues"
          @fieldChanged="selectChange"
        />
        <VInput
          style="width: 50%; margin: 0.5rem"
          :textWidth="'width:250px'"
          :titleWidth="'width:150px;color :white;font-weight:normal;font-size:20px'"
          :labelstring="'Bedroom'"
          :inputtype="'choosedBedroom'"
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
          :labelstring="'Bathroom'"
          :inputtype="'choosedBathroom'"
          :type="'select'"
          :selectOption="hearderValues"
          @fieldChanged="selectChange"
        />
        <VInput
          style="width: 50%; margin: 0.5rem"
          :textWidth="'width:250px'"
          :titleWidth="'width:150px;color :white;font-weight:normal;font-size:20px'"
          :labelstring="'School_Zone'"
          :inputtype="'choosedSchool_Zone'"
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
          :labelstring="'Add_Value'"
          :inputtype="'choosedAdd_Value'"
          :type="'select'"
          :selectOption="hearderValues"
          @fieldChanged="selectChange"
        />
        <VInput
          style="width: 50%; margin: 0.5rem"
          :textWidth="'width:250px'"
          :titleWidth="'width:150px;color :white;font-weight:normal;font-size:20px'"
          :labelstring="'Subdivision'"
          :inputtype="'choosedSubdivision'"
          :type="'select'"
          :selectOption="hearderValues"
          @fieldChanged="selectChange"
        />
      </div>
      <b-button style="text-align: left" @click="withOwner">WithOwner</b-button>
      <b-button style="text-align: left" @click="withLegalOwner"
        >WithLegalOwner</b-button
      >
      <div v-if="ifOwner">
        <div class="PUploadBox">
          <VInput
            style="width: 50%; margin: 0.5rem"
            :textWidth="'width:250px'"
            :titleWidth="'width:150px;color :white;font-weight:normal;font-size:20px'"
            :labelstring="'Owner Phone'"
            :inputtype="'choosedOwnerPhone'"
            :type="'select'"
            :selectOption="hearderValues"
            @fieldChanged="selectChange"
          />
          <VInput
            style="width: 50%; margin: 0.5rem"
            :textWidth="'width:250px'"
            :titleWidth="'width:150px;color :white;font-weight:normal;font-size:20px'"
            :labelstring="'Owner Email'"
            :inputtype="'choosedOwnerEmail'"
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
            :labelstring="'First Name'"
            :inputtype="'choosedOwnerFirstName'"
            :type="'select'"
            :selectOption="hearderValues"
            @fieldChanged="selectChange"
          />
          <VInput
            style="width: 50%; margin: 0.5rem"
            :textWidth="'width:250px'"
            :titleWidth="'width:150px;color :white;font-weight:normal;font-size:20px'"
            :labelstring="'Last Name'"
            :inputtype="'choosedOwnerLastName'"
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
            :labelstring="'Owner Label'"
            :inputtype="'choosedOwnerLabel'"
            :type="'select'"
            :selectOption="hearderValues"
            @fieldChanged="selectChange"
          />
          <VInput
            style="width: 50%; margin: 0.5rem"
            :textWidth="'width:250px'"
            :titleWidth="'width:150px;color :white;font-weight:normal;font-size:20px'"
            :labelstring="'Owner Address'"
            :inputtype="'choosedOwnerAddress'"
            :type="'select'"
            :selectOption="hearderValues"
            @fieldChanged="selectChange"
          />
        </div>
      </div>

      <div v-if="ifLegalOwner">
        <div class="PUploadBox">
          <VInput
            style="width: 50%; margin: 0.5rem"
            :textWidth="'width:250px'"
            :titleWidth="'width:150px;color :white;font-weight:normal;font-size:20px'"
            :labelstring="'Legal Owner'"
            :inputtype="'choosedLegalOwner'"
            :type="'select'"
            :selectOption="hearderValues"
            @fieldChanged="selectChange"
          />
          <VInput
            style="width: 50%; margin: 0.5rem"
            :textWidth="'width:250px'"
            :titleWidth="'width:150px;color :white;font-weight:normal;font-size:20px'"
            :labelstring="'Mail Name'"
            :inputtype="'choosedMailName'"
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
            :labelstring="'Dear Name'"
            :inputtype="'choosedDearName'"
            :type="'select'"
            :selectOption="hearderValues"
            @fieldChanged="selectChange"
          />
          <VInput
            style="width: 50%; margin: 0.5rem"
            :textWidth="'width:250px'"
            :titleWidth="'width:150px;color :white;font-weight:normal;font-size:20px'"
            :labelstring="'Postal Address'"
            :inputtype="'choosedPostalAddress'"
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
            :labelstring="'Postal Suburb'"
            :inputtype="'choosedPostalSuburb'"
            :type="'select'"
            :selectOption="hearderValues"
            @fieldChanged="selectChange"
          />
        </div>
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
import propertyApi from "../../api/propertyApi";
import legalOwnerApi from "../../api/legalOwner";
import VAlert from "@/components/VAlert";
import AlertModel from "../../../db-models/alertModel";
import VInput from "../../components/VInput.vue";
import customerApi from "../../api/customerApi";
import googlePeopleApi from "../../api/googlePeopleApi";
import propertyLabelApi from "../../api/propertyLabelApi";
import VLoadding from "@/components/VLoadding.vue";
import LoadModel from "../../../db-models/loaddingModel";
import store from "@/store";
import { sliceArray, toPercent } from "../../../functions/publicFn";

@Component({
  components: {
    VSelectTable,
    VAlert,
    VInput,
    VLoadding,
  },
})
export default class UploadProperty extends Vue {
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
  ifOwner = false;
  ifLegalOwner = false;

  precentage = 0;

  defaultTitles = {
    HouseNumber: "",
    StreetName: "",
    Suburb: "",
    City: "",
    Property_Type: "All",
    Title: "All",
    Status: "All",
    Visable: "Owner",
    Exterior: "All",
    Roof: "All",
    Garaging: "All",
    Land: 0,
    Bedroom: 0,
    Bathroom: 0,
    School_Zone: "No",
    CV: "0",
    FormerOwner: "null",
    LastUpdateCV: new Date(),
    LastTrade: new Date(),
    BudgetMin: 0,
    BudgetMax: 0,
    Subdivision: false,
    Add_Value: false,
    Property_ID: "",
    Customer_ID: "",
    OwnerPhone: "",
    OwnerEmail: "",
    OwnerFirstName: "",
    OwnerLastName: "",
    OwnerLabel: "",
    OwnerAddress: "",
    LegalOwner: "",
    MailName: "",
    DearName: "",
    PostalSuburb: "",
    PostalAddress: "",
  };

  mounted() {
    // eslint-disable-next-line
    this.$refs.upload.addEventListener("change", (e) => {
      //绑定监听表格导入事件
      this.readExcel(e);
    });
    this.rows = this.output.length;
  }

  withOwner() {
    this.ifOwner = !this.ifOwner;
  }

  withLegalOwner() {
    this.ifLegalOwner = !this.ifLegalOwner;
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
    this.ifshowTable = false;
    this.hearderValues = [];
    this.outputfield = [
      { key: "HouseNumber", label: "HouseNumber", sortable: true },
    ];
    if (this.header) {
      this.attributesOption = true;
      for (var i = 0; i < this.header.length; i++) {
        let newAttribute = {
          text: this.header[i],
          value: this.header[i],
          sortable: true,
        };
        this.hearderValues.push(newAttribute);
      }
    }
  }

  selectChange(obj) {
    let newAttribute;
    switch (obj.type) {
      case "choosedHouseNumber":
        this.defaultTitles.HouseNumber = obj.text;
        newAttribute = {
          key: "HouseNumber",
          label: "HouseNumber",
          sortable: true,
        };
        this.outputfield.push(newAttribute);
        break;
      case "choosedStreetName":
        this.defaultTitles.StreetName = obj.text;
        newAttribute = {
          key: "StreetName",
          label: "StreetName",
          sortable: true,
        };
        this.outputfield.push(newAttribute);
        break;
      case "choosedSuburb":
        this.defaultTitles.Suburb = obj.text;
        newAttribute = { key: "Suburb", label: "Suburb", sortable: true };
        this.outputfield.push(newAttribute);
        break;
      case "choosedCity":
        this.defaultTitles.City = obj.text;
        newAttribute = { key: "City", label: "City", sortable: true };
        this.outputfield.push(newAttribute);
        break;
      case "choosedProperty_Type":
        this.defaultTitles.Property_Type = obj.text;
        newAttribute = {
          key: "Property_Type",
          label: "Property_Type",
          sortable: true,
        };
        this.outputfield.push(newAttribute);
        break;
      case "choosedTitle":
        this.defaultTitles.Title = obj.text;
        newAttribute = { key: "Title", label: "Title", sortable: true };
        this.outputfield.push(newAttribute);
        break;
      case "choosedStatus":
        this.defaultTitles.Status = obj.text;
        newAttribute = { key: "Status", label: "Status", sortable: true };
        this.outputfield.push(newAttribute);
        break;
      case "choosedExterior":
        this.defaultTitles.Exterior = obj.text;
        newAttribute = { key: "Exterior", label: "Exterior", sortable: true };
        this.outputfield.push(newAttribute);
        break;
      case "choosedRoof":
        this.defaultTitles.Roof = obj.text;
        newAttribute = { key: "Roof", label: "Roof", sortable: true };
        this.outputfield.push(newAttribute);
        break;
      case "choosedGaraging":
        this.defaultTitles.Garaging = obj.text;
        newAttribute = { key: "Garaging", label: "Garaging", sortable: true };
        this.outputfield.push(newAttribute);
        break;
      case "choosedLand":
        this.defaultTitles.Land = obj.text;
        newAttribute = { key: "Land", label: "Land", sortable: true };
        this.outputfield.push(newAttribute);
        break;
      case "choosedBedroom":
        this.defaultTitles.Bedroom = obj.text;
        newAttribute = { key: "Bedroom", label: "Bedroom", sortable: true };
        this.outputfield.push(newAttribute);
        break;
      case "choosedBathroom":
        this.defaultTitles.Bathroom = obj.text;
        newAttribute = { key: "Bathroom", label: "Bathroom", sortable: true };
        this.outputfield.push(newAttribute);
        break;
      case "choosedSchool_Zone":
        this.defaultTitles.School_Zone = obj.text;
        newAttribute = {
          key: "School_Zone",
          label: "School_Zone",
          sortable: true,
        };
        this.outputfield.push(newAttribute);
        break;
      case "choosedBathroom":
        this.defaultTitles.Bathroom = obj.text;
        newAttribute = { key: "Bathroom", label: "Bathroom", sortable: true };
        this.outputfield.push(newAttribute);
        break;
      case "choosedAdd_Value":
        this.defaultTitles.Add_Value = obj.text;
        newAttribute = { key: "Add_Value", label: "Add_Value", sortable: true };
        this.outputfield.push(newAttribute);
        break;
      case "choosedSubdivision":
        this.defaultTitles.Subdivision = obj.text;
        newAttribute = {
          key: "Subdivision",
          label: "Subdivision",
          sortable: true,
        };
        this.outputfield.push(newAttribute);
        break;
      case "choosedOwnerPhone":
        this.defaultTitles.OwnerPhone = obj.text;
        newAttribute = {
          key: "OwnerPhone",
          label: "OwnerPhone",
          sortable: true,
        };
        this.outputfield.push(newAttribute);
        break;
      case "choosedOwnerEmail":
        this.defaultTitles.OwnerEmail = obj.text;
        newAttribute = {
          key: "OwnerEmail",
          label: "OwnerEmail",
          sortable: true,
        };
        this.outputfield.push(newAttribute);
        break;
      case "choosedOwnerFirstName":
        this.defaultTitles.OwnerFirstName = obj.text;
        newAttribute = {
          key: "OwnerFirstName",
          label: "OwnerFirstName",
          sortable: true,
        };
        this.outputfield.push(newAttribute);
        break;
      case "choosedOwnerLastName":
        this.defaultTitles.OwnerLastName = obj.text;
        newAttribute = {
          key: "OwnerLastName",
          label: "OwnerLastName",
          sortable: true,
        };
        this.outputfield.push(newAttribute);
        break;
      case "choosedOwnerLabel":
        this.defaultTitles.OwnerLabel = obj.text;
        newAttribute = {
          key: "OwnerLabel",
          label: "OwnerLabel",
          sortable: true,
        };
        this.outputfield.push(newAttribute);
        break;
      case "choosedOwnerAddress":
        this.defaultTitles.OwnerAddress = obj.text;
        newAttribute = {
          key: "OwnerAddress",
          label: "OwnerAddress",
          sortable: true,
        };
        this.outputfield.push(newAttribute);
        break;
      case "choosedLegalOwner":
        this.defaultTitles.LegalOwner = obj.text;
        newAttribute = {
          key: "LegalOwner",
          label: "LegalOwner",
          sortable: true,
        };
        this.outputfield.push(newAttribute);
        break;
      case "choosedMailName":
        this.defaultTitles.MailName = obj.text;
        newAttribute = { key: "MailName", label: "MailName", sortable: true };
        this.outputfield.push(newAttribute);
        break;
      case "choosedDearName":
        this.defaultTitles.DearName = obj.text;
        newAttribute = { key: "DearName", label: "DearName", sortable: true };
        this.outputfield.push(newAttribute);
        break;
      case "choosedPostalSuburb":
        this.defaultTitles.PostalSuburb = obj.text;
        newAttribute = {
          key: "PostalSuburb",
          label: "PostalSuburb",
          sortable: true,
        };
        this.outputfield.push(newAttribute);
        break;
      case "choosedPostalAddress":
        this.defaultTitles.PostalAddress = obj.text;
        newAttribute = {
          key: "PostalAddress",
          label: "PostalAddress",
          sortable: true,
        };
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
        HouseNumber: this.output[i][this.defaultTitles.HouseNumber],
        StreetName: this.output[i][this.defaultTitles.StreetName],
        Suburb: this.output[i][this.defaultTitles.Suburb],
        City: this.output[i][this.defaultTitles.City],
        Property_Type: this.output[i][this.defaultTitles.Property_Type],
        Title: this.output[i][this.defaultTitles.Title],
        Status: this.output[i][this.defaultTitles.Status],
        Visable: "Owner",
        Exterior: this.output[i][this.defaultTitles.Exterior],
        Roof: this.output[i][this.defaultTitles.Roof],
        Garaging: this.output[i][this.defaultTitles.Garaging],
        Land: this.output[i][this.defaultTitles.Land],
        Bedroom: this.output[i][this.defaultTitles.Bedroom],
        Bathroom: this.output[i][this.defaultTitles.Bathroom],
        School_Zone: this.output[i][this.defaultTitles.School_Zone],
        CV: 0,
        FormerOwner: "null",
        LastUpdateCV: new Date(),
        LastTrade: new Date(),
        BudgetMin: 0,
        BudgetMax: 0,
        Subdivision: this.output[i][this.defaultTitles.Subdivision],
        Add_Value: this.output[i][this.defaultTitles.Add_Value],
        OwnerPhone: this.output[i][this.defaultTitles.OwnerPhone],
        OwnerEmail: this.output[i][this.defaultTitles.OwnerEmail],
        OwnerFirstName: this.output[i][this.defaultTitles.OwnerFirstName],
        OwnerLastName: this.output[i][this.defaultTitles.OwnerLastName],
        OwnerLabel: this.output[i][this.defaultTitles.OwnerLabel],
        OwnerAddress: this.output[i][this.defaultTitles.OwnerAddress],
        LegalOwner: this.output[i][this.defaultTitles.LegalOwner],
        MailName: this.output[i][this.defaultTitles.MailName],
        DearName: this.output[i][this.defaultTitles.DearName],
        PostalSuburb: this.output[i][this.defaultTitles.PostalSuburb],
        PostalAddress: this.output[i][this.defaultTitles.PostalAddress],
      };
      this.showTables.push(newMember);
    }

    this.attributesOption = false;
  }

  async getClientId(value) {
    if (value.OwnerPhone != undefined || value.OwnerEmail != undefined) {
      let para = value.OwnerPhone + "," + value.OwnerEmail;
      let result = await customerApi.getCustomerId(para);
      return result;
    } else {
      return "empty";
    }
  }

  async addCustomer(value) {
    let customerId = `${value.OwnerFirstName}${value.OwnerLastName}${value.OwnerEmail}${value.OwnerPhone}`;
    let addCustomer = {
      Customer_ID: customerId,
      First_Name: value.OwnerFirstName,
      Middle_Name: "",
      Last_Name: value.OwnerLastName,
      Email: value.OwnerEmail,
      BrithDay: new Date(),
      Source: "",
      Post_Address: value.OwnerAddress,
      Customer_Phone: {
        Phone_ID: `${customerId}Phoneobj`,
        Mobile: value.OwnerPhone,
        Home: "",
        Work: "",
        Customer_ID: customerId,
      },
      Team_ID: store.state.loginUser["teamId"],
      User_ID: store.state.loginUser["email"],
      Customer_Label: this.getLabel(value.OwnerLabel, customerId),
    };
    let returncustomer = await customerApi.addCustomer(addCustomer, false);
    return returncustomer.value.customerID;
  }

  getLabel(value, customerId) {
    let label = {
      Label_ID: customerId,
      Vender: "",
      Buyer: "",
      Solicitors: "",
      Potential_Vender: "",
      Customer_ID: customerId,
    };
    let labelArr = value.split(",");
    if (this.ifarraycontain(labelArr, "Vender")) {
      label.Vender = "Vender";
    }
    if (this.ifarraycontain(labelArr, "Buyer")) {
      label.Buyer = "Buyer";
    }
    if (this.ifarraycontain(labelArr, "Solicitors")) {
      label.Solicitors = "Solicitors";
    }
    if (this.ifarraycontain(labelArr, "Potential Vender")) {
      label.Potential_Vender = "Potential_Vender";
    }

    return label;
  }

  ifarraycontain(arr, item) {
    let result = false;
    arr.forEach((value) => {
      if (value == item) {
        result = true;
      }
    });
    return result;
  }

  async SaveData(data) {
    this.loading.show();
    this.ifshowTable = false;
    const PropertiesData = [];
    const LegalOwners = [];
    const propertyDtos = [];
    let that = this;
    let checkValue = true;
    if (data != undefined) {
      let num = 0;
      for (const value of data) {
        if (value.HouseNumber == undefined || value.StreetName == undefined) {
          checkValue = false;
        }
        let customerId = await this.getClientId(value);
        that.precentage = "check client " + toPercent(num / data.length);
        num++;
        if (this.ifOwner == true && customerId == "empty") {
          customerId = await this.addCustomer(value);
        }
        let date = new Date();
        let utcDate = date.toISOString().replace(/Z/, "+12");
        let propertyId = `${value.HouseNumber}${value.StreetName}`;
        propertyId = propertyId.replace("/", "_");
        let onedata = {
          Property_ID: propertyId,
          HouseNumber: value.HouseNumber,
          StreetName: value.StreetName,
          Status: value.Status == undefined ? "All" : value.Status,
          Suburb: value.Suburb == undefined ? "empty" : value.Suburb,
          City: value.City == undefined ? "empty" : value.City,
          Visable: "owner",
          Title: value.Title == undefined ? "All" : value.Title,
          Property_Type:
            value.Property_Type == undefined ? "All" : value.Property_Type,
          Exterior: value.Exterior == undefined ? "All" : value.Exterior,
          Roof: value.Roof == undefined ? "All" : value.Roof,
          Garaging: value.Garaging == undefined ? "All" : value.Garaging,
          Land: value.Land == undefined ? 0 : value.Land,
          Bedroom: value.Bedroom == undefined ? 0 : value.Bedroom,
          Bathroom: value.Bathroom == undefined ? 0 : value.Bathroom,
          School_Zone:
            value.School_Zone == undefined ? "All" : value.School_Zone,
          CV: value.CV == undefined ? 0 : value.CV,
          FormerOwner: "null",
          BudgetMin: 0,
          BudgetMax: 0,
          Subdivision:
            value.Subdivision == undefined ? "N/A" : value.Subdivision,
          Add_Value: value.Add_Value == undefined ? "N/A" : value.Add_Value,
          Customer_ID: customerId,
        };
        onedata.Property_ID = onedata.Property_ID.replace("/", "_");

        let legalOwner = {
          Owner_ID: propertyId,
          Property_ID: propertyId,
          OwnerName: value.LegalOwner == undefined ? "" : value.LegalOwner,
          MailName: value.MailName == undefined ? "" : value.MailName,
          DearName: value.DearName == undefined ? "" : value.DearName,
          PostalAddress:
            value.PostalAddress == undefined ? "" : value.PostalAddress,
          PostalSuburb:
            value.PostalSuburb == undefined ? "" : value.PostalSuburb,
        };

        const propertyDto = {
          property: onedata,
          legalOwner: legalOwner,
          IfLegalOwner: this.ifLegalOwner,
        };
        propertyDtos.push(propertyDto);
      }
      if (checkValue == true) {
        const sliceArr = sliceArray(propertyDtos, 10);
        let result = 200;

        for (let i = 0; i < sliceArr.length; i++) {
          if (result == 200) {
            result = await propertyApi.addProperties(sliceArr[i]);
            this.precentage =
              "add properties " + toPercent(i / sliceArr.length);
          }
        }
        if (result == 200) {
          this.alert.showSuccess("success", this.alert);
        } else {
          this.alert.showfail("fail", this.alert);
        }
      } else {
        this.alert.showfail(
          "please choose StreetName and StreetNumber",
          this.alert
        );
      }
    } else {
      console.log("wrong");
    }
    this.loading.disappear();
  }
}
</script>

<style scoped>
.PUploadBox {
  display: flex;
}
</style>
