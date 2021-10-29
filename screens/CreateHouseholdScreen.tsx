import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Button, StyleSheet, View } from "react-native";
import CreateHouseholdForm from "../components/CreateHouseholdForm";
import { RootStackParamList } from "../navigation/RootNavigator";

type Props = NativeStackScreenProps<RootStackParamList, "Profile">;

const CreateHouseholdScreen = ({ navigation }: Props) => {
  return (
    <View style={styles.root}>
      <CreateHouseholdForm
        onCreateSucceded={() => navigation.navigate("Profile")}
      />
    </View>
  );
};

export default CreateHouseholdScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    marginHorizontal: 10,
    marginVertical: 25,
    justifyContent: "space-between",
  },
});
