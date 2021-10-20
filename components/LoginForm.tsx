import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { View, StyleSheet, Text, Alert } from "react-native";
import { Button as NPbutton, TextInput } from "react-native-paper";
import UserDetailsInput from "./userDetailsInput";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigator";
import { users } from "../data/mockUserData";

interface User {
  email: string;
  password: string;
}
const initialValues: User = { email: "", password: "" };

type PostSchemaType = Record<keyof User, Yup.AnySchema>;

const validationSchema = Yup.object().shape<PostSchemaType>({
  email: Yup.string()
    .email("Invalid email format")
    .required("Fyll i din mejladress"),
  password: Yup.string().required("Du måste skriva in ditt lösenord"),
});

// type Props = NativeStackScreenProps<RootStackParamList, "CreateHousehold">;

interface Props {
  loginSucceded: () => void;
}

const LoginForm = ({ loginSucceded }: Props) => {
  const handleSubmit = (user: User) => {
    console.log("Fält values", user);

    const findUser = users.find(
      (registredUser) =>
        registredUser.email === user.email.toLowerCase() &&
        registredUser.password === user.password
    );
    if (findUser) {
      loginSucceded();
    } else Alert.alert("Oooops!", "Felaktigt användarnamn eller lösenord");
  };
  // const noAccountText = () => {
  //   return (
  //     <View style={styles.noAccountContainer}>
  //       <Text style={styles.noAccountText}>Inget konto? Registrera dig </Text>
  //       <Text
  //         style={styles.createAccountText}
  //         onPress={() => navigation.navigate("CreateAccount")}
  //       >
  //         här
  //       </Text>
  //     </View>
  //   );
  // };

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
        <View>
          <UserDetailsInput
            style={styles.input}
            //mode="outlined"
            //theme={{ roundness: 10 }}
            placeholder="email"
            label="Email"
            onChangeText={handleChange<keyof User>("email")}
            onBlur={handleBlur<keyof User>("email")}
            value={values.email}
            helperText={touched.email && errors.email}
          />
          <UserDetailsInput
            //      mode="outlined"
            //      theme={{ roundness: 10 }}
            style={styles.input}
            //mode="outlined"
            //theme={{ roundness: 10 }}
            placeholder="password"
            label="Password"
            onChangeText={handleChange<keyof User>("password")}
            onBlur={handleBlur<keyof User>("password")}
            value={values.password}
            helperText={touched.password && errors.password}
          />
          <NPbutton
            //ADD DISABLE IF FIELD NOT FILLED
            //CHANGE ICON?
            icon="account-key-outline"
            mode="contained"
            style={styles.NPbutton}
            onPress={() => handleSubmit()}
          >
            Logga in
          </NPbutton>
        </View>
      )}
    </Formik>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    marginHorizontal: 10,
    marginVertical: 25,
    justifyContent: "space-between",
  },
  NPbutton: {
    width: 150,
    borderRadius: 100,
    padding: 10,
    alignSelf: "center",
    marginVertical: 70,
  },
  input: {
    elevation: 4,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 12,
    marginBottom: 5,
  },
  noAccountContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  noAccountText: {
    fontWeight: "bold",
    //alignSelf: "center",
    marginVertical: 30,
  },
  createAccountText: {
    fontWeight: "bold",
    alignSelf: "center",
    color: "#B8B8B8",
  },
});
