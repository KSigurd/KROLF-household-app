import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import RootNavigator from "./navigation/RootNavigator";
import store from "./store/store";
import { Provider as ReduxProvider } from 'react-redux';

export default function App() {
  return (
    <ReduxProvider store={store}>
      <SafeAreaProvider>
        <StatusBar style="auto" />
        <RootNavigator />
      </SafeAreaProvider>
    </ReduxProvider>
  );
}
