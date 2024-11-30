import { Pressable, View } from "react-native";
import React, { useState } from "react";
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
import { User } from "../../Team/types";
import { addPurchaseOrder } from "~/api/purchasesApi";
import { useToast } from "../../ToastMessage";
import { PurchaseOrder } from "../../Purchases/types";
import AddNewPurchaseForm from "../../Purchases/AddNewPurchaseFrom";
import { Link, useRouter } from "expo-router";
import JobSiteContact from "./JobSiteContact";
import DisplayChecklist from "../../Checklist/CheckList";
import { AssignChecklist } from "../JobActions/AssignChecklist";
import {
  addChecklistToJob,
  deleteChecklistFromJob,
  updateJobRecurrence,
} from "~/api/jobsApi";
import JobReqFreqUpdate from "../JobReqFreqUpdate";

interface JobBasicInfoProps {
  job: Job;
  handleInputChange: (field: keyof Job, value: string, userId?: String) => void;
  editMode: boolean;
  onChangeStatus?: (jobId: string, newStatus: string) => void;
  onChangePriority?: (jobId: string, newStatus: JobPriorityKeys) => void;
  onChangeType?: (jobId: string, newStatus: JobTypeKeys) => void;
}

const JobBasicInfo: React.FC<JobBasicInfoProps> = ({
  job,
  handleInputChange,
  editMode,
  onChangeStatus,
  onChangePriority,
  onChangeType,
}) => {
  const isLargeScreen = useIsLargeScreen();
  const { showSuccessToast, showErrorToast } = useToast();
  const [refreshKey, setRefreshKey] = useState(0);
  const router = useRouter();

  const handleAddPurchase = async (purchase: PurchaseOrder) => {
    try {
      const addedPurchase = await addPurchaseOrder(purchase);

      showSuccessToast("Purchase Added successfully!");
    } catch (error) {
      showErrorToast("Error Adding Purchase!");
    }
  };

  // Function to handle toggling task status using the API
  const handleDeleteChecklist = async () => {
    // Call the API function to toggle the task status
    await deleteChecklistFromJob(job._id);
    setRefreshKey((prev) => prev + 1);
  };

  // Function to handle toggling task status using the API
  const handleAddChecklist = async (selChecklist: string) => {
    // Call the API function to toggle the task status
    await addChecklistToJob(job._id, selChecklist);
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <View className="flex gap-8 mb-4">
      {editMode ? (
        <View className="flex gap-2">
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
        </View>
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

      <JobSiteContact job={job} />

      <JobTimesheet
        job={job}
        handleInputChange={handleInputChange}
        editMode={editMode}
      />

      <View className="flex-row flex-wrap gap-2  md:gap-8 ">
        <JobPriorityUpdate
          onChangePriority={(newPriority) => {
            if (onChangePriority) onChangePriority(job._id, newPriority);
          }}
          priority={job.priority}
        />
        <JobTypeUpdate
          onChangeType={(newType) => {
            if (onChangeType) onChangeType(job._id, newType);
          }}
          type={job.jobType}
        />

        <JobStatusUpdate
          onChangeStatus={(newStatus) => {
            if (onChangeStatus) onChangeStatus(job._id, newStatus);
          }}
          status={job.status}
        />
      </View>
      {/* <View className="flex md:flex-row  gap-8 mb-4">
        {job.jobType === "Maintenance" && (
          <View className="flex md:w-1/2 gap-2">
            <Text className="text-xl">Recurring Frequency</Text>

            <JobReqFreqUpdate
              recurrence={job.recurrence}
              dueDate={job.dueDate}
              onRecurrenceChange={(recurrence) => {
                console.log(recurrence);
                updateJobRecurrence(job._id, recurrence);
              }}
            />
          </View>
        )} */}

      {(job.jobType === "Inspection" || job.jobType === "Maintenance") && (
        <>
          {job.checklistID ? (
            <DisplayChecklist
              linkedCheckListId={job.checklistID}
              jobId={job._id}
              handleDeleteChecklist={handleDeleteChecklist}
            />
          ) : (
            <View className="flex-row md:flex-1  justify-between">
              <View className="flex flex-1">
                <Text className="text-xl">Checklist</Text>
                <Muted>
                  This can be a safety, inspection or maintainence checklist
                </Muted>
              </View>
              <AssignChecklist
                jobId={job._id}
                handleAddChecklist={handleAddChecklist}
              />
            </View>
          )}
        </>
      )}

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

        <Button
          variant="default"
          onPress={() =>
            router.push({
              pathname: "/purchases/addnew",
              params: {
                jobid: job._id, // Passing the job._id directly, not wrapped in an object
              },
            })
          }
        >
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
        <Button variant="default">
          <Plus className="text-primary-foreground" size={18} />
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
