import { View, Pressable } from "react-native";
import React from "react";
import {
  actionStatusMapping,
  getJobPriorityIcon,
  JobPriorityKeys,
  jobTypeKeys,
  JobTypeKeys,
  statusActionMapping,
} from "./Filters/Statustypes";
import { UpdateStatus } from "./UpdateStatus";
import { Text } from "~/components/ui/text";
import { UpdateType } from "./UpdateType";
import { UpdatePrioritiy } from "./UpdatePriority";

interface JobPriorityProps {
  priority: JobPriorityKeys;
  onChangePriority: (newPriority: JobPriorityKeys) => void; // Add this prop
}
const JobPriorityUpdate: React.FC<JobPriorityProps> = ({
  priority,
  onChangePriority,
}) => {
  return (
    <View style={{ width: "auto" }}>
      <View className="flex-row w-auto border border-input bg-background rounded-md items-center justify-center">
        <Pressable
          onPress={() => onChangePriority(priority)}
          className="flex web:flex-1 p-2  web:hover:bg-accent web:hover:text-accent-foreground active:bg-accent"
        >
          <View className="flex-row items-center gap-2">
            {getJobPriorityIcon(priority)}
          </View>
        </Pressable>
        {jobTypeKeys.length > 1 && (
          <UpdatePrioritiy
            onChangePriority={onChangePriority}
            priority={priority}
          />
        )}
      </View>
    </View>
  );
};

export default JobPriorityUpdate;
