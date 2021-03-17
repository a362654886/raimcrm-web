<template>
  <div>
    <b-navbar type="white" variant="dark" style="width: 100%">
      <b-navbar-nav class="bc-color">
        <img
          id="logoimg"
          @click="topage('/')"
          src="../../public/logo.jpg"
          width="50"
          height="50"
          alt=""
        />
        <b-nav-item-dropdown class="drop-down-title" text="Lead">
          <b-dropdown-item
            class="dropdown"
            href="#"
            @click="topage('leadFilter')"
            >Lead Filter</b-dropdown-item
          >
          <b-dropdown-item
            class="dropdown"
            href="#"
            @click="topage('uploadLead')"
            >Upload lead</b-dropdown-item
          >
          <b-dropdown-item
            class="dropdown"
            href="#"
            @click="topage('uploadGoogleContacts')"
            >Upload Google Contracts</b-dropdown-item
          >
        </b-nav-item-dropdown>
        <b-nav-item-dropdown text="Client">
          <b-dropdown-item
            class="dropdown"
            href="#"
            @click="topage('customerfilter')"
            >Client Filter</b-dropdown-item
          >
          <b-dropdown-item
            class="dropdown"
            href="#"
            @click="toAddpage('customeradd')"
            >Add Client</b-dropdown-item
          >
        </b-nav-item-dropdown>
        <b-nav-item-dropdown text="Property">
          <b-dropdown-item
            class="dropdown"
            href="#"
            @click="topage('propertyfilter')"
            >Property Filter</b-dropdown-item
          >
          <b-dropdown-item
            class="dropdown"
            href="#"
            @click="topage('propertyadd')"
            >Add Property</b-dropdown-item
          >
          <b-dropdown-item
            class="dropdown"
            href="#"
            @click="topage('uploadProperties')"
            >Upload Property</b-dropdown-item
          >
        </b-nav-item-dropdown>
        <b-nav-item-dropdown text="Trade">
          <b-dropdown-item class="dropdown" href="#" @click="topage('tradeadd')"
            >Add Trade</b-dropdown-item
          >
        </b-nav-item-dropdown>
      </b-navbar-nav>

      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown class="profileNav" :text="profile" right>
          <b-dropdown-item
            class="dropdown"
            href="#"
            @click="topage('setPassword')"
            >Set Password</b-dropdown-item
          >
          <b-dropdown-item class="dropdown" href="#" @click="topage('calender')"
            >Schedule</b-dropdown-item
          >
          <b-dropdown-item
            v-if="ifTeamManager"
            class="dropdown"
            href="#"
            @click="topage('usermanagement')"
            >User Management</b-dropdown-item
          >
          <b-dropdown-item
            v-if="ifAdmin && ifTeamManager"
            class="dropdown"
            href="#"
            @click="topage('teamManagement')"
            >Team Management</b-dropdown-item
          >
          <b-dropdown-item
            class="dropdown"
            href="#"
            @click="topage('templatemanagement')"
            >Template Management</b-dropdown-item
          >
          <b-dropdown-item
            v-if="ifAdmin && ifTeamManager"
            class="dropdown"
            href="#"
            @click="topage('optionManagement')"
            >Option Management</b-dropdown-item
          >
          <b-dropdown-item class="dropdown" href="#" @click="logout"
            >log out</b-dropdown-item
          >
        </b-nav-item-dropdown>
      </b-navbar-nav>
      <el-button
        v-if="!store.state.messageAlert"
        type="success"
        style="padding: 5px; height: 35px"
        @click="topage('messageAlert')"
        >message</el-button
      >
      <el-button
        v-if="store.state.messageAlert"
        type="danger"
        style="padding: 5px; height: 35px"
        @click="topage('messageAlert')"
        >{{ `new message ( ${store.state.messageNum} )` }}</el-button
      >
    </b-navbar>
    <router-view :key="$route.fullPath" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import store from "@/store";
import messageApi from "../api/messageAlertApi";
import { MessageAlert } from "@/db-models/db-messageAlert";
import { getStoreUser, User } from "../../db-models/db-userManagement";

@Component
export default class LoaddingPage extends Vue {
  private loginUser: User = getStoreUser();
  private profile = `${this.loginUser.name.toString()}--Profile`;
  private messageAlerts: any[] = [];
  private store = store;
  private ifAdmin = false;
  private ifTeamManager = false;
  private interval: any = "";

  async created() {
    this.messageAlerts = await messageApi.getAlertsByUser(this.loginUser.email);
    store.commit("saveAlertMessages", this.messageAlerts);
    this.updateState();
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
    this.interval = setInterval(this.updateState, 10000);
  }

  async updateState() {
    const newMessageAlerts = await messageApi.getAlertsByUser(
      this.loginUser.email
    );
    const ifnew = false;
    let num = 0;
    let result = false;
    newMessageAlerts.forEach((m: MessageAlert) => {
      if (m.ifRead == false) {
        num++;
        result = true;
      }
    });
    store.commit("saveMessageAlert", result);
    store.commit("saveMessageNum", num);
    store.commit("saveAlertMessages", newMessageAlerts);
  }

  topage(tostring: any) {
    this.$router.push(tostring).catch((err) => {
      err;
    });
  }

  toAddpage(tostring: any) {
    if (tostring == "customeradd") {
      store.commit("saveNewCustomer", { Customer_Email: "newone" });
      this.$router.push(tostring).catch((err) => {
        err;
      });
    }
  }

  logout() {
    Vue.cookies.remove("ramToken");
    localStorage.clear();
    this.$router.push("/").catch((err) => {
      err;
    });
    clearInterval(this.interval);
  }

  destroyed() {
    this.logout();
  }
}
</script>

<style>
.bc-color {
  background-color: #2c3e50;
  flex-wrap: wrap;
  width: 80%;
}

#logoimg {
  margin-right: 10%;
}

#header {
  margin-bottom: 2%;
}

.navtitle {
  margin-right: 2rem;
}
.scrollbox {
  position: relative;
  overflow-y: auto;
  max-height: 400px;
}
.scrollboxless {
  position: relative;
  overflow-y: auto;
  max-height: 300px;
}
.borderbox {
  border-left-style: solid;
  border-top-style: solid;
  border-width: 1px;
}
.deleteBox {
  width: 100px;
}
.deleteButton {
  margin-top: 5px;
}
.modal-backdrop {
  opacity: 0.7;
}
.dropdown {
  margin: 0;
}
.dropdown-toggle {
  color: white;
}
.profileNav {
  float: right;
}

/* phone */
@media screen and (max-width: 595px) {
  .bc-color {
    width: 120px;
  }
  .navbar {
    display: block;
  }
}
</style>
