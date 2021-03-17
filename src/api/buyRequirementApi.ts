import { Vue } from "vue-property-decorator";
const basicURL = process.env.VUE_APP_API_ADDRESS+"buyrequirement"
export default {
    //get functions
    async updateBuyrequirement(BuyrequirementData: any) {
        const endpoint = basicURL+"/"+BuyrequirementData.BuyRequirement_ID;
        let result: any = "";
        await Vue.axios.
        put(endpoint, BuyrequirementData)
            .then(response => {
                result = response
            })
            .catch(error => {
                console.log(error)
            })
        return result;
    },
    async addBuyREquirement(buyRequirementData: any) {
        const endpoint = basicURL;
        let result: any = "";
        await Vue.axios.
        post(endpoint, buyRequirementData)
            .then(response => {
                result = response
            })
            .catch(error => {
                console.log(error)
            })
        return result;
    },
    async deleteBuyrequirement(byrequirementId: string){
        const endpoint = basicURL+`/${byrequirementId}`;
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