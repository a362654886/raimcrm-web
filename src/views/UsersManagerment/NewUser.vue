<template>
  <div>
    <VAlert :text="alert.text" :type="alert.type" :ifshow="alert.ifshow" />
    <div>
      <div class="newUser">
        <VInput
          class="newUserBox"
          :titleWidth="'width:150px'"
          :textWidth="'width:250px'"
          :labelstring="'Email'"
          :contextstring="newUser.email"
          :inputtype="'newUserEmail'"
          :type="'input'"
          @fieldChanged="selectChange"
        />
        <VInput
          class="newUserBox"
          :titleWidth="'width:150px'"
          :textWidth="'width:250px'"
          :labelstring="'Full Name'"
          :contextstring="newUser.name"
          :inputtype="'newUserName'"
          :type="'input'"
          @fieldChanged="selectChange"
        />
        <VInput
          class="newUserBox"
          :titleWidth="'width:150px'"
          :textWidth="'width:250px'"
          :labelstring="'Role'"
          :contextstring="newUser.role"
          :inputtype="'newUserRole'"
          :type="'select'"
          :selectOption="rolebox"
          @fieldChanged="selectChange"
        />
        <div style="display: flex">
          <p class="clientText" style="width: 170px">Team:</p>
          <select
            style="width: 45%; margin-left: 5%"
            class="custom-select inputbox"
            id="inputGroupSelect02"
            v-model="teamEmail"
          >
            <option
              v-for="(member, index) in this.teams"
              :key="index"
              :value="member.team_ID"
            >
              {{ member.team_ID }}
            </option>
          </select>
        </div>
      </div>
      <b-button style="width: 20%" @click="submitNewUser">Submit</b-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { getStoreUser, User } from "../../../db-models/db-userManagement";
import VAlert from "@/components/VAlert.vue";
import AlertModel from "../../../db-models/alertModel";
import VInput from "@/components/VInput.vue";
import { roleBox } from "../../../data/options_data";
import checkFunctions from "../../../functions/checkFunctions";
import { sendNewUserEmail } from "../../../functions/googleFn";
import mailTemplateApi from "../../api/mailTemplateApi";
import teamApi from "@/api/teamApi";
import userApi from "@/api/UserApi";
import googleAPI from "@/api/googleAPI";
import store from "@/store";
import { getStoreTeam, Team } from "../../../db-models/db-team";

@Component({
  components: {
    VAlert,
    VInput,
  },
})
export default class NewUser extends Vue {
  private alert = new AlertModel();
  private newUser = new User();
  private teamSelection: any = [];
  private rolebox = roleBox;
  private team: Team;
  private teams: any[] = [];
  private teamEmail = "";

  async created() {
    this.team = getStoreTeam();
    this.newUser.teamId = this.team.teamId;
    this.teams = await teamApi.getTeams();
    
    const storeUser = getStoreUser();
    const user: any = store.state.loginUser;
    const role = user.role;
    if (role == "Administer") {
      this.rolebox = [
        { value: "User", text: "User" },
        { value: "TeamManager", text: "TeamManager" },
        { value: "Administer", text: "Administer" },
      ];
    } else if (role == "TeamManager") {
      this.rolebox = [
        { value: "User", text: "User" },
        { value: "TeamManager", text: "TeamManager" }
      ];
      const oneTeam: any[] = []
      this.teams.forEach(t=>{
        if(t.team_ID == storeUser.teamId){
          oneTeam.push(t)
        }
      })
      this.teams = oneTeam
    } else {
      this.rolebox = [
        { value: "User", text: "User" },
      ];
    }
  }

  selectChange(obj: any) {
    switch (obj.type) {
      case "newUserEmail":
        this.newUser.email = obj.text;
        break;
      case "newUserName":
        this.newUser.name = obj.text;
        break;
      case "newUserRole":
        this.newUser.role = obj.text;
        break;
    }
  }

  async submitNewUser() {
    let checkresult = checkFunctions.checkUser(this.newUser);
    checkresult == true
      ? await this.addUser()
      : this.alert.showfail(checkresult, this.alert);
  }

  async addUser() {
    const newUser = {
      User_ID: this.newUser.email,
      Name: this.newUser.name,
      Password: "",
      Role: this.newUser.role,
      Team_ID: this.teamEmail,
      RefreshToken: "",
    };
    const result = await userApi.addUser(newUser);
    console.log(result)
    newUser.Password = result.data
    result.status == 200
      ? this.sendEmail(newUser)
      : this.alert.showfail("user already exist", this.alert);
  }

  async sendEmail(user: any) {
    let googleresult = await sendNewUserEmail(user);
    googleresult == 200
      ? this.success()
      : this.alert.showfail(
          "send email fail, please connect adminitor",
          this.alert
        );
  }

  success() {
    this.alert.showSuccess("success", this.alert);
    this.newUser = new User();
  }
}
</script>

<style scoped>
.newUser {
  width: 40%;
  margin: 0 auto;
  margin-top: 4rem;
}
.newUserBox {
  margin: 1rem auto;
}

.clientText {
  font-weight: bold;
  margin-top: 7px;
  display: flex;
}
</style>
