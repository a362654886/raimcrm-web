<template>
  <div>
    <div>
      <VAlert :text="alert.text" :type="alert.type" :ifshow="alert.ifshow" />
      <div class="arrows">
        <b-button
          style="float: left"
          v-if="showprebutton"
          @click="previousButton"
          >&laquo;</b-button
        >
        <b-button style="float: right" v-if="shownextbutton" @click="nextButton"
          >&raquo;</b-button
        >
      </div>
      <b-nav tabs fill>
        <b-nav-item :active="ifcustomerInfo" @click="showCustomer"
          >Client</b-nav-item
        >
        <b-nav-item :active="ifcustomerMatch" @click="showBuymatch"
          >Buyrequirements and Properties</b-nav-item
        >
      </b-nav>
      <VLoadding :ifshow="loading.ifshow" />
      <div class="customerbody" v-if="ifcustomerInfo & !loading.ifshow">
        <div>
          <el-button
            class="deletebutton"
            type="danger"
            icon="el-icon-delete"
            @click="deleteCustomer"
            >Delete</el-button
          >
        </div>
        <VCustomerInfo
          :propCustomer="customer"
          v-if="ifEditShow"
          :key="componentInfoKey"
        />
      </div>
      <div class="customerbody" v-if="ifcustomerMatch">
        <VCustomerRequires
          :customer="customer"
          @updateParentData="updateCustomer"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { Component, Prop, Vue } from "vue-property-decorator";
import store from "@/store";
import VCustomerInfo from "@/components/CustomerInfo/VCustomerInfo.vue";
import VCustomerRequires from "@/components/CustomerInfo/VCustomerRequires";
import customerApi from "@/api/customerApi";
import otherFunctions from "../../../functions/otherFunctions";
import LoadModel from "../../../db-models/loaddingModel";
import VLoadding from "@/components/VLoadding.vue";
import AlertModel from "../../../db-models/alertModel";
import VAlert from "@/components/VAlert.vue";
import { insertRightPage } from "../../../functions/publicFn";
import modelCreate from "../../../db-models/modelCreate";

@Component({
  components: {
    VCustomerRequires,
    VCustomerInfo,
    VLoadding,
    VAlert,
  },
})
export default class CustomerShow extends Vue {
  ifcustomerInfo = true;
  ifcustomerMatch = false;
  ifEditShow = true;
  ifSaveShow = false;
  customer;
  showprebutton = true;
  shownextbutton = true;
  loading = new LoadModel();
  alert = new AlertModel();

  componentInfoKey = 0;

  created() {
    this.customer = store.state.searcherCustomers[store.state.showCustomer];

    if (store.state.showCustomer == 0) {
      this.showprebutton = false;
    } else {
      this.showprebutton = true;
    }

    if (store.state.showCustomer == store.state.searcherCustomers.length ) {
      this.shownextbutton = false;
    } else {
      this.shownextbutton = true;
    }
  }
  showCustomer() {
    this.ifcustomerInfo = true;
    this.ifcustomerMatch = false;
  }
  showBuymatch() {
    //save
    this.showEdit();
    //
    this.ifcustomerInfo = false;
    this.ifcustomerMatch = true;
  }
  showEdit() {
    this.ifEditShow = true;
    this.ifSaveShow = false;
  }
  showsave() {
    this.ifSaveShow = true;
    this.ifEditShow = false;
  }

  async updateCustomer(obj) {
    store.commit("saveCustomer", obj);
    this.customer = store.state.searcherCustomers[obj];
  }
  async deleteCustomer() {
    let confirm = await otherFunctions.confirmBox(
      this,
      "Are you sure you want to delete this Client?"
    );
    if (confirm == true) {
      this.loading.show();
      if (this.customer.userId == store.state.loginUser.email) {
        const index = await otherFunctions.findCustomerIndex(this.customer.customerID)
        let result = await customerApi.deleteCustomer(
          this.customer.customerID,
          this.customer.resourceName
        );
        if (result == 200) {
          //
          const customers = store.state.searcherCustomers;
          customers.splice(index, 1);
          store.commit("saveCustomerSearchResult", customers);
          //

          this.$router.push("customerfilter").catch((err) => {
            err;
          });
        }
      } else {
        this.alert.showfail(
          "you dont have the authorization to do update this user",
          this.alert
        );
      }
    }
    this.loading.disappear();
  }

  async previousButton() {
    let index = store.state.showCustomer - 1;

    store.commit("saveCustomer", index);
    const pageNum = store.state.cpage;
    const pageSize = store.state.csize;
    const lastNum = (pageNum-1) * pageSize-1;
    if (index == lastNum&&pageNum>1) {
      const urlValue = `${store.state.clientSearchURL}&PageNum=${
        pageNum - 1
      }&PageSize=${pageSize}`;
      const apiResult = await customerApi.getAllcustomer(urlValue);
      const customers = insertRightPage(
        pageNum-1,
        pageSize,
        modelCreate.getCustomers(apiResult.data.customer)
      );
      store.commit("saveCustomerSearchResult", customers);
      store.commit("savecPage", pageNum - 1);
      store.commit("savecSize", pageSize);
    }

    this.$router
      .push({
        path: "customershow",
        query: {
          id: Math.ceil(Math.random() * 100),
        },
      })
      .catch((err) => {
        err;
      });
  }

  async nextButton() {
    let index = store.state.showCustomer + 1;

    store.commit("saveCustomer", index);
    const pageNum = store.state.cpage;
    const pageSize = store.state.csize;
    const totalNum = pageNum * pageSize;
    if (index == totalNum) {
      const urlValue = `${store.state.clientSearchURL}&PageNum=${
        pageNum + 1
      }&PageSize=${pageSize}`;
      const apiResult = await customerApi.getAllcustomer(urlValue);
      const customers = insertRightPage(
        pageNum+1,
        pageSize,
        modelCreate.getCustomers(apiResult.data.customer)
      );
      store.commit("saveCustomerSearchResult", customers);
      store.commit("savecPage", pageNum + 1);
      store.commit("savecSize", pageSize);
    }

    this.$router
      .push({
        path: "customershow",
        query: {
          id: Math.ceil(Math.random() * 100),
        },
      })
      .catch((err) => {
        err;
      });
  }
}
</script>

<style scoped>
.customerbody {
  background-color: #f7f7f7;
  width: 90%;
  height: 100%;
  margin: 2rem 5% 0 5%;
  position: absolute;
}

.deletebutton {
  margin: 5px;
  margin-left: 90%;
}

/* ipad */
@media screen and (max-width: 1200px) {
  .deletebutton {
    margin-left: 80%;
  }
}
</style>
