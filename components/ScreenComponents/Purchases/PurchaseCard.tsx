import { View } from "react-native";
import React from "react";
import { PurchaseOrder } from "./types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Muted } from "~/components/ui/typography";
import { Button } from "~/components/ui/button";
import { getInitials, getStatusClassName, useIsLargeScreen } from "~/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { router } from "expo-router";
import { Separator } from "~/components/ui/separator";
import StatusBadge from "./PurchaseCardElements/StatusBadge";
import { Text } from "~/components/ui/text";
import ItemList from "./PurchaseCardElements/ItemList";
import UserAvatarSection from "./PurchaseCardElements/UserAvatarSection";
import LinkedJobSection from "./PurchaseCardElements/LinkedJobSection";

interface PurchaseCardProps {
  item: PurchaseOrder;
  horizontalView?: boolean; // Optional prop
}

const PurchaseCard: React.FC<PurchaseCardProps> = ({
  item,
  horizontalView,
}) => {
  // Determine class names based on horizontalView prop
  const cardClassName = `p-4 gap-2 mb-4 ${
    horizontalView ? "w-80 web:w-64" : ""
  }`;
  const CardContentClassName = `flex gap-4 ${
    !horizontalView && "md:flex-1 md:flex-row"
  } `;

  const islargeScreen = useIsLargeScreen();

  return (
    <Card key={item.purchaseOrderNumber} className={cardClassName}>
      <StatusBadge status={item.status} />

      <CardTitle>{item.vendor.companyName}</CardTitle>
      <CardDescription>{item.purchaseOrderNumber}</CardDescription>

      <CardContent>
        <View className={CardContentClassName}>
          <ItemList PurchaseOrder={item} />

          {islargeScreen ? <Separator orientation="vertical" /> : <Separator />}
          <View className="md:flex-1">
            <View className="flex gap-4">
              <UserAvatarSection label="Requested By" user={item.requestedBy} />
              <UserAvatarSection label="Approved By" user={item.approvedBy} />

              {!horizontalView && (
                <LinkedJobSection
                  jobID={item.jobID}
                  orderNumber={item.purchaseOrderNumber}
                />
              )}
            </View>
          </View>
        </View>
      </CardContent>

      <CardFooter className="flex-row items-center self-end gap-4">
        {item.status === "Request" ? (
          <>
            <Button variant="outline">
              <Text>Approve</Text>
            </Button>
            <Button variant="destructive">
              <Text>Reject</Text>
            </Button>
          </>
        ) : item.status === "Approved" ? (
          <>
            <Button>
              <Text className="text-primary-foreground">Print</Text>
            </Button>
          </>
        ) : null}
      </CardFooter>
    </Card>
  );
};

export default PurchaseCard;
