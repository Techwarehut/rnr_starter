import { Stack } from "expo-router";
import { View } from "react-native";
import { Text } from "~/components/ui/text";
import { formatPhoneNumber, useIsLargeScreen } from "~/lib/utils";
import React, { useEffect, useState } from "react";
import ActionButtons from "~/components/ScreenComponents/ActionButtons";
import { useToast } from "~/components/ScreenComponents/ToastMessage";
import Toast from "react-native-toast-message";
import { Button } from "~/components/ui/button";
import { ScrollView } from "react-native";
import BusinessInfo from "~/components/ScreenComponents/Settings/BusinessInfo";
import {
  BusinessBillingAddress,
  defaultTenant,
  Tenant,
} from "~/components/ScreenComponents/Settings/types";
import { getTenantById } from "~/api/tenantApi";
import BusinessBillingAddr from "~/components/ScreenComponents/Settings/BusinessBillingAddr";
import BusinessLogo from "~/components/ScreenComponents/Settings/BusinessLogo";
import BusinessTaxRate from "~/components/ScreenComponents/Settings/BusinessTaxRate";
import BusinessSubscription from "~/components/ScreenComponents/Settings/BusinessSubscription";
import BusinessChecklist from "~/components/ScreenComponents/Settings/BusinessChecklist";

export default function Settings() {
  const isLargeScreen = useIsLargeScreen();
  const [editMode, setEditMode] = React.useState(false);

  const { showSuccessToast, showErrorToast } = useToast();
  const [tenant, setTenant] = useState<Tenant>(defaultTenant);
  const loadtenantInfo = async () => {
    try {
      const data = await getTenantById("1"); // Call the API
      setTenant(data);
    } catch (error) {
      showErrorToast("Failed to fetch customers!");
    }
  };

  useEffect(() => {
    loadtenantInfo(); // Fetch customers on mount
  }, []);

  const handleSave = async () => {
    try {
      // await deleteCustomer(customerData._id);
      setEditMode(false);
      showSuccessToast("Saved successfully!");
    } catch (error) {
      showErrorToast("Error saving information!");
    }
  };

  const handleInputChange = (
    field: string,
    value: string | BusinessBillingAddress
  ) => {
    setTenant((prevData) => {
      if (!prevData) {
        // If prevData is undefined, return a full Tenant object with the updated field
        return {
          _id: "", // Provide a default value for _id
          businessName: "", // Default empty string
          businessLogo: "",
          businessType: "HVAC", // Provide a default business type
          businessPhone: "",
          businessEmail: "",
          businessWebsite: "",
          businessBillingAddress: {
            addressLine: "",
            city: "",
            zipCode: "",
            province: "",
            country: "",
          },
          businessTaxID: "",
          taxRate: 0,
          employeeCount: 0,
          customerNotificationPreferences: { email: true, sms: true },
          planType: "Starter", // Default value for planType
          subscriptionStartDate: "",
          subscriptionEndDate: "",
          paymentStatus: "Paid", // Default payment status
          [field]: value, // Only update the specific field that was changed
        };
      }

      // If prevData is defined, proceed with the update
      if (field in prevData.businessBillingAddress) {
        // Update the billing address if the field is in businessBillingAddress
        return {
          ...prevData,
          businessBillingAddress: {
            ...prevData.businessBillingAddress,
            [field]: value,
          },
        };
      } else {
        // Otherwise, update the field directly
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

  return (
    <>
      <Stack.Screen
        // Replace with your actual component
        options={{
          headerTitleAlign: "left",
          headerRight: () =>
            editMode ? (
              <View className="mr-4">
                <Button variant="outline" onPress={handleSave}>
                  <Text>Save</Text>
                </Button>
              </View>
            ) : (
              <View className="mr-4">
                <Button variant="secondary" onPress={() => setEditMode(true)}>
                  <Text>Edit</Text>
                </Button>
              </View>
            ),
        }}
      />
      <ScrollView
        showsVerticalScrollIndicator={isLargeScreen}
        className="flex-1 w-full gap-10 p-2"
      >
        <View className={`flex-1 gap-5 ${isLargeScreen ? "pl-20" : "pl-4"}`}>
          <View className="flex flex-col md:flex-row w-full gap-6  ">
            <BusinessInfo
              tenant={tenant}
              handleInputChange={handleInputChange}
              editMode={editMode}
              handlePhoneChange={handlePhoneChange}
            />
            <BusinessBillingAddr
              tenant={tenant}
              handleInputChange={handleInputChange}
              editMode={editMode}
              handlePhoneChange={handlePhoneChange}
            />
          </View>

          <View className="flex flex-col md:flex-row w-full gap-6  ">
            <BusinessLogo
              tenant={tenant}
              handleInputChange={handleInputChange}
              editMode={editMode}
              handlePhoneChange={handlePhoneChange}
            />
            <BusinessTaxRate
              tenant={tenant}
              handleInputChange={handleInputChange}
              editMode={editMode}
              handlePhoneChange={handlePhoneChange}
            />
            <BusinessSubscription />
          </View>
          <BusinessChecklist />
        </View>
      </ScrollView>
      <Toast />
    </>
  );
}
