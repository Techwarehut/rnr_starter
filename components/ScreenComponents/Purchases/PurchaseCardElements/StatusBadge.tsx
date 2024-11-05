// StatusBadge.tsx
import React from "react";
import { View } from "react-native"; // Assuming you're using React Native
import { Badge } from "~/components/ui/badge";
import { Text } from "~/components/ui/text";
import { getStatusClassName } from "~/lib/utils";

// Define the props interface for type safety
interface StatusBadgeProps {
  status: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  return (
    <View className="flex-row">
      <Badge className="p-1 px-4">
        <Text className={`p-1 px-4 ${getStatusClassName(status)}`}>
          {status}
        </Text>
      </Badge>
    </View>
  );
};

export default StatusBadge;
