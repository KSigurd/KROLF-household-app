import React, { FC } from "react";
import { IconButton } from "react-native-paper";

interface Props {
  onRemove: () => void;
}

const ChoreDeleteButton: FC<Props> = ({onRemove}) => {
  return (
    <IconButton
      icon="delete-outline"
      color="#000"
      size={20}
      onPress={() => onRemove()}
    ></IconButton>
  );
};

export default ChoreDeleteButton;
