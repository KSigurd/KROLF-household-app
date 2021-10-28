import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { View, Text, Button, StyleSheet, FlatList } from "react-native";
import AddHouseholdButton from "../components/AddHouseholdButton";
import HouseholdSurface from "../components/HouseholdSurface";
import JoinHouseholdButton from "../components/JoinHouseHoldButton";
import { households } from "../data/mockHouseholdData";
import { RootStackParamList } from "../navigation/RootNavigator";
import { setActiveHousholdAction } from "../store/household/householdSlice";
import { useAppDispatch, useAppSelector } from "../store/store";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "ChoresStatisticsNavigator"
>;

const ProfileScreen = ({ navigation }: Props) => {
  const dispatch = useAppDispatch();
  const statisticsState = useAppSelector(
    (state) => state.completedChore.statistics
  );

  const activeHouseholdState = useAppSelector(
    (state) => state.household.activeHouseholdId
  );

  const setHousholdAndNavigate = (householdId: string) => {
    dispatch(setActiveHousholdAction(householdId));
    navigation.navigate("ChoresStatisticsNavigator");
  };

  return (
    <View style={styles.root}>
      <View>
        <Text style={styles.title}>Välkommen *användarnamn*</Text>

        <View>
          <Text style={styles.title}>Välj hushåll:</Text>
          {/* TODO: Hämta data från databas istället för mockad data */}
          {households.map((prop, key) => {
            return (
              <HouseholdSurface
                key={key}
                householdObject={prop}
                onChange={(householdId) => {
                  setHousholdAndNavigate(householdId);
                }}
              />
            );
          })}
        </View>
      </View>

      <View style={styles.NPbuttonRoot}>
        <AddHouseholdButton
          onAddHousehold={() => navigation.navigate("CreateHousehold")}
        />
        <JoinHouseholdButton
          onJoinHousehold={() => navigation.navigate("JoinHousehold")}
        />
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    marginHorizontal: 10,
    marginVertical: 25,
    justifyContent: "space-between",
  },
  NPbuttonRoot: {
    alignSelf: "center",
    justifyContent: "space-between",
    width: "100%",
    flexDirection: "row",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
    marginVertical: 20,
  },
});
