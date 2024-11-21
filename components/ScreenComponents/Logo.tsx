import { View } from "react-native";
import { FastForward } from "~/lib/icons/FastForward";

export default function Logo() {
  return (
    <FastForward
      className="text-primary items-center justify-center mx-2"
      size={28}
      strokeWidth={2}
    />
  );
}
