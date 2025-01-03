import { ScrollView, View } from "react-native";
import React from "react";
import { Job } from "./types";
import { Text } from "~/components/ui/text";
import JobBasicInfo from "./JobDetails/JobBasicInfo";
import JobBSecondaryInfo from "./JobDetails/JobSecondaryInfo";
import JobTimesheet from "./JobDetails/JobTimesheet";
import JobPurchaseOrders from "./JobDetails/JobPurchaseOrders";
import JobComments from "./JobDetails/JobComments";
import { JobPriorityKeys, JobTypeKeys } from "./Filters/Statustypes";
import { User } from "../Team/types";
import { Customer, SiteLocation } from "../Customers/types";
import { DateType } from "react-native-ui-datepicker";

interface JobDetaiDisplaylProps {
  job: Job;
  handleInputChange: (
    field: keyof Job,
    value: string | Customer | SiteLocation | DateType
  ) => void;
  onChangeStatus: (jobId: string, newStatus: string) => void;
  onChangePriority: (jobId: string, newStatus: JobPriorityKeys) => void;
  onChangeType: (jobId: string, newStatus: JobTypeKeys) => void;

  editMode: boolean;
}
export const JobDetailDisplay: React.FC<JobDetaiDisplaylProps> = ({
  job,
  handleInputChange,
  onChangeStatus,
  onChangePriority,
  onChangeType,

  editMode,
}) => {
  return (
    <ScrollView
      nestedScrollEnabled={true}
      //contentContainerClassName="flex flex-1 grow p-4 gap-4 overflow-scroll"
      contentContainerStyle={{ padding: 12 }}
      showsVerticalScrollIndicator={false}
    >
      <JobBasicInfo
        job={job}
        handleInputChange={handleInputChange}
        onChangeStatus={onChangeStatus}
        onChangePriority={onChangePriority}
        onChangeType={onChangeType}
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
