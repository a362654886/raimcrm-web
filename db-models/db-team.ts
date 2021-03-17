import UserApi from "../src/api/UserApi";
import teamApi from "../src/api/teamApi";
import store from "../src/store";

export class Team {
  teamId: string;
  teamName: string;
  constructor($teamId: string, $teamName: string) {
    this.teamId = $teamId;
    this.teamName = $teamName;
  }

  searchUsersByTeam = async () => {
    const result = await UserApi.getFilterUsers(
      `?FirstName=&LastName=&Email=&Role=&Team=${this.teamId}`
    );
    return result;
  };
}

export const getTeam = (teamData: any): Team => {
  const team = new Team(teamData.team_ID, teamData.teamName);
  return team;
};

export const getStoreTeam = () =>{
    const storeTeam: any = store.state.loginTeam;
    return new Team(storeTeam.teamId, storeTeam.teamName);
}

export const getTeamSelection = async () => {
  const teamIds: any = await teamApi.getTeamIds();
  console.log(teamIds)
  const selectionArr: any[] = [];
  teamIds.data.forEach((team: any) => {
    selectionArr.push({ value: team.team_ID, text: team.team_ID });
  });
  return selectionArr;
};