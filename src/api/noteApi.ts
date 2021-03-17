import { Vue } from "vue-property-decorator";
const basicURL = process.env.VUE_APP_API_ADDRESS+"note"
export default {
    async updateAllnotes(notesData: any) {
        const endpoint = basicURL+"/updateAll";
        let result: any = "";
        await Vue.axios.
        put(endpoint, notesData)
            .then(response => {
                result = response
            })
            .catch(error => {
                console.log(error)
            })
        return result;
    },
    async addnote(noteData: any) {
        const endpoint = basicURL;
        let result: any = "";
        await Vue.axios.
        post(endpoint, noteData)
            .then(response => {
                result = response
            })
            .catch(error => {
                console.log(error)
            })
        return result;
    },
    async deletenote(noteId: any) {
        const endpoint = basicURL+"/"+encodeURIComponent(noteId);
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