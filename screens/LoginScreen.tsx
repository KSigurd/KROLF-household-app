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

type Props = NativeStackScreenProps<RootStackParamList, "CreateHousehold">;

const LoginScreen = ({ navigation }: Props) => {
  const dispatch = useAppDispatch();
  const userState = useAppSelector((state) => state.user);
  //TODO: Kalla på logga-ut-funktion när denna screen laddas
  const activeHouseholdState = useAppSelector(
    (state) => state.household.activeHouseholdId
  );
  const statisticsState = useAppSelector(
    (state) => state.completedChore.statistics
  );

  useEffect(() => {
    if (userState.loggedIn) navigation.navigate("Profile");
  }, [userState.loggedIn]);

  const loginUser = async (user: User) => {
    await dispatch(loginUserAction(user)).then(
      async () => await dispatch(getHouseholdsAction(user.id))
    );
  };

  //   useEffect(() => {

  //     dispatch(getStatisticsAction(activeHouseholdState.id))
  //    console.log({statisticsState})
  //    console.log("hejsvejs")

  // })
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

        <Text
          style={styles.createAccountText}
          onPress={() => {
            dispatch(getHouseholdsAction("AMHQtDvOpBThnBV2cfaM")).then(() => {
              navigation.navigate("Profile");
            });
          }}
        >
          GÅ VIDARE UTAN INLOGG
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
    marginVertical: 25,
    justifyContent: "space-between",
  },
  noAccountContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  noAccountText: {
    fontWeight: "bold",
  },
  createAccountText: {
    fontWeight: "bold",
    alignSelf: "center",
    color: "#B8B8B8",
  },
});
