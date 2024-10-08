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
import NothingSelected from "~/components/ScreenComponents/NothingSelected";
import { Customer } from "~/components/ScreenComponents/Customers/types";
import { AddNewCustomer } from "~/components/ScreenComponents/Customers/AddNewCustomer";
import { useToast } from "~/components/ScreenComponents/ToastMessage";
import Toast from "react-native-toast-message";

const CustomerScreen = () => {
  const [filteredCustomers, setFilteredCustomers] = useState(customers);
  const [selCust, setSelCust] = useState<Customer | null>(null);
  const { showSuccessToast, showErrorToast } = useToast();

  const showCustomerDetails = (customer: any) => {
    // Logic for adding a new customer
    const formattedcustomername = customer.businessName.replace(/\s+/g, "");
    setSelCust(customer);
    if (!isLargeScreen) {
      router.push({
        pathname: "/(customer)/[customerName]",
        params: {
          customerName: formattedcustomername,
          customerParam: JSON.stringify(customer),
        }, // Pass the customer object
      });
    }
  };

  useEffect(() => {
    setFilteredCustomers(customers);
  }, [customers]);

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
    <>
      <Stack.Screen
        options={{
          headerTitle: "Customers",
          headerRight: () => (
            <View className="flex-1 flex-row justify-center items-center m-2 gap-1">
              <AddNewCustomer
                onNewCustAdd={(data) => {
                  data._id = (customers.length + 1).toString(); // Update data._id to customers.length
                  customers.push(data); // Push updated data into the customers array
                  showSuccessToast("Customer Added succesfully!");
                }}
              />
            </View>
          ),
        }}
      />
      <View className="flex-1 flex-column w-full gap-4 bg-secondary/30 md:flex-row md:flex-nowrap md:pl-20 ">
        <View className="flex-1 md:flex-none md:min-w-96">
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
            <NothingSelected />
          ))}
      </View>
      <Toast />
    </>
  );
};

export default CustomerScreen;
