import { View } from "react-native";
import React from "react";
import { Job } from "../types";
import { Text } from "~/components/ui/text";

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
    <View>
      <Text>Comments</Text>
    </View>
  );
};

export default JobComments;
