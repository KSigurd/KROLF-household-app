import React, { useState, useEffect } from "react";
import { LogBox, ScrollView, StyleSheet, View, Text } from "react-native";
import { useDispatch } from "react-redux";
import BigThemedButton from "../components/BigThemedButton";
import ChoreSurface from "../components/ChoreSurface";
import RenderUserInfo from "../components/RenderUserInfo";
import { HouseholdUser } from "../interfaces/householdUser";
import { getChoresAction } from "../store/chore/choreSlice";
import { getCompletedChoresAction } from "../store/completedChore/completedChoreSlice";
import { selectHouseholdById } from "../store/household/hoseholdSelector";
import { householdUsersFromChore, househouldUsersFromHousehold, isUserAdmin } from "../store/householdUser/householdUserSelectors";
import { RootState, useAppSelector } from "../store/store";

const ChoresScreen = ({ navigation }: any) => {
  LogBox.ignoreLogs(["timer"]);
  const activeHouseholdState = useAppSelector(
    (state) => state.household.activeHouseholdId
    );
  const dispatch = useDispatch();
  const completedChores = useAppSelector(state => state.completedChore.completedChores)
  const householdUsers = useAppSelector(state => state.householdUser.householdUsers)
    const allHouseholdUsers = useAppSelector(househouldUsersFromHousehold(activeHouseholdState));
    const household = useAppSelector(selectHouseholdById(activeHouseholdState));
    
    
    useEffect(() => {
      dispatch(getChoresAction(activeHouseholdState))
      dispatch(getCompletedChoresAction(activeHouseholdState))
    }, [activeHouseholdState])
    
    
  //Define states
  const allHouseholdChores = useAppSelector((state) => state.chore.chores);
  const [isEditPressed, setIsEditPressed] = useState(false);
   const completedBy = (choreId: string) => useAppSelector(householdUsersFromChore(choreId));
  
  const isChores = () => {
    if(allHouseholdChores.length) return true
    else return false
  }

  const isAdmin = isUserAdmin(activeHouseholdState, allHouseholdUsers);

  //Toggle press on edit button
  const setIsPressed = () => {
    if (isEditPressed) setIsEditPressed(false);
    else setIsEditPressed(true);
  };

  return (
    <View style={{ flex: 1, marginHorizontal: 10, marginBottom: 10 }}>
      <RenderUserInfo
        onClick={() => {
          navigation.navigate("EditHouseholdUserModalScreen");
        }}
      />
      <Text style={{fontSize: 20}}>{household?.inviteCode} är invitecoden</Text>
      <ScrollView style={{ flex: 1 }}>
        {allHouseholdChores.map((prop) => {
          return (
            <View key={prop.id}>
              <ChoreSurface
                completedBy={completedBy(prop.id)}
                navigation={navigation}
                choreId={prop.id}
                isEditPressed={isEditPressed}
              />
            </View>
          );
        })}
      </ScrollView>
      {isAdmin ? (
        <View
        style={
          isChores()
            ? localStyles.bottomButtonRow
            : localStyles.bottomButtonRowOneButton
        }
      >
          <BigThemedButton
            typeOfIcon="plus-circle-outline"
            buttonText="Lägg till"
            onPress={() => navigation.navigate("CreateChoreModalScreen")}
          />
          {isChores() ? (
          <BigThemedButton
            isPressed={isEditPressed}
            typeOfIcon="pencil-outline"
            alternateTypeOfIcon="close-circle-outline"
            buttonText="Ändra"
            alternateButtonText="Avbryt"
            onPress={() => setIsPressed()}
          />
        ) : null}
        </View>
      ) : (
        <View />
      )}
    </View>
  );
};

export default ChoresScreen;

const localStyles = StyleSheet.create({
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
  bottomButtonRowOneButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
    backgroundColor: "#f0f0f0",
    height: 75,
  },
});
