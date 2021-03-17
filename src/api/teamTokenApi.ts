import { Vue } from "vue-property-decorator";
import  modelCreate  from "../../db-models/modelCreate";
import {Customer} from "../../db-models/db-customer";
const basicURL = process.env.VUE_APP_API_ADDRESS+"teamtoken"
export default {
    async getTeamToken(tokenId: string) {
        const endpoint = basicURL+"?tokenId="+tokenId;
        let result: any = "";
        await Vue.axios.
        get(endpoint)
            .then(response => {
                result = response
            })
            .catch(error => {
                console.log(error)
            })
        return result;
    },
    async updateTeamToken(token: any) {
        const endpoint = basicURL;
        let result: any = "";
        await Vue.axios.
        put(endpoint, token)
            .then(response => {
                result = response
            })
            .catch(error => {
                console.log(error)
            })
        return result;
    },
    async addTeamToken(token: any) {
        const endpoint = basicURL;
        let result: any = "";
        await Vue.axios.
        post(endpoint, token)
            .then(response => {
                result = response
            })
            .catch(error => {
                console.log(error)
            })
        return result;
    }
}