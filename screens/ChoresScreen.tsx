import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { FC } from "react";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import { Button } from "react-native-paper";
import ChoreButton from "../components/ChoreButton";
import { chores } from "../data/mockChoresData";
import { households } from "../data/mockHouseholdData";
import {
  RootStackParamList,
  StackScreenProps,
} from "../navigation/RootNavigator";
import { selectHouseholdById } from "../store/household/hoseholdSelector";
import { useAppDispatch, useAppSelector } from "../store/store";
import { styles } from "../styles/styles";
import CreateChoreInfo from "../components/CreateChoreInfo";
import { getChores } from "../data/fireStoreModule";
import { getChoresAction } from "../store/chore/choreSlice";
import { users } from "../data/mockUserData";

const ChoresScreen = ({
  route,
  navigation,
}: StackScreenProps<"ChoresStatisticsNavigator">) => {
  const dispatch = useAppDispatch();
  const activeHouseholdState = useAppSelector(
    (state) => state.household.activeHouseholdId
  );
  const household = useAppSelector(selectHouseholdById(activeHouseholdState));

  dispatch(getChoresAction(activeHouseholdState));
  const allHousoholdChores = useAppSelector((state) => state.chore.chores);

  // console.log(allHousoholdChores);

  const [isVisible, setIsVisible] = React.useState(false);

  return (
    <View style={styles.root}>
      <Text>household ID who is active : {activeHouseholdState}</Text>
      <Text>Name : {household?.name}</Text>

      {allHousoholdChores.map((prop, index) => {
        return (
          <TouchableHighlight style={{padding: 10}}key={index}>
            <Text onPress={() => alert(`GÅ NU OCH ${prop.title}`)}>
              {prop.title}
            </Text>
          </TouchableHighlight>

          
          // <ChoreButton  //TODO: Move this props-logic somewhere else
          //   key={key}
          //   buttonText={prop.title}
          //   completedBy={users.filter(
          //     (user) =>
          //       user.choresDone.filter((chore) => chore.choreId === prop.id)
          //         .length
          //   )}

          //   daysSinceLast={String(7)}
          //   isLate={false}
          // />
        );
      })}

      {/* TODO: flytta till styles.css */}
      <View style={styles.bottomButtonRow}>
        <Button
          icon="plus-circle-outline"
          labelStyle={styles.buttonIconSize}
          color={"#000"}
          uppercase={false}
          style={styles.smallButton}
          onPress={() => navigation.navigate("CreateChoreModalScreen")} //TODO
        >
          <Text style={styles.buttonText}>Lägg till</Text>
        </Button>
        <Button
          icon="pencil-outline"
          labelStyle={styles.buttonIconSize}
          color={"#000"}
          uppercase={false}
          style={styles.smallButton}
          onPress={() => {}} //TODO
        >
          <Text style={styles.buttonText}>Ändra</Text>
        </Button>
      </View>
    </View>
  );
};

export default ChoresScreen;

{
  /* {household.chores.map((prop, key) => {
        return (
          <ChoreButton  //TODO: Move this props-logic somewhere else
            key={key}
            buttonText={prop.title}
            completedBy={users.filter(
              (user) =>
                user.choresDone.filter((chore) => chore.choreId === prop.id)
                  .length
            )}
            daysSinceLast={String(7)}
            isLate={false}
          />
        );
      })} */
}

{
  /* <CreateChore setVisibleModal= {(isVisible)} /> */
}
