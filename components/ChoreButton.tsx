import React, { FC } from "react";
import { Surface, Text, Title, TouchableRipple } from "react-native-paper";
import { HouseholdUser } from "../interfaces/households";
import { styles } from "../styles/styles";

interface Props {
  buttonText: string;
  completedBy: HouseholdUser[];
  daysSinceLast: string;
  isLate: boolean;
}

const ChoreButton: FC<Props> = (props: Props) => {

  return (
    <TouchableRipple style={styles.fullscreenButton} onPress={() => {}}>
      <Surface style={[styles.buttonInnerContainer, styles.buttonOutlined]}>
        <Title style={[styles.choresButtonTitle, styles.buttonText]}>
          {props.buttonText}
        </Title>
        {props.completedBy.length ? (
          <Text
            style={[styles.buttonText, styles.choresButtonAdditions]}
          >
            {props.completedBy.map((user) => user.avatar.avatar)}
          </Text>
        ) : (
          <Surface style={[styles.repeatabilityCircle, props.isLate ? styles.isLateBackground : styles.isNotLateBackground]}>
            <Text style={props.isLate ? styles.isLateText : styles.isNotLateText} >
              {props.daysSinceLast}
            </Text>
          </Surface>
        )}
      </Surface>
    </TouchableRipple>
  );
};

export default ChoreButton;
