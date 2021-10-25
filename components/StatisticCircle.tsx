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
  
  const datatest = [
    {
      houseHoldUserId: 0,
      avatar: "🦊",
      totalPoints: 50,
      avatarColor: "#f2a56f",
    },
    {
      houseHoldUserId: 1,
      avatar: "🦄",
      totalPoints: 10,
      avatarColor: "#eee7e1",
    },
    {
      houseHoldUserId: 2,
      avatar: "🦋",
      totalPoints: 40,
      avatarColor: "#73aa24",
    },
    {
      houseHoldUserId: 3,
      avatar: "🐸",
      totalPoints: 95,
      avatarColor: "#80b090",
    },
    {
      houseHoldUserId: 4,
      avatar: "🐥",
      totalPoints: 13,
      avatarColor: "#fff68f",
    },
  ];

 
  

  //Hämta totala antal points i chore av en viss houseHoldUser
  //ChoresCompleted
const pieDataa = {
  value: (data.points * data.completedChores.length),
      svg: {
        fill: avatars.filter(avatar => avatar.id === data.completedChores[0].avatarId),
        onPress: () => console.log("press"),
      },
}


  const pieData = data.completedChores.map((dataObject, index) => ({
    key: index,
      value: (data.points * dataObject.completedChores.length),
      svg: {
        fill: avatars.filter(avatar => avatar.id === dataObject.avatarId).pop()?.color
      },
    }));




  // const pajbitar = data.completedChores[0].housholdUserId
  //   .filter((dataObject) => (dataObject.points * dataObject.completedChores.length) > 0)
  //   .map((dataObject, index) => ({
  //     value: (dataObject.points * dataObject.completedChores.length),
  //     svg: {
  //       fill: dataObject.avatarColor,
  //       onPress: () => console.log("press", index),
  //     },
  //     key: `pie-${index}`,
  //   }));

  return (
    <View>
      <Text>HALLLÅÅÅÅ? # 2</Text>
      <Text>{data.choreTitle}</Text>
      <PieChart
        style={{ height: height || 200 }}
        data={pieData}
        innerRadius="0%"
        padAngle={0}
        // valueAccessor="2"
      />
    </View>
  );
};

export default StatisticCircle;

const styles = StyleSheet.create({});
