<template>
  <div>
    <VAlert :text="alert.text" :type="alert.type" :ifshow="alert.ifshow" />
    <div>
      <div class="newUser">
        <div>
          <el-button
            style="margin-right: 99%"
            type="primary"
            icon="el-icon-back"
            circle
            @click="Back"
          ></el-button>
        </div>
        <VInput
          class="newUserBox"
          :titleWidth="'width:150px'"
          :textWidth="'width:250px'"
          :labelstring="'Email'"
          :contextstring="updateuser.email"
          :inputtype="'newUserEmail'"
          :type="'input'"
          :ifdisable="true"
          @fieldChanged="selectChange"
        />
        <VInput
          class="newUserBox"
          :titleWidth="'width:150px'"
          :textWidth="'width:250px'"
          :labelstring="'Password'"
          :contextstring="updateuser.password"
          :inputtype="'newUserPassword'"
          :type="'input'"
          @fieldChanged="selectChange"
        />
        <VInput
          class="newUserBox"
          :titleWidth="'width:150px'"
          :textWidth="'width:250px'"
          :labelstring="'Full Name'"
          :contextstring="updateuser.name"
          :inputtype="'newUserName'"
          :type="'input'"
          @fieldChanged="selectChange"
        />
        <VInput
          class="newUserBox"
          :titleWidth="'width:150px'"
          :textWidth="'width:250px'"
          :labelstring="'Role'"
          :contextstring="updateuser.role"
          :inputtype="'newUserRole'"
          :type="'select'"
          :selectOption="rolebox"
          @fieldChanged="selectChange"
        />
        <VInput
          class="newUserBox"
          :titleWidth="'width:150px'"
          :textWidth="'width:250px'"
          :labelstring="'Team'"
          :contextstring="updateuser.teamId"
          :inputtype="'newUserTeam'"
          :type="'select'"
          :selectOption="teamSelection"
          @fieldChanged="selectChange"
        />
      </div>
      <div>
        <b-button style="width: 20%; margin: 1rem" @click="submitNewUser"
          >Update</b-button
        >
        <b-button
          style="width: 20%"
          data-toggle="modal"
          data-target="#deleteModel"
          >Delete</b-button
        >
      </div>
      <VUserDataTransfer
        :idstring="'deleteModel'"
        :titlestring="'which user you want to transfer'"
        :teamId="updateuser.teamId"
        :iniUserId="updateuser.email"
        @delete="deleteUser"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { getStoreUser, User } from "../../../db-models/db-userManagement";
import VAlert from "@/components/VAlert.vue";
import AlertModel from "../../../db-models/alertModel";
import VInput from "@/components/VInput.vue";
import VUserDataTransfer from "@/components/VUserDataTransfer.vue";
import { roleBox } from "../../../data/options_data";
import checkFunctions from "../../../functions/checkFunctions";
import teamApi from "@/api/teamApi";
import userApi from "@/api/UserApi";
import store from "../../store";

@Component({
  components: {
    VAlert,
    VInput,
    VUserDataTransfer,
  },
})
export default class UpdateUser extends Vue {
  @Prop()
  private updateuser!: any;

  private alert = new AlertModel();
  private newUser = new User();
  private teamSelection: any = [];
  private rolebox = roleBox;

  async created() {
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
    this.newUser.email = this.updateuser.email;
    this.newUser.password = this.updateuser.password;
    this.newUser.role = this.updateuser.role;
    this.newUser.teamId = this.updateuser.teamId;
    this.newUser.name = this.updateuser.name;

    const storeUser = getStoreUser();
    const user: any = store.state.loginUser;
    const role = user.role;
    const teams = await teamApi.getTeams();
    if (role == "Administer") {
      this.rolebox = [
        { value: "User", text: "User" },
        { value: "TeamManager", text: "TeamManager" },
        { value: "Administer", text: "Administer" },
      ];
    } else if (role == "TeamManager") {
      this.rolebox = [
        { value: "User", text: "User" },
        { value: "TeamManager", text: "TeamManager" },
      ];
      teams.forEach((t: any) => {
        if (t.team_ID == storeUser.teamId) {
          let teamid = {
            value: t.team_ID,
            text: t.team_ID,
          };
          this.teamSelection = [teamid];
        }
      });
    } else {
      this.rolebox = [{ value: "User", text: "User" }];
    }
  }

  selectChange(obj: any) {
    switch (obj.type) {
      case "newUserEmail":
        this.newUser.email = obj.text;
        break;
      case "newUserPassword":
        this.newUser.password = obj.text;
        break;
      case "newUserName":
        this.newUser.name = obj.text;
        break;
      case "newUserRole":
        this.newUser.role = obj.text;
        break;
      case "newUserTeam":
        this.newUser.teamId = obj.text;
        break;
    }
  }

  async submitNewUser() {
    let checkresult = checkFunctions.checkUser(this.newUser);
    if (checkresult == true) {
      let newUser = {
        User_ID: this.newUser.email,
        Name: this.newUser.name,
        Password: this.newUser.password,
        Role: this.newUser.role,
        Team_ID: this.newUser.teamId,
        refreshToken: "",
      };
      let result = await userApi.updateUser(newUser);
      if (result.status == 200) {
        this.alert.showSuccess("success", this.alert);
      } else {
        this.alert.showfail("something wrong", this.alert);
      }
    } else {
      this.alert.showfail(checkresult, this.alert);
    }
  }

  async deleteUser(replaceUserId: string) {
    let result = await userApi.deleteUser(
      this.newUser.email,
      "leilu0229@outlook.com"
    );
    if (result.status == 200) {
      this.alert.showSuccess("success", this.alert);
      this.$router.push("customerfilter").catch((err) => {
        console.log(err);
      });
    } else {
      this.alert.showfail("something wrong", this.alert);
    }
  }

  Back() {
    this.$emit("backfilter");
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
</style>
