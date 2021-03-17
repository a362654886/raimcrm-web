import { Vue } from "vue-property-decorator";
export default {
    getconfig(token: string){
        return {
            headers: {
                "Authorization": token
            }
        }
    }
}
//Vue.cookies.get("ramToken");