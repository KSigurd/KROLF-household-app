import React, { useEffect } from "react";
import { Text } from "react-native-svg";
import { View, Text as TestText } from "react-native";
import { PieChart, PieChartData } from "react-native-svg-charts";
import { CompletedChore } from "../interfaces/completedChore";
import { avatars } from "../data/avatarData";
import { string } from "yup/lib/locale";
import { Avatar } from "react-native-paper";
import { useAppSelector, useAppDispatch } from "../store/store";
import { convertFromDTOToTotalChartData } from "../interfaces/statisticsDTO";
import { getStatisticsAction } from "../store/completedChore/completedChoreSlice";
import StatisticCircle from "../components/StatisticCircle";

interface UserStatisticsDTO {
  choreId: string;
  points: number;
  completedChores: ChoreStatisticsDTO[];
}

interface ChoreStatisticsDTO {
  completedChore: CompletedChore[];
  householdUserId: string;
  avatarId: string;
}
  
const WeekNumber = (currentDate : Date) => {
    var oneJan = new Date(currentDate.getFullYear(), 0, 1);
    var currentdateToNumber = (currentDate.getTime() - oneJan.getTime())
    var numberOfDays = Math.floor(currentdateToNumber / (24 * 60 * 60 * 1000));
    var result = Math.ceil((currentDate.getDay() + 1 + numberOfDays) / 7 - 1);
    return result
}

const CurrentWeekStatisticsScreen = () => {
  const dispatch = useAppDispatch();
  const activeHouseholdId = useAppSelector(
    (state) => state.household.activeHouseholdId
  );
  const statistics = useAppSelector(state => state.completedChore.statistics);
  const chartData = convertFromDTOToTotalChartData(statistics);

  useEffect(() => {
    dispatch(getStatisticsAction(activeHouseholdId));
  }, [activeHouseholdId]);
  
  const todayDate = new Date()

//   let filteredByWeek : UserStatisticsDTO[] = users.filter(d => WeekNumber(d.completedChores[].completedChore[].date) == WeekNumber(todayDate))

  const Labels = ({ slices, height, width }: any) => {
    return slices.map((slice: any, index: number) => {
      const { labelCentroid, pieCentroid, data } = slice;
      return (
        <Text
          key={index}
          x={pieCentroid[0]}
          y={pieCentroid[1]}
          textAnchor={"middle"}
          alignmentBaseline={"middle"}
          fontSize={24}
           stroke={'black'}
           strokeWidth={0.8}
           fill={'black'}
         >
          {data.avatar}
        </Text>
      );
    });
  };

  return (
    <View>
    <PieChart
      style={{ height: 200 }}
      innerRadius={0}
      padAngle={0}
      data={chartData}
      valueAccessor={({ item }) => item.value}
      outerRadius={"95%"}
      >
      <Labels slices={undefined} height={undefined} width={undefined} />
    </PieChart>

    {/* <StatisticCircle/> */}
      </View>
  );
};

export default CurrentWeekStatisticsScreen;