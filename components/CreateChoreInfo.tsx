import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { View, StyleSheet, Alert, Text } from "react-native";
import {
  Button as NPbutton,
  Card,
  Paragraph,
  Title,
  TouchableRipple,
} from "react-native-paper";
import ThemedTextInput from "./ThemedTextInput";

import { users } from "../data/mockUserData";
import { lightGreen900 } from "react-native-paper/lib/typescript/styles/colors";
import { TabParamList } from "../navigation/ChoresStatisticsNavigator";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

interface ChoreTitle {
  title: string;
  description: string;
}
interface Props {
  onSaved: () => void;
}
// interface Props {
//   loginSucceded: () => void;
// }

const initialValues: ChoreTitle = { title: "", description: "" };

let defaultEnergyValue = 2;

type PostSchemaType = Record<keyof ChoreTitle, Yup.AnySchema>;

const validationSchema = Yup.object().shape<PostSchemaType>({
  title: Yup.string().required("Fyll i en titel").min(2),
  description: Yup.string().required("Fyll i en beskrivning av syssla").min(2),
});

const CreateChoreInfo = ({ onSaved }: Props) => {
  const [pressed, setPressed] = useState(true);
  const onPress = () => {
    pressed ? setPressed(false) : setPressed(true);
  };

  const values = [
    { value: 1, color: "#f2f2f2" },
    { value: 2, color: "#f1f0f0" },
    { value: 4, color: "#e9e7e7" },
    { value: 6, color: "#e1e1e1" },
    { value: 8, color: "#d9d9d9" },
  ];

  // const handleSubmit = (chore: ChoreTitle) => {
  //   console.log("Fält values", chore);
  // };

  const handleClick = (newValue: number) => {
    defaultEnergyValue = newValue;
    setPressed(true);
  };

  const handleSubmit = (chore: ChoreTitle) => {
    console.log("chore");
    console.log(chore);
    onSaved();
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
                  onPress={() => handleClick(value.value)}
                >
                  {value.value}
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
              <Card.Title title="Återkommer: " subtitle="Card Subtitle" />
            </Card>
          </View>
          <View>
            <Card style={[styles.card, styles.marginBottom]}>
              <TouchableRipple onPress={() => onPress()}>
                {pressed ? (
                  <View style={styles.cardRow}>
                    <Card.Title
                      style={styles.cardTitle}
                      title="Värde: "
                      subtitle="Hur energikrävande är sysslan?"
                    />

                    <Card.Actions style={styles.cardAction}>
                      <Text style={styles.energyValue}>
                        {defaultEnergyValue}
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
              icon="plus-circle-outline"
              mode="text"
              color="black"
              style={styles.NPbutton}
              onPress={() => handleSubmit()}
            >
              Spara
            </NPbutton>

            <NPbutton
              icon="close-circle-outline"
              mode="text"
              color="black"
              style={styles.NPbutton}
            >
              Stäng
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
  input: {
    marginTop: 0,
    //elevation: 4,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.8,
    // shadowRadius: 2,
    // elevation: 1,
    // borderBottomRightRadius:10,
    // borderTopRightRadius: 30,
    //borderColor: "transparent",
  },
  card: {
    flexDirection: "row",
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "white",
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 10,
    elevation: 4,
  },
  cardAction: {
    //backgroundColor: "pink",
    // alignContent: "space-between",
  },
  cardTitle: {
    //backgroundColor: "yellow",
    // height: 20,
    flex: 1,
    //borderTopLeftRadius: 10
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
    width: 35,
    height: 35,
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
    // backgroundColor: "#ffffff",
    backgroundColor: "white",
    justifyContent: "space-between",
    // width: 100,
    width: "100%",
    alignItems: "center",
    height: 60,
    // position: "absolute",
    bottom: 0,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
});

// import React from "react";
// import { Formik } from "formik";
// import * as Yup from "yup";
// import { View, StyleSheet, Alert } from "react-native";
// import { Button as NPbutton } from "react-native-paper";
// import ThemedTextInput from "./ThemedTextInput";

// import { users } from "../data/mockUserData";

// interface ChoreInfo {
//   title: string;
//   description: string;
// }

// // interface Props {
// //   loginSucceded: () => void;
// // }

// const initialValues: ChoreInfo = { title: "", description: "" };

// type PostSchemaType = Record<keyof ChoreInfo, Yup.AnySchema>;

// const validationSchema = Yup.object().shape<PostSchemaType>({
//   title: Yup.string().required("Fyll i en titel"),
//   description: Yup.string().required("fyll i en beskrivning"),
// });

// const CreateChoreInfo = () => {
//   const handleSubmit = (chore: ChoreInfo) => {
//     console.log("Fält values", chore);

//     // const findUser = users.find(
//     //   (registredUser) =>
//     //     registredUser.email === user.title.toLowerCase() &&
//     //     registredUser.password === user.description
//     // );
//     // if (findUser) {
//     //   loginSucceded();
//     // } else Alert.alert("Oooops!", "Felaktigt användarnamn eller lösenord");
//   };

//   return (
//     <Formik
//       initialValues={initialValues}
//       validationSchema={validationSchema}
//       onSubmit={handleSubmit}
//     >
//       {({
//         handleChange,
//         handleBlur,
//         handleSubmit,
//         values,
//         touched,
//         errors,
//       }) => (
//         <View style={styles.root}>
//           <View>
//             <ThemedTextInput
//               style={styles.input}
//               label="Titel"
//               onChangeText={handleChange<keyof ChoreInfo>("title")}
//               onBlur={handleBlur<keyof ChoreInfo>("title")}
//               value={values.title}
//               helperText={touched.title && errors.title}
//             />
//             <ThemedTextInput
//               style={styles.input}
//               // secureTextEntry={true}
//               label="Beskrivning"
//               onChangeText={handleChange<keyof ChoreInfo>("description")}
//               onBlur={handleBlur<keyof ChoreInfo>("description")}
//               value={values.description}
//               helperText={touched.description && errors.description}
//             />
//           <NPbutton
//             //ADD DISABLE IF FIELD NOT FILLED
//             disabled={!values.description}
//             icon="account-key-outline"
//             mode="contained"
//             style={styles.NPbutton}
//             onPress={() => handleSubmit()}
//             >
//             Logga in
//           </NPbutton>
//             </View>
//         </View>
//       )}
//     </Formik>
//   );
// };

// export default CreateChoreInfo;

// const styles = StyleSheet.create({
//   root: {
//     flex: 1,
//     justifyContent: "space-between",
//   },
//   NPbutton: {
//     width: 150,
//     borderRadius: 100,
//     padding: 10,
//     alignSelf: "center",
//     marginVertical: 10,
//   },
//   input: {
//     elevation: 4,
//     backgroundColor: "red"
//   },
// });

// import { Formik } from "formik";
// import { View, StyleSheet, Alert, Button } from "react-native";
// import ThemedTextInput from "./ThemedTextInput";

// interface Chore {
//     title: string;
//     description: string;
// }

// const initialValues: Chore = { title: "", description: ""};

// const CreateChoreInfo = () => {
//   const handleSubmit = (chore: Chore) => {
//     console.log(chore)
//   }

//   return (
//     <Formik
//       initialVaules={initialValues}
//       onSubmit={handleSubmit}
//       >
//         {({
//           errors,
//           values,
//           handleSubmit,
//           //  handleChange,
//           //  handleBlur,
//           //  touched
//         }) => (
//           <View>
//             <ThemedTextInput
//               label="Description"
//               value={values.}
//               // helperText={errors.description}

//               // onChangeText={handleChange<keyof User>("email")}
//               // onBlur={handleBlur<keyof User>("email")}
//               // helperText={touched.email && errors.email}
//             />

//           </View>
//         )}
//     </Formik>
//   );

// }

// export default CreateChoreInfo;

// import "react-app-polyfill/ie11";
// import * as React from "react";
// import { Formik, Field, Form, FormikHelpers } from "formik";
// import ThemedTextInput from "./ThemedTextInput";
// import { View, StyleSheet, Alert } from "react-native";

// interface Values {
//   title: string;
//   description: string;
// }

// const initialValues: Values = { title: "", description: ""}

// const CreateChoreInfo = () => {
//   return (
//     <Formik
//       initialValues={initialValues}
//       onSubmit={(values: Values, { setSubmitting }: FormikHelpers<Values>) => {
//         setTimeout(() => {
//           alert(JSON.stringify(values, null, 2));
//           setSubmitting(false);
//         }, 500);
//       }}
//     >

//       <Form>
//         <label htmlFor="title">Title</label>
//         <Field id="firstName" name="firstName" placeholder="Title" />

//         <label htmlFor="lastName">Last Name</label>
//         <Field id="lastName" name="lastName" placeholder="Doe" />

//         <button type="submit">Submit</button>
//       </Form>
//     </Formik>
//   );
// };

// export default CreateChoreInfo;

// const styles = StyleSheet.create({
//   input: {

//   },
// });
