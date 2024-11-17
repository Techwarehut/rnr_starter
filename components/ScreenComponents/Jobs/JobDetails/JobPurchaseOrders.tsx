import { View, ScrollView, Platform } from "react-native";
import React, { useEffect, useState } from "react";
import { Job } from "../types";
import { Text } from "~/components/ui/text";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Muted } from "~/components/ui/typography";
import { Badge } from "~/components/ui/badge";
import { getStatusClassName, useIsLargeScreen } from "~/lib/utils";
import { getPurchaseOrdersByJobID } from "~/api/purchasesApi";
import { PurchaseOrder } from "../../Purchases/types";
import { useToast } from "../../ToastMessage";
import Toast from "react-native-toast-message";
import PurchaseCard from "../../Purchases/PurchaseCard";

interface JobInfoProps {
  job: Job;
  handleInputChange: (field: keyof Job, value: string) => void;
  editMode: boolean;
}

const JobPurchaseOrders: React.FC<JobInfoProps> = ({
  job,
  handleInputChange,
  editMode,
}) => {
  const cardWidth = 300;
  const [purchases, setPurchases] = useState<PurchaseOrder[]>([]);
  const { showSuccessToast, showErrorToast } = useToast();
  // Function to calculate total value of items in a purchase order

  const fetchPurchasesbyJob = async () => {
    try {
      const data = await getPurchaseOrdersByJobID(job._id); // Call the API
      setPurchases(data);
    } catch (error) {
      showErrorToast("Failed to fetch Purchases!");
    }
  };

  useEffect(() => {
    fetchPurchasesbyJob();
  }, []);

  return (
    <>
      <ScrollView
        pagingEnabled
        scrollEventThrottle={200}
        decelerationRate="fast"
        snapToInterval={cardWidth}
        snapToAlignment="start"
        horizontal
        showsHorizontalScrollIndicator={useIsLargeScreen()}
        contentContainerClassName="p-2"
      >
        <View className="flex-row gap-4 mr-4">
          {purchases.map((order) => (
            <PurchaseCard
              key={order.purchaseOrderNumber}
              item={order}
              horizontalView={true}
            />
          ))}
        </View>
      </ScrollView>
      <Toast />
    </>
  );
};

export default JobPurchaseOrders;
