import { View, FlatList } from "react-native";
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
import PurchaseCard from "./PurchaseCard";

interface PurchaseProps {
  purchases: PurchaseOrder[];
}

export const PurchasesList: React.FC<PurchaseProps> = ({ purchases }) => {
  const renderItem = ({ item }: { item: PurchaseOrder }) => (
    <PurchaseCard item={item} />
  );

  return (
    <FlatList
      data={purchases}
      renderItem={renderItem}
      keyExtractor={(item) => item.purchaseOrderNumber}
      contentContainerClassName="flex gap-8"
    />
  );
};

export default PurchasesList;
