import React, { useEffect } from "react";
import { Platform, View } from "react-native";

import { H1, H2, H3, H4, Large, Muted } from "~/components/ui/typography";

import { formatPhoneNumber, useIsLargeScreen } from "~/lib/utils";
import { Text } from "~/components/ui/text";

import { ScrollView } from "react-native-gesture-handler";
import ActionButtons from "../ActionButtons";
import { Stack } from "expo-router";

import { useToast } from "../ToastMessage";
import Toast from "react-native-toast-message";

import VendorInfoFields from "./FormElements/VendorInfoFields";
import VendorBasicInfo from "./FormElements/VendorBasicInfo";
import VendorBillingAddress from "./FormElements/VendorBillingAddress";
import { Vendor } from "./types";

interface CustomerDetailProps {
  vendor: Vendor;
}

const VendorDetail: React.FC<CustomerDetailProps> = ({ vendor }) => {
  const isLargeScreen = useIsLargeScreen();

  const [editMode, setEditMode] = React.useState(false);
  const [vendorData, setVendorData] = React.useState<Vendor>(vendor);
  const { showSuccessToast, showErrorToast } = useToast();

  // Optional: Update state when prop changes
  useEffect(() => {
    setVendorData(vendor);
  }, [vendor]);
  const onSave = () => {
    setEditMode(false);
    // To show a success toast with custom text2

    showSuccessToast("Customer saved succesfully!");
  };

  const handleInputChange = (field: string, value: string) => {
    setVendorData((prevData) => {
      // If siteIndex is defined, update a site location

      if (field in prevData.contactPerson) {
        // Update the billing address if the field is in billingAddress
        return {
          ...prevData,
          contactPerson: {
            ...prevData.contactPerson,
            [field]: value,
          },
        };
      } else if (field in prevData.address) {
        // Update the billing address if the field is in billingAddress
        return {
          ...prevData,
          address: {
            ...prevData.address,
            [field]: value,
          },
        };
      } else {
        // Otherwise, update the customer field directly
        return {
          ...prevData,
          [field]: value,
        };
      }
    });
  };

  // Phone number formatting
  const handlePhoneChange = (field: string, phone: string) => {
    const formattedPhone = formatPhoneNumber(phone);
    handleInputChange(field, formattedPhone);
  };
  const cardWidth = 300; // Approximate width for min-w-80 (adjust as necessary)

  return (
    <>
      {!isLargeScreen && (
        <Stack.Screen
          // Replace with your actual component
          options={{
            headerTitleAlign: "left",
            headerRight: () => (
              <ActionButtons
                onEdit={() => setEditMode(true)}
                onDelete={() => console.log("Delete pressed")}
                onSave={onSave}
                editMode={editMode}
              />
            ),
            headerTitle: () => (
              <View>
                <Text>{vendor.companyName}</Text>
              </View>
            ),
          }}
        />
      )}

      <ScrollView
        showsVerticalScrollIndicator={isLargeScreen}
        className="flex-1 w-full gap-10 p-2"
      >
        {/* Header with Edit and Delete buttton */}
        {isLargeScreen && (
          <View className="w-full flex-row gap-1 items-center justify-between gap-2 mb-4">
            <View>
              <H3>{vendor.companyName}</H3>
              <Text>{vendor.contactPerson.name}</Text>
            </View>
            <ActionButtons
              onEdit={() => setEditMode(true)}
              onDelete={() => console.log("Delete pressed")}
              onSave={onSave}
              editMode={editMode}
            />
          </View>
        )}

        <VendorInfoFields
          vendorData={vendorData}
          handleInputChange={handleInputChange}
          editMode={editMode}
        />

        {/* Top Container*/}
        <View className="flex flex-col md:flex-row w-full gap-6  ">
          {/* Contact Details */}
          <VendorBasicInfo
            vendorData={vendorData}
            handleInputChange={handleInputChange}
            editMode={editMode}
            handlePhoneChange={handlePhoneChange}
          />
          {/* Billing Address */}
          <VendorBillingAddress
            vendorData={vendorData}
            handleInputChange={handleInputChange}
            editMode={editMode}
          />
        </View>
      </ScrollView>
      <Toast />
    </>
  );
};

export default VendorDetail;
