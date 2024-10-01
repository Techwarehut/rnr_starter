import "~/global.css";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Theme, ThemeProvider } from "@react-navigation/native";
import { SplashScreen, Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { Platform } from "react-native";
import { NAV_THEME } from "~/lib/constants";
import { useColorScheme } from "~/lib/useColorScheme";
import { PortalHost } from "@rn-primitives/portal";
import { ThemeToggle } from "~/components/ThemeToggle";
import { setAndroidNavigationBar } from "~/lib/android-navigation-bar";
import { View } from "react-native";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Text } from "~/components/ui/text";
import { Button } from "~/components/ui/button";
import { FastForward } from "~/lib/icons/FastForward";
import { BottomSheetModalProvider } from "~/components/ui/bottom-sheet/bottomSheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Separator } from "~/components/ui/separator";

const LIGHT_THEME: Theme = {
  dark: false,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  dark: true,
  colors: NAV_THEME.dark,
};

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// Prevent the splash screen from auto-hiding before getting the color scheme.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { colorScheme, setColorScheme, isDarkColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);
  const AVATAR_URI = "https://randomuser.me/api/portraits/men/32.jpg";

  React.useEffect(() => {
    (async () => {
      console.log("I am here");
      const theme = await AsyncStorage.getItem("theme");
      if (Platform.OS === "web") {
        // Adds the background color to the html element to prevent white background on overscroll.
        document.documentElement.classList.add("bg-background");
      }
      console.log(theme);
      if (!theme) {
        AsyncStorage.setItem("theme", colorScheme);
        setIsColorSchemeLoaded(true);
        return;
      }
      const colorTheme = theme === "dark" ? "dark" : "light";
      console.log("color theme", colorTheme);
      console.log("color scheme", colorScheme);
      if (colorTheme !== colorScheme) {
        setColorScheme(colorTheme);
        setAndroidNavigationBar(colorTheme);
        setIsColorSchemeLoaded(true);
        return;
      }
      setAndroidNavigationBar(colorTheme);
      setIsColorSchemeLoaded(true);
    })().finally(() => {
      SplashScreen.hideAsync();
    });
  }, []);

  if (!isColorSchemeLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
          <StatusBar style={isDarkColorScheme ? "light" : "dark"} />
          <Stack
            screenOptions={{
              headerShadowVisible: false,
              headerTitleAlign: "left",
            }}
          >
            <Stack.Screen
              name="index"
              options={{
                headerLeft: () => (
                  <FastForward
                    className="text-foreground items-center justify-center ml-2"
                    size={24}
                    strokeWidth={1.25}
                  />
                ),
              }}
            />
            <Stack.Screen
              name="createaccount"
              options={{
                headerLeft: () => (
                  <FastForward
                    className="text-foreground items-center justify-center ml-2"
                    size={24}
                    strokeWidth={1.25}
                  />
                ),
              }}
            />
            <Stack.Screen
              name="customerdetail"
              options={{
                headerShown: true,
                headerTitle: "Customer Detail",
                presentation: Platform.OS === "ios" ? "card" : "modal",
                headerTitleAlign: "left",
                //headerBackVisible: true,
                headerBackTitleVisible: false,
              }}
            />
            <Stack.Screen
              name="(user)/[username]"
              options={{
                headerTitle: "",
                presentation: Platform.OS === "ios" ? "card" : "modal",
                headerTitleAlign: "left",
                //headerBackVisible: true,
                headerBackTitleVisible: false,
              }}
            />
            <Stack.Screen
              name="(tabs)"
              options={{
                headerShown: true,
                headerShadowVisible: true,
                headerTitle: "Fast Forward",
                headerTitleAlign: "left",
                headerRight: () => (
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      marginRight: 10,
                    }}
                  >
                    <ThemeToggle />
                    <Avatar alt="Rick Sanchez's Avatar" className="w-10 h-10">
                      <AvatarImage source={{ uri: AVATAR_URI }} />
                      <AvatarFallback>
                        <Text>RS</Text>
                      </AvatarFallback>
                    </Avatar>
                  </View>
                ),
                headerLeft: () => (
                  <View className=" justify-center items-center pl-3 pr-3">
                    {/* <View className="w-12 h-12 bg-brand-primary rounded-full justify-center items-center pl-1"> */}
                    <FastForward
                      className=" text-primary"
                      size={36}
                      strokeWidth={1}
                    />
                  </View>
                ),
              }}
            />
          </Stack>
          <PortalHost />
        </ThemeProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
