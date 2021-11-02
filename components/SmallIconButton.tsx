import React, { FC } from "react";
import { IconButton } from "react-native-paper";
import { StyleSheet } from "react-native";

interface Props {
  onPress: () => void;
  typeOfIcon: string;
}

const SmallIconButton: FC<Props> = ({ onPress, typeOfIcon }) => {
  return (
    <IconButton
      icon={typeOfIcon}
      color="#000"
      size={20}
      style={styles.iconButton}
      onPress={() => onPress()}
    ></IconButton>
  );
};

export default SmallIconButton;

const styles = StyleSheet.create({
  iconButton: {
    padding: 0,
    margin: 0,
  },
});
