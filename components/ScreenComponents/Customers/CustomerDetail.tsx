import React, { useEffect } from "react";
import { Platform, View } from "react-native";
import { Button } from "~/components/ui/button";
import { H1, H2, H3, H4, Large, Muted } from "~/components/ui/typography";
import { Mail } from "~/lib/icons/Mail";
import { Phone } from "~/lib/icons/Phone";
import { MapPin } from "~/lib/icons/MapPin";
import { formatPhoneNumber, useIsLargeScreen } from "~/lib/utils";
import { Text } from "~/components/ui/text";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { ScrollView } from "react-native-gesture-handler";
import ActionButtons from "../ActionButtons";
import { Stack } from "expo-router";
import DialogScreen from "../DialogScreen";
import { Customer } from "./types";
import SiteLocationCard from "./SiteLocationCard";
import { useToast } from "../ToastMessage";
import Toast from "react-native-toast-message";
import InputField from "../InputField";
import CustomerInfoFields from "./FormElements/CustomerNameField";
import CustomerBasicInfo from "./FormElements/CustomerBasicInfo";
import CustomerBillingAddress from "./FormElements/CustomerBillingAddress";
import { AddNewSiteLocation } from "./AddNewSiteLocation";
import toastConfig from "../CustomToast";

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
  const onSave = () => {
    setEditMode(false);
    // To show a success toast with custom text2
    console.log("Before showing toast");
    showSuccessToast("Customer saved succesfully!");
  };

  const onAddSiteLocation = (data: Customer) => {
    setCustomerData(data);
    showSuccessToast("Site added succesfully!");
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
              onDelete={() => console.log("Delete pressed")}
              onSave={onSave}
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
              Site Locations ({customer.siteLocations.length})
            </Text>
            <Muted>
              You can include several locations, and they will appear on your
              invoice.
            </Muted>
          </View>
          <AddNewSiteLocation
            customer={customer}
            onChange={onAddSiteLocation}
          />
        </View>
        {isLargeScreen ? (
          <View className="flex-wrap flex-row gap-4">
            <SiteLocationCard
              customer={customerData}
              editMode={editMode}
              handleInputChange={handleInputChange} // Pass the function here
            />
          </View>
        ) : (
          <View className="flex flex-row flex-nowrap py-4 my-4 w-full overflow-x-scroll">
            <ScrollView
              horizontal={true}
              pagingEnabled
              showsHorizontalScrollIndicator={Platform.OS === "web"}
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
