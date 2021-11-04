import {
  createMaterialTopTabNavigator
} from "@react-navigation/material-top-tabs";
import * as React from "react";
import CustomTopTabBar from "../components/CustomTopTabBar";
import ChoresScreen from "../screens/ChoresScreen";
// import StatisticsScreen from "../screens/StatisticsScreen";
import CurrentWeekStatisticsScreen from "../screens/CurrentWeekStatisticsScreen"
// import LastWeekStatisticsScreen from "../screens/LastWeekStatisticsScreen"
// import CurrentMonthStatisticsScreen from "../screens/CurrentMonthStatisticsScreen"
// import LastMonthStatisticsScreen from "../screens/LastMonthStatisticsScreen"
// import LastYearStatisticsScreen from "../screens/LastYearStatisticsScreen"

export type TabParamList = {
  activeHousehold: undefined;
  Home: undefined;
  ChoresScreen : undefined;
  CurrentWeekStatisticsScreen: undefined;
  // LastWeekStatistics: undefined;
  // CurrentMonthStatistics: undefined;
  // LastMonthStatistics: undefined;
  // LastYearStatistics: undefined;
};

// const monthNames = [
//   "Januari",
//   "Februari",
//   "Mars",
//   "April",
//   "Maj",
//   "Juni",
//   "Juli",
//   "Augusti",
//   "September",
//   "Oktober",
//   "November",
//   "December",
// ];

// const date = new Date();
// let lastMonth = monthNames[date.getMonth() - 1];
// let currentMonth = monthNames[date.getMonth()];
// let lastYear = (date.getFullYear() - 1).toString();

const Tab = createMaterialTopTabNavigator<TabParamList>();

// export type NavigationTabProps <Screen extends keyof TabParamList> = NavigationTabProps<TabParamList, Screen>
//TabScreenProps<TabParamList, Screen>;


const ChoresStatisticsNavigator = () => {
  return (
    <Tab.Navigator tabBar={(props: any) => <CustomTopTabBar {...props} />}>
      <Tab.Screen
        name="Home"
        component={ChoresScreen}
        options={{
          title: "idag",
        }}
      />
      {/* <Tab.Screen
        name="ChoresScreen"
        component={ChoresScreen}
        options={{ title: "choreScreen" }}
      /> */}
      <Tab.Screen
        name="CurrentWeekStatisticsScreen"
        component={CurrentWeekStatisticsScreen}
        options={{ title: "nuvarande vecka" }}
      />
      {/* <Tab.Screen
        name="LastWeekStatistics"
        component={LastWeekStatisticsScreen}
        options={{ title: "förra veckan" }}
      /> */}
      {/* <Tab.Screen
        name="CurrentMonthStatistics"
        component={CurrentMonthStatisticsScreen}
        options={{
          title: currentMonth,
          tabBarScrollEnabled: true,
        }}
      /> */}
      {/* <Tab.Screen
        name="LastMonthStatistics"
        component={LastMonthStatisticsScreen}
        options={{
          title: lastMonth,
          tabBarScrollEnabled: true,
        }}
      /> */}
      {/* <Tab.Screen
        name="LastYearStatistics"
        component={LastYearStatisticsScreen}
        options={{
          title: lastYear,
          tabBarScrollEnabled: true,
        }}
      /> */}
    </Tab.Navigator>
  );
};

export default ChoresStatisticsNavigator;
