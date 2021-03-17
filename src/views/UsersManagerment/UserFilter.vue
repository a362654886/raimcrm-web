<template>
  <div>
    <div>
      <div id="customerFilter_background" style="margin-top: 1rem">
        <form id="customerFilter" style="margin-right: 1rem; margin-top: 1rem">
          <div class="form-group" style="width: 25%; margin-left: 1rem">
            <div>
              <label class="filtertext" id="customername">Name</label>
              <div style="display: flex">
                <input
                  class="form-control"
                  placeholder="First Name"
                  v-model="firstnameFilter"
                />
                <input
                  class="form-control"
                  placeholder="Middle Name"
                  v-model="lastnameFilter"
                />
              </div>
            </div>
          </div>
          <div class="form-group" style="width: 25%; margin-left: 1rem">
            <label class="filtertext">Email</label>
            <input
              class="form-control"
              placeholder="Customer Email"
              v-model="emailFilter"
            />
          </div>
          <div class="form-group" style="width: 25%; margin-left: 1rem">
            <label class="filtertext">Role</label>
            <div>
              <select class="custom-select inputbox" v-model="role">
                <option
                  v-for="member in this.roleBox"
                  :key="member.index"
                  :value="member.value"
                >
                  {{ member.value }}
                </option>
              </select>
            </div>
          </div>
          <div class="form-group" style="width: 25%; margin-left: 1rem">
            <label class="filtertext">Team</label>
            <div>
              <select class="custom-select inputbox" v-model="teamId">
                <option
                  v-for="(member, index) in this.teamSelection"
                  :key="index"
                  :value="member.value"
                >
                  {{ member.text }}
                </option>
              </select>
            </div>
          </div>
        </form>
        <div>
          <b-button
            style="background-color: #dc143c; width: 20%"
            @click="searchUser"
            >Search</b-button
          >
        </div>
      </div>
      <VTable
        :items="users"
        :fields="userfield"
        :rows="rows"
        :perPage="10"
        :pagination="true"
        @passValue="chooseUser"
      />
    </div>
  </div>
</template>

<script>
import { Component, Prop, Vue } from "vue-property-decorator";
import VTable from "@/components/VTable.vue";
import UserApi from "../../api/UserApi";
import { userfield } from "../../../data/options_data";
import { roleBox } from "../../../data/options_data";
import teamApi from "@/api/teamApi";

@Component({
  components: {
    VTable,
  },
})
export default class UserFilter extends Vue {
  users = [];
  userfield = userfield;
  rows = 0;
  firstnameFilter = "";
  lastnameFilter = "";
  emailFilter = "";
  role = "";
  roleBox = roleBox;
  teamId = "";
  teamSelection = [];

  async created() {
    this.users = await this.searchUser()
    let teamids = await teamApi.getTeamIds();
    if (teamids.status == 200) {
      for (let i = 0; i < teamids.data.length; i++) {
        let teamid = {
          value: teamids.data[i].team_ID,
          text: teamids.data[i].team_ID,
        };
        this.teamSelection.push(teamid);
      }
    }
  }

  chooseUser(user) {
    this.$emit("updateUser", this.users[user]);
  }

  async searchUser() {
    this.users = await UserApi.getFilterUsers(
      `?FirstName=${this.firstnameFilter}&LastName=${this.lastnameFilter}&Email=${this.emailFilter}&Role=${this.role}&Team=${this.teamId}`
    );
  }
}
</script>

<style scoped></style>
