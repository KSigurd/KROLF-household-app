import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Formik } from "formik";
import React, { FC, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Surface, Text, TouchableRipple } from "react-native-paper";
import * as Yup from "yup";
import ThemedTextInput from "../components/ThemedTextInput";
import { Avatar } from "../interfaces/avatar";
import { Household } from "../interfaces/households";
import { CreateHouseholdUser } from "../interfaces/householdUser";
import { RootStackParamList } from "../navigation/RootNavigator";
import { getHouseholdsAction } from "../store/household/householdSlice";
import {
  availableAvatars,
  househouldUsersFromHousehold,
} from "../store/householdUser/householdUserSelectors";
import {
  addHouseholdUserAction,
  getHouseholdUserAction,
} from "../store/householdUser/householdUserSlice";
import { useAppDispatch, useAppSelector } from "../store/store";

interface ParamsToValidate {
  name: string;
  avatarId: string;
}

type PostSchemaType = Record<keyof ParamsToValidate, Yup.AnySchema>;

const validationSchema = Yup.object().shape<PostSchemaType>({
  name: Yup.string().required("Du måste ange ett namn"),
  avatarId: Yup.string().required("Välj en avatar"),
});

type Props = NativeStackScreenProps<RootStackParamList, "JoinHousehold">;

const AddHouseholdUserInfoModalScreen: FC<Props> = ({
  navigation,
  route,
}: Props) => {
  const [avatar, setAvatar] = useState("");
  const dispatch = useAppDispatch();
  const userState = useAppSelector((state) => state.user);
  const activehousehold = useAppSelector(
    (state) => state.household.activeHouseholdId
  );
  let temporaryHouseholdState: Household = {} as Household;
  const inviteCode = route.params;

  temporaryHouseholdState = useAppSelector(
    (state) => state.household.temporaryHousehold
  );

  const householdUsersFromActiveHousehold = useAppSelector(
    househouldUsersFromHousehold(activehousehold)
  );
  const availableAvatarList = useAppSelector(
    availableAvatars(householdUsersFromActiveHousehold)
  );

  useEffect(() => {
    async () => {
      await dispatch(getHouseholdUserAction(temporaryHouseholdState.id));
      temporaryHouseholdState = useAppSelector(
        (state) => state.household.temporaryHousehold
      );
    };
  }, [temporaryHouseholdState.id]);

  const inputParams: ParamsToValidate = {
    name: "",
    avatarId: avatar,
  };

  const handleSubmit = async (inputParams: ParamsToValidate) => {
    await dispatch(
      addHouseholdUserAction({
        inviteCode: Number(inviteCode),
        newHouseholdUser: {
          avatarId: inputParams.avatarId,
          name: inputParams.name,
          householdId: temporaryHouseholdState.id,
          isAdmin: false,
          userId: userState.user.id,
        } as CreateHouseholdUser,
      })
    ).then(() => {
      setAvatar("");
    });
    await dispatch(getHouseholdsAction(userState.user.id)).then(() =>
      navigation.replace("Profile")
    );
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
          {availableAvatarList.length > 0 ? (
            <View>
              <View style={styles.titleView}>
                <Text style={styles.title}>
                  Personliga uppgifter i hushållet{" "}
                  {temporaryHouseholdState.name}
                </Text>
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
          ) : (
            <View>
              <View style={styles.titleView}>
                <Text style={styles.title}>Någonting gick fel...</Text>
              </View>
              <Surface style={styles.errorMessage}>
                <Text style={{ fontSize: 16, textAlign: "center" }}>
                  Hushållet är fullt, vänligen ta kontakt med hushållets ägare!
                </Text>
              </Surface>
              <Button
                icon="close-circle-outline"
                mode="contained"
                color="#fff"
                labelStyle={styles.buttonIconSize}
                uppercase={false}
                style={styles.NPbutton}
                onPress={() => navigation.goBack()}
              >
                <Text style={styles.buttonText}>Stäng</Text>
              </Button>
            </View>
          )}
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
  errorMessage: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 40,
    borderRadius: 10,
    backgroundColor: "white",
    elevation: 4,
    borderColor: "transparent",
    textAlign: "center",
    marginTop: 16,
    marginHorizontal: 20,
    marginVertical: 20,
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
