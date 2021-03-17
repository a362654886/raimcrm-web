import { Vue } from "vue-property-decorator";
import  modelCreate  from "../../db-models/modelCreate";
import {Customer} from "../../db-models/db-customer";
const basicURL = process.env.VUE_APP_API_ADDRESS+"team"
export default {
    async getTeamIds() {
        const endpoint = basicURL+"/getTeamIds";
        let result: any = "";
        await Vue.axios.
        get(endpoint)
            .then(response => {
                result = {status:response.status,data: response.data}
            })
            .catch(error => {
                console.log(error)
            })
        return result;
    },
    async getTeam(id: string) {
        const endpoint = basicURL+"/getTeam/"+id;
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
    async getTeams() {
        const endpoint = basicURL;
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
    async updateTeam(teamData: any) {
        const endpoint = basicURL;
        let result: any = "";
        await Vue.axios
          .put(endpoint, teamData)
          .then((response) => {
            result = response;
          })
          .catch((error) => {
            console.log(error);
          });
        return result;
      },
    async addTeam(team: any) {
        const endpoint = basicURL;
        let result: any = "";
        await Vue.axios.
        post(endpoint, team)
            .then(response => {
                result = response
            })
            .catch(error => {
                console.log(error)
            })
        return result;
    },
    async login(paramater: string) {
        const endpoint = basicURL+"/login"+paramater;
        let result: any = "";
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
    async getRefreshToken(token: any){
        const endpoint = basicURL+`/refreshToken?refreshToken=${token}`;
        let result: any = "";
        await Vue.axios.
        get(endpoint)
            .then(response => {
                result = response
            })
            .catch(error => {
                console.log(error)
            })
        return result;
    }
}