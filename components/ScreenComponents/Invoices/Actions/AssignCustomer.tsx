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

interface AssignCustomerProps {
  onCustomerAssigned: (customer: Customer) => void; // Add this prop
}

export const AssignCustomer: React.FC<AssignCustomerProps> = ({
  onCustomerAssigned,
}) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [isOpen, setIsOpen] = useState(false);
  const animatedIndex = useSharedValue<number>(0);
  const animatedPosition = useSharedValue<number>(0);
  const snapPoints = ["80%", "90%"];
  const { isDarkColorScheme, setColorScheme } = useColorScheme();
  const [searchText, setSearchText] = useState("");
  const [customers, setCustomers] = useState<Customer[]>([]);

  const loadCustomers = async () => {
    try {
      let data;

      data = await fetchCustomers(); // Call the API
      setCustomers(data);
    } catch (error) {
      console.error("Failed to fetch customers!");
    }
  };

  useEffect(() => {
    loadCustomers(); // Fetch customers on mount
  }, []);

  const handleSearch = (searchText: string) => {
    setSearchText(searchText); // Update search text
  };

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.businessName.toLowerCase().includes(searchText.toLowerCase()) ||
      customer.customerName.toLowerCase().includes(searchText.toLowerCase())
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
          <H3>Select a Customer</H3>
          <CustomerTable
            customers={filteredCustomers}
            onSearch={handleSearch}
            onPress={(customer) => {
              handlePresentModalPress();
              onCustomerAssigned(customer);
            }}
          />
        </BottomSheetView>
      </BottomSheetModal>
    </>
  );
};
