import { Vue } from "vue-property-decorator";
import  modelCreate  from "../../db-models/modelCreate";
import {Customer} from "../../db-models/db-customer";
const basicURL = process.env.VUE_APP_API_ADDRESS+"appraisal"
export default {
    async updateAllappraisals(appraisalData: any) {
        const endpoint = basicURL+"/updateAll";
        let result: any = "";
        await Vue.axios.
        put(endpoint, appraisalData)
            .then(response => {
                result = response
            })
            .catch(error => {
                //console.log(error)
            })
        return result;
    },
    async addappraisal(appraisalData: any) {
        const endpoint = basicURL;
        let result: any = "";
        await Vue.axios.
        post(endpoint, appraisalData)
            .then(response => {
                result = response
            })
            .catch(error => {
                console.log(error)
            })
        return result;
    },
    async deleteappraisal(appraisalId: any) {
        const endpoint = basicURL+"/"+encodeURIComponent(appraisalId);
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