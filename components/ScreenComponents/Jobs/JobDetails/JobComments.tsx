import { View } from "react-native";
import React from "react";
import { Job } from "../types";
import { Text } from "~/components/ui/text";
import { Muted } from "~/components/ui/typography";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { getInitials } from "~/lib/utils";

interface JobInfoProps {
  job: Job;
  handleInputChange: (field: keyof Job, value: string) => void;
  editMode: boolean;
}

const JobComments: React.FC<JobInfoProps> = ({
  job,
  handleInputChange,
  editMode,
}) => {
  return (
    <View className="p-2 gap-4">
      {job.comments?.length ? (
        job.comments.map((comment) => (
          <View
            key={comment.commentId}
            className="p-2 border border-input rounded-md"
          >
            <View className="flex-row gap-2 items-center w-48">
              <Avatar alt="Avatar" className="w-8 h-8">
                <AvatarImage source={{ uri: comment.createdBy.profileUrl }} />
                <AvatarFallback>
                  <Text>{getInitials(comment.createdBy.name)}</Text>
                </AvatarFallback>
              </Avatar>
              <Text>{comment.createdBy.name}:</Text>
              <View></View>
            </View>

            <Text className="my-1">{comment.text}</Text>
            <Muted>{new Date(comment.createdAt).toLocaleString()}</Muted>
          </View>
        ))
      ) : (
        <Text className="text-gray-500">No comments available.</Text>
      )}
    </View>
  );
};

export default JobComments;
