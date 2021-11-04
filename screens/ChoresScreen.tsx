import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { LogBox, ScrollView, StyleSheet, View, Text } from "react-native";
import BigThemedButton from "../components/BigThemedButton";
import ChoreSurface from "../components/ChoreSurface";
import RenderUserInfo from "../components/RenderUserInfo";
import { RootStackParamList } from "../navigation/RootNavigator";
import { getChoresAction } from "../store/chore/choreSlice";
import { selectHouseholdById } from "../store/household/hoseholdSelector";
import {
  househouldUsersFromHousehold,
  isUserAdmin,
} from "../store/householdUser/householdUserSelectors";
import { useAppDispatch, useAppSelector } from "../store/store";

const ChoresScreen = ({ navigation }: NativeStackScreenProps<RootStackParamList>) => {
  LogBox.ignoreLogs(["timer"]);
  const dispatch = useAppDispatch();
  const activeHouseholdState = useAppSelector(
    (state) => state.household.activeHouseholdId
  );
  const user = useAppSelector((state) => state.user.user);
  const allHouseholdChores = useAppSelector((state) => state.chore.chores);
  const allHouseholdUsers = useAppSelector(househouldUsersFromHousehold(activeHouseholdState));
  const household = useAppSelector(selectHouseholdById(activeHouseholdState));
  const [isEditPressed, setIsEditPressed] = React.useState(false);

  const isChores = () => {
    if(allHouseholdChores.length) return true
    else return false
  }

  const isAdmin = isUserAdmin(activeHouseholdState, allHouseholdUsers);

  useEffect(() => {
    dispatch(getChoresAction(activeHouseholdState));
  }, [activeHouseholdState]);

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
            onPress={setIsPressed}
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
