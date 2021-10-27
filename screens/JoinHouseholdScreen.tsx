import React, { FC } from "react";
import { View } from "react-native";
import { Text, Button, Surface, Title } from "react-native-paper";
import { HouseholdUser, HouseholdUserOmit } from "../interfaces/householdUser";
import { styles } from "../styles/styles";
import * as Yup from "yup";
import { miniSerializeError } from "@reduxjs/toolkit";
import ThemedTextInput from "../components/ThemedTextInput";
import { householdUser } from "../data/mockHouseholdData";
import { Formik } from "formik";
import { addHouseholdUser } from "../data/fireStoreModule";
import { useAppDispatch } from "../store/store";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { addHouseholdUserAction } from "../store/householdUser/householdUserSlice";
import { RootStackParamList } from "../navigation/RootNavigator";

interface ParamsToValidate {
  inviteCode: number;
  name: string;
  avatarId: string;
}

type PostSchemaType = Record<keyof ParamsToValidate, Yup.AnySchema>;

const validationSchema = Yup.object().shape<PostSchemaType>({
  inviteCode: Yup.number()
    .min(6, "En inbjudningskod måste innehålla 6 siffror")
    .max(6, "En inbjudningskod måste innehålla 6 siffror")
    .required(),
  name: Yup.string().required("Du måste ange ett namn"),
  avatarId: Yup.string().min(1, "Välj en avatar"),
});

type Props = NativeStackScreenProps<RootStackParamList, "JoinHousehold">;

const JoinHouseholdScreen: FC<Props> = ({navigation}: Props) => {
  const dispatch = useAppDispatch();
  const newHouseholdUser: HouseholdUserOmit = {} as HouseholdUserOmit;
  let inviteCode: number = 0;
  const handleSubmit = async (inviteCode: number, newHouseholdUser: HouseholdUserOmit) => {
    await dispatch(addHouseholdUserAction({inviteCode, newHouseholdUser})).then(() => navigation.navigate("Profile"));
  }
  return (
    <Formik
      initialValues={[undefined, newHouseholdUser.name, newHouseholdUser.avatarId]}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      >
        {({
          handleChange,
        handleBlur,
        handleSubmit,
        values,
        touched,
        errors
      }) => (
    <View style={styles.root}>
      <Surface style={[styles.fullscreenButton, styles.buttonOutlined]}>
          <ThemedTextInput
              secureTextEntry={false}
              label="Inbjudningskod"
              value={String(inviteCode)}
              onChangeText={handleChange<number>(inviteCode)}
              onBlur={handleBlur<number>(inviteCode)}
              helperText={touched.inviteCode && errors.inviteCode}
            />
      </Surface>
      <Surface style={[styles.fullscreenButton, styles.buttonOutlined]}>
          <ThemedTextInput
              secureTextEntry={false}
              label="Namn för hushållet"
              value={values.newHouseholdUser.name}
              onChangeText={handleChange<keyof HouseholdUserOmit>("name")}
              onBlur={handleBlur<keyof HouseholdUserOmit>("name")}
              helperText={touched.name && errors.name}
            />
      </Surface>
      <Surface style={[styles.fullscreenButton, styles.buttonOutlined]}>
      </Surface>
      <View style={styles.bottomButtonRow}>
      <NPbutton
            //TODO: CHECK THIS
            disabled={!values.password === true || !values.email === true}
            icon="account-key-outline"
            mode="contained"
            style={styles.NPbutton}
            onPress={() => handleSubmit()}
          >
            Logga in
          </NPbutton>
        <Button
        disabled={!values.password === true || !values.email === true}
          icon="plus-circle-outline"
          labelStyle={styles.buttonIconSize}
          color={"#000"}
          uppercase={false}
          style={styles.smallButton}
          onPress={() => handleSubmit()}
        >
          <Text style={styles.buttonText}>Gå med</Text>
        </Button>
      </View>
    </View>
    )}
    </Formik>
  );
};

export default JoinHouseholdScreen;
