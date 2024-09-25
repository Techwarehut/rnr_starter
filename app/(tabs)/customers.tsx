import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { router, Stack, useNavigation } from "expo-router";
import CustomerTable from "~/components/ScreenComponents/Customers/CustomerTable";
import SearchBar from "~/components/ScreenComponents/SearchBar";
import customers from "~/data/customer.json"; // Your customer data
import { useIsLargeScreen } from "~/lib/utils";
import { Plus } from "~/lib/icons/Plus";
import CustomerDetail from "~/components/ScreenComponents/Customers/CustomerDetail";
import { H2, H3, Muted } from "~/components/ui/typography";

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

const CustomerScreen = () => {
  const [filteredCustomers, setFilteredCustomers] = useState(customers);
  const [selCust, setSelCust] = useState<Customer | null>(null);

  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const addNewCustomer = () => {
    // Logic for adding a new customer
  };

  const showCustomerDetails = (customer: any) => {
    // Logic for adding a new customer

    setSelCust(customer);
    if (!isLargeScreen) {
      router.push({
        pathname: "/customerdetail",
        params: { customerParam: JSON.stringify(customer) }, // Pass the customer object
      });
    }
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
      <View className="flex-1 md:flex-none md:min-w-80">
        <CustomerTable
          customers={filteredCustomers}
          onSearch={handleSearch}
          onPress={showCustomerDetails}
        />
      </View>
      {isLargeScreen &&
        (selCust ? (
          <View className="flex-1 items-start justify-start md:border md:border-input md:rounded-md m-2 p-5">
            <CustomerDetail customer={selCust} />
          </View>
        ) : (
          <View className="flex-1 items-center justify-center md:border md:border-input md:rounded-md m-2 p-5">
            <H3>Select an item to read</H3>
            <Muted>Nothing is selected</Muted>
          </View>
        ))}
    </View>
  );
};

export default CustomerScreen;
