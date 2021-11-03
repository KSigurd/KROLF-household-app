import { Chore, ChoreOmit } from "../interfaces/chore";
import { CompletedChore } from "../interfaces/completedChore";
import { Household, CreateHousehold } from "../interfaces/households";
import { HouseholdUser, CreateHouseholdUser } from "../interfaces/householdUser";
import {
  ChoreStatisticsDTO,
  CompletedChoresByUserDTO,
} from "../interfaces/statisticsDTO";
import { User, UserOmit } from "../interfaces/user";
import { firebase } from "./fireBaseConfig";
import { householdUser } from "./mockHouseholdData";

/**
 * Takes an object of type User and writes it to FireStore
 * @requires User
 */
export async function addUser(newUser: User) {
  let userAdded: boolean = false;
  await firebase
    .firestore()
    .collection("users")
    .where("email", "==", newUser.email.toLowerCase())
    .get()
    .then((query) => {
      if (query.empty) {
        firebase
          .firestore()
          .collection("users")
          .add({email: newUser.email.toLowerCase(), password: newUser.password})
          .catch((err) => console.log(err));

        userAdded = true;
      }
    })
    .catch((err) => {
      throw err;
    });

  return userAdded;
}

/**
 * Takes an object of type User and returns a bool depending on if email and password matches database
 * @requires User
 * @returns {boolean}
 */
export async function loginUser(user: User) {
 
  let loggedIn: boolean = false;
  const userPerson = await firebase
    .firestore()
    .collection("users")
    .where("email", "==", user.email.toLowerCase())
    .where("password", "==", user.password)
    .get()
    .catch((err) => {
      throw err;
    });

    for (const u of userPerson.docs) {
      if (u.exists) {
              user.id = u.id;
              loggedIn = true;
            }
          }



    // .then((query) => {
    //   query.forEach((doc) => {
    //     if (doc.exists) {
    //       user.id = doc.id;
    //       loggedIn = true;
    //     }
    //   });
    // })
    // .catch((err) => {
    //   throw err;
    // });

  return loggedIn;
}

/**
 * Takes an object of type User and returns a bool depending on if email and password matches database
 * @requires User
 * @returns {boolean}
 */
export async function logoutUser(user: User) {
  const userPerson = await firebase
  .firestore()
  .collection("users")
  .where("email", "==", user.email.toLowerCase())
  .where("password", "==", user.password)
  .get()
  .catch((err) => {
    throw err;
  });
  
  let loggedIn: boolean = false;
  for (const u of userPerson.docs) {
      if (u.exists) {
              user.id = u.id;
              loggedIn = false
            }
          }
    // for()
    // .then((query) => {
    //   query.forEach((doc) => {
    //     if (doc.exists) {
    //       user.id = doc.id;
    //       loggedIn = false;
    //     }
    //   });      
    // })
    // .catch((err) => {
    //   throw err;
    // });

  return loggedIn;
}

/**
 * Takes an object of type Chore and writes it to FireStore
 * @requires Chore
 */
export async function addChore(newChore: Chore) {
  const {id, ...omittedChore} = newChore;
  const result = await firebase
    .firestore()
    .collection("chores")
    .add(omittedChore);

    return result.id;
}

/**
 * Takes an object of type Chore and updates document in FireStore with corresponding Id
 * @requires Chore
 */
export async function updateChore(modifiedChore: Chore) {
  const {id, ...omittedChore} = modifiedChore;
  await firebase
    .firestore()
    .collection("chores")
    .doc(modifiedChore.id)
    .update(omittedChore)
    .catch((err) => console.log(err));
}

/**
 * Takes a householdId of type string and retrieves all Chores from FireStore with corresponding householdId
 * @requires householdId
 * @returns {Chore[]}
 */
export async function getChores(householdId: string) {
  const chores: Chore[] = [];
  await firebase
    .firestore()
    .collection("chores")
    .where("householdId", "==", householdId)
    .get()
    .then((query) => {
      query.forEach((doc) => {
        chores.push({ id: doc.id, ...doc.data() } as Chore);
      });
    })
    .catch((err) => console.log(err));

  return chores;
}

/**
 * Takes a choreId of type string and deletes document in FireStore with corresponding choreId
 * @requires choreId
 */
export async function removeChore(choreId: string) {
  await firebase
    .firestore()
    .collection("chores")
    .doc(choreId)
    .delete()

  await firebase
    .firestore()
    .collection("completedChores")
    .where("choreId", "==", choreId)
    .get()
    .then(query => {
      query.forEach(doc => {
        doc.ref.delete();
      })
    })
}

/**
 * Takes an object of type CompletedChore and writes it to FireStore
 * @requires CompletedChore
 */
export async function addCompletedChore(newCompletedChore: CompletedChore) {
  await firebase
    .firestore()
    .collection("completedChores")
    .add(newCompletedChore)
    .catch((err) => console.log(err));
}

/**
 * Takes a householdId of type string and retrieves all CompletedChores from FireStore connected to the same household
 * @requires householdId
 * @returns {CompletedChore[]}
 */
export async function getCompletedChores(householdId: string) {
  const completedChores: CompletedChore[] = [];
  await firebase
    .firestore()
    .collection("chores")
    .where("householdId", "==", householdId)
    .get()
    .then((query) => {
      query.forEach(async (doc) => {
        await firebase
          .firestore()
          .collection("completedChores")
          .where("choreId", "==", doc.id)
          .get()
          .then((query) => {
            query.forEach((doc) => {
              completedChores.push(doc.data() as CompletedChore);
            });
          })
          .catch((err) => console.log(err));
      });
    })
    .catch((err) => console.log(err));

  return completedChores;
}

export async function getOneHousehold(inviteCode: number) {
  let response: Household = {} as Household
      await firebase
    .firestore()
    .collection("households")
    .where("inviteCode", "==", inviteCode)
    .get()
    .then(query => {query.forEach(doc => {
      response.id = doc.id;
      response.inviteCode = doc.data().inviteCode;
      response.name = doc.data().name;
    })})
    return response;
}

// export async function getHouseholdUsersFromOneHousehold(householdId: string) {
//   let response: HouseholdUser[] = [];
//       await firebase
//     .firestore()
//     .collection("householdUsers")
//     .where("householdId", "==", householdId)
//     .get()
//     .then(query => {query.forEach(doc => {
//       response.push({ id: doc.id, ...doc.data() } as HouseholdUser);
//     })})
//     return response;
// }


/**
 * Takes an object of type Household and writes it to FireStore
 * @requires Household
 */
export async function addHoushold(newHousehold: CreateHousehold) {
 const result = await firebase
    .firestore()
    .collection("households")
    .add(newHousehold)
    return result.id
}

/**
 * Takes an object of type Household and updates document in FireStore with corresponding householdId
 * @requires Household
 */
export async function updateHoushold(modifiedHousehold: Household) {
  const {id, ...omittedHousehold} = modifiedHousehold;
  await firebase
    .firestore()
    .collection("households")
    .doc(modifiedHousehold.id)
    .update(omittedHousehold)
    .catch((err) => console.log(err));
}

/**
 * Takes an userId of type string and retrieves all Households from FireStore connected with user
 * @requires userId
 * @returns {Household[]}
 */
export async function getHouseHolds(userId: string) {
  const households: Household[] = [];

  const first = await firebase
    .firestore()
    .collection("householdUsers")
    .where("userId", "==", userId)
    .get();
  // .catch((err) => console.log(err));

  for (var doc of first.docs) {
    await firebase
      .firestore()
      .collection("households")
      .doc(doc.data().householdId)
      .get()
      .then((doc) => {
        households.push({ id: doc.id, ...doc.data() } as Household);
      })
      .catch((err) => console.log(err));
  }
  //console.log("från databasen : ", households);
  return households;
}

/**
 * Takes an object of type HouseholdUser and an optional invite code and writes it to FireStore. Then returns the new householdUserId.
 * @requires HouseholdUserOmit
 * @optional InviteCode
 */
export async function addHouseholdUser(newHouseholdUser: CreateHouseholdUser, inviteCode?: number) {

if(inviteCode) {
  await firebase
    .firestore()
    .collection("households")
    .where("inviteCode", "==", inviteCode)
    .get()
    .then(query => {
      query.forEach(doc => {
        newHouseholdUser.householdId = doc.id;
      })
    })
    .catch((err) => console.log(err));
}
  
  const result = await firebase
    .firestore()
    .collection("householdUsers")
    .add(newHouseholdUser)
    return result.id;
}

/**
 * Takes an object of type HouseholdUser and updates document in FireStore with corresponding householdUserId
 * @requires HouseholdUser
 */
export async function updateHouseholdUser(
  modifiedHouseholdUser: HouseholdUser
) {
  const {id, ...omittedHouseholdUser} = modifiedHouseholdUser;
  await firebase
    .firestore()
    .collection("householdUsers")
    .doc(modifiedHouseholdUser.id)
    .update(omittedHouseholdUser);
}

/**
 * Takes an householdId of type string and retrieves all HouseholdUser from FireStore connected with household
 * @requires householdId
 * @returns {HouseholdUser[]}
 */
export async function getHouseholdUsers(householdId: string) {
  const householdUsers: HouseholdUser[] = [];
  await firebase
    .firestore()
    .collection("householdUsers")
    .where("householdId", "==", householdId)
    .get()
    .then((query) => {
      query.forEach((doc) => {
        householdUsers.push({ id: doc.id, ...doc.data() } as HouseholdUser);
      });
    })
    .catch((err) => console.log(err));

  return householdUsers;
}


/**
 * Takes an userId of type string and retrieves all HouseholdUser from FireStore connected with user
 * @requires userId
 * @returns {HouseholdUser[]}
 */
 export async function getHouseholdUsersForLoggedInUser(userId: string) {
  const householdUsers: HouseholdUser[] = [];
  await firebase
    .firestore()
    .collection("householdUsers")
    .where("userId", "==", userId)
    .get()
    .then((query) => {
      query.forEach((doc) => {
        householdUsers.push({ id: doc.id, ...doc.data() } as HouseholdUser);
      });
    })

  return householdUsers;
}

//TODO: Denna kommer inte funka. Men totalt hjärntrött just nu. Fixa senare
/**
 * Takes an userId of type string and deletes corresponding HousholdUser and CompletedChores from FireStore
 * @requires userId
 * @requires householdId
 */
export async function removeHouseholdUser(userId: string, householdId: string) {
  await firebase
    .firestore()
    .collection("householdUsers")
    .where("userId", "==", userId)
    .where("householdId", "==", householdId)
    .get()
    .then((query) => {
      query.forEach((doc) => {
        doc.ref.delete();
      });
    })
    .catch((err) => console.log(err));

  await firebase
    .firestore()
    .collection("completedChores")
    .where("userId", "==", userId)
    .get()
    .then((query) => {
      query.forEach((doc) => {
        doc.ref.delete();
      });
    })
    .catch((err) => console.log(err));
}

/**
 * Takes a householdId of type string and gather statistics information from FireStore
 * @requires householdId
 * @returns {ChoreStatisticsDTO}
 */
export async function getStatistics(householdId: string) {
  let statisticsDTOs: ChoreStatisticsDTO[] = [];

  const chores = await firebase
    .firestore()
    .collection("chores")
    .where("householdId", "==", householdId)
    .get();

  for (const chore of chores.docs) {
    let choreStatisticsDTO: ChoreStatisticsDTO = {
      choreTitle: chore.data().title,
      points: chore.data().points,
      completedChores: [],
    };

    const householdUsers = await firebase
      .firestore()
      .collection("householdUsers")
      .where("householdId", "==", householdId)
      .get();

    for (const householdUser of householdUsers.docs) {
      let completedChoresByUserDTO: CompletedChoresByUserDTO = {
        completedChores: [],
        housholdUserId: householdUser.id,
        avatarId: householdUser.data().avatarId,
      };

      const completedChores = await firebase
        .firestore()
        .collection("completedChores")
        .where("householdUserId", "==", householdUser.id)
        .where("choreId", "==", chore.id)
        .get();

      for (const completedChore of completedChores.docs) {
        console.log(completedChore.data().date.toDate());
        completedChoresByUserDTO.completedChores.push({
          choreId: completedChore.data().choreId,
          date: completedChore.data().date.toDate(),
          householdUserId: completedChore.data().householdUserId,
        });
      }
      choreStatisticsDTO.completedChores.push(completedChoresByUserDTO);
    }
    statisticsDTOs.push(choreStatisticsDTO);
  }

  console.log("uuu" + statisticsDTOs);
  return statisticsDTOs;
}
