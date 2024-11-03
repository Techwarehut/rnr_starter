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

// Example fake purchase orders array with status and total value
const fakePurchaseOrders = [
  {
    purchaseOrderNumber: "PO-001",
    supplierName: "Supplier A",
    items: [
      { itemName: "Item A1", quantity: 2, price: 20.0 },
      { itemName: "Item A2", quantity: 1, price: 15.0 },
    ],
    status: "Pending", // Status of the purchase order
    total: 35.0,
  },
  {
    purchaseOrderNumber: "PO-002",
    supplierName: "Supplier B",
    items: [
      { itemName: "Item B1", quantity: 5, price: 5.0 },
      { itemName: "Item B2", quantity: 3, price: 8.0 },
    ],
    status: "Approved",
    total: 13.0,
  },
  {
    purchaseOrderNumber: "PO-003",
    supplierName: "Supplier C",
    items: [
      { itemName: "Item C1", quantity: 1, price: 100.0 },
      { itemName: "Item C2", quantity: 10, price: 2.0 },
    ],
    status: "Rejected",
    total: 102.0,
  },
  {
    purchaseOrderNumber: "PO-004",
    supplierName: "Supplier D",
    items: [
      { itemName: "Item D1", quantity: 4, price: 12.0 },
      { itemName: "Item D2", quantity: 2, price: 30.0 },
    ],
    status: "Pending",
    total: 42.0,
  },
];

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
