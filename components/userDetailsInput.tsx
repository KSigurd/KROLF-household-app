import React from "react";
import {
  View,
  Text,
  TextInputProps,
  StyleSheet,
  TextInput as NativeTextInput,
} from "react-native";

import { TextInput as NPTextInput } from "react-native-paper";
interface Props extends TextInputProps {
  label: string;
  helperText?: string | false;
}

// component that returns a cusomized message from the user to be used in the SMS
const UserDetailsInput = ({ label, helperText, ...textInputProps }: Props) => {
  return (
    <View style={styles.root}>
      <Text style={styles.text}>
        {/* <Text style={[styles.label, helperText ? { color: "blue" } : null]}> */}
        {label}
      </Text>
      <NativeTextInput
        // mode="outlined"
        // theme={{ roundness: 10 }}
        {...textInputProps}
        style={[styles.input, helperText ? { borderColor: "red" } : null]}
      />
      {helperText && <Text style={styles.helperText}>{helperText}</Text>}
    </View>
  );
};

export default UserDetailsInput;

const styles = StyleSheet.create({
  root: {
    marginHorizontal: 10,
    marginVertical: 25,
    justifyContent: "space-between",
  },
  label: {
    fontSize: 15,
    fontWeight: "500",
    color: "white",
  },
  helperText: {
    color: "red",
  },
  input: {
    elevation: 4,
    // borderColor: "black",
    // borderStyle: "solid",
    height: 40,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 12,
    marginBottom: 5,
  },
});
