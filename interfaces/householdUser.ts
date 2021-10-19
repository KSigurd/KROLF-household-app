import { Avatar } from "./avatar";

export interface HouseholdUser {
    id: number;
    userId: number;
    name: string;
    isAdmin: boolean;
    avatar: Avatar;
  }