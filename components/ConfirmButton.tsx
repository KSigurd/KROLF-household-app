import { Button as NPbutton, Text } from "react-native-paper";
import React, { FC } from "react";
import { StyleSheet } from "react-native";

interface Props {
  onConfirm: () => void;
}

//Reusable component for all main (big) confirm buttons in app
const ConfirmButton: FC<Props> = ({ onConfirm }) => {
  return (
    <NPbutton
      icon="plus-circle-outline"
      labelStyle={{ fontSize: 25 }}
      mode="contained"
      uppercase={false}
      style={styles.NPbutton}
      onPress={() => onConfirm()}
      color="#fff"
    >
      <Text style={styles.confirmText}>Bekräfta</Text>
    </NPbutton>
  );
};

export default ConfirmButton;

const styles = StyleSheet.create({
  NPbutton: {
    width: 150,
    borderRadius: 100,
    padding: 10,
    alignSelf: "center",
    marginVertical: 10,
  },
  confirmText: {
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 0.1,
    color: "#000",
  },
});
