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
          <VInput
            class="newUserBox"
            :titleWidth="'width:150px'"
            :textWidth="'width:250px'"
            :labelstring="'User'"
            :contextstring="transferUserId"
            :inputtype="'newUserTeam'"
            :type="'select'"
            :selectOption="userSelection"
            @fieldChanged="selectChange"
          />
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            Close
          </button>
          <button
            type="button"
            class="btn btn-primary"
            data-dismiss="modal"
            @click="emitFn"
          >
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
import userApi from "@/api/UserApi";
import Multiselect from "vue-multiselect";
import VLoadding from "@/components/VLoadding.vue";

@Component({
  components: {
    VInput,
    VAlert,
    Multiselect,
    VLoadding,
  },
})
export default class VUserDataTransfer extends Vue {
  /*
  :selectOption="userSelection"
            @fieldChanged="selectChange"
             @click="saveCustomer"
  */
  @Prop()
  private idstring!: string;
  @Prop()
  private titlestring!: string;
  @Prop()
  private teamId!: string;
  @Prop()
  private iniUserId!: string;

  private transferUserId = "";
  private userSelection: any = [];

  async created() {
    let teamids = await userApi.getUsersByTeam(this.teamId);
    console.log(teamids);
    if (teamids.status == 200) {
      for (let i = 0; i < teamids.data.length; i++) {
        if (teamids.data[i].user_ID != this.iniUserId) {
          let user = {
            value: teamids.data[i].user_ID,
            text: teamids.data[i].user_ID,
          };
          this.userSelection.push(user);
        }
      }
    }
    this.transferUserId = this.userSelection[0].text
  }

  selectChange(data: any) {
    this.transferUserId = data.text;
  }

  emitFn() {
    this.$emit("delete", this.transferUserId);
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
