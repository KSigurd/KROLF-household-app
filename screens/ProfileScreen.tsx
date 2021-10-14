import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { View, Text, Button } from "react-native";
import { RootStackParamList } from "../navigation/RootNavigator";

type Props = NativeStackScreenProps<RootStackParamList, "ChoresStatisticsNavigator">;

const ProfileScreen = ({navigation}: Props) => {
  return (
    <View>
      <Text>PROFILE SCREEN</Text>
      <Button
        title="tryck mig"
        onPress={() => navigation.navigate("ChoresStatisticsNavigator")}
      /> 
    </View>
  );
};

export default ProfileScreen;
