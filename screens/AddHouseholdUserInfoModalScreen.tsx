import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Formik } from "formik";
import React, { FC, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Surface, Text, TouchableRipple } from "react-native-paper";
import * as Yup from "yup";
import ThemedTextInput from "../components/ThemedTextInput";
import { getHouseHolds } from "../data/fireStoreModule";
import { Avatar } from "../interfaces/avatar";
import { RootStackParamList } from "../navigation/RootNavigator";
import { selectHouseholdById } from "../store/household/hoseholdSelector";
import { getHouseholdsAction } from "../store/household/householdSlice";
import {
  availableAvatars,
  househouldUsersFromHousehold,
} from "../store/householdUser/householdUserSelectors";
import { addHouseholdUserAction } from "../store/householdUser/householdUserSlice";
import { useAppDispatch, useAppSelector } from "../store/store";

interface ParamsToValidate {
  name: string;
  avatarId: string;
}

type PostSchemaType = Record<keyof ParamsToValidate, Yup.AnySchema>;

const validationSchema = Yup.object().shape<PostSchemaType>({
  name: Yup.string().required("Du måste ange ett namn"),
  avatarId: Yup.string().min(1, "Välj en avatar"),
});

type Props = NativeStackScreenProps<RootStackParamList, "JoinHousehold">;

const AddHouseholdUserInfoModalScreen: FC<Props> = ({ navigation }: Props) => {
  const [avatar, setAvatar] = useState("");
  const dispatch = useAppDispatch();
  const userState = useAppSelector((state) => state.user);

  const activeHouseholdId = useAppSelector(
    (state) => state.household.activeHouseholdId
  );

  const householdObject = useAppSelector(
    selectHouseholdById(activeHouseholdId)
  );

  console.log("hallo",activeHouseholdId)

  const inputParams: ParamsToValidate = {
    name: "",
    avatarId: avatar,
  } as ParamsToValidate;

  const handleSubmit = async (inputParams: ParamsToValidate) => {
    await dispatch(
      addHouseholdUserAction({
        inviteCode: Number(householdObject?.inviteCode),
        newHouseholdUser: {
          avatarId: inputParams.avatarId,
          name: inputParams.name,
          householdId: activeHouseholdId,
          isAdmin: false,
          userId: userState.user.id,
        },
      })
    ).then(() => {
      setAvatar("");
    });
    await dispatch(getHouseholdsAction(userState.user.id));
    navigation.replace("Profile");
  };

  const chooseAvatar = (avatar: Avatar) => {
    setAvatar(avatar.id);
  };

  const householdUsersFromActiveHousehold = useAppSelector(
    househouldUsersFromHousehold(activeHouseholdId)
  );

  const availableAvatarList = useAppSelector(
    availableAvatars(householdUsersFromActiveHousehold)
  );

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
          <View style={styles.titleView}>
            <Text style={styles.title}>Personliga uppgifter i hushållet {householdObject?.name}</Text>
          </View>
          <View>
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
                {availableAvatarList.map((prop, key) => {
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

export default AddHouseholdUserInfoModalScreen;

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#f2f2f2",
    borderRadius: 25,
    marginTop: 250,
    justifyContent: "space-between",
  },
  titleView: {
    width: "100%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    alignItems: "center",
  },
  title: {
    padding: 10,
    fontSize: 18,
    fontWeight: "bold",
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
