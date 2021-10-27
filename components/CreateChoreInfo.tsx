import { Formik } from "formik";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import {
  Button as NPbutton,
  Card,
  Surface,
  Title,
  TouchableRipple,
} from "react-native-paper";
import * as Yup from "yup";
import { chores } from "../data/mockChoresData";
import { Chore } from "../interfaces/chore";
import { styles as style } from "../styles/styles";
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
  id: 0,
  householdId: 0,
};

type PostSchemaType = Record<keyof Chore, Yup.AnySchema>;

const validationSchema = Yup.object().shape<PostSchemaType>({
  title: Yup.string().required("Fyll i en titel").min(2),
  description: Yup.string().required("Fyll i en beskrivning av syssla").min(2),
  points: Yup.number().required(),
  repeatability: Yup.number().required(),
  id: Yup.number(),
  householdId: Yup.number(),
});

const CreateChoreInfo = ({ onClosed }: Props) => {
  const [isEnergyValuePressed, setIsEnergyvaluePressed] = useState(true);
  const [isReoccurencePressed, setIsReoccurencePressed] = useState(true);

  const values = [
    { points: 1, color: "#f2f2f2" },
    { points: 2, color: "#f1f0f0" },
    { points: 4, color: "#e9e7e7" },
    { points: 6, color: "#e1e1e1" },
    { points: 8, color: "#d9d9d9" },
  ];

  const handleSubmit = (chore: Chore) => {
    //ADD CHANGES TO FIREBASE
    chores.push({ ...chore, id: 50 });
    console.log(chore);

    //CLOSES MODAL
    onClosed();
  };

  const displayReoccurenceValues = () => {
    let repeatabilityNumbers: number[] = [];

    for (let i = 1; i < 31; i++) {
      repeatabilityNumbers.push(i);
    }

    return (
      <View style={[{ flexDirection: "row", flex: 1 }]}>
        {repeatabilityNumbers.map((value, index) => {
          return (
            <Text
              key={index}
              style={[
                styles.reoccurenceNumbers,
                value === 30 ? { marginRight: 10 } : { marginRight: 0 },
              ]}
              onPress={() => {
                (initialValues.repeatability = value),
                  setIsReoccurencePressed(true);
              }}
            >
              {value}
            </Text>
          );
        })}
      </View>
    );
  };

  const displayEnergyValues = () => {
    return (
      <Card.Actions style={styles.cardAction}>
        <View
          style={{
            width: "100%",
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          {values.map((value, index) => {
            return (
              <Text
                key={index}
                style={[styles.energyValues, { backgroundColor: value.color }]}
                onPress={() => {
                  (initialValues.points = value.points),
                    setIsEnergyvaluePressed(true);
                }}
              >
                {value.points}
              </Text>
            );
          })}
        </View>
      </Card.Actions>
    );
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

          <Surface style={[style.fullscreenButton, style.buttonOutlined]}>
            <TouchableRipple
              borderless={true}
              style={style.fillParent}
              onPress={() =>
                isReoccurencePressed
                  ? setIsReoccurencePressed(false)
                  : setIsReoccurencePressed(true)
              }
            >
              {isReoccurencePressed ? (
                <Surface style={style.buttonInnerContainer}>
                  <Title style={[style.choresButtonTitle, style.buttonText]}>
                    Återkommer:
                  </Title>
                  <Text style={{ fontSize: 16 }}>var </Text>
                  <Text
                    style={[
                      style.buttonText,
                      style.choresButtonAdditions,
                      styles.reoccurenceValue,
                    ]}
                  >
                    {initialValues.repeatability}
                  </Text>
                  <Text style={{ fontSize: 16 }}> dag</Text>
                </Surface>
              ) : (
                <ScrollView
                  horizontal={true}
                  style={{
                    flexDirection: "row",
                  }}
                >
                  {displayReoccurenceValues()}
                </ScrollView>
              )}
            </TouchableRipple>
          </Surface>

          <View>
            <Surface style={[style.fullscreenButton, style.buttonOutlined]}>
              <TouchableRipple
                borderless={true}
                style={style.fillParent}
                onPress={() =>
                  isEnergyValuePressed
                    ? setIsEnergyvaluePressed(false)
                    : setIsEnergyvaluePressed(true)
                }
              >
                {isEnergyValuePressed ? (
                  <View style={styles.cardRow}>
                    <Card.Title
                      style={styles.cardTitle}
                      title="Värde: "
                      subtitle="Hur energikrävande är sysslan?"
                    />
                    <Card.Actions style={styles.cardAction}>
                      <Text style={styles.energyValue}>
                        {initialValues.points}
                      </Text>
                    </Card.Actions>
                  </View>
                ) : (
                  <View
                    style={{
                      flexDirection: "row",
                    }}
                  >
                    {displayEnergyValues()}
                  </View>
                )}
              </TouchableRipple>
            </Surface>
          </View>
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
  card: {
    flexDirection: "row",
    backgroundColor: "white",
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 10,
    elevation: 4,
  },
  cardAction: {},
  cardTitle: {
    flex: 1,
  },
  cardRow: {
    flexDirection: "row",
    alignContent: "space-between",
  },
  energyValue: {
    backgroundColor: "#f2f2f2",
    color: "black",
    borderRadius: 100,
    fontSize: 18,
    // DESSA TVÅ UNDER HÄR VILL JAG ÄNDRA TILL 30... FILIP
    width: 35,
    height: 35,
    textAlign: "center",
    textAlignVertical: "center",
  },
  reoccurenceValue: {
    backgroundColor: "#cd5d6f",
    color: "white",
    borderRadius: 100,
    fontSize: 18,
    width: 30,
    height: 30,
    textAlign: "center",
    textAlignVertical: "center",
  },
  reoccurenceNumbers: {
    color: "black",
    fontSize: 18,
    marginLeft: 10,
    height: 70,
    textAlign: "center",
    textAlignVertical: "center",
  },
  energyValues: {
    color: "black",
    borderRadius: 100,
    fontSize: 18,
    width: 50,
    height: 50,
    textAlign: "center",
    textAlignVertical: "center",
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

//BRYT UT FUNKTIONALITET

// Elevation - titel & beskrivning

// höjd-diff på värde och "1 2 4 6 8"

// Saknas text "spara & stäng" på IOS

// fade höger sida inne i scrollview i reoccurence

// siffran på värde-cardet är fyrkantig på IOS

// samma ställe - siffran centrering höjdled, nu för högt (IOS)

// justera transparensnivån vid sidan av "modalen"

// Justera modalens hög när man skriver i input. den går för högt
