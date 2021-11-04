import React from "react";
import { StyleSheet, View } from "react-native";
import { Surface, Text, TouchableRipple } from "react-native-paper";
import { avatars } from "../data/avatarData";
import { HouseholdUser } from "../interfaces/householdUser";
import { selectChoreById } from "../store/chore/choreSelectors";
import { getChoresAction, removeChoreAction } from "../store/chore/choreSlice";
import { getCompletedChoresAction } from "../store/completedChore/completedChoreSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import { styles } from "../styles/styles";
import SmallIconButton from "./SmallIconButton";
import { daysSinceLastDone, getCompletedChoreByChoreId } from "../store/completedChore/completedChoreSelectors";
import { removeChore } from "../data/fireStoreModule";
import { Chore } from "../interfaces/chore";

interface Props {
  choreId: string;
  isEditPressed: boolean;
  navigation: any;
  completedBy: undefined[] | HouseholdUser[];
}

const ChoreSurface = ({
  navigation,
  choreId,
  isEditPressed,
  completedBy,
}: Props) => {

  //Define dispatch and states
  const dispatch = useAppDispatch();
  const activeHouseholdState = useAppSelector(
    (state) => state.household.activeHouseholdId
    );
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
    await dispatch(getCompletedChoresAction(activeHouseholdState));
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
            {completedBy.length ? (
              <Text style={[styles.buttonText, styles.choresButtonAdditions]}>
                {completedBy.map((user) => {                  
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
              onPress={() => removeChore(chore().id)}
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
