import { avatars } from "../../data/avatarData";
import { RootState } from "../store";

export const selectHouseholdUserById = (id: string) => (state: RootState) => {
    return state.householdUser.householdUsers.find((u) => u.userId === id);
  };

  export const selectAvatarById = (id?: string) => (state: RootState) => {
    return avatars.find(a => a.id === id)
  };
