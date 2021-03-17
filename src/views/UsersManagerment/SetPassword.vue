<template>
  <div>
    <VAlert
        :text = "alert.text"
        :type = "alert.type"
        :ifshow="alert.ifshow"
    />
    <div>
      <div class= "newUser">
        <VInput
            class = 'newUserBox'
            :titleWidth = "'width:150px'"
            :textWidth = "'width:250px'"
            :labelstring = "'Email'"
            :contextstring ="userid"
            :inputtype = "'userid'"
            :type = "'input'"
            :ifdisable="true"
            @fieldChanged = "selectChange" />
        <VInput
            class = 'newUserBox'
            :titleWidth = "'width:150px'"
            :textWidth = "'width:250px'"
            :labelstring = "'Old Password'"
            :contextstring ="oldpassword"
            :inputtype = "'oldpassword'"
            :type = "'input'"
            @fieldChanged = "selectChange" />
        <VInput
            class = 'newUserBox'
            :titleWidth = "'width:150px'"
            :textWidth = "'width:250px'"
            :labelstring = "'New Password'"
            :contextstring ="newpassword"
            :inputtype = "'newpassword'"
            :type = "'input'"
            @fieldChanged = "selectChange" />
        <VInput
            class = 'newUserBox'
            :titleWidth = "'width:150px'"
            :textWidth = "'width:250px'"
            :labelstring = "'Conform Password'"
            :contextstring ="confirmpassword"
            :inputtype = "'confirmpassword'"
            :type = "'input'"
            @fieldChanged = "selectChange" />
      </div>
      <b-button style="width: 20%" @click="changepassword">Change</b-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { User} from "../../../db-models/db-userManagement";
import VAlert from "@/components/VAlert.vue";
import AlertModel from "../../../db-models/alertModel";
import VInput from "@/components/VInput.vue";
import {roleBox} from "../../../data/options_data"
import checkFunctions from "../../../functions/checkFunctions";
import teamApi from "@/api/teamApi";
import userApi from "@/api/UserApi";
import store from "@/store";

@Component({
  components: {
    VAlert,
    VInput
  },
})
export default class SetPassword extends Vue{

  private userid = "";
  private oldpassword = "";
  private newpassword = "";
  private confirmpassword = "";
  private alert = new AlertModel();

  created(){
    this.userid = store.state.loginUser["email"]
  }

  selectChange(obj: any){
    switch(obj.type){
      case "userid":
        this.userid = obj.text;
        break;
      case "oldpassword":
        this.oldpassword = obj.text;
        break;
      case "newpassword":
        this.newpassword = obj.text;
        break;
      case "confirmpassword":
        this.confirmpassword = obj.text;
        break;
    }
  }

  async changepassword(){
    let result = await userApi.login(`?LoginEmail=${this.userid}&&Password=${this.oldpassword}`)
    if(result.status == 200){
      if(this.newpassword == this.confirmpassword){
        let newUser = {
          "User_ID":this.userid,
          "Name":store.state.loginUser.name,
          "Password":this.newpassword,
          "Role":store.state.loginUser["role"],
          "Team_ID":store.state.loginUser["teamId"]
        }
        result = await userApi.updateUser(newUser)
        if(result.status == 200){
          this.alert.showSuccess("success",this.alert)
          this.oldpassword = ""
          this.newpassword = ""
          this.confirmpassword = ""
        }else{
          this.alert.showfail("something wrong",this.alert)
        }
      }else{
        this.alert.showfail("confirm password is wrong",this.alert)
      }
    }else{
      this.alert.showfail("oldpassword wrong",this.alert)
    }
  }

}
</script>

<style scoped>
.newUser{
  width:40%;
  margin: 0 auto;
  margin-top: 4rem;
}
.newUserBox{
  margin: 1rem auto;
}
</style>