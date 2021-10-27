import { MaterialTopTabDescriptorMap, MaterialTopTabNavigationProp } from "@react-navigation/material-top-tabs/lib/typescript/src/types";
import { NavigationState } from "@react-navigation/routers";
import React, { FC } from "react";
import { Animated, StyleSheet, TouchableOpacity, View } from "react-native";
import { IconButton } from "react-native-paper";
import { TabParamList } from "../navigation/ChoresStatisticsNavigator";

type Props = {
  state: NavigationState;
  descriptors: MaterialTopTabDescriptorMap;
  navigation: MaterialTopTabNavigationProp<TabParamList>;
}

const CustomTopTabBar : FC<Props> = ({state, descriptors, navigation}) => {
  //Define the values for getting specific index and routes. (To be able to shift between the right screens, in the right order.)
  const currentIndex = state.index;
  const firstRoute = state.routes[0];
  const lastRoute = state.routes[state.routes.length - 1];
  const prevRoute = state.routes[currentIndex - 1];
  const currentRoute = state.routes[currentIndex];
  const nextRoute = state.routes[currentIndex + 1];

  //Enable usage of options to get/display the title for current/focused tab
  const { options } = descriptors[currentRoute.key];

  //OnPress functions for arrow buttons
  const onLeftPress = () => {
    prevRoute
      ? navigation.navigate(prevRoute.name as keyof TabParamList)
      : navigation.navigate(lastRoute.name as keyof TabParamList);
  };

  const onRightPress = () => {
    nextRoute
      ? navigation.navigate(nextRoute.name as keyof TabParamList)
      : navigation.navigate(firstRoute.name as keyof TabParamList);
  };

  return (
    <View style={styles.root}>
      <TouchableOpacity onPress={onLeftPress}>
        <IconButton icon="chevron-left" />
      </TouchableOpacity>
      <Animated.Text style={[styles.title]}>{options.title}</Animated.Text>
      <TouchableOpacity onPress={onRightPress}>
        <IconButton icon="chevron-right" />
      </TouchableOpacity>
    </View>
  );
};

export default CustomTopTabBar;

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 15,
  },
});
