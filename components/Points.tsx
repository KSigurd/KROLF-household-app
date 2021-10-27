import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Card, Surface, TouchableRipple } from "react-native-paper";
import { styles } from "../styles/styles";

interface Props {
  onChange: (points: number) => void;
}
const Points = ({ onChange }: Props) => {
  const [isEnergyValuePressed, setIsEnergyvaluePressed] = useState(true);
  const [energyPoints, setEnergyPoints] = useState<number>(2);

  const values = [
    { points: 1, color: "#f2f2f2" },
    { points: 2, color: "#f1f0f0" },
    { points: 4, color: "#e9e7e7" },
    { points: 6, color: "#e1e1e1" },
    { points: 8, color: "#d9d9d9" },
  ];

  const displayEnergyValues = () => {
    return (
      <Card.Actions style={stylesLocal.cardAction}>
        <View
          style={{
            width: "100%",
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          {values.map((value, index) => {
            return (
              <Text
                key={index}
                style={[
                  stylesLocal.energyValues,
                  { backgroundColor: value.color },
                ]}
                onPress={() => {
                  onChange(value.points), setEnergyPoints(value.points);
                  setIsEnergyvaluePressed(true);
                }}
              >
                {value.points}
              </Text>
            );
          })}
        </View>
      </Card.Actions>
    );
  };

  return (
    <View>
      <Surface style={[styles.fullscreenButton, styles.buttonOutlined]}>
        <TouchableRipple
          borderless={true}
          style={styles.fillParent}
          onPress={() =>
            isEnergyValuePressed
              ? setIsEnergyvaluePressed(false)
              : setIsEnergyvaluePressed(true)
          }
        >
          {isEnergyValuePressed ? (
            <View style={stylesLocal.cardRow}>
              <Card.Title
                style={stylesLocal.cardTitle}
                title="Värde: "
                subtitle="Hur energikrävande är sysslan?"
              />
              <Card.Actions style={stylesLocal.cardAction}>
                <Text style={stylesLocal.energyValue}>{energyPoints}</Text>
              </Card.Actions>
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
    </View>
  );
};

export default Points;

const stylesLocal = StyleSheet.create({
  cardRow: {
    flexDirection: "row",
    alignContent: "space-between",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "white",
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 10,
    elevation: 4,
  },
  cardAction: {},
  cardTitle: {
    flex: 1,
  },
  energyValue: {
    backgroundColor: "#f2f2f2",
    color: "black",
    borderRadius: 100,
    fontSize: 18,
    // DESSA TVÅ UNDER HÄR VILL JAG ÄNDRA TILL 30... FILIP
    width: 35,
    height: 35,
    textAlign: "center",
    textAlignVertical: "center",
  },
  energyValues: {
    color: "black",
    borderRadius: 100,
    fontSize: 18,
    width: 50,
    height: 50,
    textAlign: "center",
    textAlignVertical: "center",
  },
});
