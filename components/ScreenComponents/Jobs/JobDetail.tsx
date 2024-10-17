import { ScrollView, View } from "react-native";
import React from "react";
import { Job } from "./types";
import { Text } from "~/components/ui/text";
import JobBasicInfo from "./JobDetails/JobBasicInfo";
import JobBSecondaryInfo from "./JobDetails/JobSecondaryInfo";
import JobTimesheet from "./JobDetails/JobTimesheet";
import JobPurchaseOrders from "./JobDetails/JobPurchaseOrders";
import JobComments from "./JobDetails/JobComments";
interface JobDetaiDisplaylProps {
  job: Job;
  handleInputChange: (field: keyof Job, value: string) => void;
  editMode: boolean;
}
export const JobDetailDisplay: React.FC<JobDetaiDisplaylProps> = ({
  job,
  handleInputChange,
  editMode,
}) => {
  return (
    <ScrollView
      contentContainerClassName="flex-1 p-4 gap-4"
      showsVerticalScrollIndicator={false}
    >
      <JobBasicInfo
        job={job}
        handleInputChange={handleInputChange}
        editMode={editMode}
      />

      <JobBSecondaryInfo
        job={job}
        handleInputChange={handleInputChange}
        editMode={editMode}
      />
    </ScrollView>
  );
};
