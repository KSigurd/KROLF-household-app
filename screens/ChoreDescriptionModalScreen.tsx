import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import ChoreDescription from "../components/ChoreDescription";
import { Chore } from "../interfaces/chore";
import { TabParamList } from "../navigation/ChoresStatisticsNavigator";

type Props = NativeStackScreenProps<TabParamList>;

const CreateChoreModalScreen = ({ navigation, route }: Props) => {
  const onClosed = () => {
    navigation.navigate("Home");
  };

  const chore = route.params;

  console.log(chore);
  return (
    <View style={styles.outerContainer}>
      <SafeAreaView>
        <View style={styles.topCointainer}>
          {/* TODO: MUPPAR UR. SÄTT EN GUBBE PÅ DET */}
          <Text style={styles.titleText}>{chore.title}</Text>
        </View>
        <View style={styles.centerContainer}>
          {/* TODO: MUPPAR UR. SÄTT EN GUBBE PÅ DET */}
          <ChoreDescription onClosed={onClosed} chore={chore} />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default CreateChoreModalScreen;

const styles = StyleSheet.create({
  modalBox: {
    flex: 1,
    marginHorizontal: 25,
    marginVertical: 25,
  },
  topCointainer: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    height: 60,
    backgroundColor: "white",
    // paddingLeft: 20,
    paddingTop: 15,
  },
  centerContainer: {
    backgroundColor: "#f2f2f2",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  buttonContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
    height: 60,
    bottom: 0,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  titleText: {
    fontSize: 20,
    textAlign: "center",
  },
  outerContainer: {
    backgroundColor: "#000000AA",
    padding: 8,
    flex: 1,
    justifyContent: "center",
  },
});
