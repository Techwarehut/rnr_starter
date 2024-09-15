import { StyleSheet, useWindowDimensions, View } from "react-native";
import { Text } from "~/components/ui/text";

export default function Purchases() {
  const { width } = useWindowDimensions();
  const isLargeScreen = width > 600; // Adjust threshold as needed
  return (
    <View
      className={`flex-1 justify-center items-center gap-5 bg-secondary/30 ${
        isLargeScreen ? "pl-20" : "pl-4"
      }`}
    >
      <Text>I am in Purchases Screen</Text>
    </View>
  );
}
