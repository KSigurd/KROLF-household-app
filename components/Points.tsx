import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Surface, TouchableRipple } from "react-native-paper";

interface Props {
  initialValue?: number;
  onChange: (points: number) => void;
}
const Points = ({ onChange, initialValue }: Props) => {
  const [isEnergyValuePressed, setIsEnergyvaluePressed] = useState(true);
  const [energyPoints, setEnergyPoints] = useState<number>(initialValue || 2);

  const values = [
    { points: 1, color: "#f2f2f2" },
    { points: 2, color: "#f1f0f0" },
    { points: 4, color: "#e9e7e7" },
    { points: 6, color: "#e1e1e1" },
    { points: 8, color: "#d9d9d9" },
  ];

  const displayEnergyValues = () => {
    return (
      <Surface
        style={stylesLocal.surfaceOne}
      >
        {values.map((value, index) => {
          return (
            <View 
              style={stylesLocal.energyValuesBox}
              key={index}
            >
              <View
              key={index}
                style={[
                  stylesLocal.energyValues,
                  { backgroundColor: value.color },
                ]}
              >
                <Text
                  key={index}
                  style={stylesLocal.pointOptionsText}
                  onPress={() => {
                    onChange(value.points), setEnergyPoints(value.points);
                    setIsEnergyvaluePressed(true);
                  }}
                >
                  {value.points}
                </Text>
              </View>
            </View>
          );
        })}
      </Surface>
    );
  };

  return (
    <Surface style={stylesLocal.surfaceTwo}>
      <TouchableRipple
        borderless={true}
        style={stylesLocal.fillParent}
        onPress={() =>
          isEnergyValuePressed
            ? setIsEnergyvaluePressed(false)
            : setIsEnergyvaluePressed(true)
        }
      >
        {isEnergyValuePressed ? (
          <View
            style={[stylesLocal.pointContainer, { backgroundColor: "transparent" }]}
          >
            <View
              style={[
                stylesLocal.pointBox,
                {
                  backgroundColor: "transparent",
                  alignItems: "flex-start",
                  justifyContent: "center",
                  paddingLeft: 20,
                },
              ]}
            >
              <Text style={stylesLocal.pointTextTitle}>Värde:</Text>
              <Text style={stylesLocal.pointTextSubtitle}>
                hur energikrävande är sysslan?
              </Text>
            </View>

            <View style={stylesLocal.chosenEnergyValueContainer}>
              <View style={stylesLocal.chosenEnergyValue}>
                <Text style={stylesLocal.chosenEnergyValueText}>
                  {energyPoints}
                </Text>
              </View>
            </View>
          </View>
        ) : (
          <View
            style={{
              flexDirection: "row",
            }}
          >
            {displayEnergyValues()}
          </View>
        )}
      </TouchableRipple>
    </Surface>
  );
};

export default Points;

const stylesLocal = StyleSheet.create({
  pointContainer: {
    flexDirection: "row",
    alignContent: "space-between",
    justifyContent: "center",
    height: "100%",
  },
  chosenEnergyValueContainer: {
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  pointBox: {
    flex: 1,
  },
  chosenEnergyValue: {
    backgroundColor: "#f2f2f2",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    width: 35,
    height: 35,
  },
  chosenEnergyValueText: {
    color: "black",
    fontSize: 18,
  },
  energyValues: {
    borderRadius: 100,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  pointOptionsText: {
    color: "black",
    fontSize: 18,
  },
  pointTextTitle: {
    fontSize: 18,
  },
  pointTextSubtitle: {
    fontSize: 11,
  },
  surfaceOne: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    alignContent: "center",
  },
  surfaceTwo: {
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 8,
    borderRadius: 10,
    elevation: 4,
    marginHorizontal: 10,
  },
  energyValuesBox: {
    height: 60,
    justifyContent: "center",
  },
  fillParent: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
});
