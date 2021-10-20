import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { RootStackParamList } from "../navigation/RootNavigator";
import { Button as NPbutton, Surface, TextInput } from "react-native-paper";
import { users } from "../data/mockUserData";
import LoginForm from "../components/LoginForm";

type Props = NativeStackScreenProps<RootStackParamList, "CreateHousehold">;

// const handleSubmit = () => {
//   console.log("Verifiera user");

//   //TODO: Validate user. if login succeded, navigate to household
// };

const LoginScreen = ({ navigation }: Props) => {
  return (
    <View style={styles.root}>
      <View>
        <View>
          <LoginForm loginSucceded={() => navigation.navigate("Profile")} />
        </View>
        {/* <Text style={styles.text}>Email</Text>
        <TextInput
          mode="outlined"
          theme={{ roundness: 10 }}
          style={styles.input}
        />

        <Text style={styles.text}>Lösenord</Text>
        <TextInput
          mode="outlined"
          theme={{ roundness: 10 }}
          style={styles.input}
          
        /> */}

        <View style={styles.noAccountContainer}>
          <Text style={styles.noAccountText}>Inget konto? Registrera dig </Text>
          <Text
            style={styles.createAccountText}
            onPress={() => navigation.navigate("CreateAccount")}
          >
            här
          </Text>
        </View>
      </View>
      {/* <NPbutton
        //CHANGE ICON?
        icon="account-key-outline"
        mode="contained"
        style={styles.NPbutton}
        onPress={() => handleSubmit()}
      >
        Logga in
      </NPbutton> */}
      {/* <Button
        title="tryck mig"
        onPress={() => navigation.navigate("Profile")}
      /> */}
      {/* <Button
        title="Create account"
        onPress={() => navigation.navigate("CreateAccount")}
      /> */}
    </View>
  );
};

export default LoginScreen;

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
    marginVertical: 30,
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
  noAccountContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  noAccountText: {
    fontWeight: "bold",
    //alignSelf: "center",
    marginVertical: 30,
  },
  createAccountText: {
    fontWeight: "bold",
    alignSelf: "center",
    color: "#B8B8B8",
  },
  // title: {
  //   fontSize: 18,
  //   fontWeight: "bold",
  //   alignSelf: "center",
  // },
});
