<template>
  <div>
    <div id="customerFilter_background">
      <form id="customerFilter">
        <div class="form-group" style="width: 25%; margin-left: 1rem">
          <label class="filtertext">Team</label>
          <div>
            <select class="custom-select inputbox" v-model="teamId">
              <option
                v-for="member in this.teamSelection"
                :key="member.index"
                :value="member.value"
              >
                {{ member.text }}
              </option>
            </select>
          </div>
        </div>
        <div class="form-group" style="width: 25%; margin-left: 1rem">
          <label class="filtertext">User</label>
          <div>
            <select class="custom-select inputbox" v-model="userId">
              <option
                v-for="member in this.userSelection"
                :key="member.index"
                :value="member.value"
              >
                {{ member.text }}
              </option>
            </select>
          </div>
        </div>
        <div class="form-group" style="width: 25%; margin-left: 1rem">
          <label class="filtertext">Time After</label>
          <div>
            <el-date-picker
              class="inputbox"
              v-model="timerange"
              type="date"
              placeholder="select"
            >
            </el-date-picker>
          </div>
        </div>
        <div
          class="form-group"
          style="width: 25%; margin-left: 1rem; display: flex; margin-top: 2rem"
        >
          <label class="filtertext" style="margin-right: 10px">Archive</label>
          <div>
            <b-form-checkbox
              id="checkbox-1"
              v-model="ifArchive"
              name="checkbox-1"
              value="true"
              unchecked-value="false"
            >
            </b-form-checkbox>
          </div>
        </div>
      </form>
      <div>
        <b-button
          style="background-color: #dc143c; width: 20%; margin-left: 70%"
          @click="searchLead(1, 10)"
          >Search</b-button
        >
      </div>
    </div>
    <VLoadding :ifshow="loading.ifshow" />
    <div v-if="!loading.ifshow">
      <VTableButton
        :items="lead"
        :fields="leadOptions"
        :rows="allrows"
        :perPage="10"
        :pagination="true"
        :currentPage="cPage"
        @addValue="addClient"
        @archiveValue="archiveClient"
        @passPage="searchLead"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import otherFunctions from "../../../functions/otherFunctions";
import leadApi from "@/api/leadApi";
import { leadOptions } from "../../../data/options_data";
import VTableButton from "@/components/VTableButton.vue";
import Multiselect from "vue-multiselect";
import VLoadding from "@/components/VLoadding.vue";
import LoadModel from "../../../db-models/loaddingModel";
import { insertRightPage } from "../../../functions/publicFn";
import modelCreate from "../../../db-models/modelCreate";
import {
  getStoreUser,
  getUserSelection,
} from "../../../db-models/db-userManagement";
import { getTeamSelection } from "../../../db-models/db-team";
import store from "@/store";

@Component({
  components: {
    VTableButton,
    VLoadding,
  },
})
export default class LeadFilter extends Vue {
  private cPage = 1;
  private allrows = 0;
  private userId = "";
  private teamId = "";
  private timerange = new Date("2010-01-01");
  private ifArchive = false;
  private lead: any[] = [];
  private rows = 0;
  private teamSelection = [{ value: "Team1", text: "Team1" }];

  private userSelection = [{ value: "User1", text: "User1" }];
  private leadOptions = leadOptions;

  private loading = new LoadModel();

  private ifAdmin = false;
  private ifTeamManager = false;

  async created() {
    this.setRole()
    const storeUser = getStoreUser();
    if (this.ifAdmin && this.ifTeamManager) {
      this.teamSelection = await getTeamSelection();
      this.teamId = this.teamSelection[0].value;
      this.userSelection = await getUserSelection(storeUser.teamId);
      this.userId = this.userSelection[0].value;
    }else if(!this.ifAdmin && this.ifTeamManager){
      this.teamSelection = [{ value: storeUser.teamId, text: storeUser.teamId }];
      this.teamId = this.teamSelection[0].value;
      this.userSelection = await getUserSelection(storeUser.teamId);
      this.userId = this.userSelection[0].value;
    }else{
      this.teamSelection = [{ value: storeUser.teamId, text: storeUser.teamId }];
      this.teamId = this.teamSelection[0].value;
      this.userSelection = [{ value: storeUser.email, text: storeUser.email }];
      this.userId = this.userSelection[0].value;
    }
  }

  setRole() {
    const user: any = store.state.loginUser;
    const role = user.role;
    if (role == "Administer") {
      this.ifAdmin = true;
      this.ifTeamManager = true;
    } else if (role == "TeamManager") {
      this.ifAdmin = false;
      this.ifTeamManager = true;
    } else {
      this.ifAdmin = false;
      this.ifTeamManager = false;
    }
  }

  getMatchString() {
    let datastring = `${this.timerange.getFullYear()}-${
      this.timerange.getMonth() + 1
    }-${this.timerange.getDate()}`;
    return `?TeamID=${this.teamId.toString()}&UserID=${this.userId.toString()}&Archive=${
      this.ifArchive
    }&TimeAfter=${datastring}`;
  }

  async searchLead(PageNum: number, PageSize: number) {
    this.loading.show();
    this.cPage = PageNum;
    const urlValue = `${this.getMatchString()}&PageNum=${PageNum}&PageSize=${PageSize}`;
    const apiResult = await leadApi.getLeads(urlValue);
    this.lead = insertRightPage(
      PageNum,
      PageSize,
      modelCreate.getleads(apiResult.data.leads)
    );
    this.setTable(apiResult.data.paginationMetadata);
    this.loading.disappear();
  }

  setTable(pageApi: any) {
    const pagination = JSON.parse(pageApi);
    this.allrows = pagination.totalCount;
  }

  async addClient(obj: any) {
    let result = await leadApi.deletelead(obj);
    if (result.status == 200) {
      await this.searchLead(1, 10);
    }
  }
  async archiveClient(obj: any) {
    let result = await leadApi.updateLeadArchive(true, obj);
    if (result.status == 201) {
      await this.searchLead(1, 10);
    }
  }
}
</script>

<style scoped></style>
