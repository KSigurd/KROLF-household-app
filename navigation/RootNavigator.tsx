import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
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
            backgroundColor: "#fff",
          },
          contentStyle: { backgroundColor: "#f0f0f0" },
          headerTitleAlign: "center",
          headerTitleStyle: { color: "#000" },
          headerTintColor: "#000",
        }}
      >
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: "Logga in" }}
        />
        <Stack.Screen
          name="CreateAccount"
          component={CreateAccountScreen}
          options={{ title: "Skapa konto" }}
        />
        <Stack.Screen
          name="CreateHousehold"
          component={CreateHouseholdScreen}
          options={{ title: "Skapa hushåll" }}
        />
        <Stack.Screen
          name="JoinHousehold"
          component={JoinHouseholdScreen}
          options={{ title: "Gå med" }}
        />
        {/* TODO: CHECK THIS */}
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ presentation: "fullScreenModal", title: "Profil" }}
        />
        <Stack.Screen
          name="ChoresStatisticsNavigator"
          component={ChoresStatisticsNavigator}
          options={{ title: "Hushållet", headerBackVisible: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
