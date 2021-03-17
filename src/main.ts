import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import BootstrapVue from "bootstrap-vue";
import ElementUI from "element-ui";
// @ts-ignore
import locale from "element-ui/lib/locale/lang/en";
import "element-ui/lib/theme-chalk/index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min";
import "vue-multiselect/dist/vue-multiselect.min.css";
import axios from "axios";
import VueAxios from "vue-axios";
import VueCookies from "vue-cookies-ts";
import GAuth from "vue-google-oauth2";
import { BootstrapVueIcons } from "bootstrap-vue";
import teamApi from "@/api/teamApi";
import googleLogin from "@/api/googleLogin";
Vue.use(BootstrapVueIcons);

Vue.use(BootstrapVue);
Vue.use(ElementUI, { locale });
Vue.use(VueAxios, axios);
Vue.use(VueCookies);

Vue.config.productionTip = false;

axios.interceptors.request.use(
  (config) => {
    if (config.url.indexOf("googleapi") != -1) {
      //
    } else if (Vue.cookies.get("ramToken")) {
      config.headers["Authorization"] = Vue.cookies.get("ramToken");
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

axios.interceptors.response.use(
  async (response) => {
    //let url = "http://localhost:5000";
    let url = "https://www.thefarmingcrm.com";
    if (
      response.status < 400 &&
      response.config.url != `${url}/api/buyrequirement` &&
      response.config.url.indexOf("teamtoken?tokenId=") == -1
    ) {
      if (response.data.token) {
        Vue.cookies.set(
          "ramToken",
          `Bearer ${response.data.token.access_token}`,
          { expires: "60min" }
        );
        Vue.cookies.set("ramRefreshToken", response.data.token.refresh_token);
        Vue.cookies.set("ramexpireTime", new Date());
      }
      let expire = Vue.cookies.get("ramexpireTime");
      let now = new Date();
      if (expire) {
        let expireTime = new Date(expire.toString());
        //refresh token
        if ((now.getTime() - expireTime.getTime()) / (60*1000) > 40) {
          let refreshToken = Vue.cookies.get("ramRefreshToken");
          if (refreshToken) {
            Vue.cookies.set("ramexpireTime", new Date());
            let token = await teamApi.getRefreshToken(refreshToken);
            Vue.cookies.set("ramToken", `Bearer ${token.data.access_token}`, {
              expires: "60min",
            });
            Vue.cookies.set("ramRefreshToken", token.data.refresh_token);
          }
        }
      }
    }
    return response;
  },
  (err) => {
    return Promise.reject(err);
  }
);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
