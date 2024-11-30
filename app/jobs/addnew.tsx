import { View } from "react-native";
import React from "react";
import AddNewJobForm from "~/components/ScreenComponents/Jobs/AddNewJobFrom";
import { Stack, useRouter } from "expo-router";
import { Button } from "~/components/ui/button";
import { Job } from "~/components/ScreenComponents/Jobs/types";
import { addChecklistToJob, addJob } from "~/api/jobsApi";
import { useToast } from "~/components/ScreenComponents/ToastMessage";
import Toast from "react-native-toast-message";
import { Text } from "~/components/ui/text";

const addnew = () => {
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
  });

  const router = useRouter();
  const { showSuccessToast, showErrorToast } = useToast();
  const handleAddJob = async () => {
    try {
      const addedJobs = await addJob(job); // Now addedJobs is an array of jobs
      if (addedJobs && addedJobs.length > 0) {
        // Loop through all the added jobs and add the checklist where applicable
        for (const addedJob of addedJobs) {
          if (addedJob.checklistID) {
            // Add the checklist to the job
            await addChecklistToJob(addedJob._id, addedJob.checklistID);
          }
        }

        showSuccessToast("Job(s) Added successfully!");

        // Go back to the previous page after successfully adding the job(s)
        if (router.canGoBack()) {
          router.back();
        }
      } else {
        showErrorToast("No jobs were added.");
      }
    } catch (error) {
      showErrorToast("Error Adding job(s)!");
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <View className="web:mr-4">
              <Button size="sm" onPress={handleAddJob}>
                <Text>Create</Text>
              </Button>
            </View>
          ),
        }}
      />
      <AddNewJobForm onChange={setJob} />
      <Toast />
    </>
  );
};

export default addnew;
