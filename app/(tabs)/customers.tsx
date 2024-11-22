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
import { addCustomer, fetchCustomers } from "~/api/customerApi";

const CustomerScreen = () => {
  const [selCust, setSelCust] = useState<Customer | null>(null);
  const { showSuccessToast, showErrorToast } = useToast();
  const [searchText, setSearchText] = useState("");
  const [customers, setCustomers] = useState<Customer[]>([]);

  const loadCustomers = async () => {
    try {
      const data = await fetchCustomers(); // Call the API
      setCustomers(data);
    } catch (error) {
      showErrorToast("Failed to fetch customers!");
    }
  };

  const handleAddCustomer = async (newCustomer: Customer) => {
    try {
      const exists = customers.some(
        (customer) => customer.email === newCustomer.email
      );

      if (exists) {
        showErrorToast("Customer email already exists!");
        return;
      }

      const addedCustomer = await addCustomer(newCustomer);
      setSelCust(addedCustomer);
      // Update state if needed
      showSuccessToast("Customer Added successfully!");
    } catch (error) {
      showErrorToast("Error Adding customer!");
    }
  };

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
  const isLargeScreen = useIsLargeScreen();

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: "Customers",
          headerRight: () => (
            <View className="flex-1 flex-row justify-center items-center ">
              <AddNewCustomer onNewCustAdd={handleAddCustomer} />
            </View>
          ),
        }}
      />
      <View className="flex-1 flex-column w-full gap-4  md:flex-row md:flex-nowrap md:pl-20 ">
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
