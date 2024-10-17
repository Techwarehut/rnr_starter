import { View } from "react-native";
import React from "react";
import { Text } from "~/components/ui/text";
import { Job } from "../types";
import InputField from "../../InputField";
import TextField from "../../TextField";
import { Badge } from "~/components/ui/badge";
import {
  getJobPriorityIcon,
  JobPriorityKeys,
  JobTypeKeys,
  statusKeyMapping,
} from "../Filters/Statustypes";
import JobStatusUpdate from "../JobStatusUpdate";
import JobTypeUpdate from "../JobTypeUpdate";
import { H1, H2, H3, H4, Muted } from "~/components/ui/typography";
import JobPriorityUpdate from "../JobPriorityUpdate";
import JobPurchaseOrders from "./JobPurchaseOrders";
import { Button } from "~/components/ui/button";
import { Plus } from "~/lib/icons/Plus";
import JobComments from "./JobComments";
import { useIsLargeScreen } from "~/lib/utils";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import JobTimesheet from "./JobTimesheet";
import JobImages from "./JobImages";

interface JobBasicInfoProps {
  job: Job;
  handleInputChange: (field: keyof Job, value: string, userId?: String) => void;
  onChangeStatus: (jobId: string, newStatus: string) => void;
  onChangePriority: (jobId: string, newStatus: JobPriorityKeys) => void;
  onChangeType: (jobId: string, newStatus: JobTypeKeys) => void;
  editMode: boolean;
}

const JobBasicInfo: React.FC<JobBasicInfoProps> = ({
  job,
  handleInputChange,
  onChangeStatus,
  onChangePriority,
  onChangeType,
  editMode,
}) => {
  const isLargeScreen = useIsLargeScreen();

  return (
    <View className="flex gap-8 mb-4">
      {editMode ? (
        <>
          <Input
            value={job.jobTitle}
            onChangeText={(value) => handleInputChange("jobTitle", value)}
            editable={editMode}
          />

          <Textarea
            value={job.jobDescription}
            onChangeText={(value) => handleInputChange("jobDescription", value)}
            editable={editMode}
            nativeID="Job Description"
          />
        </>
      ) : (
        <>
          <View>
            {isLargeScreen ? (
              <H2>
                {job._id}: {job.jobTitle}
              </H2>
            ) : (
              <H2>
                {job._id}: {job.jobTitle}
              </H2>
            )}
          </View>

          <Text>{job.jobDescription}</Text>
        </>
      )}

      <JobTimesheet
        job={job}
        handleInputChange={handleInputChange}
        editMode={editMode}
      />

      <View className="flex-row flex-wrap gap-2 justify-around md:justify-start md:gap-8 ">
        <JobPriorityUpdate
          onChangePriority={(newPriority) => {
            onChangePriority(job._id, newPriority);
          }}
          priority={job.priority}
        />
        <JobTypeUpdate
          onChangeType={(newType) => {
            onChangeType(job._id, newType);
          }}
          type={job.jobType}
        />

        <JobStatusUpdate
          onChangeStatus={(newStatus) => {
            onChangeStatus(job._id, newStatus);
          }}
          status={job.status}
        />
      </View>

      <View className="flex-row items-center justify-between">
        <View>
          <Text className="text-xl">Images</Text>
          <Muted>Add before or after images</Muted>
        </View>
        <Button variant="outline">
          <Plus className="text-primary" size={18} />
        </Button>
      </View>

      <JobImages
        job={job}
        handleInputChange={handleInputChange}
        editMode={editMode}
      />

      <View className="flex-row items-center justify-between">
        <View>
          <Text className="text-xl">Purchases</Text>
          <Muted>All Purchases made for this job</Muted>
        </View>
        <Button variant="default">
          <Plus className="text-primary-foreground" size={18} />
        </Button>
      </View>

      <JobPurchaseOrders
        job={job}
        handleInputChange={handleInputChange}
        editMode={editMode}
      />

      <View className="flex-row items-center justify-between">
        <View>
          <Text className="text-xl">Notes</Text>
          <Muted>Quick Notes for anyone to add</Muted>
        </View>
        <Button variant="outline">
          <Plus className="text-primary" size={18} />
        </Button>
      </View>

      <JobComments
        job={job}
        handleInputChange={handleInputChange}
        editMode={editMode}
      />
    </View>
  );
};

export default JobBasicInfo;
