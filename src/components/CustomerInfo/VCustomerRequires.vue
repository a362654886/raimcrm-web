<template>
  <div>
    <div v-if="ifadd">
      <div>
        <el-menu
          :default-active="'buyRequirements'"
          class="el-menu-demo"
          mode="horizontal"
          background-color="#0074d9"
          text-color="white"
          active-text-color="#ffa500"
        >
          <el-menu-item
            v-for="member in this.buyrequirementArr"
            :key="member.index"
            :index="member"
            @click="passrequirement(member)"
            >{{ member.toString().toUpperCase() }}</el-menu-item
          >
          <div style="float: right">
            <el-button
              v-if="!ifshowEdit"
              style="margin: 10px"
              type="success"
              icon="el-icon-plus"
              circle
              @click="showAdd"
            ></el-button>
            <el-button
              v-if="!ifshowEdit&ifshow"
              style="margin: 10px"
              type="primary"
              icon="el-icon-edit"
              circle
              @click="showEdit"
            ></el-button>
            <el-button
              v-if="ifshowEdit"
              style="margin: 10px"
              type="danger"
              icon="el-icon-delete"
              circle
              @click="deleteBuyRequirement"
            ></el-button>
            <el-button
              v-if="ifshowEdit"
              style="margin: 10px"
              type="primary"
              icon="el-icon-back"
              circle
              @click="showEdit"
            ></el-button>
          </div>
        </el-menu>
      </div>
      <VCustomerBYmatch
        v-if="ifshowInfo"
        :buyrequirement="buyrequirement"
        :key="componentKey"
      />
      <VCustomerBYmatchEdit
        v-if="ifshowEdit"
        :buyrequirement="buyrequirement"
        :key="componentKey"
        @updateParentData="updateParentData"
      />
    </div>
    <div v-if="!ifadd">
      <div style="float: right">
        <el-button
          style="margin: 10px"
          type="info"
          icon="el-icon-back"
          circle
          @click="showAdd"
        ></el-button>
      </div>
      <VCustomerBYAddEdit
        :PropCustomerId="customer.customerID"
        :buyRequirementNum="this.buyrequirementArr.length + 1"
        :key="componentKey"
        @updateParentData="updateParentData"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import VLabel from "../VLabel.vue";
import { BuyRequirement, Customer } from "../../../db-models/db-customer";
import VCustomerBYmatch from "./VCustomerBYmatch.vue";
import VCustomerBYmatchEdit from "./VCustomerBYmatchEdit.vue";
import VCustomerBYAddEdit from "./VCustomerBYAddEdit.vue";
import customerApi from "@/api/customerApi";
import buyRequirementApi from "@/api/buyRequirementApi";
import store from "@/store";
import otherFunctions from "../../../functions/otherFunctions";

@Component({
  components: {
    VLabel,
    VCustomerBYmatch,
    VCustomerBYmatchEdit,
    VCustomerBYAddEdit,
  },
})
export default class VCustomerRequires extends Vue {
  componentKey = 0;
  buyrequirementArr: string[] = [];
  buyrequirement: BuyRequirement = new BuyRequirement("null");
  ifshowInfo = false;
  ifshowEdit = false;
  ifadd = true;
  editString = "Edit";

  ifshow = false;

  @Prop()
  private customer!: Customer;

  private customerBy: any;

  async created() {
    this.customerBy = await customerApi.getCustomer(this.customer.customerID);
    for (let i = 1; i <= this.customerBy.buyRequirement.length; i++) {
      this.buyrequirementArr.push(`buying requirement ${i}`);
    }
  }

  passrequirement(para: string) {
    this.buyrequirement = this.customerBy.buyRequirement[
      Number(para.substr(para.length - 1, 1)) - 1
    ];
    this.ifshow = false;
    this.ifshow = true;
    this.ifshowInfo = false;
    this.ifshowInfo = true;
    this.editString = "Edit";
    this.ifshowEdit = false;
    this.componentKey += 1;
  }

  async deleteBuyRequirement() {
    let confirm = await otherFunctions.confirmBox(
      this,
      "Are you sure you want to delete this Buy requirement?"
    );
    if (confirm == true) {
      let result = await buyRequirementApi.deleteBuyrequirement(
        this.buyrequirement.buyRequirementId
      );
      if (result == 200) {
        //this.customerBy = await customerApi.getCustomer(this.customer.customerID);
        let index = store.state.showCustomer;
        store.commit("saveCustomer", index);
        this.$router
          .push({
            path: "customershow",
            query: {
              id: Math.ceil(Math.random() * 100).toString(),
            },
          })
          .catch((err) => {
            err;
          });
      }
    }
  }

  showEdit() {
    if (this.editString == "Edit") {
      this.editString = "Back";
    } else {
      this.editString = "Edit";
    }
    this.showchange();
  }

  showchange() {
    if (this.editString == "Edit") {
      this.ifshowInfo = true;
      this.ifshowEdit = false;
    } else {
      this.ifshowInfo = false;
      this.ifshowEdit = true;
    }
  }

  showAdd() {
    this.ifadd = !this.ifadd;
  }

  updateParentData(customer: any) {
    this.$emit("updateParentData", customer);
  }
}
</script>

<style scoped>
.rebutton {
  margin: 1rem;
}
.editbutton {
  margin-left: 85%;
}
</style>
