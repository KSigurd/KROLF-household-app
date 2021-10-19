import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { RootStackParamList } from "../navigation/RootNavigator";
import { Button as NPbutton, Surface, TextInput } from "react-native-paper";

type Props = NativeStackScreenProps<RootStackParamList, "Profile">;

const handleSubmit = () => {
  console.log("bekräfta account");
  
  //TODO: lägg in i user med value från input
  //TODO: navigate to loginScreen
}

const CreateAccountScreen = ({ navigation }: Props) => {
  return (
    <View style={styles.root}>
      <Text style={styles.title}>Skapa konto</Text>
      {/* <Button
        title="tryck mig"
        onPress={() => navigation.navigate("Profile")}
      /> */}
      <View>
        <Text style={styles.text}>Email :</Text>
        <TextInput
          mode="outlined"
          theme={{ roundness: 10 }}
          style={styles.input}
        />

        <Text style={styles.text}>Lösenord :</Text>
        <TextInput
          mode="outlined"
          theme={{ roundness: 10 }}
          style={styles.input}
        />
      </View>

      <NPbutton
        icon="plus-circle-outline"
        mode="contained"
        style={styles.NPbutton}
        onPress={() => handleSubmit()}
      >
        Bekräfta
      </NPbutton>
    </View>
  );
};

export default CreateAccountScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    marginHorizontal: 10,
    marginVertical: 25,
    justifyContent: "space-between",
  },
  NPbutton: {
    width: 150,
    borderRadius: 100,
    padding: 10,
    alignSelf: "center",
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
    alignSelf: "center"
  }
});
