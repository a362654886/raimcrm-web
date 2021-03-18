<template>
  <div class="openHomeBody">
    <div class="header">
      <img
        id="headImg"
        src="../../public/logo.jpg"
        style="margin: 0.5rem"
        width="60"
        height="60"
        alt=""
      />
      <h3 id="headText">RAIN-CRM</h3>
    </div>
    <div>
      <b-card class="titleCard">
        <h4 class="bodyTextTitle">RAIN-CRM:</h4>
        <p class="bodyText">
          A CRM system for find property that matches client requirement,
          manageing client information. Add new property, new client, match
          client requirements and properties automatically. Synchronize with
          Google contact.automatically send email.
        </p>
      </b-card>
      <b-card class="bodyCard">
        <div style="width: 40%">
          <img
            class="bodyImg"
            src="../../public/propertyScreen.jpg"
            style="margin: 0.5rem"
            width="500"
            height="300"
            alt=""
          />
        </div>
        <div>
          <ul>
            <li class="bodyText">
              Show property's information, including basic information(
              land,bedroom,bathroom.. ), SchoolZone, CV inforamtion, and so on.
            </li>
            <li class="bodyText">
              Search property according basic information(
              land,bedroom,bathroom.. ), SchoolZone, CV inforamtion, and so on.
            </li>
            <li class="bodyText">Synchronize with Google contact.</li>
          </ul>
          <b-button id="headButton" @click="login">Sign In</b-button>
        </div>
      </b-card>
    </div>
    <div class="footer">
      <a v-bind:href="termUrl" class="terms">Terms</a>
      <a v-bind:href="policyUrl" class="policy">Private policy</a>
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
export default class HomePage extends Vue {
  private policyUrl = "https://www.thefarmingcrm.com/privatePolicy";
  private termUrl = "https://www.thefarmingcrm.com/terms";

  login() {
    this.$router.push("login").catch((err) => {
      console.log(err);
    });
  }
}
</script>

<style scoped>
.openHomeBody {
  background-image: url("~@/assets/openhome_background.jpg");
  background-size: cover;
  width: 100%;
  height: 100%;
}
.header {
  background-color: #273746;
  width: 100%;
  height: 80px;
  display: flex;
}
#headImg {
  width: 60px;
}
#headText {
  width: 15%;
  color: white;
  margin-top: 20px;
}
#headButton {
  background-color: green;
}
.titleCard {
  margin-top: 1rem;
  margin-left: 1rem;
  margin-right: 1rem;
  opacity: 0.7;
}
.titleCard {
  margin-top: 1rem;
  margin-left: 1rem;
  margin-right: 1rem;
  opacity: 0.7;
}
.bodyCard {
  margin-top: 1rem;
  margin-left: 1rem;
  margin-right: 1rem;
  opacity: 0.9;
  display: flex;
}
.bodyText {
  text-align: left;
  width: 60%;
  margin-left: 20%;
}
.footer {
  background-color: #273746;
  width: 100%;
  height: 60px;
  display: flex;
  position: absolute;
  bottom: 20px;
}

.terms,
.policy {
  color: white;
}
.terms {
  position: absolute;
  right: 55%;
}
.policy {
  position: absolute;
  right: 45%;
}
.bodyTextTitle {
  font-weight: bold;
}
.card-body {
  display: flex;
}
.bodyImg {
  opacity: 1.5;
}
</style>
