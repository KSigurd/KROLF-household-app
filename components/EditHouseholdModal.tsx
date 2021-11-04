import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Button, Surface, Text } from "react-native-paper";
import { Household } from "../interfaces/households";
import { updateHouseholdAction } from "../store/household/householdSlice";
import { useAppDispatch } from "../store/store";
import ThemedTextInput from "./ThemedTextInput";

interface Props {
  household: Household;
  onSubmit: (householdToEdit?: Household) => void;
}

const EditHouseholdModal = ({ household, onSubmit }: Props) => {
  const [householdToEdit, setHouseholdToEdit] = useState(household);
  const dispatch = useAppDispatch();

  const saveHousehold =  () => {
    console.log("kommer vi ens in?????")
   
      console.log({...householdToEdit}, "household");
       dispatch(updateHouseholdAction(householdToEdit)).then(() => {
        onSubmit();
      });
  }

    console.log(householdToEdit, "hus att redigera");

    return (
      <Surface style={styles.outerContainer}>
        <Surface style={styles.topCointainer}>
          <Text style={styles.titleText}>Redigera hushållet</Text>
        </Surface>
        <Surface style={styles.centerContainer}>
          <ThemedTextInput
            onChangeText={(name) => {
              setHouseholdToEdit({
                name: name,
                inviteCode: householdToEdit.inviteCode,
                id: householdToEdit.id,
              });
            }}
            value={householdToEdit.name}
            label="Hushållets namn"
          ></ThemedTextInput>
        </Surface>
        <Surface style={styles.bottomCointainer}>
          <Button
            labelStyle={{ fontSize: 25, color: "black" }}
            icon="check-circle-outline"
            style={styles.confirmButton}
            uppercase={false}
            onPress={() => saveHousehold()}
          >
            <Text style={{ fontSize: 15 }}>Spara</Text>
          </Button>
          <Button
            labelStyle={{ fontSize: 25, color: "black" }}
            icon="close-circle-outline"
            style={styles.confirmButton}
            uppercase={false}
            onPress={() => onSubmit()}
          >
            <Text style={{ fontSize: 15 }}>Stäng</Text>
          </Button>
        </Surface>
      </Surface>
    );
  };

export default EditHouseholdModal;

const styles = StyleSheet.create({
  topCointainer: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    height: 60,
    backgroundColor: "white",
    paddingTop: 15,
  },
  bottomCointainer: {
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    height: 60,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "center",
  },
  centerContainer: {
    backgroundColor: "#f2f2f2",
    padding: 10,
  },
  titleText: {
    fontSize: 20,
    textAlign: "center",
  },
  outerContainer: {
    backgroundColor: "transparent",
    marginHorizontal: 8,
    marginVertical: 36,
    flex: 1,
    justifyContent: "center",
    height: "100%",
  },
  confirmButton: {
    flex: 1,
    height: "100%",
    borderRadius: 25,
    justifyContent: "center",
  },
});
