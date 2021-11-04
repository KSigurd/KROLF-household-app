import React, { useState } from "react";
import { LogBox, ScrollView, StyleSheet, View } from "react-native";
import BigThemedButton from "../components/BigThemedButton";
import ChoreSurface from "../components/ChoreSurface";
import RenderUserInfo from "../components/RenderUserInfo";
import { HouseholdUser } from "../interfaces/householdUser";
// import {
//   householdUsersFromChore
// } from "../store/householdUser/householdUserSelectors";
import { RootState, useAppSelector } from "../store/store";

const ChoresScreen = ({ navigation }: any) => {
  const completedChores = useAppSelector(state => state.completedChore.compltedChores)
  const householdUsers = useAppSelector(state => state.householdUser.householdUsers)

  const householdUsersFromChore =
  (choreId: string) => {
    const newDate = new Date();
    const filteredCompletedChores = completedChores
      .filter((cc) => cc.choreId === choreId)
      .filter(
        (cc) =>
          Date.UTC(
            cc.date.getFullYear(),
            cc.date.getMonth(),
            cc.date.getDate()
          ) ===
          Date.UTC(newDate.getFullYear(), newDate.getMonth(), newDate.getDate())
      );
    const filteredHouseholdUsers: HouseholdUser[] = [];
    for (const chore of filteredCompletedChores) {
      const householdUser = householdUsers.find(
        (user) => user.id === chore.householdUserId
      );
      if (householdUser && !householdUsers.find((hu) => hu === householdUser))
        filteredHouseholdUsers.push(householdUser);
    }
    return householdUsers;
  };


  LogBox.ignoreLogs(["timer"]);
  const activeHouseholdState = useAppSelector(
    (state) => state.household.activeHouseholdId
  );
  //Define states
  const allHouseholdChores = useAppSelector((state) => state.chore.chores);
  const [isEditPressed, setIsEditPressed] = useState(false);
  // const completedBy = (choreId: string) => useAppSelector(householdUsersFromChore(choreId));
  

  var choreId = "";
  // const setChoreId = (propId: string) => {
  //   choreId = propId; 
  // }

  //Toggle press on edit button
  const setIsPressed = () => {
    if (isEditPressed) setIsEditPressed(false);
    else setIsEditPressed(true);
  };

  return (
    <View style={styles.root}>
      <RenderUserInfo
        onClick={() => {
          navigation.navigate("EditHouseholdUser");
        }}
      />
      <ScrollView style={styles.scrollView}>
        {allHouseholdChores.map((prop) => {
          choreId = prop.id;
          return (
            <View key={prop.id}>
              <ChoreSurface
                completedBy={householdUsersFromChore(prop.id)}
                navigation={navigation}
                choreId={prop.id}
                isEditPressed={isEditPressed}
              />
            </View>
          );
        })}
      </ScrollView>
      <View style={styles.bottomButtonRow}>
        <BigThemedButton
          typeOfIcon="plus-circle-outline"
          buttonText="Lägg till"
          onPress={() => navigation.navigate("CreateChoreModalScreen")}
        />
        <BigThemedButton
          isPressed={isEditPressed}
          typeOfIcon="pencil-outline"
          alternateTypeOfIcon="close-circle-outline"
          buttonText="Ändra"
          alternateButtonText="Avbryt"
          onPress={setIsPressed}
        />
      </View>
    </View>
  );
};

export default ChoresScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  scrollView: {
    flex: 1,
  },
  bottomButtonRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    zIndex: 1,
    backgroundColor: "#f0f0f0",
    height: 75,
  },
});
