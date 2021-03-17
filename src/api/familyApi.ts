import { Vue } from "vue-property-decorator";
import  modelCreate  from "../../db-models/modelCreate";
import {Customer} from "../../db-models/db-customer";
const basicURL = process.env.VUE_APP_API_ADDRESS+"family"
export default {
    //get functions
    async updateAllfamiles(familesData: any) {
        const endpoint = basicURL+"/updateAll";
        let result: any = "";
        await Vue.axios.
        put(endpoint, familesData)
            .then(response => {
                result = response
            })
            .catch(error => {
                console.log(error)
            })
        return result;
    },
    async addfamily(familesData: any) {
        const endpoint = basicURL;
        let result: any = "";
        await Vue.axios.
        post(endpoint, familesData)
            .then(response => {
                result = response
            })
            .catch(error => {
                result = 404
            })
        return result;
    },
    async deletefamily(familesId: any) {
        const endpoint = basicURL+`/${familesId}`;
        let result: any = "";
        await Vue.axios.
        delete(endpoint)
            .then(response => {
                result = response.status
            })
            .catch(error => {
                result = 404
            })
        return result;
    }
}