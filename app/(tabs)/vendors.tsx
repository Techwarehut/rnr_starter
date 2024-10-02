import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { router, Stack, useNavigation } from "expo-router";
import CustomerTable from "~/components/ScreenComponents/Customers/CustomerTable";
import SearchBar from "~/components/ScreenComponents/SearchBar";
import vendors from "~/data/vendor.json"; // Your customer data
import { useIsLargeScreen } from "~/lib/utils";
import { Plus } from "~/lib/icons/Plus";
import CustomerDetail from "~/components/ScreenComponents/Customers/CustomerDetail";
import { H2, H3, Muted } from "~/components/ui/typography";
import NothingSelected from "~/components/ScreenComponents/NothingSelected";
import { Customer } from "~/components/ScreenComponents/Customers/types";
import { AddNewCustomer } from "~/components/ScreenComponents/Customers/AddNewCustomer";
import { useToast } from "~/components/ScreenComponents/ToastMessage";
import Toast from "react-native-toast-message";
import { Vendor } from "~/components/ScreenComponents/Vendors/types";
import VendorTable from "~/components/ScreenComponents/Vendors/VendorTable";
import VendorDetail from "~/components/ScreenComponents/Vendors/VendorDetail";
import { AddNewVendor } from "~/components/ScreenComponents/Vendors/AddNewCustomer";

const VendorScreen = () => {
  const [filteredVendors, setFilteredVendors] = useState(vendors);
  const [selVendor, setSelVendor] = useState<Vendor | null>(null);
  const { showSuccessToast, showErrorToast } = useToast();

  const showVendorDetails = (vendor: Vendor) => {
    // Logic for adding a new customer
    const formattedVendorname = vendor.companyName.replace(/\s+/g, "");
    setSelVendor(vendor);
    if (!isLargeScreen) {
      router.push({
        pathname: "/(vendor)/[vendorName]",
        params: {
          vendorName: formattedVendorname,
          vendorParam: JSON.stringify(vendor),
        }, // Pass the customer object
      });
    }
  };

  useEffect(() => {
    setFilteredVendors(vendors);
  }, [vendors]);

  const handleSearch = (searchText: string) => {
    const filtered = vendors.filter(
      (vendor) =>
        vendor.companyName.toLowerCase().includes(searchText.toLowerCase()) ||
        vendor.companyName.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredVendors(filtered);
  };
  const isLargeScreen = useIsLargeScreen();

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: "Vendors",
          headerRight: () => (
            <View className="flex-1 flex-row justify-center items-center m-2 gap-1">
              <AddNewVendor
                onNewVendorAdd={(data) => {
                  data._id = (vendors.length + 1).toString(); // Update data._id to customers.length
                  vendors.push(data); // Push updated data into the customers array
                  showSuccessToast("Vendor Added succesfully!");
                }}
              />
            </View>
          ),
        }}
      />
      <View className="flex-1 flex-column w-full gap-4 bg-secondary/30 md:flex-row md:flex-nowrap md:pl-20 ">
        <View className="flex-1 md:flex-none md:min-w-96">
          <VendorTable
            vendors={filteredVendors}
            onSearch={handleSearch}
            onPress={showVendorDetails}
          />
        </View>
        {isLargeScreen &&
          (selVendor ? (
            <View className="flex-1 items-start justify-start md:border md:border-input md:rounded-md m-2 p-5">
              <VendorDetail vendor={selVendor} />
            </View>
          ) : (
            <NothingSelected />
          ))}
      </View>
      <Toast />
    </>
  );
};

export default VendorScreen;
