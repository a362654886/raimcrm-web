<template>
  <div class="openHomeBody">
    <div class="login-form">
      <div class="logoimg">
        <img
          src="../../public/logo.jpg"
          style="margin: 0.5rem"
          width="60"
          height="60"
          alt=""
        />
      </div>
      <div>
        <VAlert :text="alert.text" :type="alert.type" :ifshow="alert.ifshow" />

        <VLoadding :ifshow="loading.ifshow" />

        <div class="openhomebox">
          <div
            style="
              display: flex;
              width: 90%;
              margin-left: 20px;
              margin-right: 20px;
            "
          >
            <span class="input-group-text inputSpan" style="width: 150px"
              >Email</span
            >
            <b-form-input
              class="form-control inputtext"
              style="width: 99%"
              placeholder="email"
              v-model="loginEmail"
            />
          </div>
        </div>
        <div class="openhomebox">
          <div
            style="
              display: flex;
              width: 90%;
              margin-left: 20px;
              margin-right: 20px;
            "
          >
            <span class="input-group-text inputSpan" style="width: 150px"
              >PassWord</span
            >
            <b-form-input
              class="form-control inputtext"
              style="width: 99%"
              placeholder="password"
              type="password"
              v-model="password"
            />
          </div>
        </div>
        <div>
          <div style="margin: 1rem">
            <b-button
              class="btn btn-light"
              style="width: 40%"
              @click="loginUser"
            >
              User Login
            </b-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import userApi from "../api/UserApi";
import teamApi from "../api/teamApi";
import AlertModel from "../../db-models/alertModel";
import LoadModel from "../../db-models/loaddingModel";
import VAlert from "../components/VAlert.vue";
import VLoadding from "../components/VLoadding.vue";
import { Team } from "../../db-models/db-team";
import store from "../store";
import { getUser } from "../../db-models/db-userManagement";
import UserApi from "../api/UserApi";

@Component({
  components: {
    VAlert,
    VLoadding,
  },
})
export default class Login extends Vue {
  private alert = new AlertModel();
  private loading = new LoadModel();
  private code = "";
  private loginEmail = "";
  private password = "";

  async loginUser(): Promise<any> {
    await this.userAuth(this.loginEmail, this.password);
  }

  async userAuth(email: string | null, password: string | null) {
    this.loading.show();
    let result = await userApi.login(
      `?LoginEmail=${email}&&Password=${password}`
    );
    this.loading.disappear();
    if (result.status == 200) {
      this.alert.showSuccess("success", this.alert);
      store.commit("saveLoginUser", getUser(result.data.user));
      const teamId = await UserApi.getTeamId(email);
      this.setting(teamId);
      this.$router.push("customerfilter").catch((err) => {
        console.log(err);
      });
    } else if (result.status == 204) {
      this.alert.showfail("password wrong", this.alert);
    } else {
      this.alert.showfail("this user didn't exist", this.alert);
    }
  }

  async setting(teamId: string) {
    let login_team = await teamApi.getTeam(teamId);
    const team = new Team(login_team.team_ID, login_team.teamName);
    store.commit("saveLoginTeam", team);
    let LabelIds = {
      buyId: login_team.buyId,
      venderId: login_team.venderId,
      solicitorId: login_team.solicitorId,
      potential_venderId: login_team.potential_venderId,
    };
    store.commit("saveLabelIds", LabelIds);
  }
}
</script>

<style scoped>
.login-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: rgba(171, 178, 185, 0.8);
  width: 60%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.logoimg {
  text-align: center;
}
.login-button {
  width: 90%;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-top: 3rem;
}
.input-group-prepend {
  display: flex;
  margin-top: 2rem;
  margin-left: 20px;
  margin-right: 20px;
}
.inputLabel {
  margin: 0;
  padding: 1rem;
}
.inputSpan {
  width: 150px;
}
.openHomeBody {
  background-image: url("~@/assets/openhome_background.jpg");
  background-size: cover;
  width: 100%;
  height: 100%;
}
.openhomebox {
  margin: 1rem;
}

.bottom {
  margin: 1rem;
}
</style>
