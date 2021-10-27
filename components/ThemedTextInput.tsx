import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TextInput as NPTextInput } from "react-native-paper";
import { TextInputProps } from "react-native-paper/lib/typescript/components/TextInput/TextInput";

interface Props extends Omit<TextInputProps, "theme"> {
  label: string;
  helperText?: string | false;
}

//GÅR ATT ÅTERANVÄNDA TILL CHORES OCH SKAPA ANVÄNDARE
const ThemedTextInput = ({ label, helperText, ...textInputProps }: Props) => {
  return (
    <View style={styles.root}>
      <Text style={styles.text}>{label}</Text>
      <NPTextInput
        mode="outlined"
        theme={{ roundness: 10 }}
        {...textInputProps}
        style={[styles.input, helperText ? { borderColor: "red" } : null]}
      />
      {helperText && <Text style={styles.helperText}>{helperText}</Text>}
    </View>
  );
};

export default ThemedTextInput;

const styles = StyleSheet.create({
  root: {
    marginHorizontal: 10,
    marginVertical: 5,
    justifyContent: "space-between",
  },
  input: {
    elevation: 4,
  },
  helperText: {
    color: "red",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
