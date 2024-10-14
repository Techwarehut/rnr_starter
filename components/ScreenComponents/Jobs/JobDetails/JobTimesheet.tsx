import { View } from "react-native";
import React from "react";
import { Job } from "../types";
import { Text } from "~/components/ui/text";

interface JobInfoProps {
  job: Job;
  handleInputChange: (field: keyof Job, value: string) => void;
  editMode: boolean;
}

const JobTimesheet: React.FC<JobInfoProps> = ({
  job,
  handleInputChange,
  editMode,
}) => {
  return (
    <View>
      <Text>Timesheet</Text>
    </View>
  );
};

export default JobTimesheet;
