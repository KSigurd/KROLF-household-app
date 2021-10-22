import { StyleSheet, View, Text } from "react-native";
import React from "react";
import { PieChart } from "react-native-svg-charts";

interface StatisticsData {
  avatar: string;
  color: string;
  points: number;
}

interface Props {
    title: string;
    height: number;
    data: StatisticsData;
}

const StatisticCircle = ({title, height, data}: Props) => {
  
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

  const pieData = data
    .filter((dataObject) => dataObject.totalPoints > 0)
    .map((dataObject, index) => ({
      value: dataObject.totalPoints,
      svg: {
        fill: dataObject.avatarColor,
        onPress: () => console.log("press", index),
      },
      key: `pie-${index}`,
    }));

  return (
    <View>
      <Text>{title}</Text>
      <PieChart
        style={{ height: height || 200 }}
        data={pieData}
        innerRadius="0%"
        padAngle={0}
        valueAccessor="2"
      />
    </View>
  );
};

export default StatisticCircle;

const styles = StyleSheet.create({});
