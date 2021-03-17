import { User } from "../db-models/db-userManagement";
import mailTemplateApi from "../src/api/mailTemplateApi";
import googleAPI from "../src/api/googleAPI";
import store from "../src/store";

export const sendNewUserEmail = async (newUser: any) => {
  let storeUser: any = store.state.loginUser;
  let result = await mailTemplateApi.getMailT("New User Template");
  let context = `
    <div>
    ${result.templateValue}
    </div>
    `;
  console.log(context);
  context = context.replace("$firstName", newUser.Name);
  context = context.replace("$password", newUser.Password);
  const googleResult = await googleAPI.sendEmail({
    fromname: "Rain CRM",
    fromemail: newUser.Team_ID,
    toname: "",
    toemail: newUser.User_ID,
    subject: "RainCRM password",
    context: context,
    attachment: "",
  });

  return googleResult;
};
