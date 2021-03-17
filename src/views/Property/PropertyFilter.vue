<template>
  <div>
    <div id="PropertyFilter_background">
      <form>
        <div class="form-lineone">
          <div class="form-group form-lineonebox">
            <label class="filtertext">Property Type</label>
            <Multiselect
              v-model="property_type"
              :options="property_type_options"
              multiple
            ></Multiselect>
          </div>
          <div class="form-group form-lineonebox">
            <label class="filtertext">Title</label>
            <Multiselect
              v-model="property_title"
              :options="title_options"
              multiple
            ></Multiselect>
          </div>
          <div class="form-group form-lineonebox">
            <label class="filtertext">Status</label>
            <Multiselect
              v-model="property_status"
              :options="status_options"
              multiple
            ></Multiselect>
          </div>
        </div>
        <div class="form-addressbox">
          <label class="addresstitle">Address</label>
        </div>
        <div class="form-addressbox form-group">
          <div class="numberbox">
            <b-form-input
              list="my-list-id"
              v-model="streetName"
              placeholder="Street name"
              v-on:input="googleAddressUpdate"
            ></b-form-input>
            <datalist id="my-list-id">
              <option v-for="(size, index) in googleaddresses" :key="index">
                {{ size }}
              </option>
            </datalist>
            <small class="form-text addresstext"
              >street1/street2/street3/..</small
            >
          </div>
          <div class="numberbox">
            <input class="form-control" placeholder="suburb" v-model="Suburb" />
            <small class="form-text addresstext"
              >suburb1/suburb2/suburb3/..</small
            >
          </div>
          <div class="numberbox">
            <input class="form-control" placeholder="city" v-model="city" />
            <small class="form-text addresstext">city1/city2/city3/..</small>
          </div>
        </div>
        <div class="form-numberbox">
          <div class="form-numberbox-responsive">
            <div class="numberinput">
              <label class="numbertext" style="margin-right: 10px; width: 100px"
                >Bedroom:</label
              >
              <input
                class="numberchoose"
                style="width: 80px"
                placeholder="0"
                v-model="bedroom[0]"
              />
              <label class="numbertext" style="margin: 0 10px 0 10px">to</label>
              <input
                class="numberchoose"
                style="width: 80px"
                placeholder="0"
                v-model="bedroom[1]"
              />
            </div>
            <div class="numberinput">
              <label class="numbertext" style="margin-right: 10px; width: 100px"
                >Bathroom:</label
              >
              <input
                class="numberchoose"
                style="width: 80px"
                placeholder="0"
                v-model="bathroom[0]"
              />
              <label class="numbertext" style="margin: 0 10px 0 10px">to</label>
              <input
                class="numberchoose"
                style="width: 80px"
                placeholder="0"
                v-model="bathroom[1]"
              />
            </div>
          </div>
          <div class="form-numberbox-responsive">
            <div class="numberinput">
              <label class="numbertext" style="margin-right: 10px; width: 100px"
                >Land:</label
              >
              <input
                class="numberchoose"
                style="width: 80px"
                placeholder="0"
                v-model="land[0]"
                v-on:input="getThousNum(land[0], 'land0')"
              />
              <label class="numbertext" style="margin: 0 10px 0 10px">to</label>
              <input
                class="numberchoose"
                style="width: 80px"
                placeholder="0"
                v-model="land[1]"
                v-on:input="getThousNum(land[1], 'land1')"
              />
            </div>
            <div class="numberinput">
              <label class="numbertext" style="margin-right: 10px; width: 100px"
                >Budget:</label
              >
              <input
                class="numberchoose"
                style="width: 80px"
                v-model="budget[0]"
                v-on:input="getThousNum(budget[0], 'budget0')"
              />
              <label class="numbertext" style="margin: 0 10px 0 10px">to</label>
              <input
                class="numberchoose"
                style="width: 80px"
                v-model="budget[1]"
                v-on:input="getThousNum(budget[1], 'budget1')"
              />
            </div>
          </div>
          <div class="form-numberbox-responsive">
            <div class="numberinput" id="cvinput">
              <label class="numbertext" style="margin-right: 10px; width: 100px"
                >CV:</label
              >
              <input
                class="numberchoose"
                style="width: 80px"
                placeholder="0"
                v-model="cv[0]"
                v-on:input="getThousNum(cv[0], 'cv0')"
              />
              <label class="numbertext" style="margin: 0 10px 0 10px">to</label>
              <input
                class="numberchoose"
                style="width: 80px"
                placeholder="0"
                v-model="cv[1]"
                v-on:input="getThousNum(cv[1], 'cv1')"
              />
            </div>
            <div>
              <b-button id="optionbutton" @click="showoption()"
                >options</b-button
              >
            </div>
          </div>
        </div>
        <div v-if="optionshow">
          <div class="form-linethree">
            <div class="form-group form-optionbox">
              <label class="filtertext">Exterior</label>
              <Multiselect
                v-model="property_exterior"
                :options="property_exterior_options"
                multiple
              ></Multiselect>
            </div>
            <div class="form-group form-optionbox">
              <label class="filtertext">Roof</label>
              <Multiselect
                v-model="property_roof"
                :options="property_roof_options"
                multiple
              ></Multiselect>
            </div>
          </div>
          <div class="form-linethree">
            <div class="form-group form-optionbox">
              <label class="filtertext">Garaging</label>
              <Multiselect
                v-model="property_garaging"
                :options="property_garaging_options"
                multiple
              ></Multiselect>
            </div>
            <div class="form-group form-optionbox">
              <label class="filtertext">School Zone</label>
              <Multiselect
                v-model="property_schoolzone"
                :options="property_schoolzone_options"
                multiple
              ></Multiselect>
            </div>
          </div>
          <div class="form-numberbox">
            <div class="numberinput">
              <label class="filtertext" style="font-size: large"
                >Add Value:
              </label>
              <div class="form-check form-check-inline checkbox">
                <input
                  class="form-check-input boolchoose"
                  type="radio"
                  name="addvaluebox"
                  id="addvaluebox1"
                  value="true"
                  @click="getAddVaule"
                />
                <label class="form-check-label boolchoose" for="addvaluebox1"
                  >true</label
                >
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input boolchoose"
                  type="radio"
                  name="addvaluebox"
                  id="addvaluebox2"
                  value="false"
                  @click="getAddVaule"
                />
                <label class="form-check-label boolchoose" for="addvaluebox2"
                  >false</label
                >
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input boolchoose"
                  type="radio"
                  name="addvaluebox"
                  id="addvaluebox3"
                  value="null"
                  @click="getAddVaule"
                />
                <label class="form-check-label boolchoose" for="addvaluebox3"
                  >N/A</label
                >
              </div>
            </div>
            <div class="numberinput">
              <label class="filtertext" style="font-size: large"
                >Subdivision:
              </label>
              <div class="form-check form-check-inline checkbox">
                <input
                  class="form-check-input boolchoose"
                  type="radio"
                  name="subdivisionbox"
                  id="subdivisionbox1"
                  value="true"
                  @click="getSubdivision"
                />
                <label class="form-check-label boolchoose" for="subdivisionbox1"
                  >true</label
                >
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input boolchoose"
                  type="radio"
                  name="subdivisionbox"
                  id="subdivisionbox2"
                  value="false"
                  @click="getSubdivision"
                />
                <label class="form-check-label boolchoose" for="subdivisionbox2"
                  >false</label
                >
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input boolchoose"
                  type="radio"
                  name="subdivisionbox"
                  id="subdivisionbox3"
                  value="null"
                  @click="getSubdivision"
                />
                <label class="form-check-label boolchoose" for="subdivisionbox3"
                  >N/A</label
                >
              </div>
            </div>
          </div>
        </div>
        <div style="width: 100%; text-align: center">
          <b-button
            style="width: 20%; background-color: green"
            @click="searchProperties(1, localPerPage)"
            >Search</b-button
          >
        </div>
      </form>
    </div>
    <VLoadding :ifshow="loading.ifshow" />
    <div v-if="!loading.ifshow">
      <div style="display: flex; background-color: #101010; margin-top: 1rem">
        <div
          style="
            display: flex;
            margin-left: 70%;
            margin-top: 0.8rem;
            float: right;
          "
        >
          <label class="filtertext" style="margin-right: 10px"
            >Sequence</label
          >
          <b-form-checkbox
            id="checkbox-1"
            v-model="ifSequence"
            name="checkbox-1"
            value="true"
            unchecked-value="false"
          >
          </b-form-checkbox>
        </div>
        <div
          style="
            display: flex;
            margin-left: 2%;
            margin-top: 0.8rem;
            float: right;
          "
        >
          <label class="filtertext" style="margin-right: 10px"
            >Mail Merge</label
          >
          <b-form-checkbox
            id="checkbox-2"
            v-model="ifMailmerge"
            name="checkbox-2"
            value="true"
            unchecked-value="false"
          >
          </b-form-checkbox>
        </div>
        <div
          style="
            display: flex;
            margin-left: 2%;
            margin-top: 0.8rem;
            float: right;
          "
        >
          <label class="filtertext" style="margin-right: 10px"
            >Text Merge</label
          >
          <b-form-checkbox
            id="checkbox-3"
            v-model="ifTextmerge"
            name="checkbox-3"
            value="true"
            unchecked-value="false"
          >
          </b-form-checkbox>
        </div>
      </div>
      <div v-if="ifshowchooseTable & ifshowTextTable">
        <VTable
          :items="properties"
          :fields="propertyfield"
          :rows="allrows"
          :perPage="localPerPage"
          :pagination="true"
          :tableName="'property'"
          :currentPage="cPage"
          @passValue="chooseProperty"
          @passPage="searchProperties"
        />
      </div>

      <div v-if="!ifshowchooseTable">
        <VSelectMailTable
          :selectAll="true"
          :ifMail="true"
          :items="properties"
          :fields="propertyfield"
          :mailTemplateSelection="mailtemplateSelections"
          :rows="allrows"
          :perPage="localPerPage"
          :pagination="true"
          :currentPage="cPage"
          :download="true"
          @passValue="openmail"
          @passPage="searchProperties"
        />
      </div>
      <div v-if="!ifshowTextTable">
        <VSelectMailTable
          :selectAll="true"
          :items="properties"
          :fields="propertyfield"
          :mailTemplateSelection="mailtemplateSelections"
          :rows="allrows"
          :perPage="localPerPage"
          :pagination="true"
          :currentPage="cPage"
          @passValue="openText"
          @passPage="searchProperties"
        />
      </div>
      <MailBox
        :idstring="'mailbox'"
        :titlestring="'Mail'"
        :template="mailtemplate"
        :mailto="mailToString"
        :nameString="mailNameString"
        :mailresult="mailResult"
        :ifloading="ifloadingMail"
        @passValue="sendmail"
      />
      <TextBox
        :idstring="'textbox'"
        :titlestring="'Text'"
        :textto="textToString"
        :textresult="textResult"
        :ifloading="ifloadingText"
        @passValue="sendSMS"
      />
    </div>
  </div>
</template>

<script>
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import VTable from "@/components/VTable.vue";
import Multiselect from "vue-multiselect";
import propertyApi from "@/api/propertyApi";
import store from "@/store";
import smsApi from "../../api/smsAPI";
import {
  propertyTypeOptions,
  titleOptions,
  statusOptions,
  propertyExteriorOptions,
  propertyRoofOptions,
  propertyGaragingOptions,
  propertySchoolZoneOptions,
  propertyfield,
} from "../../../data/options_data";
import otherFunctions from "../../../functions/otherFunctions";
import VSelectMailTable from "@/components/VSelectMailTable.vue";
import MailBox from "@/components/MailComponents/MailBox.vue";
import googleApi from "../../api/googleAPI";
import googleMapApi from "../../api/googleMapApi";
import VLoadding from "@/components/VLoadding.vue";
import LoadModel from "../../../db-models/loaddingModel";
import modelCreate from "../../../db-models/modelCreate";
import { Client } from "@googlemaps/google-maps-services-js";
import TextBox from "@/components/MailComponents/TextBox.vue";
import { insertRightPage } from "../../../functions/publicFn";

@Component({
  components: {
    VTable,
    Multiselect,
    VSelectMailTable,
    MailBox,
    VLoadding,
    TextBox,
  },
})
export default class PropertyFilter extends Vue {
  cPage = 1;
  allrows = 0;
  localPerPage = 10;

  streetName = "";
  Suburb = "";
  city = "";
  bedroom = [0, 0];
  bathroom = [0, 0];
  land = [0, 0];
  cv = [0, 0];
  budget = [0, 0];
  property_type = [];
  property_title = [];
  property_status = [];
  property_exterior = [];
  property_roof = [];
  property_garaging = [];
  property_schoolzone = [];

  property_type_options = [];
  title_options = [];
  status_options = [];
  property_exterior_options = [];
  property_roof_options = [];
  property_garaging_options = [];

  property_schoolzone_options;
  addvalue = "";
  subdivision = "";
  optionshow = false;
  properties = [];
  propertyfield = propertyfield;

  ifMailmerge = false;
  ifshowchooseTable = true;
  ifTextmerge = false;
  ifshowTextTable = true;
  ifSequence = false

  mailtemplateSelections;
  mailtemplate = "";
  mailToString = "";
  mailNameString = "";
  mailResult = "ini";

  loading = new LoadModel();

  ifloadingMail = "false";
  ifloadingText = "false";

  textToString = "";
  textResult = "ini";

  googleaddresses = [];

  async created() {
    this.property_schoolzone_options = await propertySchoolZoneOptions();
    this.property_schoolzone_options.sort();

    this.property_type_options = await propertyTypeOptions();
    this.title_options = await titleOptions();
    this.status_options = await statusOptions();
    this.property_exterior_options = await propertyExteriorOptions();
    this.property_roof_options = await propertyRoofOptions();
    this.property_garaging_options = await propertyGaragingOptions();

    this.cPage = store.state.page;
    this.properties = store.state.searcherProperties;
    this.mailtemplateSelections = await otherFunctions.getMailTemplateOptions();
    this.googleaddresses = [];
  }

  showoption() {
    this.optionshow = !this.optionshow;
  }

  @Watch("ifMailmerge")
  showDifferentTable() {
    this.ifshowchooseTable = this.ifMailmerge == "true" ? false : true;
    if (this.ifMailmerge == "true") {
      this.ifTextmerge = "false";
    }
  }

  @Watch("ifTextmerge")
  showDifferentTextTable() {
    this.ifshowTextTable = this.ifTextmerge == "true" ? false : true;
    if (this.ifTextmerge == "true") {
      this.ifMailmerge = "false";
    }
  }

  @Watch("googleaddresses")
  seprateAddress() {
    if (
      this.googleaddresses.length == 1 &&
      this.googleaddresses[0] != "loadding..."
    ) {
      let allAddress = this.googleaddresses[0].split(",");
      this.streetName = allAddress[0];
      this.Suburb = allAddress[1];
      this.city = allAddress[2];
    }
  }

  async searchProperties(PageNum, PageSize) {
    this.localPerPage = PageSize;
    this.loading.show();
    this.cPage = PageNum;
    store.commit("savePropertySearchURL", this.getAPIString());
    const urlValue = `${this.getAPIString()}&PageNum=${PageNum}&PageSize=${PageSize}`;
    const apiResult = await propertyApi.getProperties(urlValue);
    this.properties = insertRightPage(
      PageNum,
      PageSize,
      modelCreate.getPropperties(apiResult.data.property)
    );
    this.setTable(apiResult.data.paginationMetadata);
    this.properties.forEach((value) => {
      value.cv = otherFunctions.moneyFormat(value.cv);
      value.land = otherFunctions.moneyFormat(value.land);
    });
    if (this.properties.length != undefined) {
      this.rows = this.properties.length;
    }
    this.loading.disappear();
    store.commit("savePropertiesSearchResult", this.properties);
    store.commit("savePage", PageNum);
    store.commit("saveSize", PageSize);
  }

  setTable(pageApi) {
    const pagination = JSON.parse(pageApi);
    this.allrows = pagination.totalCount;
  }

  chooseProperty(propertyIndex) {
    store.commit("saveProperty", propertyIndex);
    this.$router.push("propertyshow").catch((err) => {
      err;
    });
  }

  getThousNum(num, type) {
    let result = 0;
    switch (type) {
      case "budget0":
        this.budget[0] = otherFunctions.moneyFormat(
          otherFunctions.moneyRemoveFormat(this.budget[0])
        );
        break;
      case "budget1":
        this.budget[1] = otherFunctions.moneyFormat(
          otherFunctions.moneyRemoveFormat(this.budget[1])
        );
        break;
      case "land0":
        this.land[0] = otherFunctions.moneyFormat(
          otherFunctions.moneyRemoveFormat(this.land[0])
        );
        break;
      case "land1":
        this.land[1] = otherFunctions.moneyFormat(
          otherFunctions.moneyRemoveFormat(this.land[1])
        );
        break;
      case "cv0":
        this.cv[0] = otherFunctions.moneyFormat(
          otherFunctions.moneyRemoveFormat(this.cv[0])
        );
        break;
      case "cv1":
        this.cv[1] = otherFunctions.moneyFormat(
          otherFunctions.moneyRemoveFormat(this.cv[1])
        );
        break;
    }
  }

  getAPIString() {
    return `?status=${this.getString(
      this.property_status
    )}&title=${otherFunctions.transferTitleToDataTitle(
      this.property_title
    )}&property_Type=${this.getString(
      this.property_type
    )}&exterior=${this.getString(this.property_exterior)}
    &roof=${this.getString(this.property_roof)}&garaging=${this.getString(
      this.property_garaging
    )}&land=${this.getThousFormatNumberString(
      this.land
    )}&cv=${this.getThousFormatNumberString(
      this.cv
    )}&bedroom=${this.getNumberString(this.bedroom)}
    &bathroom=${this.getNumberString(
      this.bathroom
    )}&budgetRange=${this.getThousFormatNumberString(
      this.budget
    )}&streetname=${this.getAddress(this.streetName)}&suburb=${this.getAddress(
      this.Suburb
    )}&city=${this.getAddress(this.city)}
    &school_zone=${this.getString(
      this.property_schoolzone
    )}&addValue=${this.addvalue.toString()}&subdivision=${this.subdivision.toString()}&orderBy=${this.ifSequence.toString()}`;
  }

  getAddVaule(event) {
    this.addvalue = event.target.value;
  }

  getSubdivision(event) {
    this.subdivision = event.target.value;
  }

  getString(attarr) {
    let result = " ";
    if (attarr.length != 0) {
      attarr.forEach((value) => {
        result += value + ",";
      });
    }
    return result.substring(0, result.length - 1).trim();
  }

  getNumberString(numarr) {
    let result = " ";
    if (!(numarr[0] == 0 && numarr[1] == 0)) {
      result = `${numarr[0]},${numarr[1]}`;
    }
    return result;
  }

  getThousFormatNumberString(numarr) {
    let result = " ";
    if (!(numarr[0] == 0 && numarr[1] == 0)) {
      result = `${otherFunctions.moneyRemoveFormat(
        numarr[0]
      )},${otherFunctions.moneyRemoveFormat(numarr[1])}`;
    }
    return result;
  }

  getAddress(address) {
    let addarr = address.split("/");
    let result = " ";
    if (addarr.length != 0) {
      addarr.forEach((value) => {
        result += value + ",";
      });
    }
    return result.substring(0, result.length - 1).trim();
  }

  async openmail(data, mailtemlate) {
    this.mailtemplate = mailtemlate;

    if (data[0] != "all") {
      let result = await otherFunctions.getcustomeremailsByProperty(data);
      store.commit("saveSelectedItem", []);
      this.mailToString = result.tostring;
      this.mailNameString = result.namestring;
    } else {
      //
      const apiResult = await propertyApi.getPropertiesMessage(
        this.getAPIString()
      );
      this.mailToString = apiResult.mailToString;
      this.mailNameString = apiResult.mailNameString;
      store.commit("saveSelectedItem", []);
    }

    this.$bvModal.show("mailbox");
  }

  async openText(data) {
    if (data[0] != "all") {
      this.textToString = await otherFunctions.getcustomerphonesByProperty(data);
    } else {
      //
      const apiResult = await propertyApi.getPropertiesMessage(
        this.getAPIString()
      );
      this.textToString = apiResult.phoneString;
    }
    store.commit("saveSelectedItem", []);
  }

  async sendmail(obj) {
    this.mailResult = "ini";
    let emailbodys = {
      fromname: store.state.loginTeam.teamName,
      fromemail: store.state.loginTeam.teamId,
      tonamearr: obj.nameArray,
      toemailarr: obj.toarr,
      subject: obj.subject,
      context: obj.context,
      attachment: obj.attachment,
    };
    this.ifloadingMail = "true";
    let result = await googleApi.sendEmails(emailbodys);
    this.ifloadingMail = "false";
    this.mailResult = result == 200 ? "true" : "false";
  }

  async sendSMS(obj) {
    this.textResult = "ini";
    const phoneNumber = obj.to.split(";");
    const textObj = [];
    let result;
    this.ifloadingText = "true";
    for (let i = 0; i < phoneNumber.length - 1; i++) {
      const textBody = {
        message: obj.context,
        to: "64" + phoneNumber[i],
        from: "64272091817",
      };
      result = await smsApi.sendSMS(textBody);
    }
    this.ifloadingText = "false";
    this.textResult = result == 200 ? "true" : "false";
  }

  async googleAddressUpdate() {
    this.googleaddresses = ["loadding..."];
    let resultArr = [];
    let result = await googleMapApi.getGoogleAddress(this.streetName);
    result.predictions.forEach((a) => {
      resultArr.push(a.description);
    });
    this.googleaddresses = resultArr;
  }
}
</script>
<style>
.form-lineonebox {
  width: 33%;
  margin: 1rem;
}
.form-numberbox {
  margin: 1rem 1rem 0 1rem;
  display: flex;
}
.form-lineone {
  display: flex;
}
#PropertyFilter_background {
  background-color: #0074d9;
}
.form-addressbox {
  margin-left: 1rem;
  display: flex;
}
.addresstext {
  float: left;
  color: white;
}
.addresstitle {
  float: left;
  color: white;
  font-size: large;
}
.numberchoose {
  height: 25px;
  width: 35px;
}
.boolchoose {
  height: 20px;
  width: 30px;
}
.numbertext {
  float: left;
  color: white;
  font-size: large;
}
.numberinput {
  display: flex;
  width: 100%;
}
.numberbox {
  width: 34%;
  margin-right: 1.5rem;
}
#optionbutton {
  float: right;
  margin-bottom: 1rem;
  margin-left: 10px;
}
.form-optionbox {
  width: 50%;
  margin: 0 1rem 0 1rem;
}
.checkbox {
  margin-left: 2rem;
}
.form-check-label {
  color: white;
  font-size: large;
}
.form-numberbox-responsive {
  display: inline;
  width: 33%;
}

.form-linethree {
  display: flex;
}

/* ipad */
@media screen and (max-width: 1200px) {
  .form-numberbox {
    display: inline;
  }
  .form-numberbox-responsive {
    display: flex;
    width: 100%;
  }
  #cvinput {
    width: 90%;
  }
}
/* phone */
@media screen and (max-width: 595px) {
  .form-numberbox-responsive {
    display: inline;
    width: 100%;
  }
  .form-lineone {
    display: inline;
  }
  .form-lineonebox {
    width: 90%;
  }
  .form-linethree {
    display: inline;
  }
  .form-optionbox {
    width: 90%;
  }
}
</style>
