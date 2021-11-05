import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Formik } from "formik";
import React, { FC, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import * as Yup from "yup";
import BigThemedButton from "../components/BigThemedButton";
import ThemedTextInput from "../components/ThemedTextInput";
import {
  getHouseholdsAction,
  getOneHouseholdAction,
} from "../store/household/householdSlice";
import { useAppDispatch, useAppSelector } from "../store/store";

interface ParamsToValidate {
  inviteCode: string;
}

interface Props {
  inviteCode: string;
  navigation: any;
}

type PostSchemaType = Record<keyof ParamsToValidate, Yup.AnySchema>;

const isDigitsOnly = (value: string | undefined) => {
  if (value) return /^\d+$/.test(value);
  else return false;
};

const validationSchema = Yup.object().shape<PostSchemaType>({
  inviteCode: Yup.string()
    .test(
      "Digits only",
      "Inbjudningskoden får endast innehålla siffror",
      isDigitsOnly
    )
    .min(6, "En inbjudningskod måste innehålla 6 siffror")
    .max(6, "En inbjudningskod måste innehålla 6 siffror")
    .required(),
});

const JoinHouseholdScreen: FC<Props> = ({ navigation, inviteCode }: Props) => {
  const dispatch = useAppDispatch();
  const errorState = useAppSelector((state) => state.household);
  const inputParams: ParamsToValidate = {
    inviteCode: "",
  } as ParamsToValidate;

  const handleSubmit = async (inputParams: ParamsToValidate) => {
    inviteCode = inputParams.inviteCode;
    await dispatch(getOneHouseholdAction(Number(inputParams.inviteCode)));

    navigation.navigate("AddHouseholdUserInfoModalScreen", inviteCode);
  };

  return (
    <Formik
      initialValues={inputParams}
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
              secureTextEntry={false}
              label="Inbjudningskod"
              value={values.inviteCode}
              onChangeText={handleChange<keyof ParamsToValidate>("inviteCode")}
              onBlur={handleBlur<keyof ParamsToValidate>("inviteCode")}
              helperText={touched.inviteCode && errors.inviteCode}
            />
          </View>
          <View style={styles.themedButtonContainer}>
            <BigThemedButton
              typeOfIcon="plus-circle-outline"
              buttonText="Gå med"
              onPress={() => handleSubmit()}
            />
          </View>
        </View>
      )}
    </Formik>
  );
};

export default JoinHouseholdScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginVertical: 10,
  },
  selectAvatar: {
    alignItems: "flex-start",
    flexDirection: "column",
    marginHorizontal: 10,
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  avatarContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 30,
    borderRadius: 10,
    backgroundColor: "white",
    elevation: 4,
    borderColor: "transparent",
    width: "100%",
    marginTop: 12,
  },
  repeatabilityCircle: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    elevation: 4,
  },
  selectedAvatarBackground: {
    backgroundColor: "#EDEDED",
  },
  unselectedAvatarBackground: {
    backgroundColor: "white",
  },
  bottomButtonRow: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  buttonIconSize: {
    fontSize: 25,
  },
  avatarButton: {
    margin: 0,
    elevation: 0,
  },
  input: {
    elevation: 4,
  },
  themedButtonContainer: {
    alignItems: "center",
  },
});
