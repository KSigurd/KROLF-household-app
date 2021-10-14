import { HouseholdData } from "../types/households";
import { avatars } from "./avatarData";
import { Chores } from "./mockChoresData";
import { users } from "./mockUserData";

export const households: HouseholdData[] = [
  {
    id: 0,
    inviteCode: 756598,
    name: "Bodéns",
    users: [
      {
        user: users[0],
        avatar: avatars[4],
        choresDone: [Chores[0], Chores[4]],
      },
    ],
    admins: [
      {
        id: 2,
        name: "Olivia Bodén",
        userName: "olibod@gmail.com",
        password: "v-fors",
      },
    ],
    chores: Chores,
  },
  {
    id: 1,
    inviteCode: 659984,
    name: "Nilssons",
    users: [
      {
        user: users[0],
        avatar: avatars[4],
        choresDone: [Chores[0], Chores[4]],
      },
      {
        user: users[4],
        avatar: avatars[5],
        choresDone: [Chores[0], Chores[4]],
      },
    ],
    admins: [
      {
        id: 3,
        name: "Hasse Nilsson",
        userName: "hassenilsson@gmail.com",
        password: "hassesbullar",
      },
    ],
    chores: [],
  },
  {
    id: 2,
    inviteCode: 458855,
    name: "Anderssons",
    users: [
      {
        user: users[0],
        avatar: avatars[4],
        choresDone: [Chores[0], Chores[4]],
      },
      {
        user: users[3],
        avatar: avatars[1],
        choresDone: [Chores[0], Chores[4]],
      },
      {
        user: users[2],
        avatar: avatars[5],
        choresDone: [Chores[0], Chores[4]],
      },
    ],
    admins: [
      {
        id: 4,
        name: "Mikael Andersson",
        userName: "mikaelandersson@gmail.com",
        password: "mikaelshallon",
      },
    ],
    chores: [],
  },
];
