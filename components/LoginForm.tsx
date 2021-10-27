import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { View, StyleSheet, Alert } from "react-native";
import { Button as NPbutton } from "react-native-paper";
import ThemedTextInput from "./ThemedTextInput";

import { users } from "../data/mockUserData";

interface User {
  email: string;
  password: string;
}

interface Props {
  loginSucceded: () => void;
}

const initialValues: User = { email: "", password: "" };

type PostSchemaType = Record<keyof User, Yup.AnySchema>;

const validationSchema = Yup.object().shape<PostSchemaType>({
  email: Yup.string()
    .email("Mejladressen måste innehålla @ och .com eller .se")
    .required("Fyll i din mejladress"),
  password: Yup.string().required("Du måste ange ditt lösenord"),
});

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
          <View>
            <ThemedTextInput
              label="Användarnamn"
              onChangeText={handleChange<keyof User>("email")}
              onBlur={handleBlur<keyof User>("email")}
              value={values.email}
              helperText={touched.email && errors.email}
            />
            <ThemedTextInput
              secureTextEntry={true}
              label="Lösenord"
              onChangeText={handleChange<keyof User>("password")}
              onBlur={handleBlur<keyof User>("password")}
              value={values.password}
              helperText={touched.password && errors.password}
            />
          </View>
          <NPbutton
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
    justifyContent: "space-between",
  },
  NPbutton: {
    width: 150,
    borderRadius: 100,
    padding: 10,
    alignSelf: "center",
    marginVertical: 10,
  }
});
