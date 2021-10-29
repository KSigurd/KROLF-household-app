import { Formik } from "formik";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button as NPbutton } from "react-native-paper";
import * as Yup from "yup";
import { chores } from "../data/mockChoresData";
import { Chore } from "../interfaces/chore";
import ThemedTextInput from "./ThemedTextInput";

interface Props {
  onClosed: () => void;
}

//DEFAULT VALUES
const initialValues: Chore = {
  title: "",
  description: "",
  points: 2,
  repeatability: 7,
  id: "0",
  householdId: "0",
};

type PostSchemaType = Record<keyof Chore, Yup.AnySchema>;

const validationSchema = Yup.object().shape<PostSchemaType>({
  title: Yup.string().required("Fyll i en titel").min(2),
  description: Yup.string().required("Fyll i en beskrivning av syssla").min(2),
  points: Yup.number().required(),
  repeatability: Yup.number().required(),
  id: Yup.string(),
  householdId: Yup.string(),
});

const CreateChoreInfo = ({ onClosed }: Props) => {
  const handleSubmit = (chore: Chore) => {
    //ADD CHANGES TO FIREBASE
    chores.push({ ...chore, id: "50" });
    console.log(chore);

    //CLOSES MODAL
    onClosed();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        touched,
        errors,
      }) => (
        <View style={styles.root}>
          <ThemedTextInput
            style={styles.input}
            label="Beskrivning"
            editable={false}
            // placeholder="Titel"
            numberOfLines={5}
            multiline={true}
            placeholderTextColor="#d3d3d3"
            onChangeText={handleChange<keyof Chore>("title")}
            onBlur={handleBlur<keyof Chore>("title")}
            value={values.title}
            helperText={touched.title && errors.title}
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
