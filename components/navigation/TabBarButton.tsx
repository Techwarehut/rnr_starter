import React from "react";
import { Pressable, View } from "react-native";
import { Text } from "~/components/ui/text";
import { tabVariants } from "./TabVariants"; // Ensure correct import path

// Import necessary types
import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";

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
          color: isFocused ? "text-primary" : "text-primary",
          position: "below-icon", // Ensure this is a valid position if 'bottom' is not correct
          children: route.name,
        })
      : options.tabBarLabel ?? route.name;

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
      })} ${isLargeScreen && isSpecialRoute ? "mt-auto" : ""} `}
    >
      {options.tabBarIcon &&
        options.tabBarIcon({
          color: isFocused ? "text-brand-primary" : "text-primary",
          focused: isFocused,
          size: 21,
        })}

      <Text
        className={`text-xs mt-1 ${
          isFocused ? "text-secondary-foreground" : "text-muted-foreground"
        }`}
      >
        {label}
      </Text>
    </Pressable>
  );
}
