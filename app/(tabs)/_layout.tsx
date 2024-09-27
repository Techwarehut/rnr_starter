import { Tabs } from "expo-router";
import React from "react";
import { useWindowDimensions, StyleSheet } from "react-native";

import { TabBarIcon } from "~/components/navigation/TabBarIcon";
import { useColorScheme } from "~/lib/useColorScheme";
import MyTabBar from "~/components/navigation/TabBar"; // Import your custom tab bar component
import { LayoutDashboard } from "~/lib/icons/LayoutDashboard";
import { UserPlus } from "~/lib/icons/UserPlus";
import { Users } from "~/lib/icons/Users";
import { ClipboardList } from "~/lib/icons/ClipboardList";
import { ReceiptText } from "~/lib/icons/ReceiptText";
import { CreditCard } from "~/lib/icons/CreditCard";
import { Settings } from "~/lib/icons/Settings";
import { UsersRound } from "~/lib/icons/UsersRound";
import { ThemeToggle } from "~/components/ThemeToggle";

import { View } from "react-native";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Text } from "~/components/ui/text";
import { Button } from "~/components/ui/button";
import { cn, useIsLargeScreen } from "~/lib/utils";

const AVATAR_URI = "https://randomuser.me/api/portraits/men/32.jpg";

export default function TabLayout() {
  const isLargeScreen = useIsLargeScreen();
  const { isDarkColorScheme, setColorScheme } = useColorScheme();

  // Define active and inactive colors based on the color scheme or your preference
  const activeTintColor = isDarkColorScheme ? "#FFD700" : "#1E90FF"; // Example: gold for dark mode, dodger blue for light mode
  const inactiveTintColor = isDarkColorScheme ? "#B0B0B0" : "#696969"; // Example: light gray for dark mode, dark gray for light mode

  return (
    <Tabs
      tabBar={(props) => <MyTabBar {...props} isLargeScreen={isLargeScreen} />}
      screenOptions={{
        tabBarActiveTintColor: activeTintColor,
        tabBarInactiveTintColor: inactiveTintColor, // Optional: Set the color for inactive tabs
        headerShown: true,
        headerShadowVisible: false,
        headerTitleAlign: "left",
        headerStyle: {
          backgroundColor: cn("bg-brand-primary"),
        },
        headerTitleStyle: {
          paddingLeft: isLargeScreen ? 80 : 0, // Corrected conditional syntax
        },

        /*  headerRight: () => (
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
        ), */
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color, focused }) => (
            <LayoutDashboard
              //className={focused ? "fill-primary" : "text-primary fill-none"}
              className={focused ? "text-primary" : "text-muted-foreground"}
              size={24}
              strokeWidth={1.5}
              //color={color}
            />
          ),
          tabBarLabel: "Dashboard",
        }}
      />
      <Tabs.Screen
        name="jobs"
        options={{
          title: "Jobs",
          tabBarIcon: ({ color, focused }) => (
            <ClipboardList
              /* className={
                focused
                  ? "text-primary-foreground fill-primary"
                  : "text-primary fill-none"
              } */
              className={focused ? "text-primary" : "text-muted-foreground"}
              size={24}
              strokeWidth={1.5}
            />
          ),
          tabBarLabel: "Jobs",
        }}
      />
      <Tabs.Screen
        name="purchases"
        options={{
          title: "Purchases",
          tabBarIcon: ({ color, focused }) => (
            <ReceiptText
              /* className={
                focused
                  ? "text-primary-foreground fill-primary"
                  : "text-primary fill-none"
              } */
              className={focused ? "text-primary" : "text-muted-foreground"}
              size={24}
              strokeWidth={1.5}
            />
          ),
          tabBarLabel: "Purchases",
        }}
      />
      <Tabs.Screen
        name="sales"
        options={{
          title: "Sales",
          tabBarIcon: ({ color, focused }) => (
            <CreditCard
              /* className={
                focused
                  ? "text-primary-foreground fill-primary"
                  : "text-primary fill-none"
              } */
              className={focused ? "text-primary" : "text-muted-foreground"}
              size={24}
              strokeWidth={1.5}
            />
          ),
          tabBarLabel: "Sales",
        }}
      />

      <Tabs.Screen
        name="team"
        options={{
          title: "Team",
          tabBarIcon: ({ color, focused }) => (
            <Users
              /* className={
                focused ? "fill-primary text-primary" : "text-primary fill-none"
              } */
              className={focused ? "text-primary" : "text-muted-foreground"}
              size={24}
              strokeWidth={1.5}
            />
          ),
          tabBarLabel: "Team",
        }}
      />
      <Tabs.Screen
        name="customers"
        options={{
          title: "Customers",
          tabBarIcon: ({ color, focused }) => (
            <UsersRound
              /*  className={
                focused ? "text-primary fill-primary" : "text-primary fill-none"
              } */
              className={focused ? "text-primary" : "text-muted-foreground"}
              size={24}
              strokeWidth={1.5}
            />
          ),
          tabBarLabel: "Customers",
        }}
      />
      <Tabs.Screen
        name="onboarding"
        options={{
          title: "OnBoard",
          tabBarIcon: ({ color, focused }) => (
            <UserPlus
              /* className={
                focused ? "text-primary fill-primary" : "text-primary fill-none"
              } */
              className={focused ? "text-primary" : "text-muted-foreground"}
              size={24}
              strokeWidth={1.5}
            />
          ),
          tabBarLabel: "OnBoard",
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, focused }) => (
            <Settings
              /* className={
                focused
                  ? "text-primary-foreground fill-primary"
                  : "text-primary fill-none"
              } */
              className={focused ? "text-primary" : "text-muted-foreground"}
              size={24}
              strokeWidth={1.5}
            />
          ),
          tabBarLabel: "Settings",
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  largeScreenScene: {
    paddingLeft: 80, // This matches the width of the sidebar
  },
  smallScreenScene: {
    paddingBottom: 60, // Example padding for small screens to accommodate a bottom tab bar
  },
});
