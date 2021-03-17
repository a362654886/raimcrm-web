import { Vue } from "vue-property-decorator";
import modelCreate from "../../db-models/modelCreate";
import { getUsers } from "../../db-models/db-userManagement";
const basicURL = process.env.VUE_APP_API_ADDRESS + "users";
export default {
  async login(paramater: string) {
    const endpoint = basicURL + "/login" + paramater;
    let result: any = "";
    await Vue.axios
      .get(endpoint)
      .then((response) => {
        console.log(response)
        result = response;
      })
      .catch((error) => {
        console.log(error);
      });
    return result;
  },
  async getTasks(userId: string) {
    const endpoint = basicURL + "/tasks/" + userId;
    let result: any = "";
    await Vue.axios
      .get(endpoint)
      .then((response) => {
        result = modelCreate.getTasks(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    return result;
  },
  async getUserIds() {
    const endpoint = basicURL + "/getuserIds";
    let result: any = "";
    await Vue.axios
      .get(endpoint)
      .then((response) => {
        result = { status: response.status, data: response.data };
      })
      .catch((error) => {
        console.log(error);
      });
    return result;
  },
  async getTeamId(userId: string) {
    const endpoint = basicURL + "/getTeamId/"+userId;
    let result: any = "";
    await Vue.axios
      .get(endpoint)
      .then((response) => {
        result = response.data
      })
      .catch((error) => {
        console.log(error);
      });
    return result;
  },
  async getRefreshToken(token: any) {
    const endpoint = basicURL + `/refreshToken?refreshToken=${token}`;
    let result: any = "";
    await Vue.axios
      .get(endpoint)
      .then((response) => {
        result = response;
      })
      .catch((error) => {
        console.log(error);
      });
    return result;
  },
  async addUser(user: any) {
    const endpoint = basicURL;
    let result: any = "";
    await Vue.axios
      .post(endpoint, user)
      .then((response) => {
        result = response;
      })
      .catch((error) => {
        console.log(error);
      });
    return result;
  },
  async getUsers() {
    const endpoint = basicURL;
    let result: any = "";
    await Vue.axios
      .get(endpoint)
      .then((response) => {
        result = { status: response.status, data: response.data };
      })
      .catch((error) => {
        console.log(error);
      });
    return result;
  },
  async getFilterUsers(userData: any) {
    const endpoint = basicURL + `/usersFilter${userData}`;
    let result: any = "";
    await Vue.axios
      .get(endpoint)
      .then((response) => {
        result = getUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    return result;
  },
  async getUsersByTeam(teamId: string) {
    const endpoint = basicURL + `/getUsersByTeam/${teamId}`;
    let result: any = "";
    await Vue.axios
      .get(endpoint)
      .then((response) => {
        result = response;
      })
      .catch((error) => {
        console.log(error);
      });
    return result;
  },
  async updateUser(userData: any) {
    const endpoint = basicURL;
    let result: any = "";
    await Vue.axios
      .put(endpoint, userData)
      .then((response) => {
        result = response;
      })
      .catch((error) => {
        console.log(error);
      });
    return result;
  },
  async deleteUser(userId: string, replaceUserId: string) {
    const endpoint = basicURL + "/deleteUser";
    const body = {
      userId: userId,
      replaceUserId:replaceUserId
    }
    let result: any = "";
    await Vue.axios
      .post(endpoint, body)
      .then((response) => {
        result = response;
      })
      .catch((error) => {
        console.log(error);
      });
    return result;
  },
  async getGoogleRefreshToken(userId: string) {
    const endpoint = basicURL + "/getRefreshToken/"+userId;
    let result: any = "";
    await Vue.axios
      .get(endpoint)
      .then((response) => {
        result = response.data
      })
      .catch((error) => {
        console.log(error);
      });
    return result;
  }
};
