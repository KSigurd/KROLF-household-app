import {
  createMaterialTopTabNavigator
} from "@react-navigation/material-top-tabs";
import * as React from "react";
import CustomTopTabBar from "../components/CustomTopTabBar";
import ChoresScreen from "../screens/ChoresScreen";
import StatisticsScreen from "../screens/StatisticsScreen";

export type TabParamList = {
  activeHousehold: undefined;
  Home: undefined;
  FirstStatistics: undefined;
  LastStatistics: undefined;
};

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
      <Tab.Screen
        name="FirstStatistics"
        component={StatisticsScreen}
        options={{ title: "förra veckan" }}
      />
      <Tab.Screen
        name="LastStatistics"
        component={StatisticsScreen}
        options={{ title: "december", tabBarScrollEnabled: true }}
      />
    </Tab.Navigator>
  );
};

export default ChoresStatisticsNavigator;
