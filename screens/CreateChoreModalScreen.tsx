import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import CreateChoreInfo from "../components/CreateChoreInfo";
import { TabParamList } from "../navigation/ChoresStatisticsNavigator";
import { RootStackParamList } from "../navigation/RootNavigator";
import { selectChoreById } from "../store/chore/choreSelectors";
import { useAppSelector } from "../store/store";

type Props = NativeStackScreenProps<RootStackParamList, "CreateChoreModalScreen">;

const CreateChoreModalScreen = ({ navigation }: Props) => {
  const onClosed = () => {
    navigation.goBack();
  };

  // const choreId = route.params.choreId;

  // const chore = useAppSelector(selectChoreById(choreId));

  // if (!chore) return null; 


  return (
    <View style={styles.outerContainer}>
      <SafeAreaView>
        <View style={styles.topCointainer}>
          <Text style={styles.titleText}>Skapa en ny syssla</Text>
        </View>
        <View style={styles.centerContainer}>
          <CreateChoreInfo onClosed={onClosed} />
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
