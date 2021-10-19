import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { View, Text, Button, StyleSheet, FlatList } from "react-native";
import {
  Surface,
  Button as NPbutton,
  TouchableRipple,
} from "react-native-paper";
import { lightBlue100 } from "react-native-paper/lib/typescript/styles/colors";
import AddHouseholdButton from "../components/AddHouseholdButton";
import HouseholdSurface from "../components/HouseholdSurface";
import JoinHouseholdButton from "../components/JoinHouseHoldButton";
import { households } from "../data/mockHouseholdData";
import { RootStackParamList } from "../navigation/RootNavigator";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "ChoresStatisticsNavigator"
>;

const ProfileScreen = ({ navigation }: Props) => {
  return (
    <View style={styles.root}>
      <View>
        <Text style={styles.title}>Välkommen *användarnamn*</Text>

        <View>
          <Text style={styles.title}>Välj hushåll:</Text>
          {households.map((prop, key) => {
            return <HouseholdSurface key={key} householdObject={prop} />;
          })}
        </View>
      </View>

      <View style={styles.NPbuttonRoot}>
        <AddHouseholdButton/>
        <JoinHouseholdButton/>
      </View>

      <Button
        title="tryck mig vidare"
        onPress={() => navigation.navigate("ChoresStatisticsNavigator")}
      />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    marginHorizontal: 10,
    marginVertical: 25,
    justifyContent: "space-between",
  },
  NPbuttonRoot: {
    alignSelf: "center",
    justifyContent: "space-between",
    width: "100%",
    flexDirection: "row",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
    marginVertical: 20,
  },
  NPbutton: {
    width: 150,
    borderRadius: 100,
    padding: 10,
  },
});
