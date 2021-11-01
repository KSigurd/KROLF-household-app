import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Surface, TouchableRipple } from "react-native-paper";
import ChoreDeleteButton from "../components/ChoreDeleteButton";
import { number } from "yup/lib/locale";
import ChoreDescription from "../components/ChoreDescription";
import { Chore } from "../interfaces/chore";
import { StackScreenProps } from "../navigation/RootNavigator";
import { getChoresAction, removeChoreAction } from "../store/chore/choreSlice";
import { getCompletedChoresAction } from "../store/completedChore/completedChoreSlice";
import { selectHouseholdById } from "../store/household/hoseholdSelector";
import { useAppDispatch, useAppSelector } from "../store/store";
import { styles } from "../styles/styles";
import ChoreDescriptionModalScreen from "./ChoreDescriptionModalScreen";
import ChoreEditButton from "../components/ChoreEditButton";

const ChoresScreen = ({
  navigation,
}: StackScreenProps<"ChoresStatisticsNavigator">) => {
  const dispatch = useAppDispatch();
  const activeHouseholdState = useAppSelector(
    (state) => state.household.activeHouseholdId
  );
  const user = useAppSelector((state) => state.user.user);
  const allHouseholdChores = useAppSelector((state) => state.chore.chores);
  const household = useAppSelector(selectHouseholdById(activeHouseholdState));
  const [isEditPressed, setIsEditPressed] = React.useState(false);

  dispatch(getChoresAction(activeHouseholdState));

  const RemoveChore = async (choreId: string) => {
    await dispatch(removeChoreAction(choreId));
    await dispatch(getChoresAction(user.id));
    await dispatch(getCompletedChoresAction(activeHouseholdState));
  };

  // const [isVisible, setIsVisible] = React.useState(false);
  return (
    <View style={{ flex: 1, marginHorizontal: 10, marginVertical: 25 }}>
      <Text>household ID who is active : {activeHouseholdState}</Text>
      <Text>Name : {household?.name}</Text>
      {allHouseholdChores.map((prop) => {
        return (
          <View key={prop.id}>
            <Surface style={stylesLocal.surface}>
              {/* TODO: NAVIGATE TO NEW MODAL, FILMIL */}
              <TouchableRipple
                style={stylesLocal.chip}
                onPress={() => {
                  navigation.navigate("ChoreDescriptionModalScreen", prop);
                }}
              >
                <Text style={stylesLocal.surfaceText}>{prop.title}</Text>
              </TouchableRipple>
              {isEditPressed ? (
                <View style={stylesLocal.editContainer}>
                  <ChoreEditButton onEdit={() => navigation.navigate("EditChoreModalScreen", prop)} />
                  <ChoreDeleteButton onRemove={() => RemoveChore(prop.id)} />
                </View>
              ) : null}
            </Surface>
          </View>
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
          icon={isEditPressed ? "close-circle-outline" : "pencil-outline"}
          labelStyle={styles.buttonIconSize}
          color={"#000"}
          uppercase={false}
          style={styles.smallButton}
          onPress={
            isEditPressed
              ? () => {
                  setIsEditPressed(false);
                }
              : () => {
                  setIsEditPressed(true);
                }
          }
        >
          <Text style={styles.buttonText}>{isEditPressed ? "Avbryt": "Ändra"}</Text>
        </Button>
      </View>
    </View>
  );
};

export default ChoresScreen;

const stylesLocal = StyleSheet.create({
  surface: {
    height: "auto",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "white",
    elevation: 4,
    marginVertical: 5,
  },
  surfaceText: {
    flex: 1,
    fontSize: 18,
    fontWeight: "bold",
  },
  chip: {
    flex: 1,
    padding: 10,
    backgroundColor: "white",
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
  },
  editContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginRight: 4
  }
});

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
