import { Vue } from "vue-property-decorator";
const basicURL = process.env.VUE_APP_API_ADDRESS+"files"
export default {
  async sendSMS(data: any) {
    const endpoint = basicURL+ "/sendSMS"
    let result: any = "";
    await Vue.axios
      .post(endpoint,data)
      .then((response) => {
        result = response.status;
      })
      .catch((error) => {
        console.log(error);
      });
    return result;
  },
};
