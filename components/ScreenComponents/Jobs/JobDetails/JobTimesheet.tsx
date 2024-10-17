import { Pressable, View } from "react-native";
import React from "react";
import { Job } from "../types";
import { Text } from "~/components/ui/text";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { getInitials } from "~/lib/utils";
import { Muted } from "~/components/ui/typography";
import InputField from "../../InputField";
import { Input } from "~/components/ui/input";
import { X } from "~/lib/icons/X";
import { Button } from "~/components/ui/button";
import { Plus } from "~/lib/icons/Plus";

interface JobInfoProps {
  job: Job;
  handleInputChange: (field: keyof Job, value: string, userId?: String) => void;
  editMode: boolean;
}

const JobTimesheet: React.FC<JobInfoProps> = ({
  job,
  handleInputChange,
  editMode,
}) => {
  return (
    <View className="flex flex-col gap-2">
      <View className="flex-row items-center justify-between">
        <View>
          <Text className="text-xl">Assignees</Text>
          <Muted>Add more assignee or Hours Spent</Muted>
        </View>
        <Button variant="default">
          <Plus className="text-primary-foreground" size={18} />
        </Button>
      </View>
      {(job.assignedTo || []).map((assignee) => (
        <View
          key={assignee.userId}
          className="flex-row items-center justify-between"
        >
          <View className="flex-row gap-4 items-center">
            <Avatar alt="Avatar" className="w-8 h-8">
              <AvatarImage source={{ uri: assignee.profileUrl }} />
              <AvatarFallback>
                <Text>{getInitials(assignee.name)}</Text>
              </AvatarFallback>
            </Avatar>
            <View>
              <Text>{assignee.name}</Text>
            </View>
          </View>

          <View className="flex-row gap-2 items-center">
            <View className="flex  w-16">
              <Input
                value={assignee.hoursSpent.toString()}
                onChangeText={(value) =>
                  handleInputChange("hoursSpent", value, assignee.userId)
                }
                editable={editMode}
              />
            </View>
            <Text>hours</Text>

            <View className="flex">
              <Button variant="link">
                <X className="text-destructive" size={18} />
              </Button>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

export default JobTimesheet;
