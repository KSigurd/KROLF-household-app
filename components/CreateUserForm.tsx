import { Formik } from "formik";
import React, { FC } from "react";
import { Alert, StyleSheet, View } from "react-native";
import * as Yup from "yup";
import { User } from "../interfaces/user";
import { useAppDispatch, useAppSelector } from "../store/store";
import { addUserAction } from "../store/user/userSlice";
import BigThemedButton from "./BigThemedButton";
import ThemedTextInput from "./ThemedTextInput";

interface Props {
  onCreateAccountSucceded: () => void;
}

type PostSchemaType = Record<keyof User, Yup.AnySchema>;

const validationSchema = Yup.object().shape<PostSchemaType>({
  id: Yup.number(),
  email: Yup.string()
    .email("Mejladressen måste innehålla @ och .com eller .se")
    .required("Fyll i en giltlig mejladress"),
  password: Yup.string().required("Du måste ange ett lösenord"),
});

const CreateUserForm: FC<Props> = ({ onCreateAccountSucceded }: Props) => {
  const dispatch = useAppDispatch();
  const userState = useAppSelector((state) => state.user);
  const initialValues = userState.user;

  const handleSubmit = async (newUser: User) => {
    await dispatch(addUserAction(newUser)).then(() => {
      if (!userState.error) {
        onCreateAccountSucceded();
      } else Alert.alert("Oooops!", userState.error);
    });
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
              label="E-postadress"
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
          <View style={styles.buttonContainer}>
            <BigThemedButton
              typeOfIcon="plus-circle-outline"
              onPress={() => handleSubmit()}
              buttonText="Bekräfta"
            />
          </View>
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
  buttonContainer: {
    alignItems: "center",
  },
});
