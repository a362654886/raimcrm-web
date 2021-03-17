import { Vue } from "vue-property-decorator";
import  modelCreate  from "../../db-models/modelCreate";
import {Customer} from "../../db-models/db-customer";
const basicURL = process.env.VUE_APP_API_ADDRESS+"mailTemplate"

export default {
    async getMailT(name: string) {
        const endpoint = basicURL+"/"+name;
        let result: any = "";
        await Vue.axios.
        get(endpoint)
            .then(response => {
                result = response.data
            })
            .catch(error => {
                console.log(error)
            })
        return result;
    },
    async getMailTs() {
        const endpoint = basicURL+"/getTemplates";
        let result: any = "";
        await Vue.axios.
        get(endpoint)
            .then(response => {
                result = response.data
            })
            .catch(error => {
                console.log(error)
            })
        return result;
    },
    async addTemplate(template: any) {
        const endpoint = basicURL;
        let result: any = "";
        await Vue.axios.
        post(endpoint, template)
            .then(response => {
                result = response
            })
            .catch(error => {
                console.log(error)
            })
        return result;
    },
    async updateTemplate(template: any){
        const endpoint = basicURL;
        let result: any = "";
        await Vue.axios.
        put(endpoint,template)
            .then(response => {
                result =response;
            })
            .catch(error => {
                console.log(error)
            })
        return result;
    },
    async deleteTemplate(template: any){
        const endpoint = basicURL+"/"+template;
        let result: any = "";
        await Vue.axios.
        delete(endpoint)
            .then(response => {
                result =response;
            })
            .catch(error => {
                console.log(error)
            })
        return result;
    }
}