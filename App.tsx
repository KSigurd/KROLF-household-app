import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import RootNavigator from "./navigation/RootNavigator";
import store from "./store/store";
import { Provider as ReduxProvider } from "react-redux";
import ErrorProvider from "./components/ErrorProvider";

export default function App() {
  return (
    <ReduxProvider store={store}>
      <SafeAreaProvider>
        <ErrorProvider>
          <StatusBar style="auto" />
          <RootNavigator />
        </ErrorProvider>
      </SafeAreaProvider>
    </ReduxProvider>
  );
}
