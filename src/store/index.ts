import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

let number = 0;

export default new Vuex.Store({
  state: {
    showCustomer: number,
    showProperty: number,
    tradeProperty: null,
    newCustomer:Object,
    searcherCustomers:[],
    searcherProperties:[],
    alertMessages:[],
    loginUser: Object,
    loginTeam: Object,
    buyRequirementCustomerQuery: Object,
    labelIds:Object,
    messageAlert:false,
    messageNum:0,
    page:number,
    size:number,
    propertySearchURL: String,
    clientSearchURL: String,
    cpage:number,
    csize:number,
    selectedItem:[],
    loginTeamObj: Object
  },
  mutations: {
    saveLoginTeamId(state, value) {
      state.loginTeamObj = value;
    },
    saveSelectedItem(state, value) {
      state.selectedItem = value;
    },
    savePropertySearchURL(state, value) {
      state.propertySearchURL = value;
    },
    saveClientSearchURL(state, value) {
      state.clientSearchURL = value;
    },
    savePage(state, value) {
      state.page = value;
    },
    saveSize(state, value) {
      state.size = value;
    },
    savecPage(state, value) {
      state.cpage = value;
    },
    savecSize(state, value) {
      state.csize = value;
    },
    saveMessageAlert(state, value) {
      state.messageAlert = value;
    },
    saveMessageNum(state, value) {
      state.messageNum = value;
    },
    saveLabelIds(state, value) {
      state.labelIds = value;
    },
    saveByQuery(state, value) {
      state.buyRequirementCustomerQuery = value;
    },
    saveCustomer(state, customer) {
      state.showCustomer = customer;
    },
    saveProperty(state, property) {
      state.showProperty = property;
    },
    saveTradeProperty(state, property) {
      state.tradeProperty = property;
    },
    saveNewCustomer(state, customer) {
      state.newCustomer = customer;
    },
    saveCustomerSearchResult(state,searcherCustomers){
      state.searcherCustomers = searcherCustomers;
    },
    savePropertiesSearchResult(state,searcherProperties){
      state.searcherProperties = searcherProperties;
    },
    saveAlertMessages(state,alertMessages){
      state.alertMessages = alertMessages;
    },
    saveLoginUser(state,loginUser){
      state.loginUser = loginUser;
    },
    saveLoginTeam(state,loginTeam){
      state.loginTeam = loginTeam;
    }
  },
  actions: {
  },
  modules: {
  }
})
