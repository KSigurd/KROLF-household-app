import { Avatar } from "../data/avatarData";
import { Chore, CompletedChore } from "./chore";
import { User } from "./user";

export interface HouseholdUser {
  id: number;
  user: User;
  name: string;
  isAdmin: boolean;
  avatar: Avatar;
  choresDone: CompletedChore[];
}

export interface Household {
  id: number;
  inviteCode: number;
  name: string;
  users: HouseholdUser[];
  chores: Chore[];
}
