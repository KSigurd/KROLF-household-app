import { createMaterialTopTabNavigator  } from "@react-navigation/material-top-tabs";
import * as React from "react";
import ChoresScreen from "../screens/ChoresScreen";
import StatisticsScreen from "../screens/StatisticsScreen";

export type TabParamList = {
  Chores: undefined;
  Statistics: undefined;
  activeHousehold: undefined;
};

const Tab = createMaterialTopTabNavigator<TabParamList>();

// export type NavigationTabProps <Screen extends keyof TabParamList> = NavigationTabProps<TabParamList, Screen>
//TabScreenProps<TabParamList, Screen>;


const ChoresStatisticsNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route, navigation }) => {
        return { tabBarStyle: {justifyContent: "center"}, tabBarLabel: navigation.isFocused() ? route.name : "",  }
      }}
    >
      <Tab.Screen
        name="Chores"
        component={ChoresScreen}
        options={{ title: "idag"}}
      />
      <Tab.Screen
        name="Statistics"
        component={StatisticsScreen}
        options={{ title: "förra veckan" }}
      />
    </Tab.Navigator>
  );
};

export default ChoresStatisticsNavigator;

// import * as React from "react";
// import {
//   createMaterialTopTabNavigator,
//   MaterialTopTabScreenProps,
// } from "@react-navigation/material-top-tabs";
// import BistroScreen from "../screens/BistroScreen";
// import MapScreen from "../screens/MapScreen";
// import { useSafeAreaInsets } from "react-native-safe-area-context";

// export type TabParamList = {
//   Bistro: undefined;
//   Map: undefined;
// };

// export type TabScreenProps<Screen extends keyof TabParamList> =
//   MaterialTopTabScreenProps<TabParamList, Screen>;

// const Tab = createMaterialTopTabNavigator<TabParamList>();

// export default function TabBistroMapNavigator() {
//   const insets = useSafeAreaInsets();

//   return (
//     <Tab.Navigator
//       style={{ paddingTop: insets.top, backgroundColor: "#723A45" }}
//       initialRouteName="Bistro"
//       screenOptions={{
//         tabBarActiveTintColor: "#fff",
//         tabBarStyle: { backgroundColor: "#723A45" },
//       }}
//     >
//       <Tab.Screen
//         name="Bistro"
//         component={BistroScreen}
//         options={{
//           title: "Restauranger",
//         }}
//       />
//       <Tab.Screen
//         name="Map"
//         component={MapScreen}
//         options={{
//           title: "Karta",
//         }}
//       />
//     </Tab.Navigator>
//   );
// }
