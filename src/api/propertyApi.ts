import { Vue } from "vue-property-decorator";
import  modelCreate  from "../../db-models/modelCreate";
const basicURL = process.env.VUE_APP_API_ADDRESS+"property"
export default {
    async getProperties(paramater: string) {
        const endpoint = basicURL + paramater;
        let result: any;
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
    async getPropertiesMessage(paramater: string) {
        const endpoint = basicURL + "/propertyAllMessage/"+paramater;
        let result: any;
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
    async getProperty(PropertyID: string) {
        PropertyID = PropertyID.replace("/","_");
        const endpoint = basicURL + `/${PropertyID}`;
        let result: any="";
        await Vue.axios.
        get(endpoint)
            .then(response => {
                result = modelCreate.getPropperty(response.data)
            })
            .catch(error => {
                console.log(error)
            })
        return result;
    },
    async updateProperty(propertyData: any){
        propertyData.Property_ID = propertyData.Property_ID.replace("/","_");
        const endpoint = basicURL + "/updateone";
        let result: any="";
        await Vue.axios.
        put(endpoint,propertyData)
            .then(response => {
                result = response;
            })
            .catch(error => {
                console.log(error)
            })
        return result;
    },
    async updatePropertyBudget(budget: string,propertyId: string){
        propertyId = propertyId.replace("/","_");
        const endpoint = basicURL + "/"+propertyId;
        let budgetarr = budget.split("-");
        let para: any = [
            {
                op:"replace",
                path:"/BudgetMin",
                value:budgetarr[0]
            },
            {
                op:"replace",
                path:"/BudgetMax",
                value:budgetarr[1]
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
    async updatePropertyTrade(Customer_ID: string,Status: string,LastTrade: string,propertyId: string){
        propertyId = propertyId.replace("/","_");
        const endpoint = basicURL + "/"+propertyId;
        let para: any = [
            {
                op:"replace",
                path:"/Customer_ID",
                value:Customer_ID
            },
            {
                op:"replace",
                path:"/Status",
                value:Status
            },
            {
                op:"replace",
                path:"/LastTrade",
                value:LastTrade
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
    async addProperty(propertyData: any) {
        propertyData.Property_ID = propertyData.Property_ID.replace("/","_");
        const endpoint = basicURL;
        let result: any = "";
        await Vue.axios.
        post(endpoint, propertyData)
            .then(response => {
                result =response.status;
            })
            .catch(error => {
                console.log(error)
            })
        return result;
    },
    async addProperties(propertyData: any) {
        const endpoint = basicURL +"/createProperties";
        let result: any = "";
        await Vue.axios.
        post(endpoint, propertyData)
            .then(response => {
                result =response.status;
            })
            .catch(error => {
                console.log(error)
            })
        return result;
    },
    async getPropertyIds(value: string){
        const endpoint = basicURL+`/getPropertyIds/${value}`;
        let result: any = "";
        await Vue.axios.
        get(endpoint)
            .then(response => {
                result = {status:response.status,data: response.data}
            })
            .catch(error => {
                result = 404
            })
        return result;
    },
    async getPropertyAddresses(value: string){
        value = value.replace("/","_");
        const endpoint = basicURL+`/getPropertyAddresses/${value}`;
        let result: any = "";
        await Vue.axios.
        get(endpoint)
            .then(response => {
                result = {status:response.status,data: response.data}
            })
            .catch(error => {
                result = 404
            })
        return result;
    },
    async getPropertyByAddress(address: string){
        address = address.replace("/","_");
        const endpoint = basicURL+`/getPropertyByAddress/${address}`;
        let result: any = "";
        await Vue.axios.
        get(endpoint)
            .then(response => {
                result = {status:response.status,data: response.data}
            })
            .catch(error => {
                result = 404
            })
        return result;
    },
    async deleteProperty(propertyID: string){
        propertyID = propertyID.replace("/","_");
        const endpoint = basicURL+`/${propertyID}`;
        let result: any = "";
        await Vue.axios.
        delete(endpoint)
            .then(response => {
                result = response.status
            })
            .catch(error => {
                console.log(error)
            })
        return result;
    }
}