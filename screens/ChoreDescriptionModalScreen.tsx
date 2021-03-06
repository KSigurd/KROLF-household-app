import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import ChoreDescription from "../components/ChoreDescription";
import { RootStackParamList } from "../navigation/RootNavigator";
import { selectChoreById } from "../store/chore/choreSelectors";
import { useAppSelector } from "../store/store";

type Props = NativeStackScreenProps<RootStackParamList, "ChoreDescriptionModalScreen">;

const ChoreDescriptionModalScreen = ({ navigation, route }: Props) => {
  const onClosed = () => {
    navigation.goBack();
  };

  const choreId = route.params;

  const chore = useAppSelector(selectChoreById(String(choreId)));
  if(!chore) return null; 

  return (
    <View style={styles.outerContainer}>
      <SafeAreaView>
        <View style={styles.topCointainer}>
          <Text style={styles.titleText}>{chore.title}</Text>
        </View>
        <View style={styles.centerContainer}>
          <ChoreDescription onClosed={onClosed} chore={chore} />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default ChoreDescriptionModalScreen;

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
