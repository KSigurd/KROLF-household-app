import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Surface, Text, TextInput, useTheme } from "react-native-paper";
import CreateHouseholdCode from "../components/CreateHouseholdCode";
import ThemedTextInput from "../components/ThemedTextInput";
import { RootStackParamList } from "../navigation/RootNavigator";

type Props = NativeStackScreenProps<RootStackParamList, "Profile">;

const CreateHouseholdScreen = ({ navigation }: Props) => {
  return (
    <View style={styles.root}>
      <ThemedTextInput label="Hushållets namn" />
      <ThemedTextInput label="Hushållets kod" disabled={true} >
        <CreateHouseholdCode />
      </ThemedTextInput>
      <View style={styles.buttonContainer}>
        <Surface style={styles.buttonBox}>
          <Button
            icon="plus-circle-outline"
            labelStyle={{ fontSize: 25 }}
            mode="text"
            uppercase={false}
            color={"#000"}
            style={styles.confirmButton}
            onPress={() => console.log("Pressed")} //TODO: Create a new household object, direct user to the newly created household-view
          >
            <Text style={styles.confirmText}>Bekräfta</Text>
          </Button>
        </Surface>
      </View>
    </View>
  );
};

export default CreateHouseholdScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 11,
    paddingTop: 11,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 12,
    marginBottom: 5,
  },
  inputField: {
    backgroundColor: "#fff",
    textAlign: "center",
  },
  codeBox: {
    marginTop: 7,
    // paddingLeft: 17,
    justifyContent: "center",
    borderRadius: 10,
    height: 58,
    borderColor: "#000",
    elevation: 3,
  },
  buttonContainer: {
    flex: 1,
    bottom: 15,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  buttonBox: {
    justifyContent: "center",
    padding: 0,
    borderRadius: 100,
    width: 160,
    borderColor: "#000",
    elevation: 3,
  },
  confirmButton: {
    padding: 10,
  },
  confirmText: {
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 0.1,
  },
});
