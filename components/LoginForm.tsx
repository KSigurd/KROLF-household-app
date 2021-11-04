import React, { FC } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { View, StyleSheet } from "react-native";
import { Button as NPbutton } from "react-native-paper";
import ThemedTextInput from "./ThemedTextInput";
import { User } from "../interfaces/user";
import { useAppSelector } from "../store/store";
import BigThemedButton from "./BigThemedButton";

interface Props {
  onSubmit: (user: User) => void;
}

type PostSchemaType = Record<keyof User, Yup.AnySchema>;

const validationSchema = Yup.object().shape<PostSchemaType>({
  id: Yup.string(),
  email: Yup.string()
    .email("Mejladressen måste innehålla @ och .com eller .se")
    .required("Fyll i din mejladress"),
  password: Yup.string().required("Du måste ange ditt lösenord").min(1),
});

const LoginForm: FC<Props> = ({ onSubmit }: Props) => {
  const userState = useAppSelector((state) => state.user);
  const initialValues = userState.user;

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
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
              value={values.email.trim()}
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
          <View style={styles.NPButtonContainer}>
          <BigThemedButton
            typeOfIcon="account-key-outline"
            buttonText="Logga in"
            onPress={() => handleSubmit()}
          />
          </View>
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
  NPButtonContainer: {
    alignItems: "center"
  },
});
