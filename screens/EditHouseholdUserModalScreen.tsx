import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Formik } from "formik";
import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Button as NPbutton, TextInput } from "react-native-paper";
import Points from "../components/Points";
import Repeatability from "../components/Repeatability";
import ThemedTextInput from "../components/ThemedTextInput";
import { Chore } from "../interfaces/chore";
import { TabParamList } from "../navigation/ChoresStatisticsNavigator";
import * as Yup from "yup";
import { getHouseholdUserAction } from "../store/householdUser/householdUserSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import { selectHouseholdUserById, selectAvatarById } from "../store/user/userSelector";
import { updateHouseholdUser } from "../data/fireStoreModule";


type Props = NativeStackScreenProps<TabParamList>;

interface userInfo {
    name: string,
    avatar: string,
};

const initialValues: userInfo = {
    name: "userData?.name",
    avatar: "avatarEmoji",
 };


type PostSchemaType = Record<keyof userInfo, Yup.AnySchema>;

const validationSchema = Yup.object().shape<PostSchemaType>({
    name: Yup.string().required("Du måste fylla i något här").min(2),
    avatar: Yup.string()
});

const EditHouseholdUserModalScreen = ({ navigation }: Props) => {
    
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.user.user);
    
    const activeHouseholdId = useAppSelector(
        (state) => state.household.activeHouseholdId
        );
        dispatch(getHouseholdUserAction(activeHouseholdId));
        
        const userData = useAppSelector(selectHouseholdUserById(user.id));
        
        const avatar = userData?.avatarId
        
        let avatarEmoji = ""
        if(avatar) {
            avatarEmoji = avatar
        }
        const avatarEmojiToRender = useAppSelector(selectAvatarById(avatarEmoji)); 
        
    const handleSubmit = async (inputParams: userInfo) => {
        //ADD update TO FIREMODULE
        

        //CLOSES MODAL
        onClosed();
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
            <ThemedTextInput
                style={styles.input}
                placeholder="Titel"
                placeholderTextColor="#d3d3d3"
                onChangeText={handleChange<keyof Chore>("title")}
                onBlur={handleBlur<keyof Chore>("title")}
                value={values.name}
                helperText={touched.name && errors.name}
            />
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
    )}
</Formik>
  );
};

export default EditHouseholdUserModalScreen;

const styles = StyleSheet.create({
  root: {
    backgroundColor: "lightblue",
    margin: 15,
    padding: 10,
    borderRadius: 25,
    marginTop: 300
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
});
