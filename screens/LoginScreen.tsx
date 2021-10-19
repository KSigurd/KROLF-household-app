import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackParamList } from "../navigation/RootNavigator";

type Props = NativeStackScreenProps<RootStackParamList, "CreateHousehold">;

const LoginScreen = ({ navigation }: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>LOGIN SCREEN</Text>
      <Button
        title="tryck mig"
        onPress={() => navigation.navigate("Profile")}
      />
      <Button
        title="Create household"
        onPress={() => navigation.navigate("CreateHousehold")}
      />
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {},
});