import { avatars } from "../../data/avatarData";
import { householdUser } from "../../data/mockHouseholdData";
import { Avatar } from "../../interfaces/avatar";
import { HouseholdUser } from "../../interfaces/householdUser";
import { RootState } from "../store";

export const isUserAdmin = (householdId: string, householdUsers: HouseholdUser[]) => {
    return householdUsers.find((hu) =>
      hu.householdId === householdId
    )?.isAdmin;
  };

  export const househouldUsersFromHousehold = (householdId?: string)  => (state: RootState) => {
    console.log(householdId, "from selector");
    let array: HouseholdUser[] = [];
    state.householdUser.householdUsers.forEach(hu => {
      if(hu.householdId === householdId){
        array.push(hu);
      }
    })
    return array;
  }

export const availableAvatars = (householdUsers: HouseholdUser[]) =>  (state: RootState) => {
  let availableAvatars: Avatar[] = [];
  avatars.forEach(avatar => {
    if(!householdUsers.find(householdUser => String(householdUser.avatarId) === avatar.id)) {
      availableAvatars.push(avatar);
    }
  })
  return availableAvatars;
}