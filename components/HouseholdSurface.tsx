import React, { FC } from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  Chip,
  IconButton,
  Modal,
  Surface,
  TextInput,
  TouchableRipple,
} from "react-native-paper";
import { Provider } from "react-native-paper/lib/typescript/core/settings";
import { Household } from "../interfaces/households";
import EditHouseholdModal from "./EditHouseholdModal";

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
          style={styles.chip}
          onPress={() => {
            onChange(householdObject.id);
          }}
        >
          <Surface style={styles.innerContainer}>
            <Text key={householdObject.id} style={styles.surfaceText}>
              {householdObject.name}
            </Text>
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
    alignSelf: "flex-start",
  },
  chip: {
    justifyContent: "space-between",
    width: "100%",
    padding: 10,
    backgroundColor: "white",
    height: 50,
    borderRadius: 10,
  },
  innerContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
});
