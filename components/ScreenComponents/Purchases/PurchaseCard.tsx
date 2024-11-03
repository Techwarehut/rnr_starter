import { View, Text } from "react-native";
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
import { getInitials, getStatusClassName } from "~/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { router } from "expo-router";
import { Separator } from "~/components/ui/separator";

interface PurchaseCardProps {
  item: PurchaseOrder;
  horizontalView?: boolean; // Optional prop
}

const PurchaseCard: React.FC<PurchaseCardProps> = ({
  item,
  horizontalView,
}) => {
  // Determine class names based on horizontalView prop
  const cardClassName = `p-4 gap-4 ${horizontalView ? "w-80 web:w-64" : ""}`;
  const CardContentClassName = `flex gap-4 ${
    !horizontalView && "md:flex-1 md:flex-row"
  } `;

  return (
    <Card key={item.purchaseOrderNumber} className={cardClassName}>
      <View className="flex-row">
        <Badge className="p-1 px-4">
          <Text className={`p-1 px-4 ${getStatusClassName(item.status)}`}>
            {item.status}
          </Text>
        </Badge>
      </View>

      <CardTitle>{item.vendor.name}</CardTitle>
      <CardDescription>{item.purchaseOrderNumber}</CardDescription>

      <CardContent>
        <View className={CardContentClassName}>
          <View className="md:flex-1 md:mb-4">
            <Muted>Items:</Muted>
            <View className="flex-row justify-between items-center mb-4 bg-secondary p-2 rounded-md">
              <Muted>Item</Muted>
              <Muted>Qty</Muted>
              <Muted>Price</Muted>
            </View>

            {item.items.map((item, index) => (
              <View
                key={index}
                className="flex-row justify-between items-center bg-secondary p-2 rounded-md mb-2"
              >
                <Text>{item.itemName}</Text>
                <Text>{item.quantity}</Text>
                <Text>${item.price.toFixed(2)}</Text>
              </View>
            ))}

            <View className="flex-row mt-4 justify-end -mr-2">
              <Button variant="link">
                <Text>Add Items</Text>
              </Button>
            </View>

            <View className="flex-row items-center justify-between">
              <Text>Total</Text>
              <Text
                className={`text-xl semiBold ${getStatusClassName(
                  item.status
                )}`}
              >
                ${item.total.toFixed(2)}
              </Text>
            </View>
          </View>

          <Separator />
          <View className="md:flex-1">
            <View className="flex gap-4">
              <View>
                <Muted>Requested By:</Muted>
                <View className="flex-row flex-wrap gap-2 bg-secondary p-2 rounded-md items-center justify-between">
                  <View className="flex-row flex-wrap gap-2">
                    <Avatar
                      key={item.requestedBy.userId}
                      alt="Avatar"
                      className="w-10 h-10"
                    >
                      <AvatarImage
                        source={{ uri: item.requestedBy.profileUrl }}
                      />
                      <AvatarFallback>
                        <Text>{getInitials(item.requestedBy.name)}</Text>
                      </AvatarFallback>
                    </Avatar>
                  </View>
                </View>
              </View>

              <View>
                <Muted>Approved By:</Muted>
                <View className="flex-row flex-wrap gap-2 bg-secondary p-2 rounded-md items-center justify-between">
                  <View className="flex-row flex-wrap gap-2">
                    <Avatar
                      key={item.approvedBy?.userId}
                      alt="Avatar"
                      className="w-10 h-10"
                    >
                      <AvatarImage
                        source={{ uri: item.approvedBy?.profileUrl }}
                      />
                      <AvatarFallback>
                        <Text>
                          {item.approvedBy &&
                            getInitials(item.approvedBy?.name)}
                        </Text>
                      </AvatarFallback>
                    </Avatar>
                  </View>
                </View>
              </View>

              {!horizontalView && (
                <View>
                  <Muted>Linked Job:</Muted>
                  <View className="flex-row flex-wrap gap-2 bg-secondary p-2 rounded-md items-center justify-between">
                    <Button
                      variant="link"
                      onPress={() => {
                        router.push({
                          pathname: "/jobs/[jobID]",
                          params: {
                            jobID: item.jobID,
                          },
                        });
                      }}
                    >
                      <Text>{item.jobID}</Text>
                    </Button>
                  </View>
                </View>
              )}
            </View>
          </View>
        </View>
      </CardContent>

      <CardFooter className="flex-row items-center self-end gap-4">
        {item.status === "Purchase Request" ? (
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
