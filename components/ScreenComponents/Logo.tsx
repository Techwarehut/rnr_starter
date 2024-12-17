import { Image, Pressable, StyleSheet, View } from "react-native";
import { useColorScheme } from "~/lib/useColorScheme";
import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
import { useRouter } from "expo-router";

interface LogoProps extends SvgProps {
  reverseColors?: boolean; // Optional prop to reverse colors
}

export default function Logo({ reverseColors = false, ...props }: LogoProps) {
  const { isDarkColorScheme } = useColorScheme(); // Assuming this provides a boolean indicating the color scheme
  const logoSource = isDarkColorScheme
    ? require("~/assets/images/LogoLight.png")
    : require("~/assets/images/LogoDark.png");

  const router = useRouter();

  // Determine the fill color based on the current theme and reverseColors prop
  const fillColor = reverseColors
    ? isDarkColorScheme
      ? "#2b4f73" // Use the dark theme color when reversed
      : "#98bfe7" // Use the light theme color when reversed
    : isDarkColorScheme
    ? "#98bfe7" // Use the light theme color in dark mode
    : "#2b4f73"; // Use the dark theme color in light mode

  return (
    /*  <View className="flex h-10 w-10 items-center justify-center native:mr-2">
      <Image
        source={logoSource}
        resizeMode="contain"
        className="flex h-10 w-10"
        style={styles.logo}
      />
    </View> */
    <Pressable
      onPress={() => router.push("/")}
      className="flex h-12 w-12 items-center justify-center native:mr-2 web:ml-2"
    >
      <Svg width="100%" height="100%" viewBox="0 0 500 500" {...props}>
        <Path
          fill={fillColor}
          d="M354.3 418.7c-3.7-2-37.5-26.3-43.8-31.5-.5-.4-2.5-1.9-4.4-3.2-3.8-2.8-30.2-22.2-36.9-27.1-10.7-7.9-18.7-9.7-26.1-5.9-2.2 1.1-13.9 12-26.1 24.4-18.9 19.1-22.8 22.5-26.3 23.5-5 1.3-8.1 1-12.4-1.2-4.9-2.6-6.7-5.6-10.7-18.4-5.9-18.7-13.9-44.4-19.6-62.3-2.8-9.1-5.6-17.8-6.2-19.5-4.4-12.2-11.9-21.9-21.7-28.2-5.5-3.5-8.2-4.4-45.1-15.3-9.1-2.6-20.5-6-25.5-7.5-4.9-1.5-10.9-3.2-13.2-3.8-6.2-1.5-10.5-6.3-11-12.4-.4-4.1-.1-5.4 2.4-8.8 2.6-3.5 4.4-4.5 14.4-8.3 6.3-2.4 12.3-4.7 13.4-5.2 1.1-.5 10.3-4.1 20.5-8.1 10.2-3.9 19.9-7.7 21.5-8.4 1.7-.7 13.1-5.2 25.5-10 31.9-12.4 63-24.5 66.5-26 1.7-.7 10.9-4.3 20.5-8s18.9-7.3 20.5-8c1.7-.6 10.9-4.2 20.5-8 9.6-3.7 18.9-7.3 20.5-8 1.7-.7 10.9-4.3 20.5-8s24.7-9.6 33.5-13.1c30.5-12 59.7-23.5 67.8-26.5 4.5-1.7 12.7-4.9 18.2-7.1 16.3-6.5 24.8-6.2 31.3 1.1 5 5.5 6.2 11.7 4.2 20.3-.5 2.4-3.7 17.6-7 33.8-3.4 16.2-8.3 40.1-11 53-15.8 75.7-19.6 94-24.6 117.5-3 14.3-5.7 27.1-6 28.5-.2 1.4-1.2 5.7-2 9.5-.9 3.9-1.8 8.4-2.1 10-.2 1.7-1.1 5.9-1.9 9.5-.8 3.6-1.7 7.6-1.9 9-5.1 25.5-10 47.1-11.3 49.1-5.2 8.2-17.8 12.5-24.9 8.6zM227.1 278.4c.9-1.1 2.2-4.3 2.8-7.3.6-3 2.6-8.1 4.3-11.4 2.9-5.4 9.7-11.7 71.5-66.6 58.2-51.6 68.3-61 68.1-63-.7-5.7-2.6-5.1-23.9 8.1-11.2 6.9-22.6 13.8-25.2 15.4-2.7 1.6-6.6 4-8.8 5.4-2.2 1.4-9.5 5.8-16.2 9.9-6.7 4.1-15.1 9.3-18.7 11.6-3.6 2.3-14.8 9.3-24.9 15.5-10.1 6.2-19.8 12.2-21.6 13.4-1.8 1.1-7.2 4.6-12 7.5-9.8 6.2-12.2 8.7-16 16.7-4.1 8.6-3.8 15.7 1.4 32 4.2 13.4 5.5 15.5 10.6 16.6 2.4.5 6.4-1.3 8.6-3.8z"
        />
      </Svg>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 50, // Set a fixed width for the logo
    height: 50, // Set a fixed height for the logo
  },
});
