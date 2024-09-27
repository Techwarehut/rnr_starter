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
  const handlePhoneChange = (phone: string) => {
    const formattedPhone = formatPhoneNumber(phone);
    handleInputChange("phone", formattedPhone);
  };
  const cardWidth = 300; // Approximate width for min-w-80 (adjust as necessary)

  return (
    <>
      {!isLargeScreen && (
        <Stack.Screen
          // Replace with your actual component
          options={{
            headerRight: () => (
              <ActionButtons
                onEdit={() => setEditMode(true)}
                onDelete={() => console.log("Delete pressed")}
                onSave={onSave}
                editMode={editMode}
              />
            ),
            headerTitle: () => (
              <View style={{ alignItems: "flex-start", marginLeft: 10 }}>
                <Text>{customer.businessName}</Text>
                <Muted>{customer.customerName}</Muted>
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

        {editMode && (
          <View className="flex-1 flex-row flex-wrap gap-4 mb-8">
            <View className="gap-1 w-full">
              <Label nativeID="businessName">Business Name</Label>

              <Input
                placeholder="businessName"
                value={customerData.email}
                onChangeText={(value) =>
                  handleInputChange("businessName", value)
                }
                aria-labelledby="Business Name"
                aria-errormessage="inputError"
                editable={editMode}
              />
            </View>
            <View className="gap-1 w-full">
              <Label nativeID="customerName">Customer Name</Label>

              <Input
                placeholder="Customer Name"
                value={customerData.email}
                onChangeText={(value) =>
                  handleInputChange("customerName", value)
                }
                aria-labelledby="customerName"
                aria-errormessage="inputError"
                editable={editMode}
              />
            </View>
          </View>
        )}
        {/* Top Container*/}
        <View className="flex flex-col md:flex-row w-full gap-6  ">
          {/* Contact Details */}

          <View className="flex-1 flex-col gap-2 w-full">
            <View>
              <Text className="text-xl">Basic Information</Text>
              <Muted>Optional. It will appear on invoice.</Muted>
            </View>

            <View className="flex-column items-start justify-start gap-4 p-2 py-5 ">
              <View className="gap-1 w-full">
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
              <View className="gap-1 w-full">
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

              <View className="gap-1 w-full">
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
            <View>
              <Text className="text-xl">Billing Address</Text>
              <Muted>Optional. It will appear on invoice.</Muted>
            </View>
            <View className="flex-column items-start justify-start gap-4 p-2 py-5">
              <View className="gap-1 w-full">
                <Label nativeID="Address">Address</Label>

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
              </View>
              <View className="gap-1 w-full">
                <Label nativeID="City">City</Label>
                <Input
                  placeholder="City"
                  value={customerData.billingAddress.City}
                  onChangeText={(value) => handleInputChange("City", value)}
                  aria-labelledby="City"
                  aria-errormessage="inputError"
                  editable={editMode}
                />
              </View>
              <View className="flex-row gap-1 w-full">
                <View className="flex-1 gap-1">
                  <Label nativeID="province">Province</Label>
                  <Input
                    placeholder="Province"
                    value={customerData.billingAddress.Province}
                    onChangeText={(value) =>
                      handleInputChange("Province", value)
                    }
                    aria-labelledby="province"
                    aria-errormessage="inputError"
                    editable={editMode}
                  />
                </View>
                <View className="flex-1 gap-1">
                  <Label nativeID="zipcode">Zip Code</Label>
                  <Input
                    placeholder="zipcode"
                    value={customerData.billingAddress.zipcode}
                    onChangeText={(value) =>
                      handleInputChange("zipcode", value)
                    }
                    aria-labelledby="zipcode"
                    aria-errormessage="inputError"
                    editable={editMode}
                  />
                </View>
              </View>
            </View>
          </View>
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
          <View className="flex items-end">
            <Button>
              <Text>Add New</Text>
            </Button>
          </View>
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
          <View className="flex-row py-4 my-2 overflow-x-scroll">
            <ScrollView
              horizontal={true}
              pagingEnabled
              showsHorizontalScrollIndicator={Platform.OS === "web"}
              scrollEventThrottle={200}
              decelerationRate="fast"
              scrollEnabled
              contentContainerStyle={{
                flexDirection: "row",
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
    </>
  );
};

export default CustomerDetail;
