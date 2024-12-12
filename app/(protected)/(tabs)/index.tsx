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
import { ShieldAlert } from "~/lib/icons/ShieldAlert";

export default function Dashboard() {
  const isLargeScreen = useIsLargeScreen();
  const { isDarkColorScheme, setColorScheme } = useColorScheme();
  const backgroundColor = isDarkColorScheme ? "#1e2936" : "#e8eef6";
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {/* A warning or maintainence Mode will show up here from backend */}
      <View className="flex flex-row bg-accent p-2 m-2 rounded-md items-center gap-2">
        <ShieldAlert className="text-accent-foreground" size={24} />
        <Text>
          This is a demo UI with no connected backend. All data is stored
          locally and lost on refresh.
        </Text>
      </View>
      <QuickSnapshot />
      <View className="flex flex-1 md:flex-row gap-8 md:mr-4">
        <Schedule />
        {isLargeScreen && <Toppers />}
      </View>
    </ScrollView>
  );
}
