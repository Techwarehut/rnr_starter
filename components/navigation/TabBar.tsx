import React, { useMemo } from "react";
import { View } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Ellipsis } from "~/lib/icons/Ellipsis";

import { Separator } from "~/components/ui/separator";

import { Popover } from "~/components/ui/Popover";
import { Text } from "~/components/ui/text";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FastForward } from "~/lib/icons/FastForward";

import { TabBarButton } from "./TabBarButton";
import { TabBarListItem } from "./TabBarListItem";
import { Button } from "../ui/button";
import { router } from "expo-router";

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

  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: insets.right,
    right: 12,
  };
  let screenContent: React.ReactNode[] = [];
  let triggerContent: React.ReactNode;

  const logout = () => {
    router.replace("/SignUp");
  };

  return (
    <View
      className={`${
        isLargeScreen
          ? "absolute flex-col h-full w-20 border-r pt-4"
          : "flex-row border-t"
      }  border-input bg-background`}
    >
      {isLargeScreen && (
        <View className=" justify-center items-center pl-3 pr-3">
          <View className="w-12 h-12 bg-brand-primary rounded-full justify-center items-center pl-1">
            <FastForward
              className="fill-primary text-primary"
              size={24}
              strokeWidth={1}
            />
          </View>
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

        const isSpecialRoute = route.name === "onboarding";

        const isPopoverRoute =
          (!isLargeScreen && route.name === "onboarding") ||
          (!isLargeScreen && route.name === "settings") ||
          route.name === "team" ||
          route.name === "customers";
        const isLastPopoverRoute =
          (!isLargeScreen && route.name === "settings") ||
          (isLargeScreen && route.name === "customers");

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

        // variables
        const snapPoints = useMemo(() => [300, "40%", "50%"], []);

        if (isPopoverRoute && !isLastPopoverRoute) {
          screenContent.push(
            <TabBarListItem
              key={route.key}
              route={route}
              isFocused={isFocused}
              onPress={onPress}
              onLongPress={onLongPress}
              options={options}
            />
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
            <>
              <TabBarListItem
                key={route.key}
                route={route}
                isFocused={isFocused}
                onPress={onPress}
                onLongPress={onLongPress}
                options={options}
              />
              <Button
                variant="outline"
                key={`button-logout-${route.key}`}
                className="shadow shadow-foreground/5 m-5"
                onPress={logout}
              >
                <Text>Logout</Text>
              </Button>
            </>
          );
          return (
            <Popover
              key={route.key}
              triggerContent={triggerContent}
              screenContent={screenContent}
              snapPoints={[300, "40%", "50%", "60%"]} // Custom snap points
              contentInsets={contentInsets}
            />
          );
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
