import UserApi from "../src/api/UserApi";
import store from "../src/store";

export class User {
  email: string;
  password: string;
  name: string;
  role: string;
  teamId: string;
  constructor(
    $email = "",
    $password = "",
    $name = "",
    $role = "",
    $teamId = ""
  ) {
    this.email = $email;
    this.password = $password;
    this.name = $name;
    this.role = $role;
    this.teamId = $teamId;
  }
}

export const getUsers = (userData: any): User[] => {
  let users: User[] = [];
  if (userData == null) {
    return users;
  }
  for (let user of userData) {
    let auser = new User(
      user.user_ID,
      user.password,
      user.name,
      user.role,
      user.team_ID
    );
    users.push(auser);
  }
  return users;
};

export const getUser = (userDate: any): User =>{
  return new User(
    userDate.user_ID,
    userDate.password,
    userDate.name,
    userDate.role,
    userDate.team_ID
  );
}

export const getStoreUser = (): User => {
  const storeUser: any = store.state.loginUser;
  return new User(
    storeUser.email,
    storeUser.password,
    storeUser.name,
    storeUser.role,
    storeUser.teamId
  );
};

export const searchUsersByTeam = async (teamId: string) => {
  const result = await UserApi.getFilterUsers(
    `?FirstName=&LastName=&Email=&Role=&Team=${teamId}`
  );
  return result;
};

export const getUserSelection = async (teamId: string) => {
  const users: User[] = await searchUsersByTeam(teamId);
  const selectionArr: any[] = [];
  users.forEach((u: User) => {
    selectionArr.push({ value: u.email, text: u.name });
  });
  return selectionArr;
};
