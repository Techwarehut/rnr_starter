import { useNavigation } from "expo-router";
import { useEffect } from "react";
import { Platform, ScrollView, View } from "react-native";
import QuickSnapshot from "~/components/ScreenComponents/Dashboard/QuickSnapshot";
import Schedule from "~/components/ScreenComponents/Dashboard/Schedule";
import Toppers from "~/components/ScreenComponents/Dashboard/Toppers";
import { Card, CardDescription, CardTitle } from "~/components/ui/card";
import { Text } from "~/components/ui/text";
import { Large } from "~/components/ui/typography";
import { useColorScheme } from "~/lib/useColorScheme";
import { cn, useIsLargeScreen } from "~/lib/utils";

export default function Dashboard() {
  const isLargeScreen = useIsLargeScreen();
  const { isDarkColorScheme, setColorScheme } = useColorScheme();
  const backgroundColor = isDarkColorScheme ? "#1e2936" : "#e8eef6";
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <QuickSnapshot />
      <View className="flex flex-1 md:flex-row gap-8 md:mr-4">
        <Schedule />
        {isLargeScreen && <Toppers />}
      </View>
    </ScrollView>
  );
}
