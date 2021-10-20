import React, { FC } from "react";
import { Text, StyleSheet } from "react-native";

function CreatCode() {
  var result = "";
  const characters = "01234567829";
  const charactersLength = characters.length;
  for (var i = 0; i < 6; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const CreateHouseholdCode: FC = () => {
  return <Text style={styles.code}>{CreatCode()}</Text>;
};

export default CreateHouseholdCode;

const styles = StyleSheet.create({
  code: {
    textAlign: "center",
    fontSize: 16
  },
});

// TODO: Make so "result" can be used when joining a Household and so that Household owner can see it in Household edit.