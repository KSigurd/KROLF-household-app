import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Surface, TextInput as NPTextInput } from "react-native-paper";
import { TextInputProps } from "react-native-paper/lib/typescript/components/TextInput/TextInput";

interface Props extends Omit<TextInputProps, "theme"> {
  label?: string;
  helperText?: string | false;
}

//Reusable text input component
const ThemedTextInput = ({ value, label, helperText, ...textInputProps }: Props) => {
  return (
    <View style={styles.root}>
      {label ? <Text style={styles.text}>{label}</Text> : null}
      <Surface style={styles.surface}>
        <NPTextInput
          mode="outlined"
          theme={{
            roundness: 10,
            colors: {
              placeholder: "transparent",
              text: "black",
              primary: "black",
            },
          }}
          value={value}
          {...textInputProps}
          style={[styles.input, helperText ? { borderColor: "red" } : null]}
        />
      </Surface>

      {helperText && <Text style={styles.helperText}>{helperText}</Text>}
    </View>
  );
};

export default ThemedTextInput;

const styles = StyleSheet.create({
  root: {
    marginHorizontal: 10,
    marginVertical: 8,
  },
  input: {
    borderColor: "transparent",
    borderRadius: 10,
    backgroundColor: "white",
    marginTop: -6,
  },
  helperText: {
    color: "red",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
  surface: {
    marginTop: 12,
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    elevation: 4,
  },
});
