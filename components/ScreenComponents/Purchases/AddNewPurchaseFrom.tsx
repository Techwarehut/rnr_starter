import { Platform, View } from "react-native";
import React from "react";
import { Text } from "~/components/ui/text";

import { formatPhoneNumber, getInitials, useIsLargeScreen } from "~/lib/utils";
import { Muted } from "~/components/ui/typography";
import { ScrollView } from "react-native-gesture-handler";
import { Button } from "~/components/ui/button";

import { Customer, SiteLocation } from "../Customers/types";

import InputField from "../InputField";
import { Textarea } from "~/components/ui/textarea";
import { Label } from "~/components/ui/label";
import { PurchaseOrder, PurchaseOrderItem, StatusKeys, Vendor } from "./types";
import { CreatedUser, customer } from "../Jobs/types";
import StatusBadge from "./PurchaseCardElements/StatusBadge";
import ItemList from "./PurchaseCardElements/ItemList";
import LinkedJobSection from "./PurchaseCardElements/LinkedJobSection";
import DeleteButton from "../DeleteButton";
import { Input } from "~/components/ui/input";
import { AssignVendor } from "./PurchaseCardElements/AssignVendor";

interface AddJobFormProps {
  onChange: (data: PurchaseOrder) => void;
  jobId: string;
}

const AddNewPurchaseForm: React.FC<AddJobFormProps> = ({ onChange, jobId }) => {
  const [refreshKey, setRefreshKey] = React.useState(0);
  // Initial state for PurchaseOrder
  const [purchase, setPurchase] = React.useState<PurchaseOrder>({
    purchaseOrderNumber: "",
    vendor: {
      _id: "",
      companyName: "",
    },
    items: [],
    status: "Request", // Default status can be "Request"
    total: 0, // Default total
    jobID: jobId ? jobId : "",
    requestedBy: {
      userId: "",
      name: "",
      profileUrl: "",
    },
    approvedBy: null, // Initially null until approved
    customer: {
      _id: "",
      businessName: "",
    },
  });

  const handleInputChange = (
    field: keyof PurchaseOrder, // The field being updated in the PurchaseOrder object
    value:
      | string
      | Vendor
      | PurchaseOrderItem
      | StatusKeys
      | CreatedUser
      | customer
      | number
  ) => {
    // Create a copy of the purchase state to avoid direct mutation
    let updatedPurchaseData = { ...purchase };

    // Check if the field is related to Vendor (for simplicity, let's assume Vendor type is used for certain fields)
    if (field === "vendor" && typeof value === "object" && value !== null) {
      updatedPurchaseData.vendor = value as Vendor;
      console.log(updatedPurchaseData.vendor);
    }
    // Check if the field is related to items (PurchaseOrderItem)
    else if (field === "items" && (value as PurchaseOrderItem)) {
      updatedPurchaseData.items.push(value as PurchaseOrderItem);
      updatedPurchaseData.total += (value as PurchaseOrderItem).price;
    }
    // Check if the field is related to StatusKeys
    else if (field === "total" && typeof value === "number") {
      updatedPurchaseData.total = value as number;
    }
    // Handle Customer data (assuming 'businessName' is a field of the customer object)
    else if (
      field === "customer" &&
      typeof value === "object" &&
      value !== null &&
      "businessName" in value
    ) {
      updatedPurchaseData.customer = value as customer; // Safely assign to customer object
    }
    // Handle CreatedUser updates (for fields like requestedBy or approvedBy)
    else if (field === "jobID") {
      if (typeof value === "string" && value !== null) {
        updatedPurchaseData.jobID = value as string; // Assign CreatedUser
      }
    }

    // If the field doesn't match any of the above, log a warning
    else {
      console.warn(
        `Field ${field} does not exist in PurchaseOrder, Vendor, or Customer.`
      );
    }

    // Update the state with the modified purchase data
    setPurchase(updatedPurchaseData);
    onChange(updatedPurchaseData); // Call onChange with the updated data
  };

  const handleDeleteVendor = () => {
    purchase.vendor = {
      _id: "",
      companyName: "",
    };
    setRefreshKey((prev) => prev + 1);
  };

  const isLargeScreen = useIsLargeScreen();

  return (
    <ScrollView
      showsVerticalScrollIndicator={Platform.OS === "web"}
      /* contentContainerClassName="flex-1 p-4 gap-12 web:mb-12" */
      contentContainerStyle={{ padding: isLargeScreen ? 48 : 12 }}
    >
      <View className="flex gap-2">
        <Muted>Select a vendor</Muted>
        <View className="flex-row gap-4 items-center justify-between ">
          <View className="flex-1">
            <Input
              value={purchase.vendor.companyName}
              onChangeText={(value) => console.log(value)}
              editable={false}
              nativeID="Vendor"
            />
          </View>
          {purchase.vendor._id === "" ? (
            <AssignVendor
              onVendorAssigned={(vendor) => {
                handleInputChange("vendor", {
                  _id: vendor._id,
                  companyName: vendor.companyName,
                });
              }}
            />
          ) : (
            <DeleteButton xIcon={true} onDelete={handleDeleteVendor} />
          )}
        </View>
      </View>

      <ItemList
        PurchaseOrder={purchase}
        handleInput={handleInputChange}
        addNew={true}
      />
      <LinkedJobSection
        jobID={purchase.jobID}
        orderNumber={purchase.purchaseOrderNumber}
        handleInput={handleInputChange}
        addNew={true}
      />
    </ScrollView>
  );
};

export default AddNewPurchaseForm;
