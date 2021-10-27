import { CompletedChore } from "../interfaces/completedChore";
import { Household } from "../interfaces/households";
import { HouseholdUser } from "../interfaces/householdUser";
import { avatars } from "./avatarData";

export const completedChores: CompletedChore[] = [
  {
    choreId: "0",
    householdUserId: "2",
    date: new Date(),
  },
  {
    choreId: "1",
    householdUserId: "4",
    date: new Date(),
  },
  {
    choreId: "2",
    householdUserId: "1",
    date: new Date(),
  },
  {
    choreId: "3",
    householdUserId: "5",
    date: new Date(),
  },
]

export const householdUser: HouseholdUser[] = [
  {
    id: "0",
    userId: "0",
    householdId: "0",
    name: "Kallis",
    isAdmin: true,
    avatarId: 1,
  },
  {
    id: "1",
    userId: "1",
    householdId: "1",
    name: "TONY",
    isAdmin: false,
    avatarId: 2,

  },
];


export const households: Household[] = [
  {
    id: "0",
    inviteCode: 756598,
    name: "Bodéns",
  },
  {
    id: "1",
    inviteCode: 659984,
    name: "Nilssons",
  },
  {
    id: "2",
    inviteCode: 458855,
    name: "Anderssons",
  },
];
