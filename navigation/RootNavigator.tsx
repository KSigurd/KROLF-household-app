import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import ChoresScreen from "../screens/ChoresScreen";
import CreateAccountScreen from "../screens/CreateAccountScreen";
import CreateHouseholdScreen from "../screens/CreateHouseholdScreen";
import JoinHouseholdScreen from "../screens/JoinHouseholdScreen";
import LoginScreen from "../screens/LoginScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ChoresStatisticsNavigator from "./ChoresStatisticsNavigator";

export type RootStackParamList = {
  Login: undefined;
  CreateAccount: undefined;
  CreateHousehold: undefined;
  JoinHousehold: undefined;
  Profile: undefined;
  ChoresStatisticsNavigator: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "blue",
          },
          contentStyle: { backgroundColor: "#f0f0f0" },
          headerTitleAlign: "center",
          headerTitleStyle: { color: "white" },
          headerTintColor: "white",
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen}  options={{title:"Logga in"}}/>
        <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
        <Stack.Screen
          name="CreateHousehold"
          component={CreateHouseholdScreen}
        />
        <Stack.Screen name="JoinHousehold" component={JoinHouseholdScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="ChoresStatisticsNavigator" component={ChoresStatisticsNavigator} />
      </Stack.Navigator>
      
    </NavigationContainer>
  );
};

      // <Stack.Screen
      //   name="Root"
      //   component={TabBistroMapNavigator}
      //   options={{ headerShown: false }}
      // />

export default RootNavigator;
