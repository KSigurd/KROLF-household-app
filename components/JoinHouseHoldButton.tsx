import { Button as NPbutton } from "react-native-paper";
import React, { FC } from "react";
import { StyleSheet } from "react-native";

const JoinHouseholdButton: FC = () => {
  return (
    <NPbutton
          icon="account-plus-outline"
          mode="contained"
          style={styles.NPbutton}
          onPress={() => console.log("Pressed")}
        >
          Gå med
        </NPbutton>
  );
};

export default JoinHouseholdButton;

const styles = StyleSheet.create({
    NPbutton: {
      width: 150,
      borderRadius: 100,
      padding: 10,
    },
  });
