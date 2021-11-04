import Constants from "expo-constants";
import * as SplashScreen from "expo-splash-screen";
import React from "react";
import { Animated, StyleSheet, View } from "react-native";

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function AppSplashScreen({ children }: any) {
  const animation = React.useMemo(() => new Animated.Value(0.9), []);
  const [isAppReady, setAppReady] = React.useState(false);
  const [isAnimationCompleted, setIsAnimationCompleted] = React.useState(false);

  React.useEffect(() => {
    if (isAppReady) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 3500,
        useNativeDriver: false,
      }).start(() => setIsAnimationCompleted(true));
    }
  }, [isAppReady]);

  async function loadAsync() {
    try {
      await SplashScreen.hideAsync();
      await Promise.all([]);
    } catch (e) {
    } finally {
      setAppReady(true);
    }
  }

  return (
    <View style={styles.root}>
      {isAppReady && children}
      {!isAnimationCompleted && (
        <Animated.View
          pointerEvents="none"
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: Constants.manifest?.splash?.backgroundColor,
              opacity: animation,
            },
          ]}
        >
          <Animated.Image
            style={{
              width: "100%",
              height: "100%",
              transform: [
                {
                  scale: animation,
                },
              ],
            }}
            source={require("../assets/krolf-splashscreen.png")}
            onLoadEnd={loadAsync}
            fadeDuration={1}
          />
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
