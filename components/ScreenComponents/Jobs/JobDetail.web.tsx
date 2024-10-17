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
    <ScrollView contentContainerClassName="flex-1 flex-col md:flex-row w-full gap-2 p-4">
      <ScrollView
        style={{ flex: 2 }}
        contentContainerClassName="md:border md:border-input md:rounded-md md:p-4"
        showsVerticalScrollIndicator={true}
      >
        <JobBasicInfo
          job={job}
          handleInputChange={handleInputChange}
          editMode={editMode}
        />
      </ScrollView>
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
    </ScrollView>
  );
};
