import React, { FC } from "react";
import { Modal, Portal, Text, Provider } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { Button as NPbutton } from "react-native-paper";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigator";
import { TabParamList } from "../navigation/ChoresStatisticsNavigator";

type Props = NativeStackScreenProps<TabParamList>;

const CreateChoreModalScreen = ({ navigation }: Props) => {
  //   const hideModal = () => {
  //     setVisibleModal = !setVisibleModal;
  //   };
  //   const showModal = () => {
  //     setVisibleModal = !setVisibleModal;
  //   };
  // const [visible, setVisible] = React.useState(false);

  // const showModal = () => setVisible(true);
  // const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: "white", padding: 20 };

  const onSave = () => {
    console.log("Saves");
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
          // contentContainerStyle={containerStyle}
        >
          <View style={styles.outerContainer}>
            <View style={styles.topCointainer}>
              <Text style={styles.titleText}>Skapa en ny syssla</Text>
            </View>
            {/* <View style={styles.centerContainer}>
              <Text style={styles.testText}>
                Example Modal. Click outside this area to dismiss.
              </Text>
            </View> */}
            <View style={styles.buttonContainer}>
              <NPbutton
                icon="plus-circle-outline"
                mode="text"
                color="black"
                style={styles.NPbutton}
                onPress={() => onSave()}
              >
                Spara
              </NPbutton>

              <NPbutton
                icon="close-circle-outline"
                mode="text"
                color="black"
                style={styles.NPbutton}
                onPress={() => navigation.navigate("Chores")}
              >
                Stäng
              </NPbutton>
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
    // flex: 1,
    // backgroundColor: "purple",
    backgroundColor: "white",
    // backgroundColor: "rgba(255, 0, 0, 0.1);",
    // width: "100%",
    // height: "100%",
    top: -25,
    margin: 0,
    padding: 15,
    // justifyContent: "center",
    // alignItems: "center"
    // elevation: 20
  },

  NPbutton: {
    width: 150,
    borderRadius: 100,
    padding: 10,
    // backgroundColor: "transparent",
    color: "black",
  },

  topCointainer: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    height: 60,
    // backgroundColor: "red",
    backgroundColor: "#ffffff",
    paddingLeft: 20,
    paddingTop: 15,
  },

  centerContainer: {
    // flex: 1,
    // backgroundColor: "#f2f2f2",
    backgroundColor: "blue",
  },

  buttonContainer: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    // backgroundColor: "lightblue",
    justifyContent: "space-between",
    // width: 100,
    width: "100%",
    alignItems: "center",
    height: 60,
    position: "absolute",
    bottom: 0,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  testText: {
    backgroundColor: "pink",
  },
  titleText: {
    fontSize: 20,
  },
  outerContainer: {
    backgroundColor: "#f2f2f2",
    // backgroundColor: "lightgreen",
    // backgroundColor: "white",
    // flex: 1,
    width: "100%",
    height: "100%",
    // borderBottomLeftRadius: 25,
    // borderBottomRightRadius: 25,
    borderRadius: 25,

    // shadowColor: "black",
    // shadowRadius: 10,
    // shadowOpacity: 50,
    // left: 0,
    elevation: 7,
    // position: "absolute"
  },
});
