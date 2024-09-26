import React, { useEffect } from "react";
import { View } from "react-native";
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

interface SiteLocation {
  siteName: string;
  siteContactPerson: string;
  AddressLine: string; // Updated to match the new JSON structure
  City: string; // Updated to match the new JSON structure
  Province: string; // Updated to match the new JSON structure
  Country: string; // Updated to match the new JSON structure
  zipcode: string;
}

interface BillingAddress {
  AddressLine: string; // Updated to match the new JSON structure
  City: string; // Updated to match the new JSON structure
  Province: string; // Updated to match the new JSON structure
  Country: string; // Updated to match the new JSON structure
  zipcode: string;
}

interface Customer {
  _id: string;
  businessName: string;
  customerName: string;
  email: string;
  phone: string;
  website: string;
  notes: string;
  billingAddress: BillingAddress; // Use the BillingAddress interface
  siteLocations: SiteLocation[];
}

interface CustomerDetailProps {
  customer: Customer;
}

const CustomerDetail: React.FC<CustomerDetailProps> = ({ customer }) => {
  const isLargeScreen = useIsLargeScreen();
  const [value, setValue] = React.useState("active");
  const [editMode, setEditMode] = React.useState(false);
  const [customerData, setCustomerData] = React.useState<Customer>(customer);

  // Optional: Update state when prop changes
  useEffect(() => {
    setCustomerData(customer);
  }, [customer]);
  const onSave = () => {
    setEditMode(false);
  };

  // Generic handler for all input fields
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
      } else {
        // Otherwise, update the billing address
        return {
          ...prevData,
          billingAddress: {
            ...prevData.billingAddress,
            [field]: value,
          },
        };
      }
    });
  };

  // Phone number formatting
  const handlePhoneChange = (phone: string) => {
    const formattedPhone = formatPhoneNumber(phone);
    handleInputChange("phone", formattedPhone);
  };

  return (
    <>
      {!isLargeScreen && (
        <Stack.Screen
          // Replace with your actual component
          options={{
            headerRight: () => (
              <ActionButtons
                onEdit={() => setEditMode(true)}
                onDelete={() => <DialogScreen />}
                onSave={onSave}
                editMode={editMode}
              />
            ),
            headerTitle: () => (
              <View>
                <H3>{customer.businessName}</H3>
                <Text>{customer.customerName}</Text>
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
          <View className="w-full flex-row gap-1 items-center justify-between gap-2">
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
        {/* Top Container*/}
        <View className="flex flex-col md:flex-row w-full gap-6 p-2 ">
          {/* Contact Details */}

          <View className="flex-1 flex-col gap-2 w-full">
            <View className="flex-column items-start justify-start gap-2 p-2 py-5">
              <View className="gap-1">
                <Label nativeID="email">Email</Label>

                <Input
                  placeholder="email"
                  value={customerData.email}
                  onChangeText={(value) => handleInputChange("email", value)}
                  aria-labelledby="email"
                  aria-errormessage="inputError"
                  editable={editMode}
                />
              </View>
              <View className="gap-1">
                <Label nativeID="phone">Phone</Label>

                <Input
                  placeholder="phone"
                  value={customerData.phone}
                  onChangeText={(value) => handlePhoneChange(value)}
                  aria-labelledby="phone"
                  aria-errormessage="inputError"
                  editable={editMode}
                />
              </View>

              <View className="gap-1">
                <Label nativeID="website">Website</Label>

                <Input
                  placeholder="website"
                  value={customerData.website}
                  onChangeText={(value) => handleInputChange("website", value)}
                  aria-labelledby="website"
                  aria-errormessage="inputError"
                  editable={editMode}
                />
              </View>
            </View>
          </View>

          {/* Billing Address */}
          <View className="flex-1 flex-col gap-2 w-full">
            <View className="flex-column items-start justify-start gap-4 p-2 py-5">
              <View className="gap-1">
                <Label nativeID="BillingAddress">Billing Address</Label>

                <Input
                  placeholder="Address"
                  value={customerData.billingAddress.AddressLine}
                  onChangeText={(value) =>
                    handleInputChange("AddressLine", value)
                  }
                  aria-labelledby="BillingAddress"
                  aria-errormessage="inputError"
                  editable={editMode}
                />

                <Input
                  placeholder="City"
                  value={customerData.billingAddress.City}
                  onChangeText={(value) => handleInputChange("City", value)}
                  aria-labelledby="BillingAddress"
                  aria-errormessage="inputError"
                  editable={editMode}
                />

                <View className="flex-row gap-2">
                  <Input
                    placeholder="Province"
                    value={customerData.billingAddress.Province}
                    onChangeText={(value) =>
                      handleInputChange("Province", value)
                    }
                    aria-labelledby="BillingAddress"
                    aria-errormessage="inputError"
                    editable={editMode}
                  />

                  <Input
                    placeholder="zipcode"
                    value={customerData.billingAddress.zipcode}
                    onChangeText={(value) =>
                      handleInputChange("zipcode", value)
                    }
                    aria-labelledby="BillingAddress"
                    aria-errormessage="inputError"
                    editable={editMode}
                  />
                </View>

                <Input
                  placeholder="Country"
                  value={customerData.billingAddress.Country}
                  onChangeText={(value) => handleInputChange("Country", value)}
                  aria-labelledby="BillingAddress"
                  aria-errormessage="inputError"
                  editable={editMode}
                />
              </View>
            </View>
          </View>
        </View>

        {/*Site Locations */}
        <Text className="text-xl mb-2">Site Locations</Text>

        <View className="flex-wrap flex-row gap-4">
          {customer.siteLocations.map((site, index) => (
            <Card key={index} className="w-full sm:w-1/2 md:w-1/3">
              {/* Adjust the width based on screen size */}
              <CardHeader>
                <CardTitle>{site.siteName}</CardTitle>
                <CardDescription>
                  Contact: {site.siteContactPerson}
                </CardDescription>
              </CardHeader>
              <CardContent className="gap-4 native:gap-2">
                <View className="gap-1">
                  <Label nativeID={`address-${index}`}>Address</Label>
                  <Input
                    aria-labelledby={`address-${index}`}
                    defaultValue={site.AddressLine}
                    editable={editMode} // Change to true if you want to allow editing
                  />
                </View>
                <View className="gap-1">
                  <Label nativeID={`city-${index}`}>City</Label>
                  <Input
                    id={`city-${index}`}
                    defaultValue={site.City}
                    editable={editMode} // Change to true if you want to allow editing
                  />
                </View>
                <View className="gap-1">
                  <Label nativeID={`province-${index}`}>Province</Label>
                  <Input
                    id={`province-${index}`}
                    defaultValue={site.Province}
                    editable={editMode} // Change to true if you want to allow editing
                  />
                </View>
                <View className="gap-1">
                  <Label nativeID={`zipcode-${index}`}>Zip Code</Label>
                  <Input
                    id={`zipcode-${index}`}
                    defaultValue={site.zipcode}
                    editable={editMode} // Change to true if you want to allow editing
                  />
                </View>
              </CardContent>
            </Card>
          ))}
        </View>

        {/*  <Card>
          <CardHeader>
            <CardTitle>Active Projects</CardTitle>
            <CardDescription>
              Make changes to your account here. Click save when you're done.
            </CardDescription>
          </CardHeader>
          <CardContent className="gap-4 native:gap-2">
            <View className="gap-1">
              <Label nativeID="name">Name</Label>
              <Input aria-aria-labelledby="name" defaultValue="Pedro Duarte" />
            </View>
            <View className="gap-1">
              <Label nativeID="username">Username</Label>
              <Input id="username" defaultValue="@peduarte" />
            </View>
          </CardContent>
          <CardFooter>
            <Button>
              <Text>Save changes</Text>
            </Button>
          </CardFooter>
        </Card> */}
      </ScrollView>
    </>
  );
};

export default CustomerDetail;
