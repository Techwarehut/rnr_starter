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
  onCustomerAssigned: (customer: Customer, site: SiteLocation) => void; // Add this prop
  selectedCustomerId?: string; // Optional customer prop
}
export const AssignCustomer: React.FC<AssignCustomerProps> = ({
  onCustomerAssigned,
  selectedCustomerId,
}) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [isOpen, setIsOpen] = useState(false);
  const animatedIndex = useSharedValue<number>(0);
  const animatedPosition = useSharedValue<number>(0);
  const snapPoints = ["80%", "90%"];
  const { isDarkColorScheme, setColorScheme } = useColorScheme();
  const [searchText, setSearchText] = useState("");
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selCust, setSelCust] = useState<Customer | undefined>(undefined); // Handle undefined

  const loadCustomers = async () => {
    try {
      let data;
      if (selectedCustomerId) {
        data = await fetchCustomerById(selectedCustomerId); // Call the API
        setSelCust(data);
      } else {
        data = await fetchCustomers(); // Call the API
        setCustomers(data);
      }
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
          {selCust ? (
            <>
              <H3>Select a Site Location</H3>
              <SiteLocationPicker
                siteLocations={selCust.siteLocations}
                onPress={(site) => {
                  handlePresentModalPress();
                  onCustomerAssigned(selCust, site);
                }}
              />
            </>
          ) : (
            <>
              <H3>Select a Customer</H3>
              <CustomerTable
                customers={filteredCustomers}
                onSearch={handleSearch}
                onPress={(customer) => {
                  setSelCust(customer);
                }}
              />
            </>
          )}
        </BottomSheetView>
      </BottomSheetModal>
    </>
  );
};
