import "~/global.css";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Theme, ThemeProvider } from "@react-navigation/native";
import { Slot, SplashScreen, Stack, useRouter, useSegments } from "expo-router";
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

import { BottomSheetModalProvider } from "~/components/ui/bottom-sheet/bottomSheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Separator } from "~/components/ui/separator";
import Logo from "~/components/ScreenComponents/Logo";
import { AuthContextProvider, useAuth } from "~/ctx/AuthContext";

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

function LayoutContent() {
  const { colorScheme, setColorScheme, isDarkColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);
  const [hasMounted, setHasMounted] = React.useState(false);
  const AVATAR_URI = "https://randomuser.me/api/portraits/men/32.jpg";
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();
  const segments = useSegments();

  // Ensure that the navigation happens after the component has mounted
  React.useEffect(() => {
    setHasMounted(true); // Mark component as mounted
  }, []);

  React.useEffect(() => {
    const inAuthGroup = segments[0] === "(protected)";

    if (hasMounted && isColorSchemeLoaded) {
      console.log("I am here", inAuthGroup, isAuthenticated);
      if (isAuthenticated) {
        router.replace("/(protected)/(tabs)/dashboard");
        console.log("User is authenticated:", user?.role);
      } else if (!isAuthenticated && inAuthGroup) {
        router.replace("/");
        console.log("User is not authenticated");
      }
    }
  }, [isAuthenticated, user, hasMounted, isColorSchemeLoaded]);

  React.useEffect(() => {
    (async () => {
      const theme = await AsyncStorage.getItem("theme");
      if (Platform.OS === "web") {
        // Adds the background color to the html element to prevent white background on overscroll.
        document.documentElement.classList.add("bg-background");
      }

      if (!theme) {
        AsyncStorage.setItem("theme", colorScheme);
        setIsColorSchemeLoaded(true);
        return;
      }
      const colorTheme = theme === "dark" ? "dark" : "light";

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
            title: "Veylo",
            headerLeft: () => <Logo />,
          }}
        />
        <Stack.Screen
          name="login"
          options={{
            title: "Veylo",
            headerLeft: () => <Logo />,
          }}
        />

        <Stack.Screen
          name="createaccount"
          options={{
            title: "Veylo",
            headerLeft: () => <Logo />,
          }}
        />
        <Stack.Screen
          name="termsofservice"
          options={{
            title: "Veylo",
            headerLeft: () => <Logo />,
          }}
        />
        <Stack.Screen
          name="privacypolicy"
          options={{
            title: "Veylo",
            headerLeft: () => <Logo />,
          }}
        />
        <Stack.Screen
          name="(protected)"
          options={{
            headerShown: false,
            headerShadowVisible: true,
            title: "Veylo",
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
            headerLeft: () => <Logo />,
          }}
        />
      </Stack>

      <PortalHost />
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <AuthContextProvider>
          <LayoutContent />
        </AuthContextProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
