import { View, ScrollView, Platform } from "react-native";
import React from "react";
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
import { useIsLargeScreen } from "~/lib/utils";

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

  // Function to calculate total value of items in a purchase order
  const getStatusClassName = (status: string) => {
    switch (status) {
      case "Approved":
        return "text-brand-primary";
      case "Rejected":
        return "text-destructive";
      default:
        return "text-muted-foreground"; // Default class for Pending or other statuses
    }
  };

  return (
    <ScrollView
      pagingEnabled
      scrollEventThrottle={200}
      decelerationRate="fast"
      snapToInterval={cardWidth}
      snapToAlignment="center"
      horizontal
      showsHorizontalScrollIndicator={useIsLargeScreen()}
      contentContainerClassName="p-2"
    >
      <View className="flex-row gap-4">
        {fakePurchaseOrders.map((order) => (
          <Card key={order.purchaseOrderNumber} className="p-4 w-80 gap-4">
            <View className="flex-row">
              <Badge className="p-1 px-4">
                <Text
                  className={`p-1 px-4 ${getStatusClassName(order.status)}`}
                >
                  {order.status}
                </Text>
              </Badge>
            </View>

            <CardTitle>{order.supplierName}</CardTitle>
            <CardDescription>{order.purchaseOrderNumber}</CardDescription>

            <CardContent>
              <View className="flex-row justify-between items-center mb-4">
                <Muted>Item</Muted>
                <Muted>Qty</Muted>
                <Muted>Price</Muted>
              </View>
              {order.items.map((item, index) => (
                <View
                  key={index}
                  className="flex-row justify-between items-center"
                >
                  <Text>{item.itemName}</Text>
                  <Text>{item.quantity}</Text>
                  <Text>${item.price.toFixed(2)}</Text>
                </View>
              ))}
            </CardContent>
            <View className="flex-row items-center justify-between">
              <Text>Total</Text>
              <Text
                className={`text-xl semiBold ${getStatusClassName(
                  order.status
                )}`}
              >
                ${order.total.toFixed(2)}
              </Text>
            </View>

            <CardFooter className="flex-row items-center justify-between gap-2">
              {order.status === "Pending" ? (
                <>
                  <Button variant="outline">
                    <Text>Approve</Text>
                  </Button>
                  <Button variant="destructive">
                    <Text>Reject</Text>
                  </Button>
                </>
              ) : (
                <Button variant="outline">
                  <Text>Move to Pending</Text>
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </View>
    </ScrollView>
  );
};

export default JobPurchaseOrders;
