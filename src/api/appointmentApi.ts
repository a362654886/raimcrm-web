import { Vue } from "vue-property-decorator";
import modelCreate from "../../db-models/modelCreate";
import { Customer } from "../../db-models/db-customer";
const basicURL = process.env.VUE_APP_API_ADDRESS + "appointment";
export default {
  //get functions
  async getAppointment(appointmentsId: any) {
    const endpoint = basicURL + "/" + appointmentsId;
    let result: any = "";
    await Vue.axios
      .get(endpoint)
      .then((response) => {
        result = response;
      })
      .catch((error) => {
        console.log(error);
      });
    return result;
  },
  async updateAllappointments(appointmentsData: any) {
    const endpoint = basicURL + "/updateAll";
    let result: any = "";
    await Vue.axios
      .put(endpoint, appointmentsData)
      .then((response) => {
        result = response;
      })
      .catch((error) => {
        console.log(error);
      });
    return result;
  },
  async addAppointment(appointmetnData: any) {
    const endpoint = basicURL;
    let result: any = "";
    await Vue.axios
      .post(endpoint, appointmetnData)
      .then((response) => {
        result = response;
      })
      .catch((error) => {
        console.log(error);
      });
    return result;
  },
  async deleteAppointment(appointmentId: any) {
    const endpoint = basicURL + "/" + encodeURIComponent(appointmentId);
    let result: any = "";
    await Vue.axios
      .delete(endpoint)
      .then((response) => {
        result = response.status;
      })
      .catch((error) => {
        result = 404;
      });
    return result;
  },
};
