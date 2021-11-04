import React, { FC } from "react";
import { StyleSheet } from "react-native";
import { Button as NPbutton, Text } from "react-native-paper";

interface Props {
  onPress: () => void;
  isPressed?: boolean;
  typeOfIcon: string;
  alternateTypeOfIcon?: string;
  buttonText: string;
  alternateButtonText?: string;
}

//Reusable component for all main (big) buttons in app
const BigThemedButton: FC<Props> = ({
  onPress,
  isPressed,
  typeOfIcon,
  alternateTypeOfIcon,
  buttonText,
  alternateButtonText,
}) => {
  return (
    <NPbutton
      icon={isPressed ? alternateTypeOfIcon : typeOfIcon}
      labelStyle={{ fontSize: 25 }}
      mode="contained"
      uppercase={false}
      style={styles.NPbutton}
      onPress={() => onPress()}
      color="#fff"
    >
      <Text style={styles.buttonText}>
        {isPressed ? alternateButtonText : buttonText}
      </Text>
    </NPbutton>
  );
};

export default BigThemedButton;

const styles = StyleSheet.create({
  NPbutton: {
    width: 150,
    borderRadius: 100,
    padding: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
});
