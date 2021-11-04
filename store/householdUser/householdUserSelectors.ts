import { avatars } from "../../data/avatarData";
import { Avatar } from "../../interfaces/avatar";
import { HouseholdUser } from "../../interfaces/householdUser";
import { RootState } from "../store";

export const isUserAdmin = (
  householdId: string,
  householdUsers: HouseholdUser[]
) => {
  return householdUsers.find((hu) => hu.householdId === householdId)?.isAdmin;
};

export const househouldUsersFromHousehold =
  (householdId: string) => (state: RootState) => {
    let array: HouseholdUser[] = [];
    state.householdUser.householdUsers.forEach((hu) => {
      if (hu.householdId === householdId) {
        array.push(hu);
      }
    });
    return array;
  };

export const availableAvatars =
  (householdUsers: HouseholdUser[]) => (state: RootState) => {
    let availableAvatars: Avatar[] = [];
    avatars.forEach((avatar) => {
      if (
        !householdUsers.find(
          (householdUser) => String(householdUser.avatarId) === avatar.id
        )
      ) {
        availableAvatars.push(avatar);
      }
    });
    return availableAvatars;
  };

export const householdUsersFromChore =
  (choreId: string) => (state: RootState) => {
    const newDate = new Date();
    const completedChores = state.completedChore.completedChores
      .filter((cc) => cc.choreId === choreId)
      .filter(
        (cc) =>
          Date.UTC(
            cc.date.getFullYear(),
            cc.date.getMonth(),
            cc.date.getDate()
          ) ===
          Date.UTC(newDate.getFullYear(), newDate.getMonth(), newDate.getDate())
      );
    const householdUsers: HouseholdUser[] = [];
    for (const chore of completedChores) {
      const householdUser = state.householdUser.householdUsers.find(
        (user) => user.id === chore.householdUserId
      );
      if (householdUser && !householdUsers.find((hu) => hu === householdUser))
        householdUsers.push(householdUser);
    }
    return householdUsers;
  };
