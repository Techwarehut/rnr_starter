import { View, Text } from "react-native";
import React from "react";

import CustomerDetail from "~/components/ScreenComponents/Customers/CustomerDetail";
import { Stack, useLocalSearchParams } from "expo-router";
import { H3, Muted } from "~/components/ui/typography";
import { Button } from "~/components/ui/button";
import NothingSelected from "~/components/ScreenComponents/NothingSelected";
import ActionButtons from "~/components/ScreenComponents/ActionButtons";

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

const CustomerDetailScreen: React.FC = () => {
  const { customerParam } = useLocalSearchParams(); // Get the customer from navigation params
  let customer: Customer | null = null;

  if (typeof customerParam === "string") {
    try {
      customer = JSON.parse(customerParam); // Deserialize the customer
    } catch (error) {
      console.error("Failed to parse customer data", error);
    }
  }

  return (
    <>
      {customer ? (
        <View className="flex-1 items-center justify-center m-2">
          <CustomerDetail customer={customer} />
        </View>
      ) : (
        <NothingSelected />
      )}
    </>
  );
};

export default CustomerDetailScreen;
