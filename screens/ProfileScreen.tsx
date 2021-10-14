import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { View, Text, Button } from "react-native";
import { RootStackParamList } from "../navigation/RootNavigator";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

const ProfileScreen = ({navigation}: Props) => {
  return (
    <View>
      <Text>PROFILE SCREEN</Text>
      <Button
        title="tryck mig"
        onPress={() => navigation.navigate("Login")}
      /> 
    </View>
  );
};

export default ProfileScreen;
