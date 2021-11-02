import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import React from "react";
import ChoreDescriptionModalScreen from "../screens/ChoreDescriptionModalScreen";
import CreateAccountScreen from "../screens/CreateAccountScreen";
import CreateChoreModalScreen from "../screens/CreateChoreModalScreen";
import CreateHouseholdScreen from "../screens/CreateHouseholdScreen";
import EditChoreModalScreen from "../screens/EditChoreModalScreen";
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
  CreateChoreModalScreen: undefined;
  EditChoreModalScreen: {
    choreId: string;
  };
  ChoreDescriptionModalScreen: {
    choreId: string;
  };
};

export type StackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

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
          name="JoinHousehold"
          component={JoinHouseholdScreen}
          options={{ title: "Gå med i hushåll" }}
        />
        <Stack.Screen
          name="CreateHousehold"
          component={CreateHouseholdScreen}
          options={{ title: "Skapa hushåll" }}
        />
        {/* TODO: CHECK THIS */}
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ title: "Profil" }}
        />
        <Stack.Screen
          name="ChoresStatisticsNavigator"
          component={ChoresStatisticsNavigator}
          options={{ title: "Hushållet", headerBackVisible: true }}
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
        <Stack.Screen
          name="EditChoreModalScreen"
          component={EditChoreModalScreen}
          options={{
            presentation: "transparentModal",
            contentStyle: { backgroundColor: "transparent" },
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ChoreDescriptionModalScreen"
          component={ChoreDescriptionModalScreen}
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
