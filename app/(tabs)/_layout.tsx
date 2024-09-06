import { Tabs } from "expo-router";
import React from "react";
import { useWindowDimensions, StyleSheet } from "react-native";

import { TabBarIcon } from "~/components/navigation/TabBarIcon";
import { useColorScheme } from "~/lib/useColorScheme";
import MyTabBar from "~/components/navigation/TabBar"; // Import your custom tab bar component
import { LayoutDashboard } from "~/lib/icons/LayoutDashboard";
import { UserPlus } from "~/lib/icons/UserPlus";
import { Users } from "~/lib/icons/Users";
import { Layers } from "~/lib/icons/Layers";
import { ReceiptText } from "~/lib/icons/ReceiptText";
import { CreditCard } from "~/lib/icons/CreditCard";
import { Settings } from "~/lib/icons/Settings";

export default function TabLayout() {
  const { width } = useWindowDimensions(); // Get screen width
  const isLargeScreen = width > 600; // Adjust the threshold as needed
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
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="Dashboard"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color, focused }) => (
            <LayoutDashboard
              className="text-foreground"
              size={24}
              strokeWidth={focused ? 1.25 : 1}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Jobs"
        options={{
          title: "Jobs",
          tabBarIcon: ({ color, focused }) => (
            <Layers
              className="text-foreground"
              size={24}
              strokeWidth={focused ? 1.25 : 1}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Purchases"
        options={{
          title: "Purchases",
          tabBarIcon: ({ color, focused }) => (
            <ReceiptText
              className="text-foreground"
              size={24}
              strokeWidth={focused ? 1.25 : 1}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Sales"
        options={{
          title: "Sales",
          tabBarIcon: ({ color, focused }) => (
            <CreditCard
              className="text-foreground"
              size={24}
              strokeWidth={focused ? 1.25 : 1}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="Team"
        options={{
          title: "Team",
          tabBarIcon: ({ color, focused }) => (
            <Users
              className="text-foreground"
              size={24}
              strokeWidth={focused ? 1.25 : 1}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Onboarding"
        options={{
          title: "OnBoard",
          tabBarIcon: ({ color, focused }) => (
            <UserPlus
              className="text-foreground"
              size={24}
              strokeWidth={focused ? 1.25 : 1}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Settings"
        options={{
          title: "Setting",
          tabBarIcon: ({ color, focused }) => (
            <Settings
              className="text-foreground"
              size={24}
              strokeWidth={focused ? 1.25 : 1}
            />
          ),
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
