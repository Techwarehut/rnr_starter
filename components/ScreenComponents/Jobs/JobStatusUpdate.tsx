import { View, Pressable } from "react-native";
import React from "react";
import {
  actionStatusMapping,
  JobTypeKeys,
  statusActionMapping,
} from "./Filters/Statustypes";
import { UpdateStatus } from "./UpdateStatus";
import { Text } from "~/components/ui/text";

interface JobStatusProps {
  status: string;
  onChangeStatus: (newStatus: string) => void; // Add this prop
}
const JobStatusUpdate: React.FC<JobStatusProps> = ({
  status,
  onChangeStatus,
}) => {
  const action = statusActionMapping[status];
  if (action.length > 0) {
    return (
      <View style={{ width: "auto" }}>
        <View className="flex-row w-auto border border-input bg-background rounded-md items-center justify-center">
          <Pressable
            onPress={() => onChangeStatus(actionStatusMapping[action[0]])}
            className="flex web:flex-1 p-2  web:hover:bg-accent web:hover:text-accent-foreground active:bg-accent"
          >
            <Text className="text-center group-active:text-accent-foreground">
              {action[0]}
            </Text>
          </Pressable>
          {action.length > 1 && (
            <UpdateStatus
              onUpdateStatus={(newStatus) => {
                onChangeStatus(newStatus); // Call the prop function here
              }}
              status={status}
            />
          )}
        </View>
      </View>
    );
  }
};

export default JobStatusUpdate;
