import { View } from "react-native";
import { FastForward } from "~/lib/icons/FastForward";

export default function Logo() {
  return (
    <View className="flex bg-primary items-center justify-center p-2 px-4 m-2 rounded-2xl ">
      <FastForward
        className="text-primary-foreground items-center justify-center "
        size={28}
        strokeWidth={1.5}
      />
    </View>
  );
}
