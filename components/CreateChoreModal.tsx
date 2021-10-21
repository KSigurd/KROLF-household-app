import React, { FC } from "react";
import { Modal, Portal, Text, Button, Provider } from "react-native-paper";
import { StyleSheet, View } from "react-native";

interface Props {
  closeCreateModal: () => void;
  // setVisibleModal: boolean;
  // setVisibleModal: (arg: boolean) => void;
}


const CreateChore = ({closeCreateModal}: Props) => {
  
  // const hideModal = () => {
  //   setVisibleModal = !setVisibleModal;
  // }
  // const showModal = () => {
  //   setVisibleModal = !setVisibleModal;
  // }
  // const [visible, setVisible] = React.useState(false);

  // const showModal = () => setVisible(true);
  // const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: "white", padding: 20 };

  return (
   
    <Provider>
      
      <Portal>
        <Modal
        style ={styles.test}
          visible={setVisibleModal}
          onDismiss={() => {closeCreateModal()}}
          contentContainerStyle={containerStyle}
        >
          <Text>Example Modal. Click outside this area to dismiss.</Text>
        </Modal>
      </Portal>
    </Provider>
  );
};

// export default CreateChore;

const styles = StyleSheet.create({
  test: {
    // position: "absolute",
    // top: 0,
    // flex: 1,
    backgroundColor: "red",
    zIndex: 10,
    width: "90%",
    left: "5%",
    top: -30,
  },
});
