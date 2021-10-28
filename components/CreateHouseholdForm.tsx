import { Formik } from "formik";
import React, { FC } from "react";
import { Alert, StyleSheet, View } from "react-native";
import * as Yup from "yup";
import { generateHouseholdInviteCode } from "../functions/generateHouseholdInviteCode";
import { HouseholdOmit } from "../interfaces/households";
import { addHouseholdAction } from "../store/household/householdSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import ConfirmButton from "./ConfirmButton";
import ThemedTextInput from "./ThemedTextInput";

interface Props {
  onCreateSucceded: () => void;
}

type PostSchemaType = Record<keyof HouseholdOmit, Yup.AnySchema>;

const validationSchema = Yup.object().shape<PostSchemaType>({
  inviteCode: Yup.string(),
  name: Yup.string()
    .min(2, "Ange minst 2 tecken")
    .max(20, "Max antal tecken är 20")
    .required("Obligatoriskt fält"),
});


const CreateHouseholdForm: FC<Props> = ({ onCreateSucceded }: Props) => {
  const householdInviteCode: number = generateHouseholdInviteCode();
  const dispatch = useAppDispatch();
  const householdState = useAppSelector((state) => state.household);
  const initialValues: HouseholdOmit = {
    inviteCode: householdInviteCode,
    name: "",
  };
  const handleSubmit = async (household: HouseholdOmit) => {
    await dispatch(addHouseholdAction(household)).then(() => {
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
              onChangeText={handleChange<keyof HouseholdOmit>("name")}
              onBlur={handleBlur<keyof HouseholdOmit>("name")}
              value={values.name}
              helperText={touched.name && errors.name}
            />
            <ThemedTextInput
              label="Hushållets kod"
              editable={false}
              onChangeText={handleChange<keyof HouseholdOmit>("inviteCode")}
              onBlur={handleBlur<keyof HouseholdOmit>("inviteCode")}
              value={String(values.inviteCode)}
              helperText={touched.inviteCode && errors.inviteCode}
            />
          </View>
          <ConfirmButton onConfirm={handleSubmit}/>
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
  NPbutton: {
    width: 150,
    borderRadius: 100,
    padding: 10,
    alignSelf: "center",
    marginVertical: 10,
  },
});
