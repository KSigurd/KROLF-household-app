import React, { FC, useState } from "react";
import { View } from "react-native";
import {
  Text,
  Button,
  Surface,
  Title,
  TouchableRipple,
} from "react-native-paper";
import { styles } from "../styles/styles";
import * as Yup from "yup";
import ThemedTextInput from "../components/ThemedTextInput";
import { Formik } from "formik";
import { useAppDispatch, useAppSelector } from "../store/store";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { addHouseholdUserAction } from "../store/householdUser/householdUserSlice";
import { RootStackParamList } from "../navigation/RootNavigator";
import { avatars } from "../data/avatarData";
import { Avatar } from "../interfaces/avatar";

interface ParamsToValidate {
  inviteCode: string;
  name: string;
  avatarId: string;
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
  name: Yup.string().required("Du måste ange ett namn"),
  avatarId: Yup.string().min(1, "Välj en avatar"),
});

type Props = NativeStackScreenProps<RootStackParamList, "JoinHousehold">;

const JoinHouseholdScreen: FC<Props> = ({ navigation }: Props) => {
  const [avatar, setAvatar] = useState("");
  const dispatch = useAppDispatch();
  const userState = useAppSelector((state) => state.user);
  const inputParams: ParamsToValidate = {
    inviteCode: "",
    name: "",
    avatarId: avatar,
  } as ParamsToValidate;

  const handleSubmit = async (inputParams: ParamsToValidate) => {
    await dispatch(
      addHouseholdUserAction({
        inviteCode: Number(inputParams.inviteCode),
        newHouseholdUser: {
          avatarId: inputParams.avatarId,
          name: inputParams.name,
          householdId: "",
          isAdmin: false,
          userId: userState.user.id,
        },
      })
    ).then(() => {
      setAvatar("");
      navigation.navigate("Profile");
    });
  };

  const chooseAvatar = (avatar: Avatar) => {
    setAvatar(avatar.id);
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
          <Surface style={[styles.fullscreenButton, styles.buttonOutlined]}>
            <ThemedTextInput
              secureTextEntry={false}
              label="Inbjudningskod"
              value={values.inviteCode}
              onChangeText={handleChange<keyof ParamsToValidate>("inviteCode")}
              onBlur={handleBlur<keyof ParamsToValidate>("inviteCode")}
              helperText={touched.inviteCode && errors.inviteCode}
            />
          </Surface>
          <Surface style={[styles.fullscreenButton, styles.buttonOutlined]}>
            <ThemedTextInput
              secureTextEntry={false}
              label="Ditt namn i hushållet"
              value={values.name}
              onChangeText={handleChange<keyof ParamsToValidate>("name")}
              onBlur={handleBlur<keyof ParamsToValidate>("name")}
              helperText={touched.name && errors.name}
            />
          </Surface>
          <Surface style={[styles.avatarContainer]}>
            <Title style={styles.buttonText}>Välj din avatar</Title>
            <Surface style={[styles.buttonInnerContainer]}>
              {avatars.map((prop, key) => {
                return (
                  <TouchableRipple
                    key={key}
                    borderless={true}
                    style={[
                      styles.repeatabilityCircle,
                      styles.avatarButton,
                      prop.id === avatar
                        ? styles.selectedAvatarBackground
                        : styles.unselectedAvatarBackground,
                    ]}
                    onPress={() => {values.avatarId = prop.id; chooseAvatar(prop)}}
                  >
                    <Text style={styles.buttonText}>{prop.avatar}</Text>
                  </TouchableRipple>
                );
              })}
            </Surface>
          </Surface>
          <View style={styles.bottomButtonRow}>
            <Button
            disabled={!values.inviteCode || !values.name || !values.avatarId}
              icon="plus-circle-outline"
              labelStyle={styles.buttonIconSize}
              color={"#000"}
              uppercase={false}
              style={styles.smallButton}
              onPress={() => handleSubmit()}
            >
              <Text style={[styles.buttonText]}>Gå med</Text>
            </Button>
          </View>
        </View>
      )}
    </Formik>
  );
};

export default JoinHouseholdScreen;
