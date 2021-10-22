import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { RootStackParamList } from "../navigation/RootNavigator";
import LoginForm from "../components/LoginForm";
import { Title } from "react-native-paper";
import { Button as NPbutton } from "react-native-paper";


type Props = NativeStackScreenProps<RootStackParamList, "CreateHousehold">;

const LoginScreen = ({ navigation }: Props) => {
  return (
    <View style={styles.root}>
      <LoginForm loginSucceded={() => navigation.navigate("Profile")} />
      <View style={styles.noAccountContainer}>
        <Text style={styles.noAccountText}>Inget konto? Registrera dig </Text>
        <Text
          style={styles.createAccountText}
          onPress={() => navigation.navigate("CreateAccount")}
        >
          här
        </Text>

      </View>

      <NPbutton
          mode="contained"
          onPress={() => navigation.navigate("ChoresStatisticsNavigator")}
        >
          Gå till statistik
        </NPbutton>
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
  noAccountContainer: {
    flexDirection: "row",
    justifyContent: "center",   
  },
  noAccountText: {
    fontWeight: "bold",
  },
  createAccountText: {
    fontWeight: "bold",
    alignSelf: "center",
    color: "#B8B8B8",
  },
});
