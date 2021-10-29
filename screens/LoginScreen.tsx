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

type Props = NativeStackScreenProps<RootStackParamList, "CreateHousehold">;

const LoginScreen = ({ navigation }: Props) => {
  const dispatch = useAppDispatch();
  const activeHouseholdState = useAppSelector(
    (state) => state.household.activeHouseholdId
  );
  const statisticsState = useAppSelector(
    (state) => state.completedChore.statistics
  );

  //   useEffect(() => {

  //     dispatch(getStatisticsAction(activeHouseholdState.id))
  //    console.log({statisticsState})
  //    console.log("hejsvejs")

  // })
  return (
    <View style={styles.root}>
      <LoginForm onLoginSucceded={() => navigation.navigate("Profile")} />
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
            navigation.navigate("Profile"),
              dispatch(getHouseholdsAction("AMHQtDvOpBThnBV2cfaM"));
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
