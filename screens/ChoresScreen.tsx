import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { FC } from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-paper";
import ChoreButton from "../components/ChoreButton";
import { chores } from "../data/mockChoresData";
import { households } from "../data/mockHouseholdData";
import { RootStackParamList, StackScreenProps } from "../navigation/RootNavigator";
import { selectHouseholdById } from "../store/household/hoseholdSelector";
import { useAppSelector } from "../store/store";
import { styles } from "../styles/styles";

const ChoresScreen = ({ route, navigation } : StackScreenProps<"ChoresStatisticsNavigator">) => {

  const activeHouseholdState = useAppSelector(state => state.household.activeHouseholdId);

  const household = useAppSelector(selectHouseholdById(households[0].id)); //hårdkodat nu.

  return (
    <View style={styles.root}>

<Text>household ID who is active : {activeHouseholdState}</Text>
<Text>Name : {household?.name}</Text>

      {/* {household.chores.map((prop, key) => {
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
      })} */}
      <View style={styles.bottomButtonRow}>
        <Button
          icon="plus-circle-outline"
          labelStyle={styles.buttonIconSize}
          color={"#000"}
          uppercase={false}
          style={styles.smallButton}
          onPress={() => {}} //TODO
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
