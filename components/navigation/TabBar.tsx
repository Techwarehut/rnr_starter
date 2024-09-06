import { cva, type VariantProps } from "class-variance-authority";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";

interface MyTabBarProps extends BottomTabBarProps {
  isLargeScreen: boolean;
}

const tabVariants = cva("flex items-center justify-center", {
  variants: {
    isFocused: {
      true: "text-primary",
      false: "text-accent",
    },
    size: {
      largeScreen: "w-full h-16 p-5",
      default: "flex-1 p-3",
    },
  },
  defaultVariants: {
    isFocused: false,
    size: "default",
  },
});

const MyTabBar: React.FC<MyTabBarProps> = ({
  state,
  descriptors,
  navigation,
  isLargeScreen,
}) => {
  return (
    <View
      className={`${
        isLargeScreen
          ? "absolute flex-col h-full w-20 border-r pt-4"
          : "flex-row border-t"
      }  border-input bg-background`}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;
        console.log(route.name);
        const isSpecialRoute = route.name === "Onboarding";

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        // Reanimated shared value for scaling and opacity
        const scale = useSharedValue(1);
        const opacity = useSharedValue(1);

        // Reanimated style for scaling animation
        const animatedIconStyle = useAnimatedStyle(() => {
          return {
            transform: [{ scale: withSpring(isFocused ? 1.2 : 1) }],
          };
        }, [isFocused]);

        // Reanimated style for text opacity animation
        const animatedTextStyle = useAnimatedStyle(() => {
          return {
            opacity: withTiming(isFocused ? 0 : 1, {
              duration: 500,
              easing: Easing.out(Easing.ease),
            }),
          };
        }, [isFocused]);
        if (!isLargeScreen && isSpecialRoute) {
          return;
        }
        return (
          <TouchableOpacity
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
                    color: isFocused ? "primary" : "#222",
                    focused: isFocused,
                    size: 18,
                  })}
              </Animated.View>

              <Text
                className={`text-primary ${
                  isFocused ? "text-sm mt-1" : "text-xs"
                }`}
              >
                {typeof label === "string" ? label : label.toString()}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default MyTabBar;
