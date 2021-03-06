import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import RootNavigator from "./navigation/RootNavigator";
import store from "./store/store";
import AppSplashScreen from "./screens/AppSplashScreen";
import { Provider as ReduxProvider } from "react-redux";
import ErrorProvider from "./components/ErrorProvider";
import { LogBox} from "react-native";

export default function App() {
  LogBox.ignoreLogs(['Setting a timer']);
  return (
    <ReduxProvider store={store}>
      <SafeAreaProvider>
        <AppSplashScreen>
          <ErrorProvider>
           <StatusBar style="auto" />
            <RootNavigator />
          </ErrorProvider>
        </AppSplashScreen>
      </SafeAreaProvider>
    </ReduxProvider>
  );
}
