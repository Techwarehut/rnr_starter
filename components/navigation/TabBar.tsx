import React, { useCallback, useMemo, useRef } from "react";
import { View, Platform, Pressable, TouchableOpacity } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Ellipsis } from "~/lib/icons/Ellipsis";
import { EllipsisVertical } from "~/lib/icons/EllipsisVertical";
import { Separator } from "~/components/ui/separator";
import { tabVariants } from "./TabVariants";

import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { Button } from "~/components/ui/button";
import { Popover } from "~/components/ui/PopoverBottomSheet";
import { Text } from "~/components/ui/text";
import {
  initialWindowMetrics,
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { FastForward } from "~/lib/icons/FastForward";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetTrigger,
  BottomSheetHandle,
} from "~/components/ui/bottom-sheet/bottomSheet";
import { TabBarButton } from "./TabBarButton";

interface MyTabBarProps extends BottomTabBarProps {
  isLargeScreen: boolean;
}

const MyTabBar: React.FC<MyTabBarProps> = ({
  state,
  descriptors,
  navigation,
  isLargeScreen,
}) => {
  const insets = useSafeAreaInsets();
  console.log(initialWindowMetrics?.insets);
  console.log(insets);
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  };
  let screenContent: React.ReactNode[] = [];
  let triggerContent: React.ReactNode;
  return (
    <View
      className={`${
        isLargeScreen
          ? "absolute flex-col h-full w-20 border-r pt-4"
          : "flex-row border-t"
      } border-input bg-background`}
    >
      {isLargeScreen && (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 10,
            paddingHorizontal: 10,
          }}
        >
          <FastForward
            className="text-foreground"
            size={36}
            strokeWidth={1.25}
            color={"#8bc34a"}
          />
          <Separator className="my-4 " />
        </View>
      )}
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const isSpecialRoute = route.name === "Onboarding";

        const isPopoverRoute =
          (!isLargeScreen && route.name === "Onboarding") ||
          (!isLargeScreen && route.name === "Settings") ||
          route.name === "Team" ||
          route.name === "Customers";
        const isLastPopoverRoute = route.name === "Customers";

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

        const [isOpen, setIsOpen] = React.useState(false);

        const animatedIndex = useSharedValue<number>(0);
        const animatedPosition = useSharedValue<number>(0);
        // ref
        const bottomSheetModalRef = useRef<BottomSheetModal>(null);

        // bottomSheetModalRef
        // console.log({ bottomSheetModalRef });

        const handleSheetChanges = useCallback((index: number) => {
          //console.log("handleSheetChanges", index);
        }, []);

        // variables
        const snapPoints = useMemo(() => [300, "40%", "50%"], []);
        // callbacks
        /*const handlePresentModalPress = useCallback(() => {
          // bottomSheetWebRef.current?.focus();

          if (isOpen) {
            bottomSheetModalRef.current?.dismiss();
            setIsOpen(false);
          } else {
            bottomSheetModalRef.current?.present();
            setIsOpen(true);
          }
        }, [isOpen]);*/

        if (isPopoverRoute && !isLastPopoverRoute) {
          screenContent.push(
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
                    color: isFocused ? "green" : "#222",
                    focused: isFocused,

                    size: 21,
                  })}

                <Text className="font-medium leading-none native:text-xl">
                  {typeof label === "string" ? label : label.toString()}
                </Text>
              </View>
            </Pressable>
          );
          return null;
        } else if (isPopoverRoute && isLastPopoverRoute) {
          triggerContent = (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ellipsis
                className="text-foreground"
                size={24}
                strokeWidth={1.25}
              />
              <Text className="text-xs">More</Text>
            </View>
          );

          //Update the Popovercontent and return screenContent
          screenContent.push(
            <Pressable
              key={`popover-last-route-${route.key}`} // Add a unique key
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
                    color: isFocused ? "green" : "#222",
                    focused: isFocused,

                    size: 21,
                  })}

                <Text className="font-medium leading-none native:text-xl">
                  {typeof label === "string" ? label : label.toString()}
                </Text>
              </View>
            </Pressable>
          );
          return (
            <Popover
              key={route.key}
              triggerContent={triggerContent}
              screenContent={screenContent}
              isFocused={isFocused}
              isLargeScreen={isLargeScreen}
              isSpecialRoute={isSpecialRoute}
              contentInsets={contentInsets}
            />
          );
          /* if (Platform.OS === "web") {
            return (
              <Popover key={route.key}>
                <PopoverTrigger asChild>
                  <View
                    className={`${tabVariants({
                      isFocused,
                      size: isLargeScreen ? "largeScreen" : "default",
                    })} ${isLargeScreen && isSpecialRoute ? "mt-auto" : ""}`}
                    style={{
                      flex: 1,
                      justifyContent: "flex-end",
                      alignItems: "center",
                    }}
                  >
                    {isLargeScreen ? (
                      <Ellipsis
                        className="text-foreground"
                        size={24}
                        strokeWidth={1.25}
                      />
                    ) : (
                      <EllipsisVertical
                        className="text-foreground"
                        size={24}
                        strokeWidth={1.25}
                      />
                    )}
                    <Text
                      className={`text-primary ${
                        isFocused ? "text-sm mt-1" : "text-xs"
                      }`}
                    >
                      More
                    </Text>
                  </View>
                </PopoverTrigger>
                <PopoverContent
                  side={Platform.OS === "web" ? "bottom" : "top"}
                  insets={contentInsets}
                  className="w-auto"
                >
                  {screenContent}
                </PopoverContent>
              </Popover>
            );
          } else {
            return (
              <View key={route.key}>
                <Pressable onPress={handlePresentModalPress}>
                  <View
                    className={`${tabVariants({
                      isFocused,
                      size: isLargeScreen ? "largeScreen" : "default",
                    })} ${isLargeScreen && isSpecialRoute ? "mt-auto" : ""}`}
                  >
                    {isLargeScreen ? (
                      <Ellipsis
                        className="text-foreground"
                        size={24}
                        strokeWidth={1}
                      />
                    ) : (
                      <EllipsisVertical
                        className="text-foreground"
                        size={21}
                        strokeWidth={1}
                      />
                    )}
                    <Text className="text-xs">More</Text>
                  </View>
                </Pressable>
                <BottomSheetModal
                  ref={bottomSheetModalRef}
                  index={1}
                  // open={isOpen} Use this prop if you want to control the modal from outside for web
                  snapPoints={snapPoints}
                  onChange={handleSheetChanges}
                  handleComponent={() => (
                    <BottomSheetHandle
                      className="bg-green-300 mt-2"
                      animatedIndex={animatedIndex}
                      animatedPosition={animatedPosition}
                    />
                  )}
                >
                  <BottomSheetView className="flex-1 bg-background">
                    {screenContent}
                  </BottomSheetView>
                </BottomSheetModal>
              </View>
            );
          }*/
        }

        return (
          <TabBarButton
            key={route.key}
            route={route}
            isFocused={isFocused}
            onPress={onPress}
            onLongPress={onLongPress}
            options={options}
            isLargeScreen={isLargeScreen}
            isSpecialRoute={isSpecialRoute}
          />
        );
      })}
    </View>
  );
};

export default MyTabBar;
