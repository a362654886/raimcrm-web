<template>
  <div>
    <div id="customerFilter_background">
      <label class="filtertext" style="font-size: large">Attribute Choose</label>
      <div style="display: flex">
        <div class="form-group" style="width:25%;margin-left: 1rem;display: flex">
          <label class="filtertext">Name</label>
          <div style="margin-left: 1rem">
            <b-form-checkbox
                id="checkbox-1"
                v-model="ifname"
                name="checkbox-1"
                value="true"
                unchecked-value="false"
            />
          </div>
        </div>

        <div class="form-group" style="width:25%;margin-left: 1rem;display: flex">
          <label class="filtertext">Email</label>
          <div style="margin-left: 1rem">
            <b-form-checkbox
                id="checkbox-2"
                v-model="ifemail"
                name="checkbox-2"
                value="true"
                unchecked-value="false"
            />
          </div>
        </div>

        <div class="form-group" style="width:25%;margin-left: 1rem;display: flex">
          <label class="filtertext">Phone</label>
          <div style="margin-left: 1rem">
            <b-form-checkbox
                id="checkbox-3"
                v-model="ifphone"
                name="checkbox-3"
                value="true"
                unchecked-value="false"
            />
          </div>
        </div>

        <div class="form-group" style="width:25%;margin-left: 1rem;display: flex">
          <label class="filtertext">Address</label>
          <div style="margin-left: 1rem">
            <b-form-checkbox
                id="checkbox-4"
                v-model="ifaddress"
                name="checkbox-4"
                value="true"
                unchecked-value="false"
            />
          </div>
        </div>

        <div class="form-group" style="width:25%;margin-left: 1rem;display: flex">
          <label class="filtertext">Labels</label>
          <div style="margin-left: 1rem">
            <b-form-checkbox
                id="checkbox-5"
                v-model="iflabel"
                name="checkbox-5"
                value="true"
                unchecked-value="false"
            />
          </div>
        </div>
      </div>
      <div>
        <b-button style="background-color:#DC143C;width:20%;" @click="showTable">Search</b-button>
      </div>
    </div>
    <VAlert
        :text = "alert.text"
        :type = "alert.type"
        :ifshow="alert.ifshow"
    />
    <div >
      <VSelectTable
          v-if = "ifshowTable"
          :items="output"
          :fields="outputfield"
          :rows="rows"
          :perPage="20"
          :pagination = true
          @passValue="SaveData"
      />
    </div>
  </div>
</template>

<script>

import { Component, Prop, Vue } from "vue-property-decorator";

import VSelectTable from "@/components/VSelectTable.vue";
import leadApi from "../../api/leadApi";
import googlePeopleApi from "../../api/googlePeopleApi";
import VAlert from "@/components/VAlert";
import AlertModel from "../../../db-models/alertModel";

@Component({
  components: {
    VSelectTable,
    VAlert
  },
})
export default class GoogleContactsUpload extends Vue{
  output = [];
  attributes = "";
  outputfield = [];
  rows = 0;
  ifshowTable = false;
  alert = new AlertModel();

  ifname = false;
  ifemail = false;
  ifphone = false;
  ifaddress = false;
  iflabel = false;

  async showTable(){
    let searchString = this.getString();
    let data = await googlePeopleApi.getPeople(searchString);
    this.getfield()
    this.output = data.data;
    this.ifshowTable = true;
  }

  getString(){
    let searchString = "";
    if(this.ifname == "true"){
      searchString +="names"
    }
    if(this.ifemail == "true"){
      searchString +=",emailAddresses"
    }
    if(this.ifphone == "true"){
      searchString +=",phoneNumbers"
    }
    if(this.ifaddress == "true"){
      searchString +=",addresses"
    }
    if(this.iflabel == "true"){
      searchString +=",memberships"
    }
    return searchString
  }

  getfield(){
    if(this.ifname == "true"){
      let newAttribute = { key: 'name', label: 'name', sortable: true }
      this.outputfield.push(newAttribute)
    }
    if(this.ifemail == "true"){
      let newAttribute = { key: 'email', label: 'email', sortable: true }
      this.outputfield.push(newAttribute)
    }
    if(this.ifphone == "true"){
      let newAttribute = { key: 'phone', label: 'phone', sortable: true }
      this.outputfield.push(newAttribute)
    }
    if(this.ifaddress == "true"){
      let newAttribute = { key: 'address', label: 'address', sortable: true }
      this.outputfield.push(newAttribute)
    }
    if(this.iflabel == "true"){
      let newAttribute = { key: 'labels', label: 'labels', sortable: true }
      this.outputfield.push(newAttribute)
    }
  }

  async SaveData(data){
    let LeadsData = [];
    data.forEach(value=> {
      let date = new Date();
      let utcDate = date.toISOString().replace(/Z/, "+12");
      let onedata = {
        "Lead_ID": `${value.teamId}${value.userId}${value.phone}${value.email}`,
        "LeadName": value.name,
        "Phone": value.phone,
        "Email": value.email,
        "Address":value.address,
        "Note": "",
        "Archive": false,
        "UploadDate": utcDate,
        "Team_ID": value.teamId,
        "User_ID": value.userId,
        "ResourceName": value.resourceName,
        "Labels": value.labels
      }
      LeadsData.push(onedata);
    })
    let result = await leadApi.addleads(LeadsData);
    if(result == 200){
      this.alert.showSuccess("success",this.alert);
    }else{
      this.alert.showfail("fail",this.alert)
    }
  }

}
</script>

<style scoped>

</style>