import { Platform, Pressable, View } from "react-native";
import React, { useState } from "react";
import { Text } from "~/components/ui/text";
import { Job } from "../types";

import { H3, Muted } from "~/components/ui/typography";

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { getInitials } from "~/lib/utils";
import { Calendar } from "~/lib/icons/Calendar";
import { Input } from "~/components/ui/input";
import { Badge } from "~/components/ui/badge";
import { statusKeyMapping } from "../Filters/Statustypes";
import DeleteButton from "../../DeleteButton";
import {
  addCustomerToJob,
  addSiteToJob,
  deleteCustomerFromJob,
  deleteSiteFromJob,
} from "~/api/jobsApi";
import { Button } from "~/components/ui/button";
import { AssignCustomer } from "../JobActions/AssignCustomer";
import { Customer, SiteLocation } from "../../Customers/types";
import { addSiteLocation } from "~/api/customerApi";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import DatePickerWeb from "../../DatePickerWeb";

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
  const [date, setDate] = useState(new Date(1598051730000));
  const [show, setShow] = useState(false);

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    // Handle the case where selectedDate might be undefined
    if (selectedDate) {
      const currentDate = selectedDate;
      setDate(currentDate);
    }
    setShow(false); // Hide the picker regardless of selectedDate
  };

  const handleAssignCustomer = async (customer: Customer) => {
    try {
      const updatedJob = await addCustomerToJob(job._id, customer);

      setRefreshKey((prev) => prev + 1);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAssignSite = async (newSite: SiteLocation) => {
    try {
      const updatedJob = await addSiteToJob(job._id, newSite);

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

  const handleDeleteSiteLocation = async () => {
    try {
      const deleted = await deleteSiteFromJob(job._id);
      setRefreshKey((prev) => prev + 1);
    } catch (error) {
      console.error(error);
    }
  };

  const showDatePicker = () => {
    setShow(true);
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

        <View className="flex flex-row items-center justify-between">
          <Muted>Reporter:</Muted>
          <View className="flex-row gap-2 items-center w-60">
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

        <View className="flex flex-row  items-center justify-between ">
          <Muted>Customer:</Muted>

          <View className="flex-row w-60">
            {job.customer._id === "" ? (
              <AssignCustomer
                onCustomerAssigned={(customer, site) => {
                  handleAssignCustomer(customer);
                  handleAssignSite(site);
                }}
              />
            ) : (
              <>
                <View className="flex-1">
                  <Input
                    value={job.customer.businessName}
                    onChangeText={(value) => console.log(value)}
                    editable={editMode}
                    nativeID="Customer"
                  />
                </View>
                <DeleteButton xIcon={true} onDelete={handleDeleteCustomer} />
              </>
            )}
          </View>
        </View>

        <View className="flex flex-row items-center justify-between">
          <Muted>Site Location:</Muted>

          <View className="flex-row w-60">
            {job.siteLocation.site_id === "" ? (
              <AssignCustomer
                selectedCustomerId={job.customer._id}
                onCustomerAssigned={(customer, site) => {
                  handleAssignSite(site);
                }}
              />
            ) : (
              <>
                <View className="flex-1">
                  <Input
                    value={job.siteLocation.siteName}
                    onChangeText={(value) => console.log(value)}
                    editable={editMode}
                    nativeID="Site Location"
                  />
                </View>
                <DeleteButton
                  xIcon={true}
                  onDelete={handleDeleteSiteLocation}
                />
              </>
            )}
          </View>
        </View>

        <View className="flex flex-row items-center justify-between">
          <Muted>Due Date:</Muted>

          <View className="flex-row  gap-4 items-center w-60 ">
            {Platform.OS === "web" ? (
              <DatePickerWeb
                onChange={(date) => {
                  console.log(date);
                }}
              />
            ) : (
              <>
                <View className="flex-1">
                  <Input
                    value={new Date(job.dueDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "2-digit",
                    })}
                    onChangeText={(value) =>
                      handleInputChange("dueDate", value)
                    }
                    editable={editMode}
                    nativeID="Due Date"
                  />
                </View>
                <Pressable className=" mr-4" onPress={showDatePicker}>
                  <Calendar className="text-primary" size={21} />
                </Pressable>
              </>
            )}
          </View>
        </View>

        <View className="flex flex-row items-center justify-between">
          <Muted>Status:</Muted>
          <View className="flex-row items-center w-60">
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

        <View className="flex flex-row  items-center justify-between">
          <Muted>Linked PO</Muted>
          <View className="flex  w-60">
            <Input
              value={job.purchaseOrderNumber}
              onChangeText={(value) =>
                handleInputChange("purchaseOrderNumber", value)
              }
              editable={editMode}
            />
          </View>
        </View>

        <View className="flex flex-row items-center justify-between">
          <Muted>Estimate:</Muted>
          <View className="flex  w-60">
            <Input
              value={job.estimateId || ""}
              onChangeText={(value) => handleInputChange("estimateId", value)}
              editable={editMode}
            />
          </View>
        </View>

        <View className="flex flex-row  items-center justify-between">
          <Muted>Invoice:</Muted>
          <View className="flex  w-60">
            <Input
              value={job.invoiceId || ""}
              onChangeText={(value) => handleInputChange("invoiceId", value)}
              editable={editMode}
            />
          </View>
        </View>
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          is24Hour={true}
          onChange={onChange}
        />
      )}
    </View>
  );
};

export default JobBSecondaryInfo;
