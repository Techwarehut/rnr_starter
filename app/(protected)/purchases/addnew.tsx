import { View } from "react-native";
import React from "react";
import AddNewJobForm from "~/components/ScreenComponents/Jobs/AddNewJobFrom";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Button } from "~/components/ui/button";
import { Job } from "~/components/ScreenComponents/Jobs/types";
import { addJob } from "~/api/jobsApi";
import { useToast } from "~/components/ScreenComponents/ToastMessage";
import Toast from "react-native-toast-message";
import { Text } from "~/components/ui/text";
import AddNewPurchaseForm from "~/components/ScreenComponents/Purchases/AddNewPurchaseFrom";
import { PurchaseOrder } from "~/components/ScreenComponents/Purchases/types";
import { addPurchaseOrder } from "~/api/purchasesApi";

const addnew = () => {
  const { jobid } = useLocalSearchParams();

  // Ensure jobID is a string
  const id = Array.isArray(jobid) ? jobid[0] : jobid;

  console.log(id);

  // Initial state for PurchaseOrder
  const [purchase, setPurchase] = React.useState<PurchaseOrder>({
    purchaseOrderNumber: "",
    vendor: {
      _id: "",
      companyName: "",
    },
    items: [],
    status: "Request", // Default status can be "Request"
    total: 0, // Default total
    jobID: id,
    requestedBy: {
      userId: "",
      name: "",
      profileUrl: "",
    },
    approvedBy: null, // Initially null until approved
    customer: {
      _id: "",
      businessName: "",
    },
  });

  const router = useRouter();
  const { showSuccessToast, showErrorToast } = useToast();
  const handleAddPurchase = async () => {
    try {
      const addedPurchase = await addPurchaseOrder(purchase);

      showSuccessToast("Purchase Added successfully!");
      /* router.replace("/(tabs)/purchases"); */
      if (router.canGoBack()) router.back();
    } catch (error) {
      showErrorToast("Error Adding Purchase!");
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <View className="web:mr-4">
              <Button size="sm" onPress={handleAddPurchase}>
                <Text>Request</Text>
              </Button>
            </View>
          ),
        }}
      />
      <AddNewPurchaseForm onChange={setPurchase} jobId={purchase.jobID} />
      <Toast />
    </>
  );
};

export default addnew;
