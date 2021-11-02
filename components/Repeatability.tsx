import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Surface, Title, TouchableRipple } from "react-native-paper";
import { styles } from "../styles/styles";

interface Props {
  initialValue?: number;
  getRepeatability: (nummer: number) => void;
}

const Repeatability = ({ initialValue, getRepeatability }: Props) => {
  const [isRepeatabilityValuePressed, setIsRepeatabilityValuePressed] =
    useState(true);
  const [repeatability, setRepeatability] = useState<number>(initialValue || 7);

  const displayRepeatabilityValues = () => {
    let repeatabilityNumbers: number[] = [];

    for (let i = 1; i < 31; i++) {
      repeatabilityNumbers.push(i);
    }

    return (
      <View style={[{ flexDirection: "row", flex: 1 }]}>
        {repeatabilityNumbers.map((value, index) => {
          return (
            <Text
              key={index}
              style={[
                stylesLocal.repeatabilityNumbers,
                value === 30 ? { marginRight: 10 } : { marginRight: 0 },
              ]}
              onPress={() => {
                getRepeatability(value),
                  setRepeatability(value),
                  setIsRepeatabilityValuePressed(true);
              }}
            >
              {value}
            </Text>
          );
        })}
      </View>
    );
  };

  return (
    <Surface style={[styles.fullscreenButton, styles.buttonOutlined]}>
      {isRepeatabilityValuePressed ? (
        <TouchableRipple
          borderless={true}
          style={styles.fillParent}
          onPress={() =>
            isRepeatabilityValuePressed
              ? setIsRepeatabilityValuePressed(false)
              : setIsRepeatabilityValuePressed(true)
          }
        >
          <Surface style={styles.buttonInnerContainer}>
            <Title style={[styles.choresButtonTitle, styles.buttonText]}>
              Återkommer:
            </Title>
            <Text style={{ fontSize: 16 }}>var </Text>
            <Text
              style={[
                styles.buttonText,
                styles.choresButtonAdditions,
                stylesLocal.repeatabilityValue,
              ]}
            >
              {repeatability}
            </Text>
            <Text style={{ fontSize: 16 }}> dag</Text>
          </Surface>
        </TouchableRipple>
      ) : (
        <ScrollView
          horizontal={true}
          style={{
            flexDirection: "row",
          }}
        >
          {displayRepeatabilityValues()}
        </ScrollView>
      )}
    </Surface>
  );
};

export default Repeatability;

const stylesLocal = StyleSheet.create({
  repeatabilityValue: {
    backgroundColor: "#cd5d6f",
    color: "white",
    borderRadius: 100,
    fontSize: 18,
    width: 30,
    height: 30,
    textAlign: "center",
    textAlignVertical: "center",
  },
  repeatabilityNumbers: {
    color: "black",
    fontSize: 18,
    marginLeft: 10,
    height: 70,
    textAlign: "center",
    textAlignVertical: "center",
  },
});