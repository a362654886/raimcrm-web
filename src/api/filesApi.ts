import { Vue } from "vue-property-decorator";
const basicURL = process.env.VUE_APP_API_ADDRESS+"files"
export default {
    //get functions
    async getFile(fileName: string) {
        const endpoint = basicURL + "/getFileName/" + fileName;
        let result: any = "";
        await Vue.axios.get(endpoint)
            .then(response => {
                let resultString =  response.data[0]
                result = resultString.split(",");
            })
            .catch(error => {
                console.log(error)
            })
        return result;
    },
    async uploadFile(fileObj: any) {
        const endpoint = basicURL;

        let result: any = "";
        await Vue.axios.
        post(endpoint, fileObj)
            .then(response => {
                result = response
            })
            .catch(error => {
                result = 404
            })
        return result;
    },
    async uploadimage(image: any) {
        const endpoint = basicURL + "/uploadimage";

        let config = {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        };

        let formData = new FormData();
        formData.append("file", image,);

        let result: any = "";
        await Vue.axios.post(endpoint, formData, config)
            .then(response => {
                result = 200
            })
            .catch(error => {
                console.log(error)
            })
        return result;
    }
}