import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Formik } from "formik";
import React, { FC, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Surface, Text, TouchableRipple } from "react-native-paper";
import * as Yup from "yup";
import ThemedTextInput from "../components/ThemedTextInput";
import { avatars } from "../data/avatarData";
import { Avatar } from "../interfaces/avatar";
import { RootStackParamList } from "../navigation/RootNavigator";
import { addHouseholdUserAction } from "../store/householdUser/householdUserSlice";
import { useAppDispatch, useAppSelector } from "../store/store";

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
          <View>
            <ThemedTextInput
              secureTextEntry={false}
              label="Inbjudningskod"
              value={values.inviteCode}
              onChangeText={handleChange<keyof ParamsToValidate>("inviteCode")}
              onBlur={handleBlur<keyof ParamsToValidate>("inviteCode")}
              helperText={touched.inviteCode && errors.inviteCode}
            />
            <ThemedTextInput
              secureTextEntry={false}
              label="Ditt namn i hushållet"
              value={values.name}
              onChangeText={handleChange<keyof ParamsToValidate>("name")}
              onBlur={handleBlur<keyof ParamsToValidate>("name")}
              helperText={touched.name && errors.name}
            />
            <View style={styles.selectAvatar}>
              <Text style={styles.buttonText}>Välj din avatar</Text>
              <Surface style={styles.avatarContainer}>
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
                      onPress={() => {
                        values.avatarId = prop.id;
                        chooseAvatar(prop);
                      }}
                    >
                      <Text style={styles.buttonText}>{prop.avatar}</Text>
                    </TouchableRipple>
                  );
                })}
              </Surface>
            </View>
          </View>
          <Button
            icon="plus-circle-outline"
            mode="contained"
            color="#fff"
            labelStyle={styles.buttonIconSize}
            uppercase={false}
            style={styles.NPbutton}
            onPress={() => handleSubmit()}
          >
            <Text style={styles.buttonText}>Gå med</Text>
          </Button>
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
  },
  selectAvatar: {
    alignItems: "flex-start",
    flexDirection: "column",
    marginHorizontal: 10,
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
  NPbutton: {
    width: 150,
    borderRadius: 100,
    padding: 10,
    alignSelf: "center",
    marginVertical: 10,
  },
  avatarButton: {
    margin: 0,
    elevation: 0,
  },
  input: {
    elevation: 4,
  },
});
