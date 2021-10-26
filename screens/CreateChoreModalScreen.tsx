import React, { FC } from "react";
import { Modal, Portal, Text, Provider } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { Button as NPbutton } from "react-native-paper";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigator";
import { TabParamList } from "../navigation/ChoresStatisticsNavigator";
import CreateChoreInfo from "../components/CreateChoreInfo";

type Props = NativeStackScreenProps<TabParamList>;

const CreateChoreModalScreen = ({ navigation }: Props) => {
  const onClosed = () => {
    navigation.navigate("Chores");
  };

  return (
    <Provider>
      <Portal>
        <Modal
          style={styles.modalBox}
          visible={true}
          onDismiss={() => {
            navigation.navigate("Chores");
          }}
        >
          <View style={styles.outerContainer}>
            <View style={styles.topCointainer}>
              <Text style={styles.titleText}>Skapa en ny syssla</Text>
            </View>
            <View style={styles.centerContainer}>
              <CreateChoreInfo onClosed={onClosed} />
            </View>
          </View>
        </Modal>
      </Portal>
    </Provider>
  );
};

export default CreateChoreModalScreen;

const styles = StyleSheet.create({
  modalBox: {
    flex: 1,
    marginHorizontal: 25,
    marginBottom: 25,
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
    elevation: 20,
  },
});
