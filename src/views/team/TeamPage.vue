<template>
  <div>
    <VAlert :text="alert.text" :type="alert.type" :ifshow="alert.ifshow" />
    <VLoadding :ifshow="loading.ifshow" />
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
      <h3>Team Accounts</h3>
    </div>
    <b-table
      id="my-table"
      class="table"
      striped
      hover
      :items="teams"
      :fields="teamfield"
      small
      responsive="sm"
    >
      <template v-slot:cell(button)="row">
        <b-button class="btn btn-light" style="width: 40%" @click="saveId(row)">
          <img
            style="height: 20px; width: 40px"
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
          />
          Sign in with Google
        </b-button>
      </template>
    </b-table>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import VAlert from "@/components/VAlert.vue";
import LoadModel from "../../../db-models/loaddingModel";
import VLoadding from "@/components/VLoadding.vue";
import AlertModel from "../../../db-models/alertModel";
import teamApi from "@/api/teamApi";
import { teamfield } from "../../../data/options_data";
import teamTokenApi from "@/api/teamTokenApi";
import googlePeopleApi from "@/api/googlePeopleApi";
import store from "@/store";
import googleLogin from "@/api/googleLogin";
import { getGoogleUrl, getTeamUrl } from "../../../data/googleValue";

@Component({
  components: {
    VLoadding,
    VAlert,
  },
})
export default class TeamPage extends Vue {
  loading = new LoadModel();
  alert = new AlertModel();

  private teams: any[] = [];
  private teamfield = teamfield;
  private code = "";
  private token = "";

  async created() {
    this.teams = await teamApi.getTeams();
    this.code = this.$route.query.code as string;
    if (this.code) {
      const data = await googleLogin.getGoogleToken(
        this.code,
        `${getGoogleUrl()}/teamPage`
      );
      this.token = data.access_token;
      const email = await googleLogin.getEmailByToken(data.access_token);
      await this.login(
        store.state.loginTeamObj,
        email,
        data.refresh_token,
        data.access_token
      );
    }
  }

  saveId(row: any) {
    const team = row.item;
    store.commit("saveLoginTeamId", team);
    const url = getTeamUrl();
    if (!this.code) {
      window.location.href = url;
    }
  }

  login = async (
    team: any,
    email: string,
    refreshToken: string,
    token: string
  ): Promise<void> => {
    try {
      if (email.toLowerCase() != team.team_ID.toLowerCase()) {
        this.alert.showfail(
          "the google team don't equal login team",
          this.alert
        );
      } else {
        let t = new Date(); //你已知的时间
        let t_s = t.getTime(); //转化为时间戳毫秒数

        t.setTime(t_s + 1000 * 60 * 60); //设置新时间比旧时间多一小时
        await teamTokenApi.updateTeamToken({
          token_ID: email,
          token: `Bearer ${token}`,
          expireTime: t,
          refreshToken: refreshToken,
        });
        console.log(`Bearer ${token}`);
        //let email = googleUser.getBasicProfile().getEmail();
        await this.setGoogleId(team.team_ID, `Bearer ${token}`);
      }
    } catch (error) {
      //this.alert.showfail("this user didn't exist",this.alert)
      return null;
    }
  };

  async setGoogleId(teamId: string, token: string) {
    let login_team = await teamApi.getTeam(teamId);
    console.log(login_team);
    let LabelIds = {
      buyerId: "",
      venderId: "",
      solicitorId: "",
      potential_venderId: "",
    };
    console.log(token);
    if (login_team.buyId == "") {
      let buy_result = await googlePeopleApi.postLabel("buyer", token);
      LabelIds.buyerId = buy_result.resourceName;
    } else {
      LabelIds.buyerId = login_team.buyId;
    }
    if (login_team.venderId == "") {
      let vender_result = await googlePeopleApi.postLabel("vender", token);
      LabelIds.venderId = vender_result.resourceName;
    } else {
      LabelIds.venderId = login_team.venderId;
    }
    if (login_team.solicitorId == "") {
      let solicitor_result = await googlePeopleApi.postLabel(
        "solicitor",
        token
      );
      LabelIds.solicitorId = solicitor_result.resourceName;
    } else {
      LabelIds.solicitorId = login_team.solicitorId;
    }
    if (login_team.potential_venderId == "") {
      let pvender_result = await googlePeopleApi.postLabel(
        "potential vender",
        token
      );
      LabelIds.potential_venderId = pvender_result.resourceName;
    } else {
      LabelIds.potential_venderId = login_team.potential_venderId;
    }
    const body = {
      Team_ID: login_team.team_ID,
      TeamName: login_team.teamName,
      buyId: LabelIds.buyerId,
      venderId: LabelIds.venderId,
      solicitorId: LabelIds.solicitorId,
      potential_venderId: LabelIds.potential_venderId,
      ifLogin: true,
    };
    await teamApi.updateTeam(body);
    this.teams = await teamApi.getTeams();
  }
}
</script>

<style scoped></style>
