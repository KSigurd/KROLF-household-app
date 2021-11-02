import React, { useEffect } from "react";
import { LogBox, ScrollView, StyleSheet, View, Text } from "react-native";
import BigThemedButton from "../components/BigThemedButton";
import ChoreSurface from "../components/ChoreSurface";
import { getChoresAction } from "../store/chore/choreSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import { Button, Surface, TouchableRipple } from "react-native-paper";
import ChoreDeleteButton from "../components/ChoreDeleteButton";
import { number } from "yup/lib/locale";
import ChoreDescription from "../components/ChoreDescription";
import { Chore } from "../interfaces/chore";
import { RootStackParamList, StackScreenProps } from "../navigation/RootNavigator";
import { getChoresAction, removeChoreAction } from "../store/chore/choreSlice";
import { getCompletedChoresAction } from "../store/completedChore/completedChoreSlice";
import { selectHouseholdById } from "../store/household/hoseholdSelector";
import { useAppDispatch, useAppSelector } from "../store/store";
import { styles } from "../styles/styles";
import ChoreDescriptionModalScreen from "./ChoreDescriptionModalScreen";
import RenderUserInfo from "../components/RenderUserInfo";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
  
const ChoresScreen = ({ navigation }: any) => {
  LogBox.ignoreLogs(["timer"]);
    const dispatch = useAppDispatch();
    const activeHouseholdState = useAppSelector(
        (state) => state.household.activeHouseholdId
    );
    const user = useAppSelector((state) => state.user.user)
    const allHouseholdChores = useAppSelector((state) => state.chore.chores);
    const household = useAppSelector(selectHouseholdById(activeHouseholdState));
    const [isEditPressed, setIsEditPressed] = React.useState(false);

    useEffect(() => {
      dispatch(getChoresAction(activeHouseholdState));
    }, [activeHouseholdState])

  const setIsPressed = () => {
    if (isEditPressed) setIsEditPressed(false);
    else setIsEditPressed(true);
  };

  return (
    <View style={{ flex: 1, marginVertical: 10, marginHorizontal: 10 }}>
      <RenderUserInfo onClick={ () => {navigation.navigate("EditHouseholdUser")}}/>
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
      <View style={localStyles.bottomButtonRow}>
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

const localStyles = StyleSheet.create({
  bottomButtonRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    zIndex: 1,
    backgroundColor: "#f0f0f0",
    height: 75,
  },
});