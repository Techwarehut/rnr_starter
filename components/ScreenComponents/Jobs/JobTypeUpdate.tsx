import { View, Pressable } from "react-native";
import React from "react";
import {
  actionStatusMapping,
  jobTypeKeys,
  JobTypeKeys,
  statusActionMapping,
} from "./Filters/Statustypes";
import { UpdateStatus } from "./UpdateStatus";
import { Text } from "~/components/ui/text";
import { UpdateType } from "./UpdateType";

interface JobTypeProps {
  type: JobTypeKeys;
  onChangeType: (newtype: JobTypeKeys) => void; // Add this prop
}
const JobTypeUpdate: React.FC<JobTypeProps> = ({ type, onChangeType }) => {
  return (
    <View style={{ width: "auto" }}>
      <View className="flex-row w-auto border border-input bg-background rounded-md items-center justify-center">
        <Pressable
          onPress={() => onChangeType(type)}
          className="flex web:flex-1 p-2  web:hover:bg-accent web:hover:text-accent-foreground active:bg-accent"
        >
          <Text className="text-center group-active:text-accent-foreground">
            {type}
          </Text>
        </Pressable>
        {jobTypeKeys.length > 1 && (
          <UpdateType onChangeType={onChangeType} type={type} />
        )}
      </View>
    </View>
  );
};

export default JobTypeUpdate;
