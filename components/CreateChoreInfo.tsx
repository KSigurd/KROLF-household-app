import { Formik } from "formik";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Button as NPbutton, Card, TouchableRipple } from "react-native-paper";
import * as Yup from "yup";
import ThemedTextInput from "./ThemedTextInput";

interface ChoreTitle {
  title: string;
  description: string;
  points: number;
  reoccurenceNumber: number;
}

interface Props {
  onClosed: () => void;
}

//DEFAULT VALUES
const initialValues: ChoreTitle = {
  title: "",
  description: "",
  points: 2,
  reoccurenceNumber: 7,
};

type PostSchemaType = Record<keyof ChoreTitle, Yup.AnySchema>;

const validationSchema = Yup.object().shape<PostSchemaType>({
  title: Yup.string().required("Fyll i en titel").min(2),
  description: Yup.string().required("Fyll i en beskrivning av syssla").min(2),
  points: Yup.number().required(),
  reoccurenceNumber: Yup.number().required(),
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

  const handleSubmit = (chore: ChoreTitle) => {
    //ADD CHANGES TO FIREBASE
    console.log("chore");
    console.log(chore);

    //CLOSES MODAL
    onClosed();
  };

  const displayReoccurenceValues = () => {
    let element: number[] = [];

    for (let i = 1; i < 31; i++) {
      element.push(i);
    }

    return (
      <View style={[{ flexDirection: "row", flex: 1 }]}>
        {element.map((value, index) => {
          return (
            <Text
              key={index}
              style={[
                styles.reoccurenceNumbers,
                value === 30 ? { marginRight: 10 } : { marginRight: 0 },
              ]}
              onPress={() => {
                (initialValues.reoccurenceNumber = value),
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
      <View style={styles.cardRow}>
        <Card.Actions style={styles.cardAction}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignContent: "flex-end",
            }}
          >
            {values.map((value, index) => {
              return (
                <Text
                  key={index}
                  style={[
                    styles.energyValues,
                    { backgroundColor: value.color },
                  ]}
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
      </View>
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
            onChangeText={handleChange<keyof ChoreTitle>("title")}
            onBlur={handleBlur<keyof ChoreTitle>("title")}
            value={values.title}
            helperText={touched.title && errors.title}
          />
          <ThemedTextInput
            style={styles.input}
            placeholderTextColor="#d3d3d3"
            placeholder="Beskrivning"
            numberOfLines={4}
            multiline={true}
            onChangeText={handleChange<keyof ChoreTitle>("description")}
            onBlur={handleBlur<keyof ChoreTitle>("description")}
            value={values.description}
            helperText={touched.description && errors.description}
          />
          <View>
            <Card style={styles.card}>
              <TouchableRipple
                rippleColor="rgba(0,0,0,0)"
                onPress={() =>
                  isReoccurencePressed
                    ? setIsReoccurencePressed(false)
                    : setIsReoccurencePressed(true)
                }
              >
                {isReoccurencePressed ? (
                  <View style={styles.cardRow}>
                    <Card.Title style={styles.cardTitle} title="Återkommer: " />
                    <Card.Actions style={styles.cardAction}>
                      <Text style={{ fontSize: 16 }}>var </Text>
                      <Text style={styles.reoccurenceValue}>
                        {initialValues.reoccurenceNumber}
                        {/* {initialValues.points} */}
                      </Text>
                      <Text style={{ fontSize: 16 }}> dag</Text>
                    </Card.Actions>
                  </View>
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
            </Card>
          </View>
          <View>
            <Card style={[styles.card, styles.marginBottom]}>
              <TouchableRipple
                rippleColor="rgba(0,0,0,0)"
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
                  displayEnergyValues()
                )}
              </TouchableRipple>
            </Card>
          </View>
          <View style={styles.buttonContainer}>
            <NPbutton
              labelStyle={{ fontSize: 25 }}
              icon="plus-circle-outline"
              mode="text"
              color="black"
              style={styles.NPbutton}
              uppercase={false}
              onPress={() => handleSubmit()}
            >
              <Text style={{ fontSize: 15 }}>Spara</Text>
            </NPbutton>
            <NPbutton
              labelStyle={{ fontSize: 25 }}
              icon="close-circle-outline"
              mode="text"
              color="black"
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
    justifyContent: "space-between",
  },
  NPbutton: {
    width: 150,
    borderRadius: 100,
    padding: 10,
    alignSelf: "center",
    marginVertical: 10,
  },
  // NPbutton: {
  //   width: 150,
  //   borderRadius: 100,
  //   padding: 10,
  // },
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
    // backgroundColor: "#cd5d6f",
    color: "black",
    // borderRadius: 100,
    fontSize: 18,
    // width: 20,
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
    flexDirection: "row",
    backgroundColor: "white",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
    height: 60,
    bottom: 0,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
});
