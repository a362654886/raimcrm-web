<template>
  <div>
    <div class="messageAlert">
      <div style="margin-bottom: 1rem">
        <h5
          style="
            color: white;
            height: 40px;
            padding-top: 10px;
            background-color: #0074d9;
          "
        >
          Message
        </h5>
      </div>
      <div>
        <div class="childBoxTitle">
          <div style="width: 25%">
            <h6 class="childBoxPleft">Type:</h6>
          </div>
          <div style="width: 25%">
            <h6 class="childBoxPleft">Time:</h6>
          </div>
          <div style="width: 25%">
            <h6 class="childBoxPleft">Context:</h6>
          </div>
          <div style="width: 25%">
            <h6 class="childBoxPleft">Read:</h6>
          </div>
        </div>

        <div class="scrollboxless">
          <div v-for="member in this.alertMessages" :key="member.index">
            <b-card v-if="!member.ifRead" style="margin-top: 20px">
              <div style="display: flex">
                <div style="width: 25%">
                  <h6 class="childBoxPleft">
                    <a href="#" @click = toCustomerId(member.customerId)>{{ member.type }}</a>
                  </h6>
                </div>
                <div style="width: 25%">
                  <h6 class="childBoxPleft">
                    {{ functions.getFormatData(member.time) }}
                  </h6>
                </div>
                <div style="width: 25%">
                  <h6 class="childBoxPleft">{{ member.context }}</h6>
                </div>
                <div style="width: 25%">
                  <h6 class="childBoxPleft">
                    <el-button
                      type="primary"
                      plain
                      style="width: 80px; padding: 5px; height: 35px"
                      @click="readMessage(member.alertId)"
                    >
                      Read
                    </el-button>
                  </h6>
                </div>
              </div>
            </b-card>

            <b-card
              v-if="member.ifRead"
              style="background-color: #67696b; margin-top: 20px"
            >
              <div style="display: flex">
                <div style="width: 25%">
                  <h6
                    class="childBoxPleft"
                    style="text-decoration: line-through"
                  >
                    <a href="#" style="color: black">{{ member.type }}</a>
                  </h6>
                </div>
                <div style="width: 25%">
                  <h6
                    class="childBoxPleft"
                    style="text-decoration: line-through"
                  >
                    {{ functions.getFormatData(member.time) }}
                  </h6>
                </div>
                <div style="width: 25%">
                  <h6
                    class="childBoxPleft"
                    style="text-decoration: line-through"
                  >
                    {{ member.context }}
                  </h6>
                </div>
                <div style="width: 25%">
                  <h6 class="childBoxPleft">
                    <el-button
                      type="info"
                      plain
                      style="
                        text-decoration: line-through;
                        width: 80px;
                        padding: 5px;
                        height: 35px;
                      "
                      @click="unReadMessage(member.alertId)"
                    >
                      UnRead
                    </el-button>
                  </h6>
                </div>
              </div>
            </b-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import store from "@/store";
import otherFunctions from "../../functions/otherFunctions";
import messageApi from "@/api/messageAlertApi";

@Component
export default class MessageAlert extends Vue {
  private alertMessages: any[] = [];
  private functions = otherFunctions;
  private bcColor = "background-color:''";

  created() {
    this.alertMessages = store.state.alertMessages;
  }

  async readMessage(userId: string) {
    let index = this.getIndex(userId);
    this.alertMessages[index].ifRead = true;
    const alertMessage = {
      Alert_ID: this.alertMessages[index].alertId,
      Time: this.alertMessages[index].time,
      Context: this.alertMessages[index].context,
      Type: this.alertMessages[index].type,
      IfRead: "true",
      User_ID: this.alertMessages[index].userId,
      Customer_ID: this.alertMessages[index].customerId,
    };
    let result = await messageApi.updateMessageAlert(alertMessage);
    if (result == 200) {
      const messageAlerts = await messageApi.getAlertsByUser(
        alertMessage.User_ID
      );
      this.updateState(messageAlerts)
      store.commit("saveAlertMessages", messageAlerts);
    }
  }

  async unReadMessage(userId: string) {
    let index = this.getIndex(userId);
    this.alertMessages[index].ifRead = false;
    const alertMessage = {
      Alert_ID: this.alertMessages[index].alertId,
      Time: this.alertMessages[index].time,
      Context: this.alertMessages[index].context,
      Type: this.alertMessages[index].type,
      IfRead: "false",
      User_ID: this.alertMessages[index].userId,
      Customer_ID: this.alertMessages[index].customerId,
    };
    let result = await messageApi.updateMessageAlert(alertMessage);
    console.log(result)
    if (result == 200) {
      const messageAlerts = await messageApi.getAlertsByUser(
        alertMessage.User_ID
      );
      this.updateState(messageAlerts)
      store.commit("saveAlertMessages", messageAlerts);
    }
  }

  async updateState(alerts: any[]) {
    const ifnew = false
    let num = 0
    let result = false
    alerts.forEach((m: any) =>{
      if(m.ifRead == false){
        num++
        result = true;
      }      
    })
    store.commit("saveMessageAlert",result)
    store.commit("saveMessageNum",num)
  }

  getIndex(alertId: string) {
    let result = -1;
    for (let i = 0; i < this.alertMessages.length; i++) {
      if (alertId == this.alertMessages[i].alertId) {
        result = i;
      }
    }
    return result;
  }

  async toCustomerId(CustomerId: any) {
    console.log(CustomerId)
    if (CustomerId != "empty") {
      let index = await otherFunctions.findCustomerIndex(CustomerId);
      if (index == -2) {
        /*this.alert.showAlert(
          "you don't have the authority to access this client",
          this.alert
        );*/
      } else {
        store.commit("saveCustomer", index);
        this.$router.push("customershow").catch((err) => {
          err;
        });
      }
    }
  }
}
</script>

<style scoped>
.messageAlert {
  background-color: #f7f7f7;
  width: 90%;
  margin: 2rem 5% 0 5%;
  position: absolute;
}

.childBoxTitle {
  margin-top: 10px;
  border-bottom: 1px solid #6b6a6a;
  display: flex;
}

.childBoxPleft {
  text-align: left;
  margin-bottom: 10px;
  margin-left: 1px;
}

.childBoxP {
  text-align: center;
  margin-bottom: 10px;
}

.scrollboxless {
  position: relative;
  overflow-y: auto;
  max-height: 800px;
}

</style>
