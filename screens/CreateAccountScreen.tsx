import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { View, Text, Button } from "react-native";
import { RootStackParamList } from "../navigation/RootNavigator";

type Props = NativeStackScreenProps<RootStackParamList, "Profile">;

const CreateAccountScreen = ({navigation}: Props) => {
  return (
    <View>
      <Text>Create Account SCREEN</Text>
      <Button
        title="tryck mig"
        onPress={() => navigation.navigate("Profile")}
      /> 
    </View>
  );
};

export default CreateAccountScreen;
