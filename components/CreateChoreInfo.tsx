import { Formik } from "formik";
import React, { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button as NPbutton } from "react-native-paper";
import * as Yup from "yup";
import { Chore } from "../interfaces/chore";
import { addChoreAction, updateChoreAction } from "../store/chore/choreSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import Points from "./Points";
// import Repeatability from "./Repeatability";
import ThemedTextInput from "./ThemedTextInput";

interface Props {
  onClose: () => void;
  activeChore?: Chore;
}

type PostSchemaType = Record<keyof Chore, Yup.AnySchema>;

//Define Yup validation schema
const validationSchema = Yup.object().shape<PostSchemaType>({
  title: Yup.string().required("Fyll i en titel").min(2),
  description: Yup.string().required("Fyll i en beskrivning av syssla").min(2),
  points: Yup.number().required(),
  repeatability: Yup.number().required(),
  id: Yup.string(),
  householdId: Yup.string(),
});

const CreateChoreInfo: FC<Props> = ({ onClose, activeChore }) => {
  //Define states and dispatch
  const dispatch = useAppDispatch();
  const activeHouseholdState = useAppSelector(
    (state) => state.household.activeHouseholdId
  );

  //Define default values
  var initialValues: Chore;

  if (!activeChore) {
    initialValues = {
      title: "",
      description: "",
      points: 2,
      repeatability: 7,
      id: "0",
      householdId: activeHouseholdState,
    };
  } else
    initialValues = {
      title: activeChore.title,
      description: activeChore.description,
      points: activeChore.points,
      id: activeChore.id,
      repeatability: activeChore.repeatability,
      householdId: activeHouseholdState,
    };

  //Add or update when pressing save button
  const handleSubmit = (chore: Chore) => {
    if (activeChore) {
      dispatch(updateChoreAction(chore));
    } else {
      dispatch(addChoreAction(chore));
    }

    //Closes modal
    onClose();
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
        setFieldValue,
        values,
        touched,
        errors,
      }) => (
        <View style={styles.root}>
          <ThemedTextInput
            style={styles.input}
            placeholder="Titel"
            placeholderTextColor="#d3d3d3"
            onChangeText={handleChange<keyof Chore>("title")}
            onBlur={handleBlur<keyof Chore>("title")}
            value={values.title}
            helperText={touched.title && errors.title}
          />
          <ThemedTextInput
            style={styles.input}
            placeholderTextColor="#d3d3d3"
            placeholder="Beskrivning"
            numberOfLines={4}
            multiline={true}
            onChangeText={handleChange<keyof Chore>("description")}
            onBlur={handleBlur<keyof Chore>("description")}
            value={values.description}
            helperText={touched.description && errors.description}
          />
          <Repeatability
            initialValue={values.repeatability}
            getRepeatability={(repeatability) => {
              setFieldValue("repeatability", repeatability);
            }}
          /> */}
          <Points
            initialValue={values.points}
            onChange={(energy) => {
              setFieldValue("points", energy);
            }}
          />
          <View style={styles.buttonContainer}>
            <NPbutton
              labelStyle={{ fontSize: 25, color: "black" }}
              icon="plus-circle-outline"
              style={styles.NPbutton}
              uppercase={false}
              onPress={() => handleSubmit()}
            >
              <Text style={{ fontSize: 15 }}>Spara</Text>
            </NPbutton>
            <NPbutton
              labelStyle={{ fontSize: 25, color: "black" }}
              icon="close-circle-outline"
              style={styles.NPbutton}
              uppercase={false}
              onPress={() => onClose()}
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
});

//TODO

// höjd-diff på värde och "1 2 4 6 8"

// Saknas text "spara & stäng" på IOS

// siffran på värde-cardet är fyrkantig på IOS

// samma ställe - siffran centrering höjdled, nu för högt (IOS)

// justera transparensnivån vid sidan av "modalen"

// Justera modalens hög när man skriver i input. den går för högt
