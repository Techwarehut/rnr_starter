import { View } from "react-native";
import React from "react";
import { Text } from "~/components/ui/text";
import { Job } from "../types";
import InputField from "../../InputField";
import TextField from "../../TextField";
import JobStatusUpdate from "../JobStatusUpdate";
import { Label } from "~/components/ui/label";

interface JobSecondaryInfoProps {
  job: Job;
  handleInputChange: (field: keyof Job, value: string) => void;
  editMode: boolean;
}

const JobBSecondaryInfo: React.FC<JobSecondaryInfoProps> = ({
  job,
  handleInputChange,
  editMode,
}) => {
  return (
    <View className="flex gap-4">
      <InputField
        label="Reported By"
        value={job.reportedBy.name}
        onChangeText={(value) => handleInputChange("reportedBy", value)}
        editable={editMode}
        nativeID="Reported By"
      />

      <InputField
        label="Assigned"
        value={job.assignedTo[0].name}
        onChangeText={(value) => handleInputChange("assignedTo", value)}
        editable={editMode}
        nativeID="Assigned"
      />
      <InputField
        label="Job Priority"
        value={job.priority}
        onChangeText={(value) => handleInputChange("priority", value)}
        editable={editMode}
        nativeID="Job Priority"
      />
      <InputField
        label="Customer"
        value={job.customer.businessName}
        onChangeText={(value) => handleInputChange("customer", value)}
        editable={editMode}
        nativeID="Customer"
      />
      <InputField
        label="Job Type"
        value={job.jobType}
        onChangeText={(value) => handleInputChange("jobType", value)}
        editable={editMode}
        nativeID="Job Type"
      />

      <InputField
        label="Due Date"
        value={job.dueDate}
        onChangeText={(value) => handleInputChange("dueDate", value)}
        editable={editMode}
        nativeID="Due Date"
      />

      <InputField
        label="Project"
        value={job.projectId}
        onChangeText={(value) => handleInputChange("projectId", value)}
        editable={editMode}
        nativeID="Project"
      />

      <InputField
        label="Estimate"
        value={job.estimateId || ""}
        onChangeText={(value) => handleInputChange("estimateId", value)}
        editable={editMode}
        nativeID="Estimate"
      />

      <InputField
        label="Invoice"
        value={job.invoiceId || ""}
        onChangeText={(value) => handleInputChange("invoiceId", value)}
        editable={editMode}
        nativeID="Invoice"
      />
    </View>
  );
};

export default JobBSecondaryInfo;
