import { useNavigation } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";
import QuickSnapshot from "~/components/ScreenComponents/Dashboard/QuickSnapshot";
import Schedule from "~/components/ScreenComponents/Dashboard/Schedule";
import { Card, CardDescription, CardTitle } from "~/components/ui/card";
import { Text } from "~/components/ui/text";
import { Large } from "~/components/ui/typography";
import { useIsLargeScreen } from "~/lib/utils";

export default function Dashboard() {
  const isLargeScreen = useIsLargeScreen();
  const navigation = useNavigation();

  return (
    <View
      className={`flex-1  gap-5 bg-secondary/30 ${
        isLargeScreen ? "pl-20" : "p-2"
      }`}
    >
      <QuickSnapshot />
      <Schedule />
    </View>
  );
}
