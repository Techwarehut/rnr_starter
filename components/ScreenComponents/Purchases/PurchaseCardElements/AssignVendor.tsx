import React, { useCallback, useEffect, useRef, useState } from "react";
import { View, Pressable, StyleSheet } from "react-native";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetHandle,
} from "~/components/ui/bottom-sheet/bottomSheet";
import { Button } from "~/components/ui/button";
import { Plus } from "~/lib/icons/Plus";
import { useSharedValue } from "react-native-reanimated";
import { useColorScheme } from "~/lib/useColorScheme";

import { H1, H3 } from "~/components/ui/typography";

import { User } from "../../Team/types";
import UserTable from "../../Team/UserTable";
import { getAllUsers } from "~/api/UsersApi";
import { Customer, SiteLocation } from "../../Customers/types";
import CustomerTable from "../../Customers/CustomerTable";
import { fetchCustomerById, fetchCustomers } from "~/api/customerApi";
import SiteLocationPicker from "../../Customers/SiteLocationPicker";

import { getAllVendors } from "~/api/vendorApi";
import { Vendor } from "../../Vendors/types";
import VendorTable from "../../Vendors/VendorTable";

interface AssignVendorProps {
  onVendorAssigned: (vendor: Vendor) => void; // Add this prop
  selectedVendorId?: string; // Optional customer prop
}
export const AssignVendor: React.FC<AssignVendorProps> = ({
  onVendorAssigned,
  selectedVendorId,
}) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [isOpen, setIsOpen] = useState(false);
  const animatedIndex = useSharedValue<number>(0);
  const animatedPosition = useSharedValue<number>(0);
  const snapPoints = ["80%", "90%"];
  const { isDarkColorScheme, setColorScheme } = useColorScheme();
  const [searchText, setSearchText] = useState("");
  const [vendors, setVendors] = useState<Vendor[]>([]);

  const loadVendors = async () => {
    try {
      const data = await getAllVendors(); // Call the API
      setVendors(data);
    } catch (error) {
      console.error("Failed to fetch vendors!");
    }
  };

  useEffect(() => {
    loadVendors(); // Fetch customers on mount
  }, []);

  const handleSearch = (searchText: string) => {
    setSearchText(searchText); // Update search text
  };

  const filteredVendors = vendors.filter(
    (vendor) =>
      vendor.companyName.toLowerCase().includes(searchText.toLowerCase()) ||
      vendor.contactPerson.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSheetChanges = useCallback((index: number) => {
    // handle sheet changes
  }, []);

  const handlePresentModalPress = useCallback(() => {
    if (isOpen) {
      bottomSheetModalRef.current?.dismiss();
      setIsOpen(false);
    } else {
      bottomSheetModalRef.current?.present();
      setIsOpen(true);
    }
  }, [isOpen]);

  return (
    <>
      <Button onPress={handlePresentModalPress} variant="default">
        <Plus className="text-primary-foreground" size={18} />
      </Button>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backgroundStyle={{
          backgroundColor: isDarkColorScheme ? "#000" : "#FFF",
        }}
        handleComponent={() => (
          <BottomSheetHandle
            className="bg-popover"
            indicatorStyle={{
              backgroundColor: isDarkColorScheme ? "#FFF" : "#000",
            }} // Customize the dash color
            animatedIndex={animatedIndex}
            animatedPosition={animatedPosition}
          />
        )}
      >
        <BottomSheetView className="flex-1 bg-popover gap-2 p-4 ">
          <H3>Select a Vendor</H3>
          <VendorTable
            vendors={filteredVendors}
            onSearch={handleSearch}
            onPress={(vendor) => {
              onVendorAssigned(vendor);
              handlePresentModalPress();
            }}
          />
        </BottomSheetView>
      </BottomSheetModal>
    </>
  );
};
