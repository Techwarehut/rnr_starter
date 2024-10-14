import { View } from "react-native";
import React from "react";
import { Text } from "~/components/ui/text";
import { Job } from "../types";
import InputField from "../../InputField";
import TextField from "../../TextField";
import { Badge } from "~/components/ui/badge";
import { getJobPriorityIcon, statusKeyMapping } from "../Filters/Statustypes";
import JobStatusUpdate from "../JobStatusUpdate";

interface JobBasicInfoProps {
  job: Job;
  handleInputChange: (field: keyof Job, value: string) => void;
  editMode: boolean;
}

const JobBasicInfo: React.FC<JobBasicInfoProps> = ({
  job,
  handleInputChange,
  editMode,
}) => {
  return (
    <View className="flex gap-4">
      <View className="flex-row items-center gap-2">
        {getJobPriorityIcon(job.priority)}
      </View>
      <InputField
        label="Job Title"
        value={job.jobTitle}
        onChangeText={(value) => handleInputChange("jobTitle", value)}
        editable={editMode}
        nativeID="Job Title"
      />

      <TextField
        label="Job Description"
        value={job.jobDescription}
        onChangeText={(value) => handleInputChange("jobDescription", value)}
        editable={editMode}
        nativeID="Job Description"
      />
      <View className="flex-row gap-8">
        <Badge className="p-1 px-2">
          <Text>{job.jobType}</Text>
        </Badge>
        {editMode ? (
          <JobStatusUpdate
            onChangeStatus={(newStatus) => {}}
            status={job.status}
          />
        ) : (
          <Badge variant={statusKeyMapping[job.status]} className="p-1 px-4">
            <Text>{job.status}</Text>
          </Badge>
        )}
      </View>
    </View>
  );
};

export default JobBasicInfo;
