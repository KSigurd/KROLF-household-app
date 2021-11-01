import React, { FC } from "react";
import { IconButton } from "react-native-paper";
import { StyleSheet } from "react-native";

interface Props {
  onEdit: () => void;
}

const ChoreEditButton: FC<Props> = ({ onEdit }) => {
  return (
    <IconButton
      icon="pencil-outline"
      color="#000"
      size={20}
      style={styles.iconButton}
      onPress={() => onEdit()}
    ></IconButton>
  );
};

export default ChoreEditButton;

const styles = StyleSheet.create({
  iconButton: {
    padding: 0,
    margin: 0,
  },
});
