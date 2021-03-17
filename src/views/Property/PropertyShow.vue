<template>
  <div>
    <VAlert :text="alert.text" :type="alert.type" :ifshow="alert.ifshow" />
    <div class="arrows">
      <b-button style="float: left" v-if="showprebutton" @click="previousButton"
        >&laquo;</b-button
      >
      <b-button style="float: right" v-if="shownextbutton" @click="nextButton"
        >&raquo;</b-button
      >
    </div>
    <div
      style="
        color: white;
        height: 80px;
        padding-top: 13px;
        background-color: #0074d9;
        margin-left: 5%;
        margin-right: 5%;
        margin-top: 1rem;
        margin-bottom: 1rem;
      "
    >
      <h3>Property Information</h3>
      <h5>Address: {{ address }}</h5>
    </div>
    <div class="propertyShowbody">
      <div style="display: flex"></div>
      <div style="display: flex">
        <el-button
          class="editbutton"
          style="margin-left: 15px"
          type="success"
          icon="el-icon-plus"
          @click="addPropertyLabel()"
          >Google Label</el-button
        >
        <el-button
          class="editbutton"
          style="margin-left: 15px"
          type="success"
          icon="el-icon-sort"
          v-if="ifEditShow"
          @click="toTrade"
          >Trade</el-button
        >
        <el-button
          class="editbutton"
          style="margin-left: 2%"
          type="info"
          icon="el-icon-full-screen"
          v-if="ifEditShow"
          @click="toOpenday"
          >Open Day</el-button
        >
        <el-button
          class="editbutton"
          style="margin-left: 50%"
          type="danger"
          icon="el-icon-delete"
          @click="deleteProperty"
          >Delete</el-button
        >
      </div>
      <PropertyInfo v-if="ifEditShow" />
    </div>
  </div>
</template>

<script>
import { Component, Prop, Vue } from "vue-property-decorator";
import VTable from "@/components/VTable";
import VLabel from "@/components/VLabel";
import PropertyInfo from "@/components/propertyComponents/PropertyInfo";
import store from "@/store";
import VAlert from "@/components/VAlert.vue";
import propertyApi from "@/api/propertyApi";
import propertyLabelApi from "@/api/propertyLabelApi";
import otherFunctions from "../../../functions/otherFunctions";
import legalOwnerApi from "../../api/legalOwner";
import { insertRightPage } from "../../../functions/publicFn";
import modelCreate from "../../../db-models/modelCreate";
import googlePeopleApi from "../../api/googlePeopleApi";
import AlertModel from "../../../db-models/alertModel";

@Component({
  components: {
    VTable,
    VLabel,
    PropertyInfo,
    VAlert
  },
})
export default class PropertyShow extends Vue {
  ifEditShow = true;
  ifSaveShow = false;

  ifdelete = false;

  showprebutton = true;
  shownextbutton = true;

  address = "";
  alert = new AlertModel();

  created() {
    this.address =
      store.state.searcherProperties[store.state.showProperty].fullAddress;
    if (store.state.showProperty == 0) {
      this.showprebutton = false;
    } else {
      this.showprebutton = true;
    }

    if (store.state.showProperty == store.state.searcherProperties.length) {
      this.shownextbutton = false;
    } else {
      this.shownextbutton = true;
    }
  }

  async previousButton() {
    let index = store.state.showProperty - 1;
    store.commit("saveProperty", index);
    const pageNum = store.state.page;
    const pageSize = store.state.size;
    const lastNum = (pageNum - 1) * pageSize - 1;
    if (index == lastNum && pageNum > 1) {
      const urlValue = `${store.state.propertySearchURL}&PageNum=${
        pageNum - 1
      }&PageSize=${pageSize}`;
      const apiResult = await propertyApi.getProperties(urlValue);
      const properties = insertRightPage(
        pageNum - 1,
        pageSize,
        modelCreate.getPropperties(apiResult.data.property)
      );
      store.commit("savePropertiesSearchResult", properties);
      store.commit("savePage", pageNum - 1);
      store.commit("saveSize", pageSize);
    }
    this.$router
      .push({
        path: "propertyshow",
        query: {
          id: Math.ceil(Math.random() * 100),
        },
      })
      .catch((err) => {
        err;
      });
  }

  async nextButton() {
    let index = store.state.showProperty + 1;
    store.commit("saveProperty", index);
    const pageNum = store.state.page;
    const pageSize = store.state.size;
    const totalNum = pageNum * pageSize;
    if (index == totalNum) {
      const urlValue = `${store.state.propertySearchURL}&PageNum=${
        pageNum + 1
      }&PageSize=${pageSize}`;
      const apiResult = await propertyApi.getProperties(urlValue);
      const properties = insertRightPage(
        pageNum + 1,
        pageSize,
        modelCreate.getPropperties(apiResult.data.property)
      );
      store.commit("savePropertiesSearchResult", properties);
      store.commit("savePage", pageNum + 1);
      store.commit("saveSize", pageSize);
    }
    this.$router
      .push({
        path: "propertyshow",
        query: {
          id: Math.ceil(Math.random() * 100),
        },
      })
      .catch((err) => {
        err;
      });
  }

  showEdit() {
    this.ifEditShow = true;
    this.ifSaveShow = false;
  }
  showsave() {
    this.ifSaveShow = true;
    this.ifEditShow = false;
  }
  async deleteProperty() {
    let confirm = await otherFunctions.confirmBox(
      this,
      "Are you sure you want to delete this property?"
    );
    if (confirm == true) {
      let property = store.state.searcherProperties[store.state.showProperty];

      const index = otherFunctions.findPropertyIndex(property.propertyId);

      await legalOwnerApi.deleteLegalOwner(property.propertyId);
      await propertyLabelApi.deletePropertyLabel(property.propertyId);
      let result = await propertyApi.deleteProperty(property.propertyId);
      if (result == 200) {
        store.commit("saveProperty", 0);
        //
        const properties = store.state.searcherProperties;
        properties.splice(index, 1);
        store.commit("savePropertiesSearchResult", properties);
        //
        this.$router.push("propertyfilter").catch((err) => {
          err;
        });
      }
    }
  }

  async addPropertyLabel() {
    let property = store.state.searcherProperties[store.state.showProperty]
    let labelId = `${property.housenumer} ${property.streetName},${property.suburb},${property.city}`;
    let propertyLabelObj = await googlePeopleApi.postLabel(labelId, "");
    //add propertylabel
    const storeTeam = store.state.loginTeam;
    let labelResult = await propertyLabelApi.addPropertyLabel({
      PropertyLabelID: labelId,
      LabelName: propertyLabelObj.name,
      LabelNumber: propertyLabelObj.resourceName,
      Team_ID: storeTeam.teamId,
      Property_ID: property.propertyId,
    });

    if (labelResult.status == 200) {
      this.alert.showSuccess(
          "success",
          this.alert
        );
    }else{
      this.alert.showSuccess(
          "this label alreadt exist",
          this.alert
        );
    }
  }

  toTrade() {
    let property = store.state.searcherProperties[store.state.showProperty];
    store.commit("saveTradeProperty", property);
    this.$router.push("tradeadd").catch((err) => {
      err;
    });
  }

  toOpenday() {
    let property = store.state.searcherProperties[store.state.showProperty];
    store.commit("saveTradeProperty", property);
    let { href } = this.$router.resolve({
      path: `propertyOpenDay`,
      query: {
        Propertyid:property.propertyId
      },
    });
    window.open(href, "_blank");
  }


}
</script>

<style scoped>
.propertyShowbody {
  background-color: #f7f7f7;
  width: 90%;
  margin-left: 5%;
}
.editbutton {
  margin-left: 80%;
}
</style>
