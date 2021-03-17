<template>
  <div class="overflow-auto" style="margin-top: 1rem">
    <b-table
        id="my-table"
        class="table"
        striped
        hover
        :items="items"
        :fields="localFields"
        :sort-by="sortBy"
        :sort-desc="sortDesc"
        :per-page="localPerPage"
        :current-page="cPage"
        small
        responsive="sm"
    >
      <template v-slot:cell(button)="row">
        <b-button size="sm" @click = "setLead(row)" data-toggle="modal" data-target="#customerAdd" class="mr-2" >
          Add
        </b-button>
        <b-button size="sm" @click="archiveValueToParents(row)" class="mr-2">
          Archive
        </b-button>
      </template>
    </b-table>
    <b-pagination
        v-model="cPage"
        :total-rows="localRows"
        :per-page="localPerPage"
        aria-controls="my-table"
        align="center"
        v-if = "pagination"
    ></b-pagination>

    <p class="mt-3" v-if = "pagination">Current Page: {{ currentPage }}</p>
    <VDialogueAdd :idstring = "'customerAdd'"
                  :titlestring="'Client Add'"
                  :leadName="choosedLead.Customer_firstName"
                  :leadEmail="choosedLead.Customer_Email"
                  :leadMobile="choosedLead.Customer_Mobile"
                  :leadAddress="choosedLead.Customer_Address"
                  :leadNote="CustomerNote"
                  :leadResourceName="choosedLead.ResourceName"
                  :leadLabels="choosedLead.Customer_Labels"
                  @add = "addValueToParents"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import VDialogueAdd from "@/components/VDialogueAdd.vue";
import store from "@/store";

@Component({
  components: {
    VDialogueAdd
  },
})
export default class VTable extends Vue {

  choosedLeadId = "";
  choosedLead = {
    Customer_firstName:"",
    Customer_Email:"",
    Customer_Mobile:"",
    Customer_Address:"",
    Customer_Labels:"",
    ResourceName:""
  };
  CustomerNote = "";
  leadId = "";

  @Prop({ default: 1 })
  private currentPage!: number;

  @Prop()
  private sortBy!: string;

  @Prop({ default: 0 })
  private rows!: number;

  @Prop()
  private perPage!: number;

  @Prop({ default: () => false })
  private sortDesc!: boolean;

  @Prop() private fields!: string[];

  @Prop() private items!: string[];

  @Prop() private pagination!: boolean;

  cPage = this.currentPage
  localPerPage = this.perPage;
  localFields = this.fields;
  private localRows = this.rows;

  addValueToParents() {
    this.$emit("addValue", this.leadId);
  }

  archiveValueToParents(obj: any) {
    this.$emit("archiveValue",`${obj.item.teamId}${obj.item.userId}${obj.item.phone}${obj.item.email}`);
  }

  setLead(lead: any){
    this.choosedLeadId = `${lead.item.teamId}${lead.item.userId}${lead.item.phone}${lead.item.email}`
    this.choosedLead.Customer_firstName = lead.item.name;
    this.choosedLead.Customer_Email = lead.item.email;
    this.choosedLead.Customer_Mobile = lead.item.phone;
    this.choosedLead.Customer_Address = lead.item.address;
    this.choosedLead.ResourceName = lead.item.resourceName;
    this.choosedLead.Customer_Labels = lead.item.labels;
    this.CustomerNote = lead.item.note;
    this.leadId = lead.item.leadId;
  }

  @Watch("cPage")
  updateMobile(new_val: string) {
    this.$emit("passPage", this.cPage,this.localPerPage);
  }

  @Watch("rows")
  updateRows(new_val: any) {
    this.localRows = new_val;
  }

  @Watch("fields")
  updateFields(new_val: any) {
    this.localFields = new_val;
  }
}
</script>

<style lang="scss" scoped>
.table {
  cursor: pointer;
}
</style>