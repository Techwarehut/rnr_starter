import { ScrollView, View } from "react-native";
import React from "react";
import { Job } from "./types";
import { Text } from "~/components/ui/text";
import JobBasicInfo from "./JobDetails/JobBasicInfo";
import JobBSecondaryInfo from "./JobDetails/JobSecondaryInfo";
import JobPurchaseOrders from "./JobDetails/JobPurchaseOrders";
import JobComments from "./JobDetails/JobComments";
import JobTimesheet from "./JobDetails/JobTimesheet";
import { useIsLargeScreen } from "~/lib/utils";
import { JobPriorityKeys, JobTypeKeys } from "./Filters/Statustypes";
interface JobDetaiDisplaylProps {
  job: Job;
  handleInputChange: (field: keyof Job, value: string) => void;
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
  const isLargeScreen = useIsLargeScreen();
  return (
    <ScrollView
      showsVerticalScrollIndicator={isLargeScreen}
      contentContainerClassName="flex-1 flex-col md:flex-row w-full gap-2 p-4"
    >
      <ScrollView
        style={{ flex: 2 }}
        contentContainerClassName="md:border md:border-input md:rounded-md md:p-4"
        showsVerticalScrollIndicator={isLargeScreen}
      >
        <JobBasicInfo
          job={job}
          handleInputChange={handleInputChange}
          onChangeStatus={onChangeStatus}
          onChangePriority={onChangePriority}
          onChangeType={onChangeType}
          editMode={editMode}
        />
        {!isLargeScreen && (
          <JobBSecondaryInfo
            job={job}
            handleInputChange={handleInputChange}
            editMode={editMode}
          />
        )}
      </ScrollView>
      {isLargeScreen && (
        <View
          style={{ flex: 1 }}
          className="flex-1 md:border md:border-input md:rounded-md md:p-4"
        >
          <JobBSecondaryInfo
            job={job}
            handleInputChange={handleInputChange}
            editMode={editMode}
          />
        </View>
      )}
    </ScrollView>
  );
};
