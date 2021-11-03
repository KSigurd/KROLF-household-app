import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { View, StyleSheet } from "react-native";
import { RootStackParamList } from "../navigation/RootNavigator";
import CreateUserForm from "../components/CreateUserForm";

type Props = NativeStackScreenProps<RootStackParamList, "Profile">;

const CreateAccountScreen = ({ navigation }: Props) => {
  return (
    <View style={styles.root}>
      <CreateUserForm
        onCreateAccountSucceded={() => navigation.navigate("Login")}
      />
    </View>
  );
};

export default CreateAccountScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    marginHorizontal: 10,
    marginVertical: 10,
    justifyContent: "space-between",
  },
  NPbutton: {
    width: 150,
    borderRadius: 100,
    padding: 10,
    alignSelf: "center",
    marginTop: 30,
  },
  input: {
    elevation: 4,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 12,
    marginBottom: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
  },
});
