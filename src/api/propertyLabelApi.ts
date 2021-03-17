import { Vue } from "vue-property-decorator";
import googlePeopleApi from "./googlePeopleApi";

const basicURL = process.env.VUE_APP_API_ADDRESS+"propertyLabel"
export default {
    async getLabelByPropertyId(propertyId: any) {
        const endpoint = basicURL+"/"+propertyId;
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
    async addPropertyLabel(propertyLabel: any) {
        propertyLabel.Property_ID = propertyLabel.Property_ID.replace("/","_");
        const endpoint = basicURL;
        let result: any = "";
        await Vue.axios.
        post(endpoint, propertyLabel)
            .then(response => {
                result = response
            })
            .catch(error => {
                console.log(error)
            })
        return result;
    },
    async getLabelsByLabelNum(labelArr: any[]) {
        const endpoint = basicURL + "/getLabelsByNum";
        let result: any = "";
        await Vue.axios.
        post(endpoint, labelArr)
            .then(response => {
                result = response.data
                console.log(result)
            })
            .catch(error => {
                console.log(error)
            })
        return result;
    },
    async deletePropertyLabel(propertyId: string) {
        const label = await this.getLabelByPropertyId(propertyId);
        console.log(label)
        const labelNum = label.labelNumber
        await googlePeopleApi.deleteLabel(labelNum);
    },
}