<template>
  <div class="modal fade" :id="idstring" aria-hidden="true">
    <div class="dialogbox modal-dialog">
      <div class="modal-content">
        <div class="modal-header" style="background-color: #0074d9">
          <h5 class="modal-title" style="color: white">{{ titlestring }}</h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <VAlert
            :text="alert.text"
            :type="alert.type"
            :ifshow="alert.ifshow"
          />
          <VLoadding :ifshow="loading.ifshow" />
          <div style="margin-top: 1rem; display: flex">
            <div style="width: 110px">
              <p class="title">Name:</p>
            </div>
            <div class="edit-namebox">
              <input
                style="width: 220px"
                class="form-control"
                placeholder="first name"
                v-model="Customer_firstName"
              />
            </div>
            <div class="edit-namebox">
              <input
                style="width: 220px"
                class="form-control"
                placeholder="middle name"
                v-model="Customer_middleName"
              />
            </div>
            <div class="edit-namebox">
              <input
                style="width: 220px"
                class="form-control"
                placeholder="last name"
                v-model="Customer_lastName"
              />
            </div>
          </div>
          <div class="rows" style="margin-top: 1rem; display: flex">
            <VInput
              style="width: 40%"
              :titleWidth="' text-align: left;margin-top: 7px;width: 80px;font-weight: normal;font-weight: bold;'"
              :textWidth="'width:220px'"
              :labelstring="'Email'"
              :inputtype="'Email'"
              :type="'input'"
              :contextstring="Customer_Email"
              @fieldChanged="customerChange"
            />
            <VInput
              style="width: 40%"
              :titleWidth="' text-align: left;margin-top: 7px;width: 80px;font-weight: normal;font-weight: bold;'"
              :textWidth="'width:220px'"
              :labelstring="'Mobile'"
              :inputtype="'mobile'"
              :type="'input'"
              :contextstring="Customer_Mobile"
              @fieldChanged="customerChange"
            />
          </div>
          <div class="rows" style="margin-top: 1rem; display: flex">
            <VInput
              style="width: 50%"
              :titleWidth="'text-align: left;margin-top: 7px;width: 80px;font-weight: normal;font-weight: bold;'"
              :textWidth="'width:150px'"
              :labelstring="'Brithday'"
              :inputtype="'BrithDay'"
              :type="'time'"
              :contextstring="Brithday"
              @fieldChanged="customerChange"
            />
          </div>
          <div style="display: flex; margin-top: 20px">
            <p
              style="
                text-align: left;
                margin-top: 7px;
                width: 80px;
                font-weight: normal;
                display: flex;
                font-weight: bold;
              "
            >
              Label:
            </p>
            <Multiselect
              style="margin-left: 30px; width: 80%"
              v-model="customer_label_choose"
              :options="label_options"
              multiple
            >
            </Multiselect>
          </div>
          <VInput
            style="display: inline; width: 90%; margin-top: 1rem"
            :labelstring="'Post Address'"
            :titleWidth="'text-align: left;margin-top: 7px;width: 150px;font-weight: normal;font-weight: bold;'"
            :inputtype="'Post_Address'"
            :type="'input'"
            :contextstring="Customer_PostAddress"
            @fieldChanged="customerChange"
          />
          <VInput
            style="display: inline; width: 90%; margin-top: 1rem"
            :labelstring="'Note'"
            :titleWidth="'text-align: left;margin-top: 7px;width: 150px;font-weight: normal;font-weight: bold;'"
            :inputtype="'Note'"
            :type="'text'"
            :contextstring="Customer_Note"
            @fieldChanged="customerChange"
          />
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            Close
          </button>
          <button type="button" class="btn btn-primary" @click="saveCustomer">
            Add
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import VInput from "@/components/VInput.vue";
import VAlert from "@/components/VAlert.vue";
import AlertModel from "../../db-models/alertModel";
import checkFunctions from "../../functions/checkFunctions";
import customerApi from "@/api/customerApi";
import store from "@/store";
import noteApi from "@/api/noteApi";
import Multiselect from "vue-multiselect";
import VLoadding from "@/components/VLoadding.vue";
import LoadModel from "../../db-models/loaddingModel";
import $ from "jquery";
import { getStoreUser, User } from "../../db-models/db-userManagement";

@Component({
  components: {
    VInput,
    VAlert,
    Multiselect,
    VLoadding,
  },
})
export default class VDialogueAdd extends Vue {
  @Prop()
  private idstring!: string;
  @Prop()
  private titlestring!: string;
  @Prop({ default: false })
  private propertyAdd!: boolean;

  @Prop({ default: "" }) leadName!: string;
  @Prop({ default: "" }) leadMobile!: string;
  @Prop({ default: "" }) leadEmail!: string;
  @Prop({ default: "" }) leadNote!: any;
  @Prop({ default: "" }) leadAddress!: string;
  @Prop({ default: "" }) leadResourceName!: string;
  @Prop({ default: "" }) leadLabels!: string;

  private alert = new AlertModel();
  private loading = new LoadModel();

  private Customer_firstName = "";

  private Customer_middleName = "";
  private Customer_lastName = "";
  private Customer_Email = "";
  private Customer_PostAddress = "";
  private Customer_Mobile = "";
  private Customer_Note = "";
  private customer_label_choose: any[] = [];
  label_options = ["vender", "buyer", "solicitors", "potential_vender"];
  private Brithday = new Date();
  private Customer_Label = {
    Label_ID: "",
    Vender: "",
    Buyer: "",
    Solicitors: "",
    Potential_Vender: "",
    Customer_ID: "",
  };

  @Watch("leadName")
  updateName(new_val: string) {
    this.Customer_firstName = new_val;
  }

  @Watch("leadLabels")
  updateLabels(new_val: string) {
    this.customer_label_choose = new_val.split(",");
    this.customer_label_choose.pop();
  }

  @Watch("leadMobile")
  updateMobile(new_val: string) {
    this.Customer_Mobile = new_val;
    //this.alert.disappear();
    //this.Brithday = new Date();
    //this.Customer_Email = "";
    //this.Customer_PostAddress = "";
  }

  @Watch("leadEmail")
  updateEmail(new_val: string) {
    this.Customer_Email = new_val;
  }

  @Watch("leadNote")
  updateNote(new_val: string) {
    this.Customer_Note = new_val;
  }

  @Watch("leadAddress")
  updateAddress(new_val: string) {
    this.Customer_PostAddress = new_val;
  }

  customerChange(data: any) {
    if (data.type == "BrithDay") {
      this.Brithday = data.text;
    }
    if (data.type == "Post_Address") {
      this.Customer_PostAddress = data.text;
    }
    if (data.type == "Email") {
      this.Customer_Email = data.text;
    }
    if (data.type == "mobile") {
      this.Customer_Mobile = data.text;
    }
    if (data.type == "Note") {
      this.Customer_Note = data.text;
    }
  }

  getCustomerlabel() {
    if (this.ifarraycontain(this.customer_label_choose, "vender")) {
      this.Customer_Label.Vender = "Vender";
    }
    if (this.ifarraycontain(this.customer_label_choose, "buyer")) {
      this.Customer_Label.Buyer = "Buyer";
    }
    if (this.ifarraycontain(this.customer_label_choose, "solicitors")) {
      this.Customer_Label.Solicitors = "Solicitors";
    }
    if (this.ifarraycontain(this.customer_label_choose, "potential_vender")) {
      this.Customer_Label.Potential_Vender = "Potential_Vender";
    }
  }

  ifarraycontain(arr: any[], item: any) {
    let result = false;
    arr.forEach((value) => {
      if (value == item) {
        result = true;
      }
    });
    return result;
  }

  generateCustomerId() {
    let customerId = `${this.Customer_firstName}_${this.Customer_lastName},${this.Customer_Email},${this.Customer_Mobile}`;

    return customerId;
  }

  passValuetoParents(value: string) {
    this.$emit("add", value);
  }

  async saveCustomer() {
    this.loading.show();
    let customerId = this.generateCustomerId();
    if (customerId != "alert") {
      this.Customer_Label.Label_ID = `${customerId}Labelobj`;
      this.Customer_Label.Customer_ID = customerId;
    }
    this.getCustomerlabel();
    let loginuser: User = getStoreUser();
    let addCustomer = {
      Customer_ID: customerId,
      First_Name: this.Customer_firstName,
      Middle_Name: this.Customer_middleName,
      Last_Name: this.Customer_lastName,
      Email: this.Customer_Email,
      BrithDay: this.Brithday,
      Source: "",
      Post_Address: this.Customer_PostAddress,
      Customer_Phone: {
        Phone_ID: `${customerId}Phoneobj`,
        Mobile: this.Customer_Mobile,
        Home: "",
        Work: "",
        Customer_ID: customerId,
      },
      Team_ID: loginuser.teamId,
      User_ID: loginuser.email,
      Customer_Label: this.Customer_Label,
      ResourceName: this.leadResourceName,
    };
    let testresult = checkFunctions.checkClientEdit(addCustomer);
    if (testresult == "true") {
      let returncustomer: any;
      if (addCustomer.ResourceName == "") {
        returncustomer = await customerApi.addCustomer(addCustomer, true);
      } else {
        returncustomer = await customerApi.addCustomerWithoutGoogle(
          addCustomer
        );
      }
      if (returncustomer.state == 400) {
        this.alert.showfail("this client already exist", this.alert);
      } else {
        this.alert.showSuccess("success", this.alert);
        if (this.Customer_Note.trim() != "") {
          await this.saveNote(addCustomer.Customer_ID);
        } else {
          this.passValuetoParents(addCustomer.Customer_ID);
        }
      }

      if (this.propertyAdd == true) {
        this.$emit("sendSuccessId", this.generateCustomerId());
      }

      const jquery: any = $(`#${this.idstring}`);
      jquery.modal("hide");
    } else {
      this.alert.showfail(testresult, this.alert);
    }
    this.loading.disappear();
  }

  async saveNote(CustomerId: string) {
    let date = new Date();
    let utcDate = date.toISOString().replace(/Z/, "+12");
    let newNote = {
      Note_ID: `C${CustomerId}T${utcDate}`,
      Context: this.Customer_Note,
      Next_Step: "",
      N_Time: utcDate,
      Customer_ID: CustomerId,
    };
    let result = await noteApi.addnote(newNote);
    if (result.status == 201) {
      this.alert.showSuccess("success", this.alert);
      this.passValuetoParents(CustomerId);
    }
  }
}
</script>

<style scoped>
.dialogbox {
  max-width: 100%;
  min-width: 90%;
  margin-left: 5%;
  position: absolute;
  top: 10%;
  transform: translate(0, -50%);
}

.title {
  font-weight: bold;
  text-align: left;
  margin-top: 7px;
  width: 150px;
}
</style>
