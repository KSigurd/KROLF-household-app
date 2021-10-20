import { CompletedChore } from "../interfaces/completedChore";
import { Household } from "../interfaces/households";
import { HouseholdUser } from "../interfaces/householdUser";
import { avatars } from "./avatarData";

export const completedChores: CompletedChore[] = [
  {
    choreId: 0,
    userId: 2,
    date: new Date(),
  },
  {
    choreId: 1,
    userId: 4,
    date: new Date(),
  },
  {
    choreId: 2,
    userId: 1,
    date: new Date(),
  },
  {
    choreId: 3,
    userId: 5,
    date: new Date(),
  },
]

export const householdUser: HouseholdUser[] = [
  {
    id: 0,
    userId: 0,
    name: "Kallis",
    isAdmin: true,
    avatarId: 1,
  },
  {
    id: 1,
    userId: 1,
    name: "TONY",
    isAdmin: false,
    avatarId: 2,
  },
];


export const households: Household[] = [
  {
    id: 0,
    inviteCode: 756598,
    name: "Bodéns",
    householdUserId: [0]
  },
  {
    id: 1,
    inviteCode: 659984,
    name: "Nilssons",
    householdUserId: [1],
  },
  {
    id: 2,
    inviteCode: 458855,
    name: "Anderssons",
    householdUserId: [0,1],
  },
];
