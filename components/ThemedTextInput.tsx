import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Surface, TextInput as NPTextInput } from "react-native-paper";
import { TextInputProps } from "react-native-paper/lib/typescript/components/TextInput/TextInput";

interface Props extends Omit<TextInputProps, "theme"> {
  label?: string;
  helperText?: string | false;
}

//GÅR ATT ÅTERANVÄNDA TILL CHORES OCH SKAPA ANVÄNDARE
const ThemedTextInput = ({ label, helperText, ...textInputProps }: Props) => {
  return (
    <View style={styles.root}>
      {label !== "undefined" ? (
        <Text style={styles.text}>{label}</Text>
      ) : (
        <Text style={styles.text}>SKA EJ SYNAS</Text>
      )}
      <Surface style={styles.surface}>
        <NPTextInput
          mode="outlined"
          //mode="flat"
          //theme={{ roundness: 10}}
          theme={{
            roundness: 10,
            colors: {
              placeholder: "transparent",
              text: "black",
              primary: "black",
            },
          }}
          {...textInputProps}
          style={[styles.input, helperText ? { borderColor: "red" } : null]}
          //underlineColor="transparent"
          //underlineColorAndroid="transparent"
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
    marginVertical: 5,
    justifyContent: "space-between",
  },
  input: {
    elevation: 4,
    borderColor: "transparent",
    borderRadius: 10,
    backgroundColor: "white",
  },
  helperText: {
    color: "red",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
  surface: {
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
  },
});
