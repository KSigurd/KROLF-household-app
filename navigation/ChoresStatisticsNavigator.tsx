import {
  createMaterialTopTabNavigator
} from "@react-navigation/material-top-tabs";
import * as React from "react";
import CustomTopTabBar from "../components/CustomTopTabBar";
import ChoresScreen from "../screens/ChoresScreen";
import CurrentWeekStatisticsScreen from "../screens/CurrentWeekStatisticsScreen"

export type TabParamList = {
  activeHousehold: undefined;
  Home: undefined;
  ChoresScreen : undefined;
  CurrentWeekStatisticsScreen: undefined;
};

const Tab = createMaterialTopTabNavigator<TabParamList>();

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
      <Tab.Screen
        name="CurrentWeekStatisticsScreen"
        component={CurrentWeekStatisticsScreen}
        options={{ title: "nuvarande vecka" }}
      />
    </Tab.Navigator>
  );
};

export default ChoresStatisticsNavigator;
