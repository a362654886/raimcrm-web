<template>
  <div>
    <b-nav tabs fill>
      <b-nav-item :active = "ifnewUser" @click="showNewUser">Register New User</b-nav-item>
      <b-nav-item :active = "ifshowUsers" @click="showUsers">User Filter</b-nav-item>
    </b-nav>
    <div v-if = "ifnewUser">
      <NewUser />
    </div>
    <div v-if = "ifshowUsers">
      <UserFilter v-if = "showUserFilter" @updateUser="UpdateUser"/>
      <UpdateUser v-if = "showUserUpdate"
                  :updateuser = "readyupdateuser"
                  @backfilter="backfilter"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import NewUser from "@/views/UsersManagerment/NewUser.vue";
import UserFilter from "@/views/UsersManagerment/UserFilter.vue";
import UpdateUser from "@/views/UsersManagerment/UpdateUser.vue";

@Component({
  components: {
    NewUser,
    UserFilter,
    UpdateUser
  },
})
export default class UserMainPage extends Vue{
  ifnewUser = true;
  ifshowUsers = false;
  showUserFilter = true;
  showUserUpdate = false;
  readyupdateuser = "";



  showNewUser(){
    this.ifnewUser = true;
    this.ifshowUsers = false;
  }

  showUsers(){
    this.ifnewUser = false;
    this.ifshowUsers = true;
  }

  UpdateUser(user: any){
    this.readyupdateuser = user;
    console.log(this.readyupdateuser)
    this.showUserFilter = false;
    this.showUserUpdate = true;
  }

  backfilter(){
    this.showUserFilter = true;
    this.showUserUpdate = false;
  }
}
</script>

<style scoped>

</style>