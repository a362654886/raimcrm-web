import { Vue } from "vue-property-decorator";
import  modelCreate  from "../../db-models/modelCreate";
const basicURL = process.env.VUE_APP_API_ADDRESS+"alert/";
export default {
    async getAlert(paramater: string) {
        const endpoint = basicURL + paramater;
        let result: any = "";
        await Vue.axios.
        get(endpoint)
            .then(response => {
                result = modelCreate.getMessageAlert(response.data)
                console.log(result)
            })
            .catch(error => {
                console.log(error)
            })
        return result;
    },
    async getAlertsByUser(paramater: string) {
        const endpoint = basicURL + "byUser/"+paramater;
        let result: any = "";
        await Vue.axios.
        get(endpoint)
            .then(response => {
                result = modelCreate.getMessageAlerts(response.data)
            })
            .catch(error => {
                console.log(error)
            })
        return result;
    },
    async getAlertsByDay(paramater: string) {
        const endpoint = basicURL + "byDay/"+paramater;
        let result: any = "";
        await Vue.axios.
        get(endpoint)
            .then(response => {
                result = modelCreate.getMessageAlerts(response.data)
            })
            .catch(error => {
                console.log(error)
            })
        return result;
    },
    async updateMessageAlert(messageAlert: any){
        const endpoint = basicURL;
        let result: any="";
        await Vue.axios.
        put(endpoint,messageAlert)
            .then(response => {
                result = response.status
            })
            .catch(error => {
                console.log(error)
            })
        return result;
    },
    async deleteMessageAlert(alertId: any){
        const endpoint = basicURL;
        let result: any="";
        await Vue.axios.
        delete(endpoint,alertId)
            .then(response => {
                result = response;
            })
            .catch(error => {
                console.log(error)
            })
        return result;
    },
    async addMessageAlert(messageAlert: any) {
        const endpoint = basicURL ;
        let result: any = "";
        await Vue.axios.
        post(endpoint, messageAlert)
            .then(response => {
                result =response.status;
            })
            .catch(error => {
                console.log(error)
            })
        return result;
    }
}