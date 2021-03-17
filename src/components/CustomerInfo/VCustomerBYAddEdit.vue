<template>
  <div class="customerBYmatch" v-if="ifshow">
    <div class="byTitle">
      <h3 style="color: white; height: 60px; padding-top: 13px">
        New BuyRequirement
      </h3>
    </div>
    <VAlert :text="alert.text" :type="alert.type" :ifshow="alert.ifshow" />

    <div style="margin: 1rem">
      <h4 class="clientTitle">Basic Requirements :</h4>
      <div style="display: flex">
        <p class="byMatchTitle">Property Type:</p>
        <Multiselect
          v-model="property_type"
          :options="property_type_options"
          multiple
          @input="checkOption('property_type')"
        ></Multiselect>
      </div>
      <div style="display: flex">
        <p class="byMatchTitle">Title:</p>
        <Multiselect
          v-model="property_title"
          :options="title_options"
          multiple
          @input="checkOption('property_title')"
        ></Multiselect>
      </div>
      <div style="display: flex; margin-top: 1rem">
        <div style="width: 50%; display: flex">
          <p class="byMatchTitle" style="margin: 0 10px 0 0">Bedroom:</p>
          <input
            class="numberchoose"
            style="height: 25px; width: 70px"
            placeholder="0"
            v-model="bedroom[0]"
          />
          <p style="margin: 0 20px 0 20px">to</p>
          <input
            class="numberchoose"
            style="height: 25px; width: 70px"
            placeholder="0"
            v-model="bedroom[1]"
          />
        </div>
        <div style="width: 50%; display: flex">
          <p class="byMatchTitle" style="margin: 0 10px 0 0">Bathroom:</p>
          <input
            class="numberchoose"
            style="height: 25px; width: 70px"
            placeholder="0"
            v-model="bathroom[0]"
          />
          <p style="margin: 0 20px 0 20px">to</p>
          <input
            class="numberchoose"
            style="height: 25px; width: 70px"
            placeholder="0"
            v-model="bathroom[1]"
          />
        </div>
      </div>
      <div style="display: flex; margin-top: 1rem">
        <div style="width: 50%; display: flex">
          <p class="byMatchTitle" style="margin: 0 10px 0 0">Land:</p>
          <input
            style="height: 25px; width: 70px"
            placeholder="0"
            v-model="land[0]"
            v-on:input="getThousNum(land[0], 'land0')"
          />
          <p style="margin: 0 20px 0 20px">to</p>
          <input
            style="height: 25px; width: 70px"
            placeholder="0"
            v-model="land[1]"
            v-on:input="getThousNum(land[1], 'land1')"
          />
        </div>
        <div style="width: 50%; display: flex">
          <p class="byMatchTitle" style="margin: 0 10px 0 0">Budget:</p>
          <input
            style="height: 25px; width: 100px"
            placeholder="0"
            v-model="budget[0]"
            v-on:input="getThousNum(budget[0], 'budget0')"
          />
          <label style="margin: 0 20px 0 20px">to</label>
          <input
            style="height: 25px; width: 100px"
            placeholder="0"
            v-model="budget[1]"
            v-on:input="getThousNum(budget[1], 'budget1')"
          />
        </div>
      </div>
    </div>

    <div style="margin: 1rem">
      <h4 class="clientTitle" style="margin-top: 1rem; margin-bottom: 1rem">
        Address Requirements :
      </h4>
      <div class="form-addressbox form-group">
        <div class="numberbox">
          <input
            class="form-control"
            placeholder="Street name"
            v-model="streetName"
          />
        </div>
        <div class="numberbox">
          <input class="form-control" placeholder="suburb" v-model="Suburb" />
        </div>
        <div class="numberbox">
          <input class="form-control" placeholder="city" v-model="city" />
        </div>
      </div>
    </div>

    <div style="margin: 1rem">
      <h4 class="clientTitle">Other Requirements :</h4>
      <div style="display: flex">
        <p class="byMatchTitle">Roof:</p>
        <Multiselect
          v-model="property_roof"
          :options="property_roof_options"
          multiple
          @input="checkOption('property_roof')"
        ></Multiselect>
      </div>
      <div style="display: flex">
        <p class="byMatchTitle">Exterior:</p>
        <Multiselect
          v-model="property_exterior"
          :options="property_exterior_options"
          multiple
          @input="checkOption('property_exterior')"
        ></Multiselect>
      </div>
      <div style="display: flex">
        <p class="byMatchTitle">Garaging:</p>
        <Multiselect
          v-model="property_garaging"
          :options="property_garaging_options"
          multiple
          @input="checkOption('property_garaging')"
        ></Multiselect>
      </div>
      <div style="display: flex">
        <p class="byMatchTitle">School Zone:</p>
        <Multiselect
          v-model="property_schoolzone"
          :options="property_schoolzone_options"
          multiple
          @input="checkOption('property_schoolzone')"
        ></Multiselect>
      </div>
      <div style="display: flex">
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
    </div>

    <VLoadding :ifshow="loading.ifshow" />
    <div style="width: 100%; text-align: center" v-if="!loading.ifshow">
      <button
        type="button"
        class="btn btn-primary"
        style="width: 40%; margin-top: 40px; background-color: #dc143c"
        @click="saveBuyRequirementUpdate"
      >
        Add New BuyRequirement
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { BuyRequirement, Customer } from "../../../db-models/db-customer";
import VLabel from "@/components/VLabel.vue";
import VInput from "@/components/VInput.vue";
import VTable from "@/components/VTable.vue";
import Multiselect from "vue-multiselect";
import buyRequirementApi from "@/api/buyRequirementApi";
import otherFunctions from "../../../functions/otherFunctions";
import { checkOptions } from "../../../functions/publicFn";
import {
  propertyTypeOptions,
  titleOptions,
  statusOptions,
  propertyExteriorOptions,
  propertyRoofOptions,
  propertyGaragingOptions,
  propertySchoolZoneOptions,
  selectBox,
} from "../../../data/options_data";
import customerApi from "@/api/customerApi";
import store from "@/store";
import AlertModel from "../../../db-models/alertModel";
import VAlert from "@/components/VAlert.vue";
import VLoadding from "@/components/VLoadding.vue";
import LoadModel from "../../../db-models/loaddingModel";

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
export default class VCustomerBYAddEdit extends Vue {
  @Prop()
  private PropCustomerId!: string;

  @Prop()
  private buyRequirementNum!: number;

  private NewBuyRequirement: any;

  private alert = new AlertModel();

  Bynum = this.buyRequirementNum;
  customerId = "";
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

  async created() {
    this.property_schoolzone_options = await propertySchoolZoneOptions();
    this.title_options = await titleOptions();
    this.property_type_options = await propertyTypeOptions()
    this.status_options = await statusOptions()
    this.property_exterior_options = await propertyExteriorOptions()
    this.property_roof_options = await propertyRoofOptions()
    this.property_garaging_options = await propertyGaragingOptions()

    if (this.PropCustomerId == undefined) {
      let newCustomer = store.state.newCustomer;
      this.updateCustomerId(newCustomer);
    } else {
      this.customerId = this.PropCustomerId;
    }

    if (this.customerId == "") {
      this.ifshow = false;
    }
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

  async saveBuyRequirementUpdate() {
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
      //let customer = await customerApi.getCustomer(this.customerId);
      let customer = store.state.showCustomer;
      this.Bynum = this.Bynum + 1;
      this.$emit("updateParentData", customer);
    } else {
      this.alert.showfail("something wrong, please connect admin", this.alert);
    }
    this.loading.disappear();
  }
}
</script>

<style scoped>
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
  width: 150px;
  text-align: left;
  margin-top: 10px;
  font-weight: 600;
}
.selectbox {
  width: 50%;
}
.byTitle {
  background-color: #0074d9;
  height: 60px;
}
.clientTitle {
  font-size: large;
  font-weight: bold;
  border-bottom: 1px solid #6b6a6a;
  text-align: left;
  font-family: Didot;
  background-color: rgb(233, 233, 233);
}
</style>
