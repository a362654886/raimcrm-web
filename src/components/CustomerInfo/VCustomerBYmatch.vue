<template>
  <div class="customerBYmatch">
    <div>
      <h4 class="clientTitle">Basic Info :</h4>
      <div class="rows">
        <p class="clientText rowlabel">
          <strong>Property Type: </strong>{{ buyrequirement.propertyType }}
        </p>
        <p class="clientText rowlabel">
          <strong>Title: </strong>{{ buyrequirement.titlestring }}
        </p>
      </div>
      <div class="rows">
        <p class="clientText rowlabel">
          <strong>BedRoom: </strong>{{ getRangString(buyrequirement.bedroom) }}
        </p>
        <p class="clientText rowlabel">
          <strong>BathRoom: </strong
          >{{ getRangString(buyrequirement.bathroom) }}
        </p>
      </div>
      <div class="rows">
        <p class="clientText rowlabel">
          <strong>Land: </strong>{{ getThousNum(buyrequirement.land) }}
        </p>
        <p class="clientText rowlabel">
          <strong>Budget: </strong>{{ getMoneyNum(buyrequirement.budgetRange) }}
        </p>
      </div>
    </div>
    <div>
      <h5 class="clientTitle">Address :</h5>
      <div class="rows">
        <p class="clientText rowlabel">
          <strong>Street: </strong>{{ buyrequirement.streetName }}
        </p>
        <p class="clientText rowlabel">
          <strong>Suburb: </strong>{{ buyrequirement.suburb }}
        </p>
      </div>
      <div class="rows">
        <p class="clientText rowlabel">
          <strong>City: </strong>{{ buyrequirement.city }}
        </p>
      </div>
    </div>
    <div>
      <h5 class="clientTitle">Other Info :</h5>
      <div class="rows">
        <p class="clientText rowlabel">
          <strong>Roof: </strong>{{ getRangString(buyrequirement.roof) }}
        </p>
        <p class="clientText rowlabel">
          <strong>Exterior: </strong>{{ buyrequirement.titlestring }}
        </p>
      </div>
      <div class="rows">
        <p class="clientText rowlabel">
          <strong>Garaging: </strong>{{ buyrequirement.garaging }}
        </p>
        <p class="clientText rowlabel">
          <strong>School Zone: </strong>{{ buyrequirement.schoolZone }}
        </p>
      </div>
      <div class="rows">
        <p class="clientText rowlabel">
          <strong>Subdivision: </strong
          >{{ functions.getYesAndNo(buyrequirement.subdivision) }}
        </p>
        <p class="clientText rowlabel">
          <strong>Add Value: </strong
          >{{ functions.getYesAndNo(buyrequirement.addValue) }}
        </p>
      </div>
    </div>
    <div>
      <h5 class="clientTitle">Match Properties :</h5>
      <VTable
        :items="matchedProperties"
        :fields="propertyfield"
        :rows="allrows"
        :perPage="localPerPage"
        :pagination="true"
        :currentPage="cPage"
        @passValue="chooseProperty"
        @passPage="searchProperties"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { BuyRequirement, Customer } from "../../../db-models/db-customer";
import VLabel from "@/components/VLabel.vue";
import propertyApi from "@/api/propertyApi";
import { Property } from "../../../db-models/db-property";
import VTable from "@/components/VTable.vue";
import store from "@/store";
import otherFunctions from "../../../functions/otherFunctions";
import { insertRightPage } from "../../../functions/publicFn";
import modelCreate from "../../../db-models/modelCreate";

@Component({
  components: {
    VLabel,
    VTable,
  },
})
export default class VCustomerBYmatch extends Vue {
  cPage = 1;
  allrows = 0;
  localPerPage = 10;

  private matchedProperties: Property[] = [];
  propertyfield = [
    { key: "status", label: "Status", sortable: true },
    { key: "titlestring", label: "Title", sortable: true },
    { key: "propertyType", label: "Property Type", sortable: true },
    { key: "fullAddress", label: "Address", sortable: true },
    { key: "bathroom", label: "Bathroom", sortable: true },
    { key: "bedroom", label: "Bedroom", sortable: true },
    { key: "exterior", label: "Exterior", sortable: true },
    { key: "roof", label: "Roof", sortable: true },
    { key: "garaging", label: "Garaging", sortable: true },
    { key: "land", label: "Land", sortable: true },
    { key: "schoolZone", label: "School Zone", sortable: true },
    { key: "budgetstring", label: "budget", sortable: true },
    { key: "subdivision", label: "Subdivision", sortable: true },
    { key: "addValue", label: "AddValue", sortable: true },
  ];
  @Prop()
  private buyrequirement!: BuyRequirement;

  private functions = otherFunctions;

  async mounted() {
    /*const apiResult = await propertyApi.getProperties(
      this.getMatchString()
    );
    this.matchedProperties = apiResult.data.property
    this.allrows = this.matchedProperties.length;*/
    this.searchProperties(1, 10);
  }

  async searchProperties(PageNum: any, PageSize: any) {
    this.localPerPage = PageSize;
    this.cPage = PageNum;
    const urlValue = `${this.getMatchString()}&PageNum=${PageNum}&PageSize=${PageSize}`;
    const apiResult = await propertyApi.getProperties(urlValue);
    this.matchedProperties = insertRightPage(
      PageNum,
      PageSize,
      modelCreate.getPropperties(apiResult.data.property)
    );
    this.setTable(apiResult.data.paginationMetadata);
  }

  setTable(pageApi: any) {
    const pagination = JSON.parse(pageApi);
    this.allrows = pagination.totalCount;
  }

  getMatchString() {
    return `?addValue=${this.buyrequirement.addValue.toString()}&bathroom=${this.buyrequirement.bathroom.toString()}&bedroom=${this.buyrequirement.bedroom.trim()}
            &city=${this.buyrequirement.city.toString()}&exterior=${this.buyrequirement.exterior.toString()}&garaging=${this.buyrequirement.garaging.toString()}
            &land=${this.buyrequirement.land.toString()}&budgetRange=${this.buyrequirement.budgetRange.toString()}&property_Type=${this.buyrequirement.propertyType.toString()}&roof=${this.buyrequirement.roof.toString()}
            &school_Zone=${this.buyrequirement.schoolZone.toString()}&streetName=${this.buyrequirement.streetName.toString()}&subdivision=${this.buyrequirement.subdivision.toString()}
            &suburb=${this.buyrequirement.suburb.toString()}&title=${otherFunctions.transferTitleToDataTitle(
      otherFunctions.stringToArr(this.buyrequirement.title)
    )}`;
  }

  getRangString(range: string) {
    return range.replace(",", " to ");
  }

  getThousNum(range: string) {
    let rangearr = otherFunctions.stringToArr(range);
    let range1 = otherFunctions.moneyFormat(rangearr[0], false);
    let range2 = otherFunctions.moneyFormat(rangearr[1], false);
    return `${range1} to ${range2}`;
  }

  getMoneyNum(range: string) {
    let rangearr = otherFunctions.stringToArr(range);
    let range1 = otherFunctions.moneyFormat(rangearr[0], true);
    let range2 = otherFunctions.moneyFormat(rangearr[1], true);
    return `${range1} to ${range2}`;
  }

  async chooseProperty(property: any) {
    /*let index = await otherFunctions.findPropertyIndex(
      this.matchedProperties[property].propertyId
    );*/

    const store_properties = store.state.searcherProperties;
    store_properties[0] = this.matchedProperties[property];
    store.commit("savePropertiesSearchResult", store_properties);
    store.commit("saveProperty", 0);
    this.$router.push("propertyshow").catch((err) => {
      err;
    });
  }
}
</script>

<style scoped>
.rows {
  display: flex;
}
.rowlabel {
  width: 50%;
}
.customerBYmatch {
  margin: 1rem 1rem 2rem 1rem;
}
#matchTitle {
  font-weight: bold;
  text-align: left;
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
}
</style>
