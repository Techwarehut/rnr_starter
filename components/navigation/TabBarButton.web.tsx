import React from "react";
import { Pressable, View } from "react-native";
import { Text } from "~/components/ui/text";
import { tabVariants } from "./TabVariants"; // Ensure correct import path

// Import necessary types
import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

interface TabBarButtonProps {
  route: {
    key: string;
    name: string;
  };
  isFocused: boolean;
  onPress: () => void;
  onLongPress: () => void;
  options: BottomTabNavigationOptions;
  isLargeScreen: boolean;
  isSpecialRoute: boolean;
}

export function TabBarButton({
  route,
  isFocused,
  onPress,
  onLongPress,
  options,
  isLargeScreen,
  isSpecialRoute,
}: TabBarButtonProps) {
  const label =
    typeof options.tabBarLabel === "function"
      ? options.tabBarLabel({
          focused: isFocused,
          color: isFocused ? "green" : "#222",
          position: "below-icon", // Ensure this is a valid position if 'bottom' is not correct
          children: route.name,
        })
      : options.tabBarLabel ?? route.name;

  // Reanimated shared value for scaling and opacity
  const scale = useSharedValue(1);

  // Reanimated style for scaling animation
  const animatedIconStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withSpring(isFocused ? 1.2 : 1) }],
    };
  }, [isFocused]);

  return (
    <Pressable
      key={route.key}
      accessibilityRole="button"
      accessibilityState={isFocused ? { selected: true } : {}}
      accessibilityLabel={options.tabBarAccessibilityLabel}
      testID={options.tabBarTestID}
      onPress={onPress}
      onLongPress={onLongPress}
      className={`${tabVariants({
        isFocused,
        size: isLargeScreen ? "largeScreen" : "default",
      })} ${isLargeScreen && isSpecialRoute ? "mt-auto" : ""}`}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <Animated.View style={animatedIconStyle}>
          {options.tabBarIcon &&
            options.tabBarIcon({
              color: isFocused ? "green" : "#222",
              focused: isFocused,
              size: 24,
            })}
        </Animated.View>
        <Text
          className={`text-primary ${isFocused ? "text-sm mt-1" : "text-xs"}`}
        >
          {typeof label === "string" ? label : label?.toString()}
        </Text>
      </View>
    </Pressable>
  );
}
