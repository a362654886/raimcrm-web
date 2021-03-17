<template>
  <div>
    <div class="propertyBack">
      <div class="propertyInfo">
        <VAlert :text="alert.text" :type="alert.type" :ifshow="alert.ifshow" />
        <div style="margin-bottom: 1rem">
          <h3
            style="
              color: white;
              height: 60px;
              padding-top: 13px;
              background-color: #0074d9;
            "
          >
            New Property
          </h3>
        </div>
        <div>
          <h4 class="clientTitle">Basic Info :</h4>
          <div class="rows">
            <VInput
              class="rowlabel"
              :titleWidth="'width:120px;font-weight: normal'"
              :textWidth="'width:200px'"
              :labelstring="'Property Type'"
              :contextstring="property.Property_Type"
              :inputtype="'Property Type'"
              :type="'select'"
              :selectOption="property_type_options"
              @fieldChanged="selectChange"
            />
            <VInput
              class="rowlabel"
              :titleWidth="'width:120px;font-weight: normal'"
              :textWidth="'width:200px'"
              :labelstring="'Title'"
              :contextstring="property.Title"
              :inputtype="'Title'"
              :type="'select'"
              :selectOption="title_options"
              @fieldChanged="selectChange"
            />
          </div>
          <div class="rows">
            <VInput
              class="rowlabel"
              style="margin-top: 0.5rem"
              :titleWidth="'width:120px;font-weight: normal'"
              :textWidth="'width:200px'"
              :labelstring="'Status'"
              :contextstring="property.Status"
              :inputtype="'Status'"
              :type="'select'"
              :selectOption="status_options"
              @fieldChanged="selectChange"
            />
            <div style="width: 50%; display: flex">
              <p class="clientText" style="margin-top: 15px">Land:</p>
              <input
                class="numberBox"
                placeholder="0"
                v-model="property.Land"
                v-on:input="getThousNum(property.Land, 'land')"
              />
            </div>
          </div>
          <div class="rows">
            <div style="width: 50%; display: flex">
              <p class="clientText" style="margin-top: 15px">Bedroom:</p>
              <input
                class="numberBox"
                placeholder="0"
                v-model="property.Bedroom"
              />
            </div>
            <div style="width: 50%; display: flex">
              <p class="clientText" style="margin-top: 15px">Bathroom:</p>
              <input
                class="numberBox"
                placeholder="0"
                v-model="property.Bathroom"
              />
            </div>
          </div>
        </div>

        <div>
          <h4 class="clientTitle">Address :</h4>
          <div style="display: flex">
            <p style="width: 220px; text-align: left; margin-top: 5px">
              Address :
            </p>
            <div class="numberbox">
              <b-form-input
                list="my-list-id"
                v-model="property.HouseNumber"
                placeholder="Street Number"
                v-on:input="googleAddressUpdate"
              ></b-form-input>
              <datalist id="my-list-id">
                <option v-for="(size, index) in googleaddresses" :key="index">
                  {{ size }}
                </option>
              </datalist>
            </div>
            <div class="numberbox">
              <input
                class="form-control"
                placeholder="Street Name"
                v-model="property.StreetName"
              />
            </div>
            <div class="numberbox">
              <input
                class="form-control"
                placeholder="Suburb"
                v-model="property.Suburb"
              />
            </div>
            <div class="numberbox">
              <input
                class="form-control"
                placeholder="City"
                v-model="property.City"
              />
            </div>
          </div>
        </div>

        <div>
          <h4 class="clientTitle">Other Info :</h4>
          <div class="rows">
            <VInput
              class="rowlabel"
              :titleWidth="'width:120px;font-weight: normal'"
              :textWidth="'width:200px'"
              :labelstring="'Roof'"
              :contextstring="property.Roof"
              :inputtype="'roof'"
              :type="'select'"
              :selectOption="property_roof_options"
              @fieldChanged="selectChange"
            />
            <VInput
              class="rowlabel"
              :titleWidth="'width:120px;font-weight: normal'"
              :textWidth="'width:200px'"
              :labelstring="'Exterior'"
              :contextstring="property.Exterior"
              :inputtype="'exterior'"
              :type="'select'"
              :selectOption="property_exterior_options"
              @fieldChanged="selectChange"
            />
          </div>
          <div class="rows">
            <VInput
              class="rowlabel"
              :titleWidth="'width:120px;font-weight: normal'"
              :textWidth="'width:200px'"
              :labelstring="'Garaging'"
              :contextstring="property.Garaging"
              :inputtype="'garaging'"
              :type="'select'"
              :selectOption="property_garaging_options"
              @fieldChanged="selectChange"
            />
          </div>
          <div style="display: flex">
            <div style="width: 170px">
              <p
                style="font-weight: normal; text-align: left; margin-top: 10px"
              >
                School Zone
              </p>
            </div>
            <Multiselect
              style="width: 100%"
              v-model="property.School_Zone"
              :options="property_schoolZone_options"
              multiple
              @input="checkOption()"
            ></Multiselect>
          </div>
          <div class="rows">
            <VInput
              class="rowlabel"
              :titleWidth="'width:120px;font-weight: normal'"
              :textWidth="'width:200px'"
              :labelstring="'Subdivision'"
              :contextstring="property.Subdivision"
              :inputtype="'subdivision'"
              :type="'select'"
              :selectOption="selectBox"
              @fieldChanged="selectChange"
            />
            <VInput
              class="rowlabel"
              :titleWidth="'width:120px;font-weight: normal'"
              :textWidth="'width:200px'"
              :labelstring="'Addvalue'"
              :contextstring="property.Add_Value"
              :inputtype="'addvalue'"
              :type="'select'"
              :selectOption="selectBox"
              @fieldChanged="selectChange"
            />
          </div>
        </div>

        <div>
          <h4 class="clientTitle">C.V. :</h4>
          <div style="display: flex">
            <VInput
              style="width: 50%"
              :titleWidth="'width:120px;font-weight: normal'"
              :textWidth="'width:200px'"
              :labelstring="'CV'"
              :inputtype="'Cv'"
              :type="'input'"
              :contextstring="property.CV"
              @fieldChanged="selectChange"
            />
            <VInput
              class="rowlabel"
              :titleWidth="'width:120px;font-weight: normal'"
              :textWidth="'width:200px'"
              :labelstring="'Last CV Update'"
              :inputtype="'LastUpdateCV'"
              :type="'time'"
              :contextstring="property.LastUpdateCV"
              @fieldChanged="selectChange"
            />
          </div>
        </div>

        <div>
          <h4 class="clientTitle">Owner</h4>
          <div style="display: flex">
            <VInput
              style="width: 50%"
              :titleWidth="'width:120px;font-weight: normal'"
              :textWidth="'width:200px'"
              :labelstring="'ownerMobile'"
              :inputtype="'ownerMobile'"
              :type="'input'"
              :contextstring="''"
              :ifdisable="ifHaveOwner"
              @fieldChanged="setCustomeritem"
            />
            <VInput
              style="width: 40%"
              :titleWidth="'width:120px;font-weight: normal'"
              :textWidth="'width:200px'"
              :labelstring="'ownerEmail'"
              :inputtype="'ownerEmail'"
              :type="'input'"
              :contextstring="''"
              :ifdisable="ifHaveOwner"
              @fieldChanged="setCustomeritem"
            />
            <el-button
              type="primary"
              style="padding: 5px; height: 35px"
              @click="getCustomer"
              >LinkOwner</el-button
            >
            <el-button
              type="primary"
              style="padding: 5px; height: 35px"
              @click="withoutCustomer"
              >WithoutOwner</el-button
            >
          </div>
        </div>

        <div v-if="ifowner">
          <VTable
            :items="[customer]"
            :fields="customerfield"
            :rows="10"
            :perPage="10"
            :pagination="false"
          />
        </div>
        <div v-if="ifaddNewClient" style="margin-top: 1rem">
          <b-alert show>
            This customer isn't exist in system, do you want to add a new
            client?
            <button
              type="button"
              class="btn btn-outline-primary"
              data-toggle="modal"
              data-target="#customerAdd"
              @click="addno"
            >
              add
            </button>
            <button
              type="button"
              class="btn btn-outline-primary"
              @click="addno"
            >
              No
            </button>
          </b-alert>
        </div>
        <VDialogueAdd :idstring="'customerAdd'" :titlestring="'Client Add'" />
        <VLoadding :ifshow="loading.ifshow" />
        <div style="width: 100%; text-align: center" v-if="!loading.ifshow">
          <button
            type="button"
            class="btn btn-primary"
            v-if="savebutton"
            style="width: 40%; margin-top: 40px; background-color: #dc143c"
            @click="save"
          >
            Save
          </button>
          <button
            type="button"
            class="btn btn-primary"
            v-if="addother"
            style="width: 40%; margin-top: 40px; background-color: #dc143c"
            @click="addotherFunction"
          >
            Add Another
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import VLabel from "@/components/VLabel.vue";
import VInput from "@/components/VInput.vue";
import VDialogue from "@/components/VDialogue.vue";
import VDialogueAdd from "@/components/VDialogueAdd.vue";
import propertyApi from "@/api/propertyApi";
import otherFunctions from "../../../functions/otherFunctions";
import {
  propertyTypeOptions,
  titleOptions,
  statusOptions,
  propertyExteriorOptions,
  propertyRoofOptions,
  propertyGaragingOptions,
  propertySchoolZoneOptions,
  customerfield,
  selectBox,
} from "../../../data/options_data";
import customerApi from "@/api/customerApi";
import VTable from "@/components/VTable.vue";
import VAlert from "@/components/VAlert.vue";
import AlertModel from "../../../db-models/alertModel";
import checkFunctions from "../../../functions/checkFunctions";
import filesApi from "@/api/filesApi";
import Multiselect from "vue-multiselect";
import LoadModel from "../../../db-models/loaddingModel";
import VLoadding from "@/components/VLoadding.vue";
import googleMapApi from "@/api/googleMapApi";
import { checkOptions } from "../../../functions/publicFn";
import googlePeopleApi from "@/api/googlePeopleApi";
import propertyLabelApi from "@/api/propertyLabelApi";
import store from "@/store";

@Component({
  components: {
    VTable,
    VLabel,
    VInput,
    VDialogue,
    VAlert,
    VDialogueAdd,
    Multiselect,
    VLoadding,
  },
})
export default class PropertyAdd extends Vue {
  private alert = new AlertModel();
  private customer: any = {
    nameString: "",
  };
  private property: any = {
    Property_Type: "All",
    Title: "All",
    HouseNumber: "",
    Status: "All",
    StreetName: "",
    Suburb: "",
    City: "",
    Visable: "Owner",
    Exterior: "All",
    Roof: "All",
    Garaging: "All",
    Land: 0,
    Bedroom: 0,
    Bathroom: 0,
    School_Zone: "All",
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
  };

  private customerSearchPhone = "";
  private customerSearchEmail = "";

  private addother = false;
  private ifowner = false;
  private ifaddNewClient = false;
  private savebutton = true;
  private ifHaveOwner = false;

  private googleaddresses: any[] = [];

  private loading = new LoadModel();
  property_schoolZone_options: any[] = ["All"];

  property_type_options: any[] = ["All"];
  title_options: any[] = ["All"];
  status_options: any[] = ["All"];
  property_exterior_options: any[] = ["All"];
  property_roof_options: any[] = ["All"];
  property_garaging_options: any[] = ["All"];
  selectBox = selectBox;

  customerfield = customerfield;

  async created() {
    this.property_schoolZone_options = await propertySchoolZoneOptions();
    let propertyTypeOption = await propertyTypeOptions();
    this.property_type_options = otherFunctions.addValuetoOption(
      propertyTypeOption
    );
    let titleOption = await titleOptions();
    this.title_options = otherFunctions.addValuetoOption(
      titleOption
    );
    let statusOption = await statusOptions();
    this.status_options = otherFunctions.addValuetoOption(statusOption);
    let exteriorOption = await propertyExteriorOptions();
    this.property_exterior_options = otherFunctions.addValuetoOption(
      exteriorOption
    );
    let roofOption = await propertyRoofOptions();
    this.property_roof_options = otherFunctions.addValuetoOption(roofOption);
    let garagingOption = await propertyGaragingOptions();
    this.property_garaging_options = otherFunctions.addValuetoOption(
      garagingOption
    );
    //let schoolZone = await filesApi.getSchoolZone();
    //this.property_schoolzone_options = schoolZone;
  }

  checkOption(option: string) {
    this.property.School_Zone = checkOptions(this.property.School_Zone, "All");
  }

  addno() {
    this.ifaddNewClient = false;
  }

  selectChange(obj: any) {
    switch (obj.type) {
      case "subdivision":
        this.property.Subdivision = obj.text;
        break;
      case "addvalue":
        this.property.Add_Value = obj.text;
        break;
      case "Property Type":
        this.property.Property_Type = obj.text;
        break;
      case "Title":
        this.property.Title = obj.text;
        break;
      case "Status":
        this.property.Status = obj.text;
        break;
      case "roof":
        this.property.Roof = obj.text;
        break;
      case "exterior":
        this.property.Exterior = obj.text;
        break;
      case "garaging":
        this.property.Garaging = obj.text;
        break;
      case "schoolZone":
        this.property.School_Zone = obj.text;
        break;
      case "LastUpdateCV":
        this.property.LastUpdateCV = obj.text;
        break;
      case "Cv":
        this.property.CV = obj.text;
        this.property.CV = otherFunctions.moneyFormat(
          otherFunctions.moneyRemoveFormat(this.property.CV),
          true
        );
        break;
    }
  }

  setCustomeritem(data: any) {
    switch (data.type) {
      case "ownerMobile":
        this.customerSearchPhone = data.text;
        break;
      case "ownerEmail":
        this.customerSearchEmail = data.text;
        break;
    }
  }

  async getCustomer() {
    this.ifowner = false;
    let result;
    if (this.customerSearchEmail != "") {
      result = await customerApi.getCustomerByEmail(this.customerSearchEmail);
      if (result.status == 200) {
        this.customer = result.data;
        this.ifowner = true;
        this.alert.disappear();
      } else {
        this.ifaddNewClient = true;
        //this.alert.showfail("please input right email")
      }
    } else if (this.customerSearchPhone != "") {
      result = await customerApi.getCustomerByPhone(this.customerSearchPhone);
      if (result.status == 200) {
        this.customer = result.data;
        this.ifowner = true;
        this.alert.disappear();
      } else {
        this.ifaddNewClient = true;
        //this.alert.showfail("please input right phone")
      }
    } else {
      this.alert.showfail("please input right phone or email", this.alert);
    }
  }

  async withoutCustomer() {
    this.customer = {
      nameString: "empty",
      customerID: "empty",
    };
    this.ifHaveOwner = true;
  }

  getThousNum(num: string, type: string) {
    switch (type) {
      case "land":
        this.property.Land = otherFunctions.moneyFormat(
          otherFunctions.moneyRemoveFormat(this.property.Land),
          false
        );
        break;
    }
  }

  generatePropertyId() {
    let propertyId = `${this.property.HouseNumber}${this.property.StreetName}`;
    return propertyId.replace("/", "_");
  }

  async save() {
    this.loading.show();
    if (this.customer.nameString == "") {
      this.alert.showfail("please get owner firstly", this.alert);
      this.loading.disappear();
      return;
    }
    this.property.Property_ID = this.generatePropertyId();
    this.property.Customer_ID = this.customer.customerID;
    this.property.Title = otherFunctions.transferTitleToDataTitle([
      this.property.Title,
    ]);
    if (
      this.property.School_Zone == "No" ||
      this.property.School_Zone == "All"
    ) {
      this.property.School_Zone = ["All"];
    }
    this.property.School_Zone = otherFunctions.ArrToArrstring(
      this.property.School_Zone
    );
    this.property.Land = otherFunctions.moneyRemoveFormat(this.property.Land);
    this.property.CV = otherFunctions.moneyRemoveFormat(this.property.CV);
    let testresult = checkFunctions.checkProperty(this.property);
    if (testresult == true) {
      let result = await propertyApi.addProperty(this.property);
      if (result == 201) {

        this.addother = true;
        this.savebutton = false;
        this.alert.showSuccess("success", this.alert);
      }
    } else {
      this.alert.showfail(testresult, this.alert);
    }
    this.loading.disappear();
  }

  addotherFunction() {
    location.reload();
  }

  async googleAddressUpdate() {
    this.googleaddresses = ["loadding..."];
    let resultArr: any[] = [];
    let result: any = await googleMapApi.getGoogleAddress(
      `${this.property.HouseNumber}`
    );
    result.predictions.forEach((a: any) => {
      resultArr.push(a.description);
    });
    this.googleaddresses = resultArr;
  }

  @Watch("googleaddresses")
  seprateAddress() {
    if (
      this.googleaddresses.length == 1 &&
      this.googleaddresses[0] != "loadding..."
    ) {
      let allAddress = this.googleaddresses[0].split(",");
      let street = allAddress[0].split(" ");
      this.property.HouseNumber = street[0];
      let streetName = "";
      for (let i = 1; i < street.length; i++) {
        streetName = streetName + " " + street[i];
      }
      this.property.StreetName = streetName;
      this.property.Suburb = allAddress[1];
      this.property.City = allAddress[2];
    }
  }
}
</script>

<style scoped>
.propertyBack {
  background-color: #f7f7f7;
  width: 90%;
  margin: 2rem 5% 0 5%;
  position: absolute;
}
.propertyInfo {
  margin: 1rem 1rem 2rem 1rem;
}
.rows {
  display: flex;
}
.rowlabel {
  width: 50%;
}
.appraisalbox {
  display: flex;
  width: 25%;
}
.otherbox {
  margin-bottom: 1.5rem;
  margin-top: 1.5rem;
}
.elementtitle {
  font-weight: bold;
  margin-bottom: 1rem;
  margin-top: 1rem;
}
.title {
  font-weight: bold;
  text-align: left;
  margin-top: 7px;
  width: 150px;
}

.editbutton {
  margin: 5px 0 6px 20px;
  width: 100px;
  height: 28px;
}

.divisionthreebox {
  display: flex;
  width: 33%;
}

#twoButtons {
  margin-top: 0.5rem;
  margin-left: 80%;
}

.clientTitle {
  font-size: large;
  font-weight: bold;
  border-bottom: 1px solid #6b6a6a;
  text-align: left;
  font-family: Didot;
  background-color: rgb(233, 233, 233);
}

.clientText {
  text-align: left;
  width: 150px;
  margin-top: 5px;
}

.numberBox {
  width: 200px;
  height: 35px;
  margin-top: 10px;
}

/* ipad */
@media screen and (max-width: 1200px) {
  #twoButtons {
    margin-left: 70%;
  }
}
</style>
