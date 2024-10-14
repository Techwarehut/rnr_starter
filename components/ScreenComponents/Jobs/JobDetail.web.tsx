import { ScrollView, View } from "react-native";
import React from "react";
import { Job } from "./types";
import { Text } from "~/components/ui/text";
import JobBasicInfo from "./JobDetails/JobBasicInfo";
import JobBSecondaryInfo from "./JobDetails/JobSecondaryInfo";
import JobPurchaseOrders from "./JobDetails/JobPurchaseOrders";
import JobComments from "./JobDetails/JobComments";
import JobTimesheet from "./JobDetails/JobTimesheet";
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
    <View className="flex-1 flex-row p-4 gap-2 flexWrap">
      <ScrollView
        style={{ flex: 2 }}
        contentContainerClassName="border border-input rounded-md p-4"
      >
        <JobBasicInfo
          job={job}
          handleInputChange={handleInputChange}
          editMode={editMode}
        />
        <JobTimesheet
          job={job}
          handleInputChange={handleInputChange}
          editMode={editMode}
        />
        <JobPurchaseOrders
          job={job}
          handleInputChange={handleInputChange}
          editMode={editMode}
        />
        <JobComments
          job={job}
          handleInputChange={handleInputChange}
          editMode={editMode}
        />
      </ScrollView>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerClassName="flex-1 border border-input rounded-md p-4"
      >
        <JobBSecondaryInfo
          job={job}
          handleInputChange={handleInputChange}
          editMode={editMode}
        />
      </ScrollView>
    </View>
  );
};
