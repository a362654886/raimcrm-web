<template>
  <div class='demo-app'>
    <div class='demo-app-sidebar'>
      <div class='demo-app-sidebar-section'>
        <label>
          <input
              type='checkbox'
              :checked='calendarOptions.weekends'
              @change='handleWeekendsToggle'
          />
          toggle weekends
        </label>
      </div>
      <div class='demo-app-sidebar-section'>
        <h2>client</h2>
      </div>
      <div class='demo-app-sidebar-section'>
        <h3>Task</h3>
        <div>
          <div class="calenderBox">
            <h6 class = "calenderTitle">Client Name:</h6>
            <h6 class = "calenderText" @click="toCustomer(taskinfo.customerID)"><a href="#">{{taskinfo.clientName}}</a></h6>
          </div>
          <div class="calenderBox">
            <h6 class = "calenderTitle">Client Phone:</h6>
            <h6 class = "calenderText">{{taskinfo.clientPhone}}</h6>
          </div>
          <div>
            <h6 class = "calenderAppointmentTitle">{{timename}}</h6>
            <h6 class = "calenderText">{{taskinfo.time}}</h6>
          </div>
          <div>
            <h6 class = "calenderTitle">Task Context:</h6>
            <h6 class = "calenderText">{{taskinfo.context}}</h6>
          </div>
        </div>
      </div>
    </div>
    <div class='demo-app-main'>
      <FullCalendar
          class='demo-app-calendar'
          :options='calendarOptions'
      >
        <template v-slot:eventContent='arg'>
          <div style = "width:100px">
            <b>{{ arg.timeText }}</b>
            <i>{{ `${arg.event.extendedProps.customerName}'s ${arg.event.extendedProps.type}` }}</i>
          </div>
        </template>
      </FullCalendar>
    </div>
  </div>
</template>

<script lang='ts'>
import {Component,Prop, Vue} from "vue-property-decorator";
import FullCalendar, {CalendarOptions, EventApi, DateSelectArg, EventClickArg, EventInput} from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import store from "@/store";
import UserApi from "../../api/UserApi";
import VLabel from "@/components/VLabel.vue";
import otherFunctions from "../../../functions/otherFunctions";
import customerApi from "@/api/customerApi";

@Component({
  components: {
    FullCalendar,
    VLabel
  },
})
export default class Calender extends Vue{
  private taskinfo: any = {
    "clientName":"",
    "clientPhone":"",
    "time":"",
    "type":"",
    "context":"",
    "customerID":""
  }
  private calendarOptions: CalendarOptions = {
    plugins: [
      dayGridPlugin,
      timeGridPlugin,
      interactionPlugin // needed for dateClick
    ],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    initialView: 'dayGridMonth',
    events: "",
    editable: false,
    selectable: false,
    selectMirror: true,
    dayMaxEvents: true,
    weekends: true,
    eventClick: this.handleEventClick,
  }
  private currentEvents: EventApi[] = []
  private timename = "Time:";


  async created(){
    this.calendarOptions.events = await UserApi.getTasks(store.state.loginUser['email']);
  }

  handleWeekendsToggle() {
    this.calendarOptions.weekends = !this.calendarOptions.weekends // update a property
  }

  handleEventClick(clickInfo: EventClickArg) {
    this.taskinfo.clientName = clickInfo.event._def.extendedProps.customerName;
    if(clickInfo.event._def.extendedProps.customerPhone != null){
      this.taskinfo.clientPhone = clickInfo.event._def.extendedProps.customerPhone.mobile;
    }else{
      this.taskinfo.clientPhone = "";
    }
    this.taskinfo.time = otherFunctions.getDateTimeString(new Date(clickInfo.event._def.extendedProps.time));
    if(clickInfo.event._def.extendedProps.type == "Appointment"){
      this.timename = "Appointment Time:"
      this.taskinfo.context = clickInfo.event._def.extendedProps.context;
    }else{
      this.timename = "Brithday Time:"
      this.taskinfo.context = `${clickInfo.event._def.extendedProps.customerName}'s Brithday`;
    }
    this.taskinfo.customerID = clickInfo.event._def.extendedProps.customer_ID;
  }
  async toCustomer(customerID: string){
    let index = await otherFunctions.findCustomerIndex(customerID)
    //let customer = await customerApi.getCustomer(customerID);
    store.commit("saveCustomer",index)
    this.$router.push("customershow").catch(err => {err});
  }
}
</script>

<style lang='css'>

h2 {
  margin: 0;
  font-size: 16px;
}

ul {
  margin: 0;
  padding: 0 0 0 1.5em;
}

li {
  margin: 1.5em 0;
  padding: 0;
}

b { /* used for event dates/times */
  margin-right: 3px;
}

.demo-app {
  display: flex;
  min-height: 100%;
  font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
  font-size: 14px;
}

.demo-app-sidebar {
  width: 300px;
  line-height: 1.5;
  background: #eaf9ff;
  border-right: 1px solid #d3e2e8;
}

.demo-app-sidebar-section {
  padding: 1em;
}

.demo-app-main {
  flex-grow: 1;
  padding: 3em;
}

.fc { /* the calendar root */
  max-width: 1100px;
  margin: 0 auto;
}
.calenderBox{
  display: flex;
}
.calenderTitle{
  font-weight: bold;
  font-size: large;
  width:120px;
  text-align: left;
}
.calenderAppointmentTitle{
  font-weight: bold;
  font-size: large;
  text-align: left;
}
.calenderText{
  text-align: left;
}
</style>