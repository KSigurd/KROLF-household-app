import { Household, HouseholdUser } from "../interfaces/households";
import { avatars } from "./avatarData";
import { chores } from "./mockChoresData";
import { users } from "./mockUserData";



export const householdUser: HouseholdUser[] = [
  {
    id: 0,
    user: users[0],
    name: "Kallis",
    isAdmin: true,
    avatar: avatars[1],
    choresDone: [
      {
        choreId: 0,
        date: new Date(),
      },
    ],
  },
  {
    id: 1,
    user: users[1],
    name: "TONY",
    isAdmin: false,
    avatar: avatars[2],
    choresDone: [
      {
        choreId: 1,
        date: new Date(),
      },
    ],
  },
];


export const households: Household[] = [
  {
    id: 0,
    inviteCode: 756598,
    name: "Bodéns",
    users: [householdUser[1], householdUser[0]],
    chores: [chores[2], chores[4]],
  },
  {
    id: 1,
    inviteCode: 659984,
    name: "Nilssons",
    users: [householdUser[0]],
    chores: [chores[0], chores[3]],
  },
  {
    id: 2,
    inviteCode: 458855,
    name: "Anderssons",
    users: [householdUser[0], householdUser[1]],
    chores: [chores[1], chores[0], chores[3]],
  },
];
