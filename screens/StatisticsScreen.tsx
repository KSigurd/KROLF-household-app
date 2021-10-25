import React, { FC, useEffect } from "react";
import { View, Text } from "react-native";
import { PieChart } from "react-native-svg-charts";
import StatisticCircle from "../components/StatisticCircle";
import { avatars } from "../data/avatarData";
import { Chore } from "../interfaces/chore";
import { CompletedChore } from "../interfaces/completedChore";
import { HouseholdUser } from "../interfaces/householdUser";
import { getStatisticsAction } from "../store/completedChore/completedChoreSlice";
import { useAppDispatch, useAppSelector } from "../store/store";

// export interface UserStatisticsDTO {
//   choreId: string;
//   points: number;
//   completedChores: ChoreStatisticsDTO[];
// }

// export interface ChoreStatisticsDTO {
//   completedChore: CompletedChore[];
//   householdUserId: string;
//   avatarId: string
// }

// const mockStatistics: UserStatisticsDTO[] = [
//   {
//     choreId: "0",
//     points: 0,
//     completedChores: [
//       {
//         completedChore: [{
//           choreId: 0,
//           userId: 0,
//           date: new Date(),
//         }],
//         householdUserId: "6",
//         avatarId: "2"
//       },
//     ],
//   },
//   {
//     choreId: "2",
//     points: 1,
//     completedChores: [
//       {
//         completedChore: [{
//           choreId: "3",
//           userId: 1,
//           date: new Date(),
//         }],
//         householdUserId: "3",
//         avatarId: "3"
//       },
//     ],
//   },
// ];

const StatisticsScreen: FC = () => {
  const dispatch = useAppDispatch();
  const activeHouseholdState = useAppSelector(state => state.household.activeHouseholdId);
  const statisticsState = useAppSelector(state => state.completedChore.statistics)




  // const statistics = useAppSelector((state) => {

  //   const activeHouseholdId = "1";

  //   const chores = state.chore.chores.filter(
  //     (c) => String(c.householdId) == activeHouseholdId
  //   );
    
    // const activeHouseholdUsers = state.householdUser.householdUsers.filter(
    //   (hu) => String(hu.householdId) == activeHouseholdId 
    // );


    // let newarray: UserStatisticsDTO[]
    // const users = activeHouseholdUsers.map((ahu) => {
    //   avatars.map((ava) => {
    //     if(ava.id == ahu.avatarId) {
    //       newarray.push({avatarEmoji: ava.avatar, color: ava.color})
    //     }

    //   })
       
    // });

    // const avatarEmoji = avatars.filter(
    //   (a) => String(a.id) == activeHouseholdUsers.
    // )

  
    // const completedChoresForHousehold =
    //   state.completedChore.completedChore.filter((cc) =>
    //     chores.some((c) => c.id === cc.choreId)
    //   );

  

    // return chores.map((chore) => {
    //   const completedChoresForChore = completedChoresForHousehold.filter(
    //     (cc) => chore.id === cc.choreId
    //   );

      // const user = completedChoresForHousehold.filter(
      //   (cc) => chore.id === cc.choreId
      // );

    
      // todo....
//       return {
//         chore,
// // newarray,
//         users: {
//           avatarEmoji,
//           color,
//           points,
//         },
//       };
//     });
//   });

  // 1. Hämta alla Completed Chores
  // 2. Filtera på datum
  // 3. Mappa över

  return (
    <View>
      <Text>HALLLÅÅÅÅ?</Text>
      {/* <StatisticCircle title="Total" height={200} data={statisticsState} /> */}
      <View>
        {statisticsState.filter((chore) => (chore.points * chore.completedChores.length) > 0)
        .map(s => (
          <StatisticCircle
            height={100}
            data={s}
          />
        ))}
      </View>
    </View>
  
  );
        
};


export default StatisticsScreen;
