import React, { FC } from "react";
import { StyleSheet } from "react-native";
import { IconButton } from "react-native-paper";

interface Props {
  onRemove: () => void;
}

const ChoreDeleteButton: FC<Props> = ({ onRemove }) => {
  return (
    <IconButton
      icon="delete-outline"
      color="#000"
      size={20}
      style={styles.iconButton}
      onPress={() => onRemove()}
    ></IconButton>
  );
};

export default ChoreDeleteButton;

const styles = StyleSheet.create({
  iconButton: {
    padding: 0,
    margin: 0
  },
});
