import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Formik } from "formik";
import React, { FC, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Surface, Text, TouchableRipple } from "react-native-paper";
import * as Yup from "yup";
import ThemedTextInput from "../components/ThemedTextInput";
import { getHouseHolds } from "../data/fireStoreModule";
import { Avatar } from "../interfaces/avatar";
import { Household } from "../interfaces/households";
import {
  CreateHouseholdUser,
  HouseholdUser,
} from "../interfaces/householdUser";
import { RootStackParamList } from "../navigation/RootNavigator";
import {
  selectHouseholdById,
  selectHouseholdByInviteCode,
} from "../store/household/hoseholdSelector";
import {
  getHouseholdsAction,
  setActiveHousholdAction,
} from "../store/household/householdSlice";
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
  avatarId: Yup.string().min(1, "Välj en avatar"),
});

type Props = NativeStackScreenProps<RootStackParamList, "JoinHousehold">;

const AddHouseholdUserInfoModalScreen: FC<Props> = ({
  navigation,
  route,
}: Props) => {
  const [avatar, setAvatar] = useState("");
  const dispatch = useAppDispatch();
  const userState = useAppSelector((state) => state.user);
  let temporaryHouseholdState: Household = {} as Household;
  let householdUserState: HouseholdUser[] = [];
  const inviteCode = route.params;

  const householdIdFromInviteCode = useAppSelector(
    selectHouseholdByInviteCode()
  );

  const errorState = useAppSelector((state) => state.household.error);

  // let availableAvatarList: Avatar[] = [];

  temporaryHouseholdState = useAppSelector(
      (state) => state.household.temporaryHousehold
      );

  const householdUsersFromActiveHousehold = useAppSelector(
    househouldUsersFromHousehold(temporaryHouseholdState.id)
  );
console.log("user",householdUsersFromActiveHousehold);
  const availableAvatarList = useAppSelector(
    availableAvatars(householdUsersFromActiveHousehold)
  );

  useEffect(() => {
    async () => {
      await dispatch(getHouseholdUserAction(temporaryHouseholdState.id));
      temporaryHouseholdState = useAppSelector(
        (state) => state.household.temporaryHousehold
        );
      console.log(temporaryHouseholdState, "tempo");

      // householdUserState  = useAppSelector(
      //     (state) => state.householdUser.householdUsers
      //   );

      // availableAvatarList = useAppSelector(
      //   availableAvatars(
      //     householdUserState.filter(
      //       (hu) => hu.householdId === temporaryHouseholdState.id
      //     )
      //   )
    };
  }, [temporaryHouseholdState.id]);

  console.log(householdUserState, "householduserState");
  console.log(availableAvatarList, "availableAvatarList");

  // const householdUsersFromActiveHousehold = useAppSelector(
  //   househouldUsersFromHousehold(activeHouseholdId)
  // );

  // useEffect(() => {
  //   if (householdIdFromInviteCode?.id)
  //     dispatch(setActiveHousholdAction(householdIdFromInviteCode?.id));
  // }, [householdIdFromInviteCode?.id]);

  // const activeHouseholdId = useAppSelector(
  //   (state) => state.household.activeHouseholdId
  // ); //sätts i början innan useEffecten? eller?

  // const householdObject = useAppSelector(
  //   selectHouseholdById(activeHouseholdId)
  // );

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

  // console.log("activehousehold",activeHouseholdId);
  // const householdUsersFromActiveHousehold = useAppSelector(
  //   househouldUsersFromHousehold(activeHouseholdId)
  // );
  // // console.log(householdUsersFromActiveHousehold)

  // const changeOnName = () => {
  //   dispatch(getHouseholdUserAction(activeHouseholdId));
  // };

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
            <Text style={styles.title}>
              Personliga uppgifter i hushållet {temporaryHouseholdState.name}
            </Text>
          </View>
          <View>
            <ThemedTextInput
              secureTextEntry={false}
              label="Ditt namn i hushållet"
              value={values.name}
              //onChange={() => changeOnName()}
              onChangeText={handleChange<keyof ParamsToValidate>("name")}
              onBlur={handleBlur<keyof ParamsToValidate>("name")}
              helperText={touched.name && errors.name}
            />
            {values.name.length > 2 ? (
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
            ) : null}
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

    // <View style={styles.root}>
    //   {errorState !== undefined ? (
    //     <View>
    //       <Text>inviteCode: {inviteCode}</Text>
    //       <Text>
    //         householdIdFromInviteCode: {householdIdFromInviteCode?.name}
    //       </Text>
    //     </View>
    //   ) : (
    //     <View style={styles.root}>
    //       <Text>Något gick fel...</Text>
    //       <Button onPress={() => navigation.goBack()}>Stäng</Button>
    //     </View>
    //   )}
    // </View>
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
