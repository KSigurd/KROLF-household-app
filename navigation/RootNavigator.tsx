import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import CreateAccountScreen from "../screens/CreateAccountScreen";
import CreateHouseholdScreen from "../screens/CreateHouseholdScreen";
import JoinHouseholdScreen from "../screens/JoinHouseholdScreen";
import LoginScreen from "../screens/LoginScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ChoresStatisticsNavigator from "./ChoresStatisticsNavigator";
import CreateChoreModalScreen from "../screens/CreateChoreModalScreen";

export type RootStackParamList = {
  Login: undefined;
  CreateAccount: undefined;
  CreateHousehold: undefined;
  JoinHousehold: undefined;
  Profile: undefined;
  ChoresStatisticsNavigator: undefined;
  CreateChoreModalScreen: undefined;
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
        <Stack.Screen
          name="CreateChoreModalScreen"
          component={CreateChoreModalScreen}
          options={{
            presentation: "transparentModal",
            contentStyle: { backgroundColor: "transparent" },
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
