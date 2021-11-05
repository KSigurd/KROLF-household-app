import React, { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  IconButton, Surface, TouchableRipple
} from "react-native-paper";
import { Household } from "../interfaces/households";

interface Props {
  householdObject: Household;
  isAdmin: boolean | undefined;
  onChange: (householdId: string) => void;
  showModal: (houshold: Household) => void;
}

const HouseholdSurface: FC<Props> = ({
  showModal,
  isAdmin,
  householdObject,
  onChange,
}: Props) => {
  return (
    <View>
      <Surface style={styles.surface}>
        <TouchableRipple
        borderless={true}
          style={styles.chip}
          onPress={() => {
            onChange(householdObject.id);
          }}
        >
            <Text key={householdObject.id} style={styles.surfaceText}>
              {householdObject.name}
            </Text>
            </TouchableRipple>
            {isAdmin ? (
              <IconButton
                icon="pencil-outline"
                size={20}
                onPress={() => showModal(householdObject)}
              />
            ) : (
              <View />
            )}
      </Surface>
    </View>
  );
};

export default HouseholdSurface;

const styles = StyleSheet.create({
  surface: {
    height: "auto",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "white",
    elevation: 4,
    marginVertical: 5,
  },
  surfaceText: {
    flex: 1,
    fontSize: 18,
    fontWeight: "bold",
  },
  chip: {
    flex: 1,
    padding: 10,
    backgroundColor: "white",
    height: 50,
    borderRadius: 10,
    justifyContent: "center",

  },
  innerContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
});
