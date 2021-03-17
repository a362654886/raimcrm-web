import { Vue } from "vue-property-decorator";
import modelCreate from "../../db-models/modelCreate";
const basicURL = process.env.VUE_APP_API_ADDRESS+"lead";
export default {
    async addlead(lead: any) {
        const endpoint = basicURL;
        let result: any = "";
        await Vue.axios.
        post(endpoint, lead)
            .then(response => {
                result = response
            })
            .catch(error => {
                console.log(error)
            })
        return result;
    },
    async addleads(leads: any) {
        const endpoint = basicURL+"/addleads";
        let result: any = "";
        await Vue.axios.
        post(endpoint, leads)
            .then(response => {
                result = response.status;
            })
            .catch(error => {
                console.log(error)
            })
        return result;
    },
    async deletelead(leadId: any) {
        const endpoint = basicURL+"/"+leadId;
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
    },
    async getLeadsByUser(userId: any) {
        const endpoint = basicURL+"/getLeadsByUser"+userId;
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
    },
    async getLeadsByTeam(teamId: any) {
        const endpoint = basicURL+"/getLeadsByTeam"+teamId;
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
    },
    async updateLeadArchive(archive: boolean,leadId: string){
        const endpoint = basicURL + "/"+leadId;
        let para: any = [
            {
                op:"replace",
                path:"/Archive",
                value:archive
            }
        ];
        let result: any="";
        await Vue.axios.
        patch(endpoint,para,
            {
                headers: {
                    'Content-Type': 'application/json-patch+json'
                }
            })
            .then(response => {
                result = response;
            })
            .catch(error => {
                console.log(error)
            })
        return result;
    },
    async getLeads(paramater: any) {
        const endpoint = basicURL+"/"+paramater;
        let result: any;
        await Vue.axios.
        get(endpoint)
            .then(response => {
                result = response
            })
            .catch(error => {
                result = 404
            })
        return result;
    }
}