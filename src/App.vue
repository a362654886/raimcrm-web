<template>
  <div id="app">
    <component v-bind:is="currentComponent"></component>
  </div>
</template>
<script>
import LoaddingPage from "@/views/LoaddingPage.vue";
import TeamPage from "@/views/team/TeamPage.vue";
import PropertyOpenDay from "@/views/PropertyOpenDay.vue";
import PrivatePolicy from "@/views/PrivatePolicy.vue";
import CustomerBuyRequirement from "@/views/CustomerBuyRequirement.vue";
import Terms from "@/views/Terms.vue";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import Login from "@/views/Login.vue";
import Home from "@/views/HomePage.vue";
@Component({
  components: {
    LoaddingPage,
    PropertyOpenDay,
    Login,
    CustomerBuyRequirement,
    TeamPage,
    PrivatePolicy,
    Terms,
    Home
  },
})
export default class App extends Vue {
  Vcomponent = "Home";
  get currentComponent() {
    return this.Vcomponent;
  }

  created() {
    window.addEventListener("beforeunload", () => {
      localStorage.setItem("messageStore", JSON.stringify(this.$store.state));
    });
    localStorage.getItem("messageStore") &&
      /* eslint-disable */
      this.$store.replaceState(
        Object.assign(
          this.$store.state,
          JSON.parse(localStorage.getItem("messageStore"))
        )
      );
  }

  @Watch("$route", { immediate: true, deep: true })
  onUrlChange(newVal) {
    console.log(newVal.name);
    if (["home"].includes(newVal.name)) {
      this.Vcomponent = "Home";
    } else if (["login", "quote"].includes(newVal.name)) {
      this.Vcomponent = "Login";
    } else if (["propertyOpenDay"].includes(newVal.name)) {
      this.Vcomponent = "propertyOpenDay";
    } else if (["privatePolicy"].includes(newVal.name)) {
      this.Vcomponent = "privatePolicy";
    } else if (["customerBuyRequirement"].includes(newVal.name)) {
      this.Vcomponent = "customerBuyRequirement";
    } else if (["terms"].includes(newVal.name)) {
      this.Vcomponent = "terms";
    } else if (["teamPage"].includes(newVal.name)) {
      this.Vcomponent = "teamPage";
    } else {
      this.Vcomponent = "LoaddingPage";
    }
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
html,
body {
  width: 100%;
  height: 100%;
}

.arrows {
  margin: auto;
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  bottom: 0;
}

.bold {
  font-weight: bold;
}

.italic {
  font-style: italic;
}

.underline {
  text-decoration: underline;
}

.onezeropx {
  font-size: 10px;
}

.onefivepx {
  font-size: 15px;
}
.twozeropx {
  font-size: 20px;
}

.twofivepx {
  font-size: 25px;
}
.threezeropx {
  font-size: 30px;
}

.threefivepx {
  font-size: 35px;
}

.red {
  color: red;
}
.blue {
  color: blue;
}
.yellow {
  color: yellow;
}

.bcred {
  background-color: red;
}
.bcblue {
  background-color: blue;
}
.bcyellow {
  background-color: yellow;
}
</style>
