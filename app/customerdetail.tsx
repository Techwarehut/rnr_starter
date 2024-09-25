import { View, Text } from "react-native";
import React from "react";

import CustomerDetail from "~/components/ScreenComponents/Customers/CustomerDetail";
import { Stack, useLocalSearchParams } from "expo-router";
import { H3, Muted } from "~/components/ui/typography";
import { Button } from "~/components/ui/button";

interface SiteLocation {
  address: string;
  zipcode: string;
}

interface Customer {
  _id: string;
  businessName: string;
  customerName: string;
  email: string;
  phone: string;
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
        <View className="flex-1 items-center justify-center">
          <H3>No customer data available</H3>
          <Muted>Nothing is selected</Muted>
        </View>
      )}
    </>
  );
};

export default CustomerDetailScreen;
