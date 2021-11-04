import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Surface, Title, TouchableRipple } from "react-native-paper";

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
      <View style={stylesLocal.surfaceOne}>
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
      <Surface style={stylesLocal.surfaceTwo}>
        {isRepeatabilityValuePressed ? (
          <TouchableRipple
            borderless={true}
            style={stylesLocal.touchableRipple}
            onPress={() =>
              isRepeatabilityValuePressed
                ? setIsRepeatabilityValuePressed(false)
                : setIsRepeatabilityValuePressed(true)
            }
          >
            <View style={stylesLocal.repeateContainer}>
              <Text style={{fontSize: 18, fontWeight: "bold"}}>
                Återkommer:
              </Text>
              <View style={stylesLocal.repeatBox}>
                <Text style={{ fontSize: 16 }}>var </Text>
                <Text
                  style={stylesLocal.repeatabilityValue}
                >
                  {repeatability}
                </Text>
                <Text style={{ fontSize: 16 }}> dag</Text>
              </View>
            </View>
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
  repeatBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    flex: 1,
  },
  surfaceOne: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
  surfaceTwo: {
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 18,
    marginBottom: 18,
    marginHorizontal: 10,
    borderRadius: 10,
    elevation: 4,
  },
  touchableRipple: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  repeateContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
  },  
});
