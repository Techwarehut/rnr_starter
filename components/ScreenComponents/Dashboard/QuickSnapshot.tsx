import { View } from "react-native";
import React from "react";
import { Large } from "~/components/ui/typography";
import { Card, CardDescription, CardTitle } from "~/components/ui/card";

const QuickSnapshot = () => {
  return (
    <View className="p-2">
      <Large>Quick snapshot</Large>
      <View className="flex md:w-full md:flex-row gap-2">
        <View className="flex md:flex-1 flex-row gap-2">
          <Card className="flex flex-1 p-4 py-8 m-2">
            <CardTitle className="text-destructive">5</CardTitle>
            <CardDescription>Overdue Jobs</CardDescription>
          </Card>
          <Card className="flex flex-1 p-4 py-8 m-2">
            <CardTitle>2</CardTitle>
            <CardDescription> Jobs in progress</CardDescription>
          </Card>
        </View>
        <View className="flex md:flex-1 flex-row gap-2">
          <Card className="flex flex-1 p-4  py-8 m-2">
            <CardTitle className="text-destructive">5</CardTitle>
            <CardDescription>Backlog</CardDescription>
          </Card>
          <Card className="flex flex-1 p-4  py-8 m-2">
            <CardTitle className="text-destructive">5</CardTitle>
            <CardDescription>Purchases pending Approval</CardDescription>
          </Card>
        </View>
        <View className="flex md:flex-1 flex-row gap-2">
          <Card className="flex flex-1 p-4  py-8 m-2">
            <CardTitle className="text-destructive">$5000</CardTitle>
            <CardDescription>Overdue Invoices</CardDescription>
          </Card>
          <Card className="flex flex-1 p-4  py-8 m-2">
            <CardTitle>$2000</CardTitle>
            <CardDescription> Accounts Receiveable</CardDescription>
          </Card>
        </View>
      </View>
    </View>
  );
};

export default QuickSnapshot;
