import { View, Text } from "react-native";
import React from "react";

import CustomerDetail from "~/components/ScreenComponents/Customers/CustomerDetail";
import { Stack, useLocalSearchParams } from "expo-router";
import { H3, Muted } from "~/components/ui/typography";
import { Button } from "~/components/ui/button";
import NothingSelected from "~/components/ScreenComponents/NothingSelected";
import ActionButtons from "~/components/ScreenComponents/ActionButtons";
import { Customer } from "~/components/ScreenComponents/Customers/types";
import Toast from "react-native-toast-message";
import { Vendor } from "~/components/ScreenComponents/Vendors/types";
import VendorDetail from "~/components/ScreenComponents/Vendors/VendorDetail";

const VendorDetailScreen: React.FC = () => {
  const { vendorParam } = useLocalSearchParams(); // Get the customer from navigation params
  let vendor: Vendor | null = null;

  if (typeof vendorParam === "string") {
    try {
      vendor = JSON.parse(vendorParam); // Deserialize the customer
    } catch (error) {
      console.error("Failed to parse vendor data", error);
    }
  }

  return (
    <>
      {vendor ? (
        <View className="flex-1 items-center bg-secondary/30 justify-center m-2">
          <VendorDetail vendor={vendor} />
        </View>
      ) : (
        <NothingSelected />
      )}
    </>
  );
};

export default VendorDetailScreen;
