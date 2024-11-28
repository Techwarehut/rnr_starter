import { Platform, View } from "react-native";
import React from "react";
import { Text } from "~/components/ui/text";

import { formatPhoneNumber, getInitials, useIsLargeScreen } from "~/lib/utils";
import { Muted } from "~/components/ui/typography";
import { ScrollView } from "react-native-gesture-handler";
import { Button } from "~/components/ui/button";
import { AssignedUser, CreatedUser, customer, Job } from "./types";
import { Customer, SiteLocation } from "../Customers/types";
import JobBasicInfo from "./JobDetails/JobBasicInfo";
import JobTimesheet from "./JobDetails/JobTimesheet";
import JobPriorityUpdate from "./JobPriorityUpdate";
import JobTypeUpdate from "./JobTypeUpdate";
import JobStatusUpdate from "./JobStatusUpdate";
import InputField from "../InputField";
import { Textarea } from "~/components/ui/textarea";
import { Label } from "~/components/ui/label";
import TextField from "../TextField";
import JobBSecondaryInfo from "./JobDetails/JobSecondaryInfo";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { AssignJob } from "./JobActions/AssignJob";
import { DateType } from "react-native-ui-datepicker";
import JobSiteContact from "./JobDetails/JobSiteContact";
import { UpdateReqFreq } from "./UpdateRecFreq";
import JobReqFreqUpdate from "./JobReqFreqUpdate";

import DisplayChecklist from "~/components/ScreenComponents/Checklist/CheckList";
import { AssignChecklist } from "./JobActions/AssignChecklist";
import { addChecklistToJob } from "~/api/jobsApi";

interface AddJobFormProps {
  onChange: (data: Job) => void;
}

const AddNewJobForm: React.FC<AddJobFormProps> = ({ onChange }) => {
  const [job, setJob] = React.useState<Job>({
    _id: "", // or null if you prefer
    jobTitle: "",
    jobDescription: "",
    jobType: "ServiceVisit",
    reportedBy: {
      userId: "",
      name: "",
      profileUrl: "",
    },
    assignedTo: [],
    status: "Backlog",
    purchaseOrderNumber: "",
    dueDate: new Date(),
    priority: "High",

    customer: {
      _id: "",
      businessName: "",
    },
    siteLocation: {
      site_id: "",
      siteName: "",
      siteContactPerson: "",
      siteContactPhone: "",
      AddressLine: "",
      City: "",
      Province: "",
      zipcode: "",
    },
    estimateId: "",
    invoiceId: "",
    purchaseReqId: "",
    comments: [],
    createdAt: "", // You might want to handle these as Date objects
    updatedAt: "",
    images: [],
    checklistID: "",
  });

  const handleInputChange = (
    field: keyof Job,
    value: string | Customer | SiteLocation | AssignedUser | DateType
  ) => {
    let updatedJobData = { ...job };

    // Check if the field is a key of SiteLocation
    if (field in updatedJobData.siteLocation) {
      updatedJobData.siteLocation = {
        ...updatedJobData.siteLocation,
        ...(value as SiteLocation), // Cast value to Partial<SiteLocation>
      };
    }
    // Check if the field is a key of Customer
    if (
      typeof value === "object" &&
      value !== null &&
      "businessName" in value // Adjust as necessary for your Customer type
    ) {
      console.log(field, value);
      updatedJobData.customer._id = value._id;
      updatedJobData.customer.businessName = value.businessName;
    }
    // Handle addition of new user
    else if (field === "assignedTo") {
      updatedJobData.assignedTo = updatedJobData.assignedTo || [];
      updatedJobData.assignedTo.push(value as AssignedUser);
    }
    // Check if the field is a top-level key in Job
    else if (field in updatedJobData) {
      updatedJobData = {
        ...updatedJobData,
        [field]: value,
      };
    }
    // Handle case where field is not found in any
    else {
      console.warn(
        `Field ${field} does not exist in Job, SiteLocation, or Customer.`
      );
    }

    // Update state with the new job data

    setJob(updatedJobData);
    onChange(updatedJobData); // Call onChange with the updated data
  };
  const isLargeScreen = useIsLargeScreen();

  return (
    <ScrollView
      showsVerticalScrollIndicator={Platform.OS === "web"}
      /* contentContainerClassName="flex-1 p-4 md:p-12 gap-4" */
      contentContainerStyle={{ padding: isLargeScreen ? 48 : 12, gap: 4 }}
    >
      {/* Top Container */}
      <View className="flex gap-2">
        <InputField
          label="Job Title"
          value={job.jobTitle}
          onChangeText={(value) => handleInputChange("jobTitle", value)}
          editable={true}
          nativeID="Job Title"
        />

        <TextField
          label="Job Description"
          value={job.jobDescription}
          onChangeText={(value) => handleInputChange("jobDescription", value)}
          editable={true}
          nativeID="Job Description"
        />
      </View>

      <JobSiteContact job={job} />

      <View className="flex md:flex-row md:flex-wrap items-start md:items-center gap-2 my-4">
        <Label nativeID="Job Priority">Job Priority</Label>
        <JobPriorityUpdate
          onChangePriority={(newPriority) => {
            handleInputChange("priority", newPriority);
          }}
          priority={job.priority}
        />

        <Label nativeID="Job Priority">Job type</Label>

        <JobTypeUpdate
          onChangeType={(newType) => {
            handleInputChange("jobType", newType);
          }}
          type={job.jobType}
        />
      </View>

      {job.jobType === "Maintenance" && (
        <View className="flex gap-2">
          <Label nativeID="Job Priority">Recurring Frequency</Label>

          <JobReqFreqUpdate />
        </View>
      )}

      {(job.jobType === "Inspection" || job.jobType === "Maintenance") && (
        <>
          {job.checklistID ? (
            <DisplayChecklist
              linkedCheckListId={job.checklistID}
              jobId={job._id}
              handleDeleteChecklist={() => {
                handleInputChange("checklistID", "");
              }}
            />
          ) : (
            <View className="flex-row items-center justify-between">
              <View className="flex flex-1">
                <Text className="text-xl">Checklist</Text>
                <Muted>
                  This can be a safety, inspection or maintainence checklist
                </Muted>
              </View>
              <AssignChecklist
                jobId={job._id}
                handleAddChecklist={(checklistId) => {
                  handleInputChange("checklistID", checklistId);
                }}
              />
            </View>
          )}
        </>
      )}

      <View className="flex md:flex-row gap-8 md:w-full ">
        {/* Contact Details */}
        <View className="flex gap-4 md:flex-1 md:border md:border-input md:rounded-md md:p-4">
          <View className="flex-row items-center justify-between my-2">
            <View>
              <Text className="text-xl">Assignee and Links</Text>
              <Muted>Links to Estimate and PO</Muted>
            </View>
          </View>
          <View>
            <Muted>Assignee:</Muted>

            <View className="flex-row flex-wrap gap-2 bg-secondary p-2 rounded-md items-center justify-between">
              <View className="flex-row flex-wrap gap-2">
                {job.assignedTo.map((item) => (
                  <Avatar key={item.userId} alt="Avatar" className="w-10 h-10">
                    <AvatarImage source={{ uri: item.profileUrl }} />
                    <AvatarFallback>
                      <Text>{getInitials(item.name)}</Text>
                    </AvatarFallback>
                  </Avatar>
                ))}
              </View>
              <AssignJob
                onJobAssigned={(user) =>
                  handleInputChange("assignedTo", {
                    userId: user._id,
                    name: user.name,
                    profileUrl: user.profileUrl,
                    hoursSpent: 0,
                  })
                }
              />
            </View>
          </View>

          <View className="flex gap-4">
            <InputField
              label="Link Jobs by PO"
              value={job.purchaseOrderNumber}
              onChangeText={(value) =>
                handleInputChange("purchaseOrderNumber", value)
              }
              editable={true}
              nativeID="linked PO"
            />

            <InputField
              label="Link Jobs by Estimate"
              value={job.estimateId || ""}
              onChangeText={(value) => handleInputChange("estimateId", value)}
              editable={true}
              nativeID="Estimate"
            />
          </View>
        </View>
        <View className="flex gap-4 md:flex-1 md:border md:border-input md:rounded-md md:p-4">
          <JobBSecondaryInfo
            job={job}
            handleInputChange={handleInputChange}
            editMode={true}
            addNew={true}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default AddNewJobForm;
