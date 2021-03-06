import React from "react";
import { StyleSheet, View } from "react-native";
import { Surface, Text, TouchableRipple } from "react-native-paper";
import { avatars } from "../data/avatarData";
import { Chore } from "../interfaces/chore";
import { selectChoreById } from "../store/chore/choreSelectors";
import { getChoresAction, removeChoreAction } from "../store/chore/choreSlice";
import { daysSinceLastDone } from "../store/completedChore/completedChoreSelectors";
import { householdUsersFromChore } from "../store/householdUser/householdUserSelectors";
import { useAppDispatch, useAppSelector } from "../store/store";
import { styles } from "../styles/styles";
import SmallIconButton from "./SmallIconButton";


interface Props {
  choreId: string;
  isEditPressed: boolean;
  navigation: any;
}

const ChoreSurface = ({
  navigation,
  choreId,
  isEditPressed,
}: Props) => {
  //Define dispatch and states
    const users = useAppSelector(householdUsersFromChore(choreId));
  const dispatch = useAppDispatch();
  const activeHouseholdState = useAppSelector(
    (state) => state.household.activeHouseholdId);
  
    const chore = () => {
      const chore = useAppSelector(selectChoreById(choreId));
      if (chore) return chore;
      else return {} as Chore;
    };
  
  const repeatability = chore().repeatability;
  const daysSinceLast = useAppSelector(daysSinceLastDone(choreId));

  //Check if chore is overdue
  const isLate = () => {
    if (daysSinceLast) {
      return daysSinceLast > chore().repeatability;
    } else {
      return false;
    }
  };

  //When pressing on delete (trash bin) button
  const removeChore = async (choreId: string) => {
    await dispatch(removeChoreAction(choreId));
    await dispatch(getChoresAction(activeHouseholdState));
  };

  return (
    <View>
      <Surface style={stylesLocal.surface}>
        <TouchableRipple
          borderless={true}
          style={stylesLocal.chip}
          onPress={() => {
            navigation.navigate("ChoreDescriptionModalScreen", choreId);
          }}
        >
          <Text style={stylesLocal.surfaceText}>{chore().title}</Text>
        </TouchableRipple>
        {isEditPressed ? (
          <View />
        ) : (
          <View style={stylesLocal.avatarAndBadgeContainer}>
            {users.length ? (
              <Text style={[styles.buttonText, styles.choresButtonAdditions]}>

                {users.map((user) => {                  
                  if (user) return avatars.find((avatar) => (avatar.id === user.avatarId))?.avatar;
                  
                })}
              </Text>
            ) : ( 

              <Surface
                style={[
                  styles.repeatabilityCircle,
                  isLate()
                    ? styles.isLateBackground
                    : styles.isNotLateBackground,
                ]}
              >
                {daysSinceLast ? (
                  <Text
                    style={isLate() ? styles.isLateText : styles.isNotLateText}
                  >
                    {daysSinceLast}
                  </Text>
                ) : (
                  <Text style={styles.isNotLateText}>{repeatability}</Text>

                )}
              </Surface>
         )}
          </View>
        )}
        {isEditPressed ? (
          <View style={stylesLocal.editContainer}>
            <SmallIconButton
              typeOfIcon="pencil-outline"
              onPress={() =>
                navigation.navigate("EditChoreModalScreen", choreId)
              }
            />
            <SmallIconButton
              typeOfIcon="delete-outline"
              onPress={() => removeChore(choreId)}
            />
          </View>
        ) : null}
      </Surface>
    </View>
  );
};

export default ChoreSurface;

const stylesLocal = StyleSheet.create({
  surface: {
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "white",
    elevation: 4,
    marginVertical: 5,
    marginHorizontal: 4,
  },
  surfaceText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  chip: {
    flex: 1,
    padding: 10,
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
  },
  editContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginRight: 8,
  },
  avatarAndBadgeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginRight: 12,
  },
});
