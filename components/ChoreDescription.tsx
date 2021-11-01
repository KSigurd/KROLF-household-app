import { Formik } from "formik";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button as NPbutton } from "react-native-paper";
import { Chore } from "../interfaces/chore";
import ThemedTextInput from "./ThemedTextInput";

interface Props {
  onClosed: () => void;
  chore: Chore;
}

const CreateChoreInfo = ({ onClosed, chore }: Props) => {
  const handleSubmit = () => {
    //TODO: MARKERA SYSSLA SOM SLUTFÖRD
    onClosed();
  };

  return (
    <Formik initialValues={chore} onSubmit={handleSubmit}>
      {({ handleSubmit }) => (
        <View style={styles.root}>
          <ThemedTextInput
            style={styles.input}
            label="Beskrivning"
            editable={true}
            numberOfLines={5}
            multiline={true}
            placeholderTextColor="#d3d3d3"
            value={chore.description}
          />
          <View style={styles.expander} />
          <View style={styles.buttonContainer}>
            <NPbutton
              labelStyle={{ fontSize: 25, color: "black" }}
              icon="check-circle-outline"
              style={styles.NPbutton}
              uppercase={false}
              onPress={() => handleSubmit()}
            >
              <Text style={{ fontSize: 15 }}>Utförd</Text>
            </NPbutton>
            <NPbutton
              labelStyle={{ fontSize: 25, color: "black" }}
              icon="close-circle-outline"
              style={styles.NPbutton}
              uppercase={false}
              onPress={() => onClosed()}
            >
              <Text style={{ fontSize: 15 }}>Stäng</Text>
            </NPbutton>
          </View>
        </View>
      )}
    </Formik>
  );
};

export default CreateChoreInfo;

const styles = StyleSheet.create({
  root: {
    marginTop: 8,
  },
  NPbutton: {
    flex: 1,
    height: "100%",
    borderRadius: 25,
    justifyContent: "center",
  },
  input: {
    marginTop: 0,
  },
  marginBottom: {
    marginBottom: 10,
  },
  buttonContainer: {
    overflow: "hidden",
    flexDirection: "row",
    backgroundColor: "white",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
    height: 60,
    bottom: 0,
    marginTop: 8,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  // Expanderar och pressar ner knapparna till botten
  expander: {
    flex: 1,
  },
});
