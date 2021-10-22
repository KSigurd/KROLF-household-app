import React from "react";
import { Formik, yupToFormErrors } from "formik";
import * as Yup from "yup";
import { View, StyleSheet, Alert } from "react-native";
import { Button as NPbutton } from "react-native-paper";
import ThemedTextInput from "./ThemedTextInput";
import { users } from "../data/mockUserData";
import { User } from "../interfaces/user";

const initialValues: User = { email: "", password: "", id: 0 };

interface Props {
  onCreateAccountSucceded: () => void;
}

type PostSchemaType = Record<keyof User, Yup.AnySchema>;

const validationSchema = Yup.object().shape<PostSchemaType>({
  id: Yup.number(),
  email: Yup.string()
    .email("Mejladressen måste innehålla @ och .com eller .se")
    .required("Fyll i en giltlig mejladress"),
  //ADD VALIDATION
  password: Yup.string().required("Du måste ange ett lösenord"),
});

const CreateUserForm = ({ onCreateAccountSucceded }: Props) => {
  const handleSubmit = (newUser: User) => {
    //MOVE FUNCTIONALITY TO API
    const existingUser = users.find(
      (registredUser) => registredUser.email === newUser.email.toLowerCase()
    );

    if (!existingUser) {
      //TODO: FÅ NOTIS SKAPANDE AV ANVÄNDARE LYCKADES

      const index = users.slice(-1).pop();
      if (index) {
        const userId = index.id + 1;
        newUser = { ...newUser, id: userId };
        users.push(newUser);
        onCreateAccountSucceded();
      }
    } else
      Alert.alert(
        "Oooops!",
        "Användaren finns redan. Gå tillbaka till inloggningsidan för att logga in!"
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
          <View>
            <ThemedTextInput
              style={styles.input}
              label="Användarnamn"
              onChangeText={handleChange<keyof User>("email")}
              onBlur={handleBlur<keyof User>("email")}
              value={values.email}
              helperText={touched.email && errors.email}
            />
            <ThemedTextInput
              style={styles.input}
              secureTextEntry={true}
              label="Lösenord"
              onChangeText={handleChange<keyof User>("password")}
              onBlur={handleBlur<keyof User>("password")}
              value={values.password}
              helperText={touched.password && errors.password}
            />
          </View>
          <NPbutton
            //TODO: CHECK THIS
            disabled={!values.password === true || !values.email === true}
            icon="plus-circle-outline"
            mode="contained"
            style={styles.NPbutton}
            onPress={() => handleSubmit()}
          >
            Bekräfta
          </NPbutton>
        </View>
      )}
    </Formik>
  );
};

export default CreateUserForm;

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
  },
  input: {
    elevation: 4,
  },
});
