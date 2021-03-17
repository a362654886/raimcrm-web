<template>
  <div class="openHomeBody">
    <div class="login-form">
      <div class="logoimg">
        <img
          src="../../public/logo.jpg"
          style="margin: 0.5rem"
          width="60"
          height="60"
          alt=""
        />
        <h3 style="font-family: Lucida Family">
          {{ customerName }}'s requirement
        </h3>
      </div>
      <VAlert :text="alert.text" :type="alert.type" :ifshow="alert.ifshow" />
      <div v-if="ifMainshow">thanks</div>
      <div v-if="!ifMainshow">
        <div class="byMatchEditLine">
          <div class="byMatchTitle">
            <label class="byMatchEditText">Property Type:</label>
          </div>
          <div class="byMatchChooseBox">
            <Multiselect
              v-model="property_type"
              :options="property_type_options"
              multiple
              @input="checkOption('property_type')"
            ></Multiselect>
          </div>
        </div>
        <div class="byMatchEditLine">
          <div class="byMatchTitle">
            <label class="byMatchEditText">Title:</label>
          </div>
          <div class="byMatchChooseBox">
            <Multiselect
              v-model="property_title"
              :options="title_options"
              multiple
              @input="checkOption('property_title')"
            ></Multiselect>
          </div>
        </div>
        <div class="form-addressbox">
          <label class="byMatchEditText">Address:</label>
        </div>
        <div class="form-addressbox form-group">
          <div class="numberbox">
            <input
              class="form-control"
              placeholder="Street name"
              v-model="streetName"
            />
            <small class="form-text" style="float: left"
              >street1/street2/street3/..</small
            >
          </div>
          <div class="numberbox">
            <input class="form-control" placeholder="suburb" v-model="Suburb" />
            <small class="form-text" style="float: left"
              >suburb1/suburb2/suburb3/..</small
            >
          </div>
          <div class="numberbox">
            <input class="form-control" placeholder="city" v-model="city" />
            <small class="form-text" style="float: left"
              >city1/city2/city3/..</small
            >
          </div>
        </div>

        <div class="form-numberbox" style="margin-bottom: 10px">
          <div class="numberinput">
            <label class="byMatchEditText" style="margin: 0 10px 0 0"
              >Bedroom:</label
            >
            <input class="numberchoose" placeholder="0" v-model="bedroom[0]" />
            <label class="byMatchEditText" style="margin: 0 20px 0 20px"
              >to</label
            >
            <input class="numberchoose" placeholder="0" v-model="bedroom[1]" />
          </div>
          <div class="numberinput">
            <label class="byMatchEditText" style="margin: 0 10px 0 0"
              >Bathroom:</label
            >
            <input class="numberchoose" placeholder="0" v-model="bathroom[0]" />
            <label class="byMatchEditText" style="margin: 0 20px 0 20px"
              >to</label
            >
            <input class="numberchoose" placeholder="0" v-model="bathroom[1]" />
          </div>
        </div>

        <div class="form-numberbox" style="margin-bottom: 10px">
          <div class="numberinput">
            <label class="byMatchEditText" style="margin: 0 45px 0 0"
              >Land:</label
            >
            <input
              style="height: 25px; width: 70px"
              placeholder="0"
              v-model="land[0]"
              v-on:input="getThousNum(land[0], 'land0')"
            />
            <label class="byMatchEditText" style="margin: 0 20px 0 20px"
              >to</label
            >
            <input
              style="height: 25px; width: 70px"
              placeholder="0"
              v-model="land[1]"
              v-on:input="getThousNum(land[1], 'land1')"
            />
          </div>
          <div class="numberinput">
            <label class="byMatchEditText" style="margin: 0 33px 0 0"
              >Budget:</label
            >
            <input
              style="height: 25px; width: 100px"
              placeholder="0"
              v-model="budget[0]"
              v-on:input="getThousNum(budget[0], 'budget0')"
            />
            <label class="byMatchEditText" style="margin: 0 20px 0 20px"
              >to</label
            >
            <input
              style="height: 25px; width: 100px"
              placeholder="0"
              v-model="budget[1]"
              v-on:input="getThousNum(budget[1], 'budget1')"
            />
          </div>
        </div>

        <div class="byMatchEditLine">
          <div class="byMatchTitle">
            <label class="byMatchEditText">Roof:</label>
          </div>
          <div class="byMatchChooseBox">
            <Multiselect
              v-model="property_roof"
              :options="property_roof_options"
              multiple
              @input="checkOption('property_roof')"
            ></Multiselect>
          </div>
        </div>
        <div class="byMatchEditLine">
          <div class="byMatchTitle">
            <label class="byMatchEditText">Exterior:</label>
          </div>
          <div class="byMatchChooseBox">
            <Multiselect
              v-model="property_exterior"
              :options="property_exterior_options"
              multiple
              @input="checkOption('property_exterior')"
            ></Multiselect>
          </div>
        </div>
        <div class="byMatchEditLine">
          <div class="byMatchTitle">
            <label class="byMatchEditText">Garaging:</label>
          </div>
          <div class="byMatchChooseBox">
            <Multiselect
              v-model="property_garaging"
              :options="property_garaging_options"
              multiple
              @input="checkOption('property_garaging')"
            ></Multiselect>
          </div>
        </div>
        <div class="byMatchEditLine">
          <div class="byMatchTitle">
            <label class="byMatchEditText">School Zone:</label>
          </div>
          <div class="byMatchChooseBox">
            <Multiselect
              v-model="property_schoolzone"
              :options="property_schoolzone_options"
              multiple
              @input="checkOption('property_schoolzone')"
            ></Multiselect>
          </div>
        </div>
        <div style="display: flex; margin: 1rem 1rem 0 1rem">
          <VInput
            class="selectbox"
            :labelstring="'Subdivision'"
            :contextstring="subdivision"
            :inputtype="'subdivision'"
            :type="'select'"
            :selectOption="selectBox"
            @fieldChanged="selectChange"
          />
          <VInput
            class="selectbox"
            :labelstring="'Addvalue'"
            :contextstring="addvalue"
            :inputtype="'addvalue'"
            :type="'select'"
            :selectOption="selectBox"
            @fieldChanged="selectChange"
          />
        </div>
        <VLoadding :ifshow="loading.ifshow" />
        <div style="width: 100%; text-align: center" v-if="!loading.ifshow">
          <button
            type="button"
            class="btn btn-primary"
            style="width: 40%; margin-top: 40px; background-color: #dc143c"
            @click="saveBuyRequirement"
          >
            Add New BuyRequirement
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import VLabel from "@/components/VLabel.vue";
import VInput from "@/components/VInput.vue";
import VTable from "@/components/VTable.vue";
import Multiselect from "vue-multiselect";
import buyRequirementApi from "@/api/buyRequirementApi";
import otherFunctions from "../../functions/otherFunctions";
import {
  propertyTypeOptions,
  titleOptions,
  statusOptions,
  propertyExteriorOptions,
  propertyRoofOptions,
  propertyGaragingOptions,
  propertySchoolZoneOptions,
  selectBox,
} from "../../data/options_data";
import AlertModel from "../../db-models/alertModel";
import VAlert from "@/components/VAlert.vue";
import VLoadding from "@/components/VLoadding.vue";
import LoadModel from "../../db-models/loaddingModel";
import messageApi from "@/api/messageAlertApi";
import { checkOptions } from "../../functions/publicFn";

@Component({
  components: {
    VLabel,
    VTable,
    Multiselect,
    VInput,
    VAlert,
    VLoadding,
  },
})
export default class CustomerBuyRequirement extends Vue {
  //get from store
  private CustomerId: string;

  private Bynum: any;

  private NewBuyRequirement: any;

  private alert = new AlertModel();

  user_Id: any = "";
  customerId: any = "";
  streetName = "";
  Suburb = "";
  city = "";
  bedroom: any[] = [0, 0];
  bathroom: any[] = [0, 0];
  land: any[] = [0, 0];
  budget: any[] = [0, 0];
  property_type: any[] = ["All"];
  property_title: any[] = ["All"];
  property_exterior: any[] = ["All"];
  property_roof: any[] = ["All"];
  property_garaging: any[] = ["All"];
  property_schoolzone: any[] = ["All"];
  addvalue: any = false;
  subdivision: any = false;
  ifshow = true;
  ifMainshow = false;

  property_type_options: any[] = ["All"];
  title_options: any[] = ["All"];
  status_options: any[] = ["All"];
  property_exterior_options: any[] = ["All"];
  property_roof_options: any[] = ["All"];
  property_garaging_options: any[] = ["All"];
  property_schoolzone_options: any[] = ["All"];
  selectBox = selectBox;

  private functions = otherFunctions;

  private loading = new LoadModel();

  private customerName: any;

  async created() {
    this.property_schoolzone_options = await propertySchoolZoneOptions();
    this.title_options = await titleOptions();
    this.property_type_options = await propertyTypeOptions()
    this.status_options = await statusOptions()
    this.property_exterior_options = await propertyExteriorOptions()
    this.property_roof_options = await propertyRoofOptions()
    this.property_garaging_options = await propertyGaragingOptions()
    this.property_schoolzone_options = await propertySchoolZoneOptions();

    this.customerId = this.$route.query.id;
    this.customerName = this.$route.query.name;
    this.Bynum = this.$route.query.Num;
    this.user_Id = this.$route.query.Uid;
  }

  checkOption(option: string) {
    this[option] = checkOptions(this[option], "All");
  }

  updateCustomerId(data: any) {
    if (data.Customer_Email != "newone") {
      this.customerId = data.customerID;
    }
  }

  selectChange(obj: any) {
    switch (obj.type) {
      case "subdivision":
        this.subdivision = obj.text;
        break;
      case "addvalue":
        this.addvalue = obj.text;
        break;
    }
  }

  getThousNum(num: string, type: string) {
    switch (type) {
      case "budget0":
        this.budget[0] = otherFunctions.moneyFormat(
          otherFunctions.moneyRemoveFormat(this.budget[0]),
          true
        );
        break;
      case "budget1":
        this.budget[1] = otherFunctions.moneyFormat(
          otherFunctions.moneyRemoveFormat(this.budget[1]),
          true
        );
        break;
      case "land0":
        this.land[0] = otherFunctions.moneyFormat(
          otherFunctions.moneyRemoveFormat(this.land[0]),
          false
        );
        break;
      case "land1":
        this.land[1] = otherFunctions.moneyFormat(
          otherFunctions.moneyRemoveFormat(this.land[1]),
          false
        );
        break;
    }
  }

  getNumBudget() {
    this.budget[0] = otherFunctions.moneyRemoveFormat(this.budget[0]);
    this.budget[1] = otherFunctions.moneyRemoveFormat(this.budget[1]);
    this.land[0] = otherFunctions.moneyRemoveFormat(this.land[0]);
    this.land[1] = otherFunctions.moneyRemoveFormat(this.land[1]);
  }

  async saveBuyRequirement() {
    this.loading.show();
    this.getNumBudget();
    this.NewBuyRequirement = {
      BuyRequirement_ID: `C${this.customerId}BY${this.Bynum}`,
      StreetName: this.streetName.replace("/", ","),
      Suburb: this.Suburb.replace("/", ","),
      City: this.city.replace("/", ","),
      Title: this.functions.transferDataTitleToTitle2(
        this.functions.transferArrToString(this.property_title)
      ),
      Property_Type: this.functions.transferArrToString(this.property_type),
      Exterior: this.functions.transferArrToString(this.property_exterior),
      Roof: this.functions.transferArrToString(this.property_roof),
      Garaging: this.functions.transferArrToString(this.property_garaging),
      LandMin: this.land[0],
      LandMax: this.land[1],
      Bedroom: this.functions.transferArrToString(this.bedroom),
      Bathroom: this.functions.transferArrToString(this.bathroom),
      BudgetRangeMin: this.budget[0],
      BudgetRangeMax: this.budget[1],
      School_Zone: this.functions.transferArrToString(this.property_schoolzone),
      Subdivision: this.subdivision,
      Add_Value: this.addvalue,
      Customer_ID: this.customerId,
    };
    let result = await buyRequirementApi.addBuyREquirement(
      this.NewBuyRequirement
    );
    if (result.status == 201) {
      this.alert.showSuccess("success", this.alert);
      await this.addMessageAlert();
      this.ifMainshow = true;
    } else {
      this.alert.showfail("something wrong, please connect admin", this.alert);
    }

    this.loading.disappear();
  }

  async addMessageAlert() {
    const date = new Date();
    const alertMessage = {
      Alert_ID: "ByAlert" + `C${this.customerId}BY${this.Bynum}`,
      Time: new Date(date.getTime() - date.getTimezoneOffset() * 60000),
      Context: `new buyrequirement of ${this.customerName}`,
      Type: "Buy Requirement",
      IfRead: "false",
      User_ID: this.user_Id,
      Customer_ID: this.customerId,
    };
    let result = await messageApi.addMessageAlert(alertMessage);
  }
}
</script>

<style scoped>
.login-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: rgb(216, 219, 218);
  width: 1000px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.logoimg {
  text-align: center;
}
.byMatchEditLine {
  display: flex;
  margin: 1rem 1rem 0 1rem;
}

.byMatchEditText {
  margin-top: 7px;
  float: left;
  font-size: large;
  font-weight: bold;
}

.byMatchChooseBox {
  width: 80%;
}

.byMatchTitle {
  width: 15%;
}

.selectbox {
  width: 50%;
}

.customerBYmatch {
  margin: 1rem;
}

.byTitle {
  margin: 0 1rem 0 1rem;
}
.openHomeBody {
  background-image: url("~@/assets/openhome_background.jpg");
  background-size: cover;
  width: 100%;
  height: 100%;
}
.openhomebox {
  margin: 1rem;
}
</style>
