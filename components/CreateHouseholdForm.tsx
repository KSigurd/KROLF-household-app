import { Formik } from "formik";
import React, { FC } from "react";
import { Alert, StyleSheet, View } from "react-native";
import * as Yup from "yup";
import { generateHouseholdInviteCode } from "../functions/generateHouseholdInviteCode";
import { CreateHousehold } from "../interfaces/households";
import { addHouseholdAction } from "../store/household/householdSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import BigThemedButton from "./BigThemedButton";
import ThemedTextInput from "./ThemedTextInput";

interface Props {
  onCreateSucceded: () => void;
}

type PostSchemaType = Record<keyof CreateHousehold, Yup.AnySchema>;

//Create Yup validation schema
const validationSchema = Yup.object().shape<PostSchemaType>({
  inviteCode: Yup.string(),
  name: Yup.string()
    .min(2, "Ange minst 2 tecken")
    .max(20, "Max antal tecken är 20")
    .required("Obligatoriskt fält"),
});

const CreateHouseholdForm: FC<Props> = ({ onCreateSucceded }: Props) => {
  //Define dispatch and states
  const dispatch = useAppDispatch();
  const householdState = useAppSelector((state) => state.household);
  const user = useAppSelector((state) => state.user.user);

  //Get auto-generated invite code
  const householdInviteCode: number = generateHouseholdInviteCode();

  //Set initial values for form
  const initialValues: CreateHousehold = {
    inviteCode: householdInviteCode,
    name: "",
  };

  const handleSubmit = async (household: CreateHousehold) => {
    const defaultHouseholdUser = {
      userId: user.id,
      name: "Admin",
      isAdmin: true,
      avatarId: "0",
    };
    await dispatch(
      addHouseholdAction({ household, householdUser: defaultHouseholdUser })
    ).then(() => {
      if (household) {
        onCreateSucceded();
      } else Alert.alert("Oooops!", householdState.error);
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
              label="Hushållets namn"
              onChangeText={handleChange<keyof CreateHousehold>("name")}
              onBlur={handleBlur<keyof CreateHousehold>("name")}
              value={values.name}
              helperText={touched.name && errors.name}
            />
            <ThemedTextInput
              label="Hushållets kod"
              editable={false}
              onChangeText={handleChange<keyof CreateHousehold>("inviteCode")}
              onBlur={handleBlur<keyof CreateHousehold>("inviteCode")}
              value={String(values.inviteCode)}
              helperText={touched.inviteCode && errors.inviteCode}
            />
          </View>
          <View style={styles.confirmButton}>
          <BigThemedButton
            typeOfIcon="plus-circle-outline"
            buttonText="Bekräfta"
            onPress={handleSubmit}
          />
          </View>
        </View>
      )}
    </Formik>
  );
};

export default CreateHouseholdForm;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "space-between",
  },
  confirmButton: {
    alignItems: "center",
  },
});
