import { View } from "react-native";
import React, { useState } from "react";
import { Text } from "~/components/ui/text";
import { Job } from "../types";
import InputField from "../../InputField";
import TextField from "../../TextField";
import JobStatusUpdate from "../JobStatusUpdate";
import { Label } from "~/components/ui/label";
import JobTypeUpdate from "../JobTypeUpdate";
import { H3, Muted } from "~/components/ui/typography";
import JobPriorityUpdate from "../JobPriorityUpdate";
import { Collapsible } from "../../Collapsible";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { getInitials } from "~/lib/utils";
import JobTimesheet from "./JobTimesheet";
import { Input } from "~/components/ui/input";
import { Badge } from "~/components/ui/badge";
import { statusKeyMapping } from "../Filters/Statustypes";
import DeleteButton from "../../DeleteButton";
import { deleteCustomerFromJob } from "~/api/jobsApi";

interface JobSecondaryInfoProps {
  job: Job;
  handleInputChange: (field: keyof Job, value: string) => void;
  editMode: boolean;
}

const JobBSecondaryInfo: React.FC<JobSecondaryInfoProps> = ({
  job,
  handleInputChange,
  editMode,
}) => {
  const [refreshKey, setRefreshKey] = useState(0);
  const handleAssignCustomer = async () => {
    try {
      setRefreshKey((prev) => prev + 1);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteCustomer = async () => {
    try {
      const deleted = await deleteCustomerFromJob(job._id);
      setRefreshKey((prev) => prev + 1);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View className="flex gap-12 mb-4">
      <View className="flex gap-4">
        <View className="flex-row items-center justify-between my-2">
          <View>
            <Text className="text-xl">Details</Text>
            <Muted>Customer, Due Date and other details</Muted>
          </View>
        </View>

        <View className="flex flex-row gap-4 items-center justify-between mr-4">
          <Muted>Reporter:</Muted>
          <View className="flex-row gap-2 items-center w-48">
            <Avatar alt="Avatar" className="w-8 h-8">
              <AvatarImage source={{ uri: job.reportedBy.profileUrl }} />
              <AvatarFallback>
                <Text>{getInitials(job.reportedBy.name)}</Text>
              </AvatarFallback>
            </Avatar>
            <View>
              <Text>{job.reportedBy.name}</Text>
            </View>
          </View>
        </View>

        <View className="flex flex-row gap-4 items-center justify-between mr-4">
          <Muted>Customer:</Muted>
          <View className="flex-row w-48">
            <View className="flex-1">
              <Input
                value={job.customer.businessName}
                onChangeText={(value) => console.log(value)}
                editable={editMode}
                nativeID="Customer"
              />
            </View>
            <DeleteButton xIcon={true} onDelete={handleDeleteCustomer} />
          </View>
        </View>

        <View className="flex flex-row gap-4 items-center justify-between mr-4">
          <Muted>Due Date:</Muted>
          <View className="flex  w-48">
            <Input
              value={new Date(job.dueDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "2-digit",
              })}
              onChangeText={(value) => handleInputChange("dueDate", value)}
              editable={editMode}
              nativeID="Due Date"
            />
          </View>
        </View>

        <View className="flex flex-row gap-4 items-center justify-between mr-4">
          <Muted>Status:</Muted>
          <View className="flex-row gap-4 items-center w-48">
            <Badge variant={statusKeyMapping[job.status]} className="p-1 px-4">
              <Text>{job.status}</Text>
            </Badge>
          </View>
        </View>
      </View>

      <View className="flex gap-4">
        <View className="flex-row items-center justify-between my-2">
          <View>
            <Text className="text-xl">Links</Text>
            <Muted>Links to Invoice, Estimate and PO</Muted>
          </View>
        </View>

        <View className="flex flex-row gap-4 items-center justify-between mr-4">
          <Muted>Linked PO</Muted>
          <View className="flex  w-48">
            <Input
              value={job.purchaseOrderNumber}
              onChangeText={(value) =>
                handleInputChange("purchaseOrderNumber", value)
              }
              editable={editMode}
            />
          </View>
        </View>

        <View className="flex flex-row gap-4 items-center justify-between mr-4">
          <Muted>Estimate:</Muted>
          <View className="flex  w-48">
            <Input
              value={job.estimateId || ""}
              onChangeText={(value) => handleInputChange("estimateId", value)}
              editable={editMode}
            />
          </View>
        </View>

        <View className="flex flex-row gap-4 items-center justify-between mr-4">
          <Muted>Invoice:</Muted>
          <View className="flex  w-48">
            <Input
              value={job.invoiceId || ""}
              onChangeText={(value) => handleInputChange("invoiceId", value)}
              editable={editMode}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default JobBSecondaryInfo;
