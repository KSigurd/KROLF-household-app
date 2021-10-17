import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { FC } from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-paper";
import ChoreButton from "../components/ChoreButton";
import { RootStackParamList } from "../navigation/RootNavigator";

type Props = NativeStackScreenProps<RootStackParamList, "Profile">;

const ChoresScreen: FC<Props> = ({ navigation }: Props) => {
  return (
    <View>
      <Text>CHORES SCREEN</Text>
      <ChoreButton buttonText="Laga Mat" completedBy={["e"]} daysSinceLast={"y"} isLate={false}>
        </ChoreButton>
    </View>
  );
};

export default ChoresScreen;
