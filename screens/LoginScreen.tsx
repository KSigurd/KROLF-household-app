import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { RootStackParamList } from "../navigation/RootNavigator";
import LoginForm from "../components/LoginForm";
import { Title } from "react-native-paper";
import { Button as NPbutton } from "react-native-paper";
import { useAppDispatch, useAppSelector } from "../store/store";
import { getStatisticsAction } from "../store/completedChore/completedChoreSlice";
import { getHouseholdsAction } from "../store/household/householdSlice";
import { User } from "../interfaces/user";
import { loginUserAction } from "../store/user/userSlice";
import { getHouseholdUsersForLoggedInUser } from "../data/fireStoreModule";
import { getHouseholdUserForLoggedInUserAction } from "../store/householdUser/householdUserSlice";

type Props = NativeStackScreenProps<RootStackParamList, "CreateHousehold">;

const LoginScreen = ({ navigation }: Props) => {
  const dispatch = useAppDispatch();
  const userState = useAppSelector((state) => state.user);
 
  useEffect(() => {
    if (userState.loggedIn) navigation.navigate("Profile");
  }, [userState.loggedIn]);

  const loginUser = async (user: User) => {
    await dispatch(loginUserAction(user)).then(
      async () => {
        await dispatch(getHouseholdsAction(user.id));
        await dispatch(getHouseholdUserForLoggedInUserAction(user.id));
      }
    );
  };

  return (
    <View style={styles.root}>
      <LoginForm onSubmit={loginUser} />
      <View style={styles.noAccountContainer}>
        <Text style={styles.noAccountText}>Inget konto? Registrera dig </Text>
        <Text
          style={styles.createAccountText}
          onPress={() => navigation.navigate("CreateAccount")}
        >
          här
        </Text>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    marginHorizontal: 10,
    marginVertical: 10,
    justifyContent: "space-between",
  },
  noAccountContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  noAccountText: {
    marginTop:10,
    fontWeight: "bold",
  },
  createAccountText: {
    marginTop:10,
    fontWeight: "bold",
    alignSelf: "center",
    color: "#B8B8B8",
  },
});
