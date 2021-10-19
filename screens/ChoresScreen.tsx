import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { View, Text, Button } from "react-native";
import { RootStackParamList } from "../navigation/RootNavigator";
import { useAppSelector } from "../store/store";

type Props = NativeStackScreenProps<RootStackParamList, "Profile">;

// export const selectChores = (state: RootState) => {
//   // const result = state.chore.chores.filter();
//   // if {} else {}
//   // return chores;
// }

const ChoresScreen = ({navigation}: Props) => {
  // const chores = useAppSelector(selectChores)

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
