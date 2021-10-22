import { Chore, ChoreOmit } from "../interfaces/chore";
import { CompletedChore } from "../interfaces/completedChore";
import { Household, HouseholdOmit } from "../interfaces/households";
import { HouseholdUser, HouseholdUserOmit } from "../interfaces/householdUser";
import { ChoreStatisticsDTO, UserStatisticsDTO } from "../interfaces/statisticsDTO";
import { User, UserOmit } from "../interfaces/user";
import { firebase } from "./fireBaseConfig";
import { completedChores } from "./mockHouseholdData";

/** 
 * Takes an object of type User and writes it to FireStore
 * @requires User
 */
export async function addUser(newUser: UserOmit) {
  firebase
    .firestore()
    .collection("users")
    .add(newUser)
    .catch((err) => console.log(err));
}

/** 
 * Takes an object of type User and returns a bool depending on if email and password matches database
 * @requires User
 * @returns {boolean}
 */
export async function loginUser(user: User) {
  let loggedIn: boolean = false;
  firebase
    .firestore()
    .collection("users")
    .where("email", "==", user.email)
    .where("password", "==", user.password)
    .get()
    .then((query) => {
      query.forEach((doc) => {
        if (doc.exists) {
          user.id = doc.id;
          loggedIn = true;
        }
      });
    })
    .catch((err) => console.log(err));

  return loggedIn;
}

/** 
 * Takes an object of type Chore and writes it to FireStore
 * @requires Chore
 */
export async function addChore(newChore: ChoreOmit) {
  firebase
    .firestore()
    .collection("chores")
    .add(newChore)
    .catch((err) => console.log(err));
}

/** 
 * Takes an object of type Chore and updates document in FireStore with corresponding Id
 * @requires Chore
 */
export async function updateChore(modifiedChore: Chore) {
  firebase
    .firestore()
    .collection("chores")
    .doc(modifiedChore.id)
    .update(modifiedChore as ChoreOmit)
    .catch((err) => console.log(err));
}

/** 
 * Takes a householdId of type string and retrieves all Chores from FireStore with corresponding householdId
 * @requires householdId
 * @returns {Chore[]}
 */
export async function getChores(householdId: string) {
  const chores: Chore[] = [];
  firebase
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
  firebase
    .firestore()
    .collection("chores")
    .doc(choreId)
    .delete()
    .catch(err => console.log(err));
}

/** 
 * Takes an object of type CompletedChore and writes it to FireStore
 * @requires CompletedChore
 */
export async function addCompletedChore(newCompletedChore: CompletedChore) {
  firebase
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
  firebase
    .firestore()
    .collection("chores")
    .where("householdId", "==", householdId)
    .get()
    .then((query) => {
      query.forEach((doc) => {
        firebase
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

/** 
 * Takes an object of type Household and writes it to FireStore
 * @requires Household
 */
export async function addHoushold(newHousehold: HouseholdOmit) {
  firebase
    .firestore()
    .collection("households")
    .add(newHousehold)
    .catch((err) => console.log(err));
}

/** 
 * Takes an object of type Household and updates document in FireStore with corresponding householdId
 * @requires Household
 */
export async function updateHoushold(modifiedHousehold: Household) {
  firebase
    .firestore()
    .collection("households")
    .doc(modifiedHousehold.id)
    .update(modifiedHousehold as HouseholdOmit)
    .catch((err) => console.log(err));
}

/** 
 * Takes an userId of type string and retrieves all Households from FireStore connected with user
 * @requires userId
 * @returns {Household[]}
 */
export async function getHouseHolds(userId: string) {
  const households: Household[] = [];
  firebase
    .firestore()
    .collection("householdUsers")
    .where("userId", "==", userId)
    .get()
    .then((query) => {
      query.forEach((doc) => {
        firebase
          .firestore()
          .collection("households")
          .doc(doc.data().householdId)
          .get()
          .then((doc) => {
            households.push({ id: doc.id, ...doc.data() } as Household);
          })
          .catch((err) => console.log(err));
      });
    })
    .catch((err) => console.log(err));

  return households;
}

/** 
 * Takes an object of type HouseholdUser and writes it to FireStore
 * @requires HouseholdUser
 */
export async function addHouseholdUser(newHouseHoldUser: HouseholdUserOmit) {
  firebase
    .firestore()
    .collection("householdUsers")
    .add(newHouseHoldUser)
    .catch((err) => console.log(err));
}

/** 
 * Takes an object of type HouseholdUser and updates document in FireStore with corresponding householdUserId
 * @requires HouseholdUser
 */
export async function updateHouseholdUser(
  modifiedHouseholdUser: HouseholdUser
) {
  firebase
    .firestore()
    .collection("householdUsers")
    .doc(modifiedHouseholdUser.id)
    .update(modifiedHouseholdUser as HouseholdUserOmit);
}

/** 
 * Takes an householdId of type string and retrieves all HouseholdUser from FireStore connected with household
 * @requires householdId
 * @returns {HouseholdUser[]}
 */
export async function getHouseholdUsers(householdId: string) {
  const householdUsers: HouseholdUser[] = [];
  firebase
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

//TODO: Denna kommer inte funka. Men totalt hjärntrött just nu. Fixa senare
/** 
 * Takes an userId of type string and deletes corresponding HousholdUser and CompletedChores from FireStore
 * @requires userId
 * @requires householdId
 */
export async function removeHouseholdUser(userId: string, householdId: string) {
  firebase
    .firestore()
    .collection("householdUsers")
    .where("userId", "==", userId)
    .where("householdId", "==", householdId)
    .get()
    .then(query => {
      query.forEach(doc => {
        doc.ref.delete();
      })
    })
    .catch(err => console.log(err))

  firebase
    .firestore()
    .collection("completedChores")
    .where("userId", "==", userId)
    .get()
    .then(query => {
      query.forEach(doc => {
        doc.ref.delete();
      })
    })
    .catch(err => console.log(err));
}

//TODO: Filtrera efter datum
/** 
 * Takes a householdId of type string and gather statistics information from FireStore
 * @requires householdId
 */
 export async function getStatisticsThisWeek(userId: string, householdId: string) {
  let statisticsDTOs: UserStatisticsDTO[] = [];

  firebase
    .firestore()
    .collection("householdUsers")
    .where("householdId", "==", householdId)
    .get()
    .then(query => {
      query.forEach(doc => {
        let statisticsDTO: UserStatisticsDTO = {} as UserStatisticsDTO;
        statisticsDTO.avatarId = doc.data().avatarId;
        statisticsDTO.householdUserId = doc.id;
        firebase
          .firestore()
          .collection("completedChores")
          .where("householdUserId", "==", doc.id)
          .get()
          .then(query => {
            query.forEach(doc => {
              let choreDTO: ChoreStatisticsDTO = {} as ChoreStatisticsDTO;
              choreDTO.completedChore = doc.data() as CompletedChore;
              firebase
                .firestore()
                .collection("chores")
                .doc(doc.data().choreId)
                .get()
                .then(doc => {
                  if(doc.exists) {
                    choreDTO.points = doc.data()!.points;
                  }
                })
                .catch(err => console.log(err));

              statisticsDTO.completedChores.push(choreDTO);
            })
          })
          .catch(err => console.log(err));

        statisticsDTOs.push(statisticsDTO);
      })
    })
    .catch(err => console.log(err));
}