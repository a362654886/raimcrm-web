import { Vue } from "vue-property-decorator";
export default {
  async getGoogleToken(code: string,redirct_token: string) {
    let result: any = "";
    await Vue.axios
      .post("https://accounts.google.com/o/oauth2/token", {
        code: code,
        client_id:
          "34756663577-0imh4j2fujlnjl9qsrbi1h6kunkosqgt.apps.googleusercontent.com",
        client_secret: "hsafDUwirFs4EYUxEcWv9hul",
        redirect_uri: redirct_token,
        grant_type: "authorization_code",
      })
      .then((response) => {
        result = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
    return result;
  },
  async getEmailByToken(token: string){
    const url = `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`
    let result: any = "";
    await Vue.axios
      .get(url)
      .then((response) => {
        result = response.data.email;
      })
      .catch((error) => {
        console.log(error);
      });
    return result;
  },
  async googleRefreshToken(refreshtoken: string){
    let result: any = "";
    const url = `https://www.googleapis.com/oauth2/v4/token`;
    const postData = {
      client_id:
        "34756663577-0imh4j2fujlnjl9qsrbi1h6kunkosqgt.apps.googleusercontent.com",
      client_secret: "hsafDUwirFs4EYUxEcWv9hul",
      refresh_token: refreshtoken,
      grant_type: "refresh_token",
    };
    await Vue.axios
      .post(url, postData)
      .then((response) => {
        result = response;
      })
      .catch((error) => {
        console.log(error);
      });
    return result;
  }
};
