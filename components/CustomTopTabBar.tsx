import { MaterialTopTabDescriptorMap } from "@react-navigation/material-top-tabs/lib/typescript/src/types";
import { NavigationState } from "@react-navigation/routers";
import React, { Key } from "react";
import { Animated, StyleSheet, TouchableOpacity, View } from "react-native";
import { IconButton } from "react-native-paper";
import { TabParamList } from "../navigation/ChoresStatisticsNavigator";

type Props = {
  state: NavigationState;
  descriptors: MaterialTopTabDescriptorMap;
  // navigation: MaterialTopTabNavigationProp<{}>;
  navigation: any;
  position: any;
  routeName: TabParamList
}


const CustomTopTabBar = (props: Props) => {
  //Define the values for index and routes. To be able to shift between the right screens, in the right order.
  const currentIndex = props.state.index;
  const prevRoute = props.state.routes[currentIndex - 1];
  const currentRoute = props.state.routes[currentIndex];
  const nextRoute = props.state.routes[currentIndex + 1];

  //Enable usage of options to get/display the title for current/focused tab
  const { options } = props.descriptors[currentRoute.key];

  //OnPress functions for arrow buttons
  const onLeftPress = () => {
    prevRoute
      ? props.navigation.navigate({
          name: prevRoute.name,
        })
      : props.navigation.navigate({
          name: "LastStatistics"
        });
  };

  const onRightPress = () => {
    nextRoute
      ? props.navigation.navigate({
          name: nextRoute.name,
        })
      : props.navigation.navigate({
          name: "Home",
        });
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
