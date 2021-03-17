import { Vue } from "vue-property-decorator";

const basicURL = process.env.VUE_APP_API_ADDRESS+"files"
const key = `key=AIzaSyBDzFv2a_ztAgCj1788xHLkktKEScmqhj4`;

export default {
  async getGoogleAddress(input: string) {
    //const proxyurl = "https://cors-anywhere.herokuapp.com/";
    //const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&location=-36.51,174.665&radius=1000&${key}`;
    const url = basicURL + `/getAddress/${input}`;
    let result = "";
    await Vue.axios
      .get(url,{
        headers: {
            'X-Requested-With': XMLHttpRequest,
        },
      })
      .then((response) => {
        result = response.data
      })
      .catch((error) => {
        console.log(error);
      });
    return result;
  },
};
