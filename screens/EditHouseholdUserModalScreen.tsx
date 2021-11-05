import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  Button as NPbutton,
  Surface,
  TouchableRipple,
} from "react-native-paper";
import * as Yup from "yup";
import ThemedTextInput from "../components/ThemedTextInput";
import { Avatar } from "../interfaces/avatar";
import { TabParamList } from "../navigation/ChoresStatisticsNavigator";
import { getStatisticsAction } from "../store/completedChore/completedChoreSlice";
import {
  availableAvatars,
  househouldUsersFromHousehold,
} from "../store/householdUser/householdUserSelectors";
import {
  getHouseholdUserAction,
  updateHouseholdUserAction,
} from "../store/householdUser/householdUserSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import {
  selectAvatarById,
  selectHouseholdUserById,
} from "../store/user/userSelector";

type Props = NativeStackScreenProps<TabParamList>;

interface userInfo {
  name: string;
  avatar: Avatar;
}

type PostSchemaType = Record<keyof userInfo, Yup.AnySchema>;

const validationSchema = Yup.object().shape<PostSchemaType>({
  name: Yup.string()
    .required("Du måste fylla i något här")
    .min(2)
    .max(20, "Ditt namn kan bara innehålla 20 tecken"),
  avatar: Yup.object(),
});

const EditHouseholdUserModalScreen = ({ navigation }: Props) => {
  const [avatar, setAvatar] = useState("");
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);

  const activeHouseholdId = useAppSelector(
    (state) => state.household.activeHouseholdId
  );
  const householdUsersFromActiveHousehold = useAppSelector(
    househouldUsersFromHousehold(activeHouseholdId)
  );

  const availableAvatarList = useAppSelector(
    availableAvatars(householdUsersFromActiveHousehold)
  );

  useEffect(() => {
    dispatch(getHouseholdUserAction(activeHouseholdId));
  }, [activeHouseholdId]);

  const userData = useAppSelector(selectHouseholdUserById(user.id));

  const avatarEmojiToRender = useAppSelector(
    selectAvatarById(userData?.avatarId)
  );

  const initialValues: userInfo = {
    name: userData?.name || "",
    avatar: avatarEmojiToRender || { id: "", color: "", avatar: "" },
  };

  const handleSubmit = async (inputParams: userInfo) => {
    if (userData) {
      const updatedHouseholdUser = {
        ...userData,
        avatarId: inputParams.avatar.id,
        name: inputParams.name,
      };
      await dispatch(updateHouseholdUserAction(updatedHouseholdUser));
      await dispatch(getStatisticsAction(activeHouseholdId));
      navigation.pop();
    }
  };

  const onClosed = () => {
    navigation.navigate("Home");
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
        setFieldValue,
        values,
        touched,
        errors,
      }) => (
        <View style={styles.root}>
          <View style={{ backgroundColor: "#f2f2f2", borderRadius: 25 }}>
            <View style={styles.headerTitle}>
              <Text style={styles.headerTitleText}>Redigera din användare</Text>
            </View>
            <ThemedTextInput
              style={styles.input}
              placeholder="Smeknamn"
              placeholderTextColor="#d3d3d3"
              onChangeText={handleChange<keyof userInfo>("name")}
              onBlur={handleBlur<keyof userInfo>("name")}
              value={values.name}
              helperText={touched.name && errors.name}
            />
            <Text style={{ fontSize: 60, alignSelf: "center", padding: 5 }}>
              {values.avatar.avatar}
            </Text>
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
                        setFieldValue("avatar", prop);
                      }}
                    >
                      <Text style={styles.avatarStyle}>{prop.avatar}</Text>
                    </TouchableRipple>
                  );
                })}
              </Surface>
            </View>

            <View style={styles.buttonContainer}>
              <NPbutton
                labelStyle={{ fontSize: 25, color: "black" }}
                icon="plus-circle-outline"
                style={styles.NPbutton}
                uppercase={false}
                onPress={() => handleSubmit()}
              >
                <Text style={{ fontSize: 15 }}>Spara</Text>
              </NPbutton>
              <NPbutton
                labelStyle={{ fontSize: 25, color: "black" }}
                icon="close-circle-outline"
                style={styles.NPbutton}
                uppercase={false}
                onPress={() => onClosed()}
              >
                <Text style={{ fontSize: 15 }}>Stäng</Text>
              </NPbutton>
            </View>
          </View>
        </View>
      )}
    </Formik>
  );
};

export default EditHouseholdUserModalScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    margin: 10,
    borderRadius: 25,
    justifyContent: "center",
  },
  NPbutton: {
    flex: 1,
    height: "100%",
    borderRadius: 25,
    justifyContent: "center",
  },
  input: {
    marginTop: 0,
  },
  marginBottom: {
    marginBottom: 10,
  },
  buttonContainer: {
    overflow: "hidden",
    flexDirection: "row",
    backgroundColor: "white",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
    height: 60,
    marginTop: 8,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  selectAvatar: {
    alignItems: "flex-start",
    flexDirection: "column",
    marginHorizontal: 10,
  },
  avatarStyle: {
    fontSize: 25,
    fontWeight: "bold",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  avatarContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    padding: 30,
    borderRadius: 10,
    backgroundColor: "white",
    elevation: 4,
    borderColor: "transparent",
    width: "100%",
    marginTop: 12,
    marginBottom: 12,
  },
  repeatabilityCircle: {
    width: 35,
    height: 35,
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
  headerTitle: {
    width: "100%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  headerTitleText: {
    padding: 15,
    alignSelf: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
});
