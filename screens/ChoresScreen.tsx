import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { View, Text, Button } from "react-native";
import { RootStackParamList } from "../navigation/RootNavigator";

type Props = NativeStackScreenProps<RootStackParamList, "Profile">;

const ChoresScreen = ({navigation}: Props) => {
  return (
    <View>
      <Text>CHORES SCREEN</Text>
      <Button
        title="tryck mig"
        onPress={() => navigation.navigate("Profile")}
      /> 
    </View>
  );
};

export default ChoresScreen;
