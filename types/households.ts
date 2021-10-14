import { AvatarData } from "../data/avatarData";
import { Chore } from "./chore";
import { UserData } from "./user";

export interface HouseholdUser {
    user: UserData;
      avatar: AvatarData;
      choresDone: Chore[];
}

export interface HouseholdData {
  id: number;
  inviteCode: number;
  name: string;
  users: HouseholdUser[];
  admins: UserData[];
  chores: Chore[];
}
