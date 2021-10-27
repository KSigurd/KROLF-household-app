import { Button as NPbutton } from "react-native-paper";
import React, { FC } from "react";
import { StyleSheet } from "react-native";

interface Props {
  onAddHousehold: () => void;
}

const AddHouseholdButton = ({ onAddHousehold }: Props) => {
  return (
    <NPbutton
      icon="plus-circle-outline"
      mode="contained"
      style={styles.NPbutton}
      onPress={() => onAddHousehold()}
    >
      Lägg till
    </NPbutton>
  );
};

export default AddHouseholdButton;

const styles = StyleSheet.create({
    NPbutton: {
      width: 150,
      borderRadius: 100,
      padding: 10,
    },
  });
