import { View } from "react-native";
import { Text } from "~/components/ui/text";
import { useIsLargeScreen } from "~/lib/utils";

export default function Sales() {
  const isLargeScreen = useIsLargeScreen();
  return (
    <View
      className={`flex-1 justify-center items-center gap-5 bg-secondary/30 ${
        isLargeScreen ? "pl-20" : "pl-4"
      }`}
    >
      <Text>I am in Sales Screen</Text>
    </View>
  );
}
