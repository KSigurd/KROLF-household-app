import { Avatar } from "./avatar";

export interface HouseholdUser {
    id: number;
    userId: number;
    householdId: number;
    name: string;
    isAdmin: boolean;
    avatarId: number;
  }