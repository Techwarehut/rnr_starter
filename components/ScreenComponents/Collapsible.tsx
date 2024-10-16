import Ionicons from "@expo/vector-icons/Ionicons";
import { PropsWithChildren, useState } from "react";
import { Pressable, View } from "react-native";
import { Text } from "../ui/text";
import { ChevronDown } from "~/lib/icons/ChevronDown";
import { ChevronRight } from "~/lib/icons/ChevronRight";

export function Collapsible({
  children,
  title,
}: PropsWithChildren & { title: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={isOpen ? "Collapse" : "Expand"}
        accessibilityState={{ expanded: isOpen }}
        className="flex-row items-center gap-2"
        onPress={() => setIsOpen((value) => !value)}
      >
        {isOpen ? (
          <ChevronDown className="text-primary" size={18} />
        ) : (
          <ChevronRight className="text-primary" size={18} />
        )}

        <Text className="text-xl">{title}</Text>
      </Pressable>
      {isOpen && <View className="mt-4 p-2 gap-4">{children}</View>}
    </View>
  );
}
