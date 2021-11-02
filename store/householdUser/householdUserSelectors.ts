import { avatars } from "../../data/avatarData";
import { householdUser } from "../../data/mockHouseholdData";
import { Avatar } from "../../interfaces/avatar";
import { HouseholdUser } from "../../interfaces/householdUser";

export const isUserAdmin = (householdId: string, householdUsers: HouseholdUser[]) => {
    return householdUsers.find((hu) =>
      hu.householdId === householdId
    )?.isAdmin;
  };

export const availableAvatars = (householdUsers: HouseholdUser[]) => {
  let availableAvatars: Avatar[] = [];
  avatars.forEach(avatar => {
    if(!householdUsers.find(householdUser => String(householdUser.avatarId) === avatar.id)) {
      availableAvatars.push(avatar);
    }
  })
  return availableAvatars;
}