import React, { FC } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Chip, Surface, TouchableRipple } from "react-native-paper";
import { Household } from "../interfaces/households"

interface Props {
    householdObject: Household;
    onChange: (householdId: string) => void;
}

const HouseholdSurface: FC<Props> = ({householdObject, onChange}: Props) => {


  return (
    <View>
        <Surface style={styles.surface}>
            <TouchableRipple style={styles.chip} onPress= {() => {onChange(householdObject.id); console.log(householdObject.name)}}>
          <Text key={householdObject.id} style={styles.surfaceText}>
            {householdObject.name}
          </Text>
          </TouchableRipple>
        </Surface>
    </View>
  );
};

export default HouseholdSurface;

const styles = StyleSheet.create({
  surface: {
    height: "auto",
    borderRadius: 10,
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "center",
    backgroundColor: "white",
    elevation: 4,
    marginVertical: 5,
  },
  surfaceText: {
      flex: 1,
      width: "100%",
      height: "100%",
    fontSize: 18,
    fontWeight: "bold",
    alignItems: "flex-start",
    alignSelf: "flex-start"
  },
  chip: {
      width: "100%",
      padding: 10,
      backgroundColor: "white", 
      height: 50,
      borderRadius: 10
  }
});
