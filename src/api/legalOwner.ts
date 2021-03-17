import { Vue } from "vue-property-decorator";
const basicURL = process.env.VUE_APP_API_ADDRESS+"legalOwner"
export default {
    async addLegalOwners(LegalOwnerData: any) {
        const endpoint = basicURL;
        let result: any = "";
        await Vue.axios.
        post(endpoint, LegalOwnerData)
            .then(response => {
                result = response
            })
            .catch(error => {
                console.log(error)
            })
        return result;
    },
    async deleteLegalOwner(LegalOwnerId: any) {
        const endpoint = basicURL+"/"+LegalOwnerId;
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
    async updateLegalOwner(LegalOwnerId: any) {
        const endpoint = basicURL;
        let result: any = "";
        await Vue.axios.
        put(endpoint,LegalOwnerId)
            .then(response => {
                result = response
            })
            .catch(error => {
                result = 404
            })
        return result;
    }
}