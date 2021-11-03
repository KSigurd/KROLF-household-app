import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import React from "react";
import { Chore } from "../interfaces/chore";
import ChoreDescriptionModalScreen from "../screens/ChoreDescriptionModalScreen";
import CreateAccountScreen from "../screens/CreateAccountScreen";
import CreateChoreModalScreen from "../screens/CreateChoreModalScreen";
import CreateHouseholdScreen from "../screens/CreateHouseholdScreen";
import EditChoreModalScreen from "../screens/EditChoreModalScreen";
import EditHouseholdUserModalScreen from "../screens/EditHouseholdUserModalScreen";
import JoinHouseholdScreen from "../screens/JoinHouseholdScreen";
import LoginScreen from "../screens/LoginScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ChoresStatisticsNavigator from "./ChoresStatisticsNavigator";
import AddHouseholdUserInfoModalScreen from "../screens/AddHouseholdUserInfoModalScreen"

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
  AddHouseholdUserInfoModalScreen:{
    inviteCode:string
  };
  EditHouseholdUser: undefined;
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
          options={{
            title: "Logga in",
            headerBackVisible: false,
            headerBackTitleVisible: false,
          }}
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
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            title: "Profil",
            headerBackVisible: false,
            headerBackTitleVisible: false,
          }}
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
          <Stack.Screen
            name="AddHouseholdUserInfoModalScreen"
            component={AddHouseholdUserInfoModalScreen}
            options={{
              presentation: "transparentModal",
              contentStyle: { backgroundColor: "rgba(0,0,0,0.7)" },
              headerShown: false,
            }}
          />
        <Stack.Screen
          name="EditHouseholdUser"
          component={EditHouseholdUserModalScreen}
          options={{
            presentation: "transparentModal",
            contentStyle: { backgroundColor: "rgba(0,0,0,0.7)" },
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
