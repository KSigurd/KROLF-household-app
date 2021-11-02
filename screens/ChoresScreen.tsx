import React, { useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import BigThemedButton from "../components/BigThemedButton";
import ChoreSurface from "../components/ChoreSurface";
import { getChoresAction } from "../store/chore/choreSlice";
import { useAppDispatch, useAppSelector } from "../store/store";

const ChoresScreen = ({ navigation }: any) => {
  const dispatch = useAppDispatch();
  const activeHouseholdState = useAppSelector(
    (state) => state.household.activeHouseholdId
  );
  const allHouseholdChores = useAppSelector((state) => state.chore.chores);
  const [isEditPressed, setIsEditPressed] = React.useState(false);
  
  useEffect(() => {
    dispatch(getChoresAction(activeHouseholdState));
  }, [activeHouseholdState]);

  const setIsPressed = () => {
    if (isEditPressed) setIsEditPressed(false);
    else setIsEditPressed(true);
  };

  return (
    <View style={{ flex: 1, marginVertical: 10, marginHorizontal: 10 }}>
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