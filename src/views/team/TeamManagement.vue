<template>
  <div>
    <VAlert :text="alert.text" :type="alert.type" :ifshow="alert.ifshow" />
    <div>
      <div class="newUser">
        <VInput
          class="newUserBox"
          :titleWidth="'width:150px'"
          :textWidth="'width:250px'"
          :labelstring="'Team Email'"
          :contextstring="teamEmail"
          :inputtype="'newTeamEmail'"
          :type="'input'"
          @fieldChanged="selectChange"
        />
        <VInput
          class="newUserBox"
          :titleWidth="'width:150px'"
          :textWidth="'width:250px'"
          :labelstring="'Team Name'"
          :contextstring="teamName"
          :inputtype="'newTeamName'"
          :type="'input'"
          @fieldChanged="selectChange"
        />
      </div>
      <b-button style="width: 20%" @click="submitNewTeam">Add</b-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import VInput from "@/components/VInput.vue";
import VAlert from "@/components/VAlert.vue";
import AlertModel from "../../../db-models/alertModel";
import teamApi from "@/api/teamApi";
import teamTokenApi from "@/api/teamTokenApi";

@Component({
  components: {
    VAlert,
    VInput,
  },
})
export default class TeamManagement extends Vue {
  private alert = new AlertModel();
  private teamEmail = "";
  private teamName = "";

  selectChange(obj: any) {
    switch (obj.type) {
      case "newTeamEmail":
        this.teamEmail = obj.text;
        break;
      case "newTeamName":
        this.teamName = obj.text;
        break;
    }
  }

  async submitNewTeam() {
    const team = {
      Team_ID: this.teamEmail,
      TeamName: this.teamName,
    };

    const teamToken = {
      Token_ID: this.teamEmail,
      Token: "null",
      ExpireTime: new Date(),
    };

    const teamResult = await teamApi.addTeam(team)
    const teamTokenResult = await teamTokenApi.addTeamToken(teamToken)
    if(teamResult.status == 200 && teamTokenResult.status==200){
      this.alert.showSuccess("success", this.alert);
    }else{
      this.alert.showfail("fail", this.alert);
    }
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
