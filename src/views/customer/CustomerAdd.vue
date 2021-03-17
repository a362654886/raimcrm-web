<template>
  <div>
    <div>
      <b-nav tabs fill>
        <b-nav-item :active="ifcustomerInfo" @click="showCustomer"
          >Client</b-nav-item
        >
        <b-nav-item :active="ifBuyRequirementMatch" @click="showBuymatch"
          >Buyrequirements and Properties</b-nav-item
        >
      </b-nav>
      <div class="customerbody" v-if="ifcustomerInfo">
        <VCustomerAddInfo />
      </div>
      <div class="customerbody" v-if="ifBuyRequirementMatch">
        <VCustomerBYAddEdit :buyRequirementNum="1" :key="componentKey" />
      </div>
    </div>
  </div>
</template>

<script>
import { Component, Prop, Vue } from "vue-property-decorator";
import store from "@/store";
import VCustomerInfo from "@/components/CustomerInfo/VCustomerInfo.vue";
import VCustomerRequires from "@/components/CustomerInfo/VCustomerRequires";
import VCustomerAddInfo from "@/components/CustomerInfo/VCustomerAddInfo";
import VCustomerBYAddEdit from "@/components/CustomerInfo/VCustomerBYAddEdit";

@Component({
  components: {
    VCustomerRequires,
    VCustomerInfo,
    VCustomerAddInfo,
    VCustomerBYAddEdit,
  },
})
export default class CustomerAdd extends Vue {
  ifcustomerInfo = true;
  ifBuyRequirementMatch = false;

  componentInfoKey = 0;
  componentKey = 0;

  created() {
    this.customer = store.state.showCustomer;
  }
  showCustomer() {
    this.ifcustomerInfo = true;
    this.ifBuyRequirementMatch = false;
  }
  showBuymatch() {
    this.ifcustomerInfo = false;
    this.ifBuyRequirementMatch = true;
  }

  destroyed() {
    store.commit("saveNewCustomer", { Customer_Email: "newone" });
  }
}
</script>

<style scoped>
.customerbody {
  background-color: #f7f7f7;
  width: 90%;
  margin: 2rem 5% 0 5%;
  position: absolute;
}

.editbutton {
  margin-left: 90%;
}
</style>
