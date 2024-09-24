import { useNavigation } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";
import { Text } from "~/components/ui/text";
import { useIsLargeScreen } from "~/lib/utils";

export default function Dashboard() {
  const isLargeScreen = useIsLargeScreen();
  const navigation = useNavigation();

  return (
    <View
      className={`flex-1 justify-center items-center gap-5 bg-secondary/30 ${
        isLargeScreen ? "pl-20" : "pl-4"
      }`}
    >
      <Text>I am in Dashboard Screen</Text>
    </View>
  );
}
