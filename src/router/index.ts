import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import CustomerFilter from "../views/customer/CustomerFilter.vue";
import CustomerShow from "../views/customer/CustomerShow.vue";
import CustomerAdd from "../views/customer/CustomerAdd.vue";
import Login from "../views/Login.vue";
import LoaddingPage from "../views/LoaddingPage.vue";
import propertyfilter from "../views/Property/PropertyFilter.vue";
import propertyshow from "../views/Property/PropertyShow.vue";
import PropertyAdd from "../views/Property/PropertyAdd.vue";
import UploadProperty from "../views/Property/UploadProperty.vue";
import PropertyOpenDay from "../views/PropertyOpenDay.vue";
import UploadLead from "../views/Lead/UploadLead.vue";
import LeadFilter from "../views/Lead/LeadFilter.vue";
import GoogleContactsUpload from "../views/Lead/GoogleContactsUpload.vue";
import TradeAdd from "../views/trade/TradeAdd.vue";
import Calender from "../views/Calender/Calender.vue";
import Usermanagement from "../views/UsersManagerment/UserMainPage.vue";
import TemplateManagement from "../views/TemplateManagement.vue";
import SetPassword from "../views/UsersManagerment/SetPassword.vue";
import CustomerBuyRequirement from "../views/CustomerBuyRequirement.vue";
import store from "@/store";
import MessageAlert from "../views/MessageAlert.vue";
import OptionManagement from "../views/OptionManagement.vue";
import TeamManagement from "../views/team/TeamManagement.vue";
import TeamPage from "../views/team/TeamPage.vue";
import PrivatePolicy from "../views/PrivatePolicy.vue";
import Terms from "../views/Terms.vue";
import HomePage from "../views/HomePage.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "home",
    component: HomePage,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/loadding",
    name: "loadding",
    component: LoaddingPage,
  },
  {
    path: "/customerfilter",
    name: "customerfilter",
    component: CustomerFilter,
  },
  {
    path: "/customershow",
    name: "customershow",
    component: CustomerShow,
  },
  {
    path: "/customeradd",
    name: "customeradd",
    component: CustomerAdd,
  },
  {
    path: "/propertyfilter",
    name: "propertyfilter",
    component: propertyfilter,
  },
  {
    path: "/propertyshow",
    name: "propertyshow",
    component: propertyshow,
  },
  {
    path: "/propertyadd",
    name: "propertyadd",
    component: PropertyAdd,
  },
  {
    path: "/uploadLead",
    name: "uploadLead",
    component: UploadLead,
  },
  {
    path: "/uploadGoogleContacts",
    name: "uploadGoogleContacts",
    component: GoogleContactsUpload,
  },
  {
    path: "/leadFilter",
    name: "leadFilter",
    component: LeadFilter,
  },
  {
    path: "/tradeadd",
    name: "tradeadd",
    component: TradeAdd,
  },
  {
    path: "/propertyOpenDay",
    name: "propertyOpenDay",
    component: PropertyOpenDay,
  },
  {
    path: "/uploadProperties",
    name: "uploadProperties",
    component: UploadProperty,
  },
  {
    path: "/calender",
    name: "Calender",
    component: Calender,
  },
  {
    path: "/usermanagement",
    name: "Usermanagement",
    component: Usermanagement,
  },
  {
    path: "/setPassword",
    name: "setPassword",
    component: SetPassword,
  },
  {
    path: "/templatemanagement",
    name: "templatemanagement",
    component: TemplateManagement,
  },
  {
    path: "/customerBuyRequirement",
    name: "customerBuyRequirement",
    component: CustomerBuyRequirement,
  },
  {
    path: "/messageAlert",
    name: "messageAlert",
    component: MessageAlert,
  },
  {
    path: "/optionManagement",
    name: "optionManagement",
    component: OptionManagement,
  },

  {
    path: "/teamManagement",
    name: "teamManagement",
    component: TeamManagement,
  },
  {
    path: "/teamPage",
    name: "teamPage",
    component: TeamPage,
  },
  {
    path: "/privatePolicy",
    name: "privatePolicy",
    component: PrivatePolicy,
  },
  {
    path: "/terms",
    name: "terms",
    component: Terms,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to: any, from: any, next: any) => {
  if (to.path == "/customerBuyRequirement") {
    let queryValues = {
      Num: to.query.Num,
      id: to.query.id,
      name: to.query.name,
    };
    store.commit("saveByQuery", queryValues);
  } else if (to.path == "/teamPage" || to.path == "/privatePolicy"|| to.path == "/terms"|| to.path == "/login") {
    //
  } else if (
    to.path !== "/" &&
    (Vue.cookies.get("ramToken") == null ||
      Vue.cookies.get("ramToken") == "Bearer%20undefined")
  ) {
    return next("/");
  }
  if (to.matched.length == 0) {
    next({
      path: "/",
    });
  } else {
    next();
  }
});

export default router;
