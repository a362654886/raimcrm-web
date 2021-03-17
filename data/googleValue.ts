export const getScope = () => {
  const scope =
    "https://www.googleapis.com/auth/gmail.send " +
    "https://www.googleapis.com/auth/contacts " +
    "https://www.googleapis.com/auth/userinfo.profile " +
    "https://www.googleapis.com/auth/userinfo.email";
  return scope;
};

export const getGoogleUrl = () =>{
  if(process.env.VUE_APP_API_ADDRESS == "http://localhost:5000/api/"){
    return "http://localhost:8080"
  }else if(process.env.VUE_APP_API_ADDRESS == "https://www.thefarmingcrm.com/backend/api/"){
    return "https://www.thefarmingcrm.com"
  }
}

export const getUrl = () => {
  const url =
    "https://accounts.google.com/o/oauth2/v2/auth?scope=" +
    getScope() +
    "&access_type=offline&include_granted_scopes=true&response_type=code&state=state_parameter_passthrough_value&redirect_uri=" +
    getGoogleUrl() +
    "&client_id=431812137939-r38lkibgtg991pecljd2s34vsc52uddm.apps.googleusercontent.com";
  return url;
};

export const getTeamUrl = () => {
  const url =
    "https://accounts.google.com/o/oauth2/v2/auth?scope=" +
    getScope() +
    "&access_type=offline&include_granted_scopes=true&response_type=code&state=state_parameter_passthrough_value&redirect_uri=" +
    getGoogleUrl() +
    "/teamPage&client_id=431812137939-r38lkibgtg991pecljd2s34vsc52uddm.apps.googleusercontent.com";
  return url;
};
