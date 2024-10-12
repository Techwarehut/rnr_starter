import React, { useEffect } from "react";
import { Platform, View } from "react-native";
import { Button } from "~/components/ui/button";
import { H1, H2, H3, H4, Large, Muted } from "~/components/ui/typography";

import { formatPhoneNumber, useIsLargeScreen } from "~/lib/utils";
import { Text } from "~/components/ui/text";

import { ScrollView } from "react-native-gesture-handler";
import ActionButtons from "../ActionButtons";
import { router, Stack } from "expo-router";

import { Customer, SiteLocation } from "./types";
import SiteLocationCard from "./SiteLocationCard";
import { useToast } from "../ToastMessage";
import Toast from "react-native-toast-message";
import InputField from "../InputField";
import CustomerInfoFields from "./FormElements/CustomerNameField";
import CustomerBasicInfo from "./FormElements/CustomerBasicInfo";
import CustomerBillingAddress from "./FormElements/CustomerBillingAddress";
import { AddNewSiteLocation } from "./AddNewSiteLocation";
import toastConfig from "../CustomToast";
import {
  addSiteLocation,
  deleteCustomer,
  deleteSiteLocation,
  editCustomer,
  fetchCustomerById,
  fetchCustomers,
} from "~/api/customerApi";

interface CustomerDetailProps {
  customer: Customer;
}

const CustomerDetail: React.FC<CustomerDetailProps> = ({ customer }) => {
  const isLargeScreen = useIsLargeScreen();
  const [value, setValue] = React.useState("active");
  const [editMode, setEditMode] = React.useState(false);
  const [customerData, setCustomerData] = React.useState<Customer>(customer);
  const { showSuccessToast, showErrorToast } = useToast();

  // Optional: Update state when prop changes
  useEffect(() => {
    setCustomerData(customer);
  }, [customer]);

  const handleEditCustomer = async () => {
    try {
      setEditMode(false);
      const returnedCustomer = await editCustomer(customerData);

      setCustomerData(returnedCustomer);

      showSuccessToast("Customer updated successfully!");
    } catch (error) {
      showErrorToast("Error updating customer!");
    }
  };

  const handleDeleteCustomer = async () => {
    try {
      await deleteCustomer(customerData._id);

      showSuccessToast("Customer deleted successfully!");
      router.replace("/(tabs)/customers");
    } catch (error) {
      showErrorToast("Error deleting customer!");
    }
  };

  const onAddSiteLocation = async (data: SiteLocation) => {
    try {
      await addSiteLocation(customerData._id, data);

      // Fetch the specific customer by ID after adding the site
      const updatedCustomer = await fetchCustomerById(customerData._id);
      if (updatedCustomer) {
        setCustomerData(updatedCustomer); // Update customer state with the fetched data
      }

      showSuccessToast("Site added successfully!");
    } catch (error) {
      console.error("Error adding site location:", error);
      showErrorToast("Failed to add site location. Please try again.");
    }
  };

  const handleDeleteSite = async (siteId: string) => {
    try {
      await deleteSiteLocation(customerData._id, siteId); // Call your API to delete the site
      // Fetch the specific customer by ID after adding the site
      const updatedCustomer = await fetchCustomerById(customerData._id);
      if (updatedCustomer) {
        setCustomerData(updatedCustomer); // Update customer state with the fetched data
      }
      showSuccessToast("Site deleted successfully!");
    } catch (error) {
      console.error("Error deleting site location:", error);
      showErrorToast("Failed to delete site location. Please try again.");
    }
  };

  const handleInputChange = (
    field: string,
    value: string,
    siteIndex?: number
  ) => {
    setCustomerData((prevData) => {
      // If siteIndex is defined, update a site location

      if (siteIndex !== undefined) {
        const updatedSiteLocations = prevData.siteLocations.map(
          (site, index) => {
            if (index === siteIndex) {
              return {
                ...site,
                [field]: value,
              };
            }

            return site;
          }
        );

        return {
          ...prevData,
          siteLocations: updatedSiteLocations,
        };
      } else if (field in prevData.billingAddress) {
        // Update the billing address if the field is in billingAddress
        return {
          ...prevData,
          billingAddress: {
            ...prevData.billingAddress,
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

  console.log("Site Locations ");

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
                onDelete={handleDeleteCustomer}
                onSave={handleEditCustomer}
                editMode={editMode}
              />
            ),
            headerTitle: () => (
              <View>
                <Text>{customer.businessName}</Text>
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
              <H3>{customer.businessName}</H3>
              <Text>{customer.customerName}</Text>
            </View>
            <ActionButtons
              onEdit={() => setEditMode(true)}
              onDelete={handleDeleteCustomer}
              onSave={handleEditCustomer}
              editMode={editMode}
            />
          </View>
        )}

        <CustomerInfoFields
          customerData={customerData}
          handleInputChange={handleInputChange}
          editMode={editMode}
        />

        {/* Top Container*/}
        <View className="flex flex-col md:flex-row w-full gap-6  ">
          {/* Contact Details */}
          <CustomerBasicInfo
            customerData={customerData}
            handleInputChange={handleInputChange}
            editMode={editMode}
            handlePhoneChange={handlePhoneChange}
          />
          {/* Billing Address */}
          <CustomerBillingAddress
            customerData={customerData}
            handleInputChange={handleInputChange}
            editMode={editMode}
          />
        </View>

        {/*Site Locations */}
        <View className="flex-row items-center justify-between mb-2">
          <View className="flex-1">
            <Text className="text-xl">
              Site Locations ({customerData.siteLocations.length})
            </Text>
            <Muted>
              You can include several locations, and they will appear on your
              invoice.
            </Muted>
          </View>
          <AddNewSiteLocation onAddNewSite={onAddSiteLocation} />
        </View>
        {Platform.OS === "web" ? (
          <View className="flex-wrap flex-row gap-4">
            <SiteLocationCard
              customer={customerData}
              editMode={editMode}
              handleInputChange={handleInputChange} // Pass the function here
              handleDelete={handleDeleteSite}
            />
          </View>
        ) : (
          <View className="flex flex-row flex-nowrap py-4 my-4 w-full overflow-x-scroll">
            <ScrollView
              horizontal={true}
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              scrollEventThrottle={200}
              decelerationRate="fast"
              scrollEnabled
              contentContainerStyle={{
                flexDirection: "row",
                flexGrow: 1,
                flexWrap: "nowrap",
                overflow: "visible",
                gap: 8,
              }}
              snapToInterval={cardWidth} // Snap to the width of each card
              snapToAlignment="center" // Align the start of the card
            >
              <SiteLocationCard
                customer={customerData}
                editMode={editMode}
                handleInputChange={handleInputChange} // Pass the function here
                handleDelete={handleDeleteSite}
              />
            </ScrollView>
          </View>
        )}
      </ScrollView>
      <Toast />
    </>
  );
};

export default CustomerDetail;
