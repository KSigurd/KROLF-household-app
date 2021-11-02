import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import CreateChoreInfo from "../components/CreateChoreInfo";
import { RootStackParamList } from "../navigation/RootNavigator";
import { selectChoreById } from "../store/chore/choreSelectors";
import { useAppSelector } from "../store/store";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "EditChoreModalScreen"
>;

const EditChoreModalScreen = ({ navigation, route }: Props) => {
  const onClosed = () => {
    navigation.goBack();
  };

  const choreId = route.params.choreId;

  const chore = useAppSelector(selectChoreById(choreId));

  if (!chore) return null; 

  return (
    <View style={styles.outerContainer}>
      <SafeAreaView>
        <View style={styles.topCointainer}>
          <Text style={styles.titleText}>Ändra en syssla</Text>
        </View>
        <View style={styles.centerContainer}>
          <CreateChoreInfo onClosed={onClosed} typeOfInfo="edit" activeChore={chore} />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default EditChoreModalScreen;

const styles = StyleSheet.create({
  topCointainer: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    height: 60,
    backgroundColor: "white",
    paddingTop: 15,
  },
  centerContainer: {
    backgroundColor: "#f2f2f2",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  outerContainer: {
    backgroundColor: "#000000AA",
    padding: 8,
    flex: 1,
    justifyContent: "center",
  },
  titleText: {
    fontSize: 20,
    textAlign: "center",
  },
});
