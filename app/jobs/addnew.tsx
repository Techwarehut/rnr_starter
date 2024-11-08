import { View, Text } from "react-native";
import React from "react";
import AddNewJobForm from "~/components/ScreenComponents/Jobs/AddNewJobFrom";
import { Stack, useRouter } from "expo-router";
import { Button } from "~/components/ui/button";
import { Job } from "~/components/ScreenComponents/Jobs/types";
import { addJob } from "~/api/jobsApi";
import { useToast } from "~/components/ScreenComponents/ToastMessage";
import Toast from "react-native-toast-message";

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

      showSuccessToast("Job Added successfully!");
      router.replace("/(tabs)/jobs");
    } catch (error) {
      showErrorToast("Error Adding job!");
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Button size="sm" onPress={handleAddJob}>
              <Text className="text-primary-foreground">Create</Text>
            </Button>
          ),
        }}
      />
      <AddNewJobForm onChange={setJob} />
      <Toast />
    </>
  );
};

export default addnew;