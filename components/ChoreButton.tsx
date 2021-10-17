import React, { FC } from "react";
import { View } from "react-native";
import { Button, Paragraph, Text } from "react-native-paper";

interface Props {
  buttonText: string;
  completedBy: string[];
  daysSinceLast: string;
  isLate: boolean;
}

const ChoreButton: FC<Props> = (props: Props) => {
  return (
    <Button>
      <Text>{props.buttonText}</Text>
      {props.completedBy.length ?
      <Text>{props.completedBy}</Text>
      :
      <Text>{props.daysSinceLast}</Text>}
    </Button>
  );
};

export default ChoreButton;
