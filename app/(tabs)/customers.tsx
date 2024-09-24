import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { Stack, useNavigation } from "expo-router";
import CustomerTable from "~/components/ScreenComponents/Customers/CustomerTable";
import SearchBar from "~/components/ScreenComponents/SearchBar";
import customers from "~/data/customer.json"; // Your customer data
import { useIsLargeScreen } from "~/lib/utils";
import { Plus } from "~/lib/icons/Plus";

const CustomerScreen = () => {
  const [filteredCustomers, setFilteredCustomers] = useState(customers);
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const addNewCustomer = () => {
    // Logic for adding a new customer
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Customers",
      headerRight: () => (
        <View className="flex-1 flex-row justify-center items-center m-2 gap-1">
          <Button
            size="sm"
            variant="default"
            className="shadow shadow-foreground/5"
            onPress={addNewCustomer}
          >
            <Text>Add New Customer</Text>
          </Button>
        </View>
      ),
    });
  }, [navigation]);

  const handleSearch = (searchText: string) => {
    const filtered = customers.filter(
      (customer) =>
        customer.businessName
          .toLowerCase()
          .includes(searchText.toLowerCase()) ||
        customer.customerName.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredCustomers(filtered);
  };
  const isLargeScreen = useIsLargeScreen();

  return (
    <View className="flex-1 flex-column w-full gap-4 bg-secondary/30 md:flex-row md:flex-nowrap md:pl-20 ">
      <View className="flex-1 md:flex-none   mr-2">
        <CustomerTable customers={filteredCustomers} onSearch={handleSearch} />
      </View>
      {isLargeScreen && (
        <View className="flex-1 items-center justify-center border border-input rounded-md m-2">
          <Text>Customer Detail Screen</Text>
        </View>
      )}
    </View>
  );
};

export default CustomerScreen;
