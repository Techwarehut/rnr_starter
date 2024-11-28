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
      const addedJob = await addJob(job);
      if (addedJob.checklistID)
        await addChecklistToJob(addedJob._id, addedJob.checklistID);

      showSuccessToast("Job Added successfully!");
      /*  router.replace("/(tabs)/jobs"); */
      if (router.canGoBack()) router.back();
    } catch (error) {
      showErrorToast("Error Adding job!");
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
