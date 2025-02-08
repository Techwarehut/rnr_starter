import { View } from "react-native";
import React from "react";
import { Large } from "~/components/ui/typography";
import { Card, CardDescription, CardTitle } from "~/components/ui/card";
import { useIsLargeScreen } from "~/lib/utils";
import RoleWrapper from "../RoleWrapper";

const QuickSnapshot = () => {
  const islargeScreen = useIsLargeScreen();
  return (
    <View className="p-2">
      <View className="flex md:w-full md:flex-row gap-2">
        <View className="flex md:flex-1 flex-row gap-2">
          <Card className="flex flex-1 p-4 py-8 m-2 gap-4">
            <CardTitle className="text-destructive">5</CardTitle>
            <CardDescription>Overdue Jobs</CardDescription>
          </Card>
          <Card className="flex flex-1 p-4 py-8 m-2 gap-4">
            <CardTitle>2</CardTitle>
            <CardDescription> Jobs in progress</CardDescription>
          </Card>
        </View>

        <RoleWrapper roles={["Owner", "Team Lead"]}>
          {islargeScreen && (
            <>
              <View className="flex md:flex-1 flex-row gap-2">
                <Card className="flex flex-1 p-4  py-8 m-2 gap-4">
                  <CardTitle className="text-destructive">5</CardTitle>
                  <CardDescription>Backlog</CardDescription>
                </Card>
                <Card className="flex flex-1 p-4  py-8 m-2 gap-4">
                  <CardTitle className="text-destructive">5</CardTitle>
                  <CardDescription>Purchases pending Approval</CardDescription>
                </Card>
              </View>
              <View className="flex md:flex-1 flex-row gap-2">
                <Card className="flex flex-1 p-4  py-8 m-2 gap-4">
                  <CardTitle className="text-destructive">$5000</CardTitle>
                  <CardDescription>Overdue Invoices</CardDescription>
                </Card>
                <Card className="flex flex-1 p-4  py-8 m-2 gap-4">
                  <CardTitle>$2000</CardTitle>
                  <CardDescription> Accounts Receiveable</CardDescription>
                </Card>
              </View>
            </>
          )}
        </RoleWrapper>
      </View>
    </View>
  );
};

export default QuickSnapshot;
