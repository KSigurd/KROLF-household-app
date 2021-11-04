// import { StyleSheet, View, Text } from "react-native";
// import React, { FC } from "react";
// import { PieChart } from "react-native-svg-charts";
// import { ChoreStatisticsDTO } from "../interfaces/statisticsDTO";
// import { avatars } from "../data/avatarData";

// interface Props {
//     height: number;
//     label: string;
//     data: {
//       avatarId: string;
//       totalPoints: number;
//     }[];
// }



// const StatisticCircle: FC<Props> = ({ height, data, label }: Props) => {

//   const pieData = data.map((dataObject, index ) => ({
//     key: `pie-${avatars.find(avatar => avatar.id === String(dataObject.avatarId))?.avatar}`,
//       value: dataObject.totalPoints,
//       svg: {
//         fill: avatars.find(avatar => avatar.id === String(dataObject.avatarId))?.color,
//         onPress: () => console.log('press', avatars.find(avatar => avatar.id === String(dataObject.avatarId))?.avatar),
//       },
//     }));

//   return (
//     <View style={styles.root}>
//       <PieChart
//         style={styles.circle}
//         valueAccessor={({item}) => item.value}
//         data={pieData}
//         innerRadius="0%"
//         padAngle={0}
//         >
//       </PieChart>
//       <Text >{label}</Text>
//     </View>
//   );
// };

// export default StatisticCircle;

// const styles = StyleSheet.create({
//   root: {
//     width: "33.333%",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   center: {
//     alignItems: "center"
//   },
//   circle: {
//     width: "100%",
//     height: "40%",
//     marginBottom: 10,
//     marginHorizontal: 20
//   }
// });


import { StyleSheet, View, Text } from "react-native";
import React, { FC } from "react";
import { PieChart } from "react-native-svg-charts";
import { ChoreStatisticsDTO } from "../interfaces/statisticsDTO";
import { avatars } from "../data/avatarData";

interface Props {
    height: number;
    data: ChoreStatisticsDTO;
}

const StatisticCircle: FC<Props> = ({ height, data }: Props) => {

  const pieData = data.completedChores.map((dataObject, index ) => ({
    key: index,
      value: (data.points * dataObject.completedChores.length),
      svg: {
        fill: avatars.find(avatar => avatar.id === String(dataObject.avatarId))?.color,
        onPress: () => console.log('press', avatars.find(avatar => avatar.id === String(dataObject.avatarId))?.avatar),
      },
    }));

  return (
    <View style={styles.root}>
      <PieChart
        style={styles.circle}
        valueAccessor={({item}) => item.value}
        data={pieData}
        innerRadius="0%"
        padAngle={0}
        >
      </PieChart>
      <Text >{data.completedChores? data.choreTitle : ""}</Text>
    </View>
  );
};

export default StatisticCircle;

const styles = StyleSheet.create({
  root: {
  width: "33.333%",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20
  },
  center: {
    alignItems: "center"
  },
  circle: {
    width: "100%",
    height: "40%",
    marginVertical: 10,
    marginHorizontal: 10
  }
});
