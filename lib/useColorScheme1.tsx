import { useColorScheme as useRNColorScheme } from "react-native";
import { useState, useEffect } from "react";
import { useColorScheme as useNativewindColorScheme } from "nativewind";

export function useColorScheme() {
  // Get the system color scheme from React Native
  const systemColorScheme = useRNColorScheme(); // 'dark' or 'light'

  // Manage color scheme state
  const [colorScheme, setColorScheme] = useState(systemColorScheme ?? "dark");

  // Update NativeWind color scheme
  const { setColorScheme: setNativewindColorScheme } =
    useNativewindColorScheme();

  useEffect(() => {
    // Sync the color scheme with NativeWind
    if (setNativewindColorScheme) {
      setNativewindColorScheme(colorScheme);
    }
  }, [colorScheme, setNativewindColorScheme]);

  // Function to toggle the color scheme
  const toggleColorScheme = () => {
    setColorScheme((prevScheme) => (prevScheme === "dark" ? "light" : "dark"));
  };

  return {
    colorScheme,
    isDarkColorScheme: colorScheme === "dark",
    setColorScheme,
    toggleColorScheme,
  };
}
