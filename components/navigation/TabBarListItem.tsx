import React from "react";
import { Pressable, View } from "react-native";
import { Text } from "~/components/ui/text";
import { tabVariants } from "./TabVariants"; // Ensure correct import path

// Import necessary types
import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";

interface TabBarListItemProps {
  route: {
    key: string;
    name: string;
  };
  isFocused: boolean;
  onPress: () => void;
  onLongPress: () => void;
  options: BottomTabNavigationOptions;
}

export function TabBarListItem({
  route,
  isFocused,
  onPress,
  onLongPress,
  options,
}: TabBarListItemProps) {
  const label =
    typeof options.tabBarLabel === "function"
      ? options.tabBarLabel({
          focused: isFocused,
          color: isFocused ? "text-primary" : "text-primary",
          position: "below-icon", // Ensure this is a valid position if 'bottom' is not correct
          children: route.name,
        })
      : options.tabBarLabel ?? route.name;

  console.log(label);

  return (
    <Pressable
      key={`popover-route-${route.key}`} // Add a unique key
      accessibilityRole="button"
      accessibilityState={isFocused ? { selected: true } : {}}
      accessibilityLabel={options.tabBarAccessibilityLabel}
      testID={options.tabBarTestID}
      onPress={onPress}
      onLongPress={onLongPress}
      className="flex m-4 items-start"
    >
      <View className="flex flex-row items-center justify-center  gap-1">
        {options.tabBarIcon &&
          options.tabBarIcon({
            color: isFocused ? "text-primary" : "text-primary",
            focused: isFocused,

            size: 21,
          })}

        {/*<Text className="font-medium leading-none native:text-xl">{label}</Text> */}
        <Text
          className={`text-sm  ${isFocused ? "text-primary" : "text-primary"}`}
        >
          {label}
        </Text>
      </View>
    </Pressable>
  );
}
