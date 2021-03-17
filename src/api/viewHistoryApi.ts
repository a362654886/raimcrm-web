import { ViewHistory } from "@/db-models/db-viewhistory";
import { Vue } from "vue-property-decorator";
import  modelCreate, { getViewHistories }  from "../../db-models/modelCreate";
const basicURL = process.env.VUE_APP_API_ADDRESS+"viewhistory"

export const getViewHistoryByCustomer = async (customerID: string): Promise<ViewHistory[]> =>{
    const endpoint = basicURL+"/customer/"+customerID;
        let result: ViewHistory[] = [];
        await Vue.axios.
        get(endpoint)
            .then(response => {
                result = getViewHistories(response.data)
            })
            .catch(error => {
                console.log(error)
            })
        return result;
}

export const getViewHistoryByProperty = async (propertyID: string): Promise<ViewHistory[]> =>{
    const endpoint = basicURL+"/property/"+propertyID;
    let result: ViewHistory[] = [];
    await Vue.axios.
    get(endpoint)
        .then(response => {
            result = getViewHistories(response.data)
            console.log(result)
        })
        .catch(error => {
            console.log(error)
        })
    return result;
}

export default {
    async updateAllviewHistory(ViewHistoryData: any) {
        const endpoint = basicURL+"/updateAll";
        let result: any = "";
        await Vue.axios.
        put(endpoint, ViewHistoryData)
            .then(response => {
                result = response
            })
            .catch(error => {
                console.log(error)
            })
        return result;
    },
    async addviewHistory(vhData: any) {
        const endpoint = basicURL;
        let result: any = "";
        await Vue.axios.
        post(endpoint, vhData)
            .then(response => {
                result = response
            })
            .catch(error => {
                console.log(error)
            })
        return result;
    },
    async deleteViewHistory(viewHistoryId: any) {
        const endpoint = basicURL+"/"+encodeURIComponent(viewHistoryId);
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