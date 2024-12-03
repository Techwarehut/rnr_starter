import { Button } from "~/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Plus } from "~/lib/icons/Plus";

import { Pressable, View } from "react-native";
import { User } from "../../Team/types";
import UserTable from "../../Team/UserTable";
import { useEffect, useState } from "react";
import { getAllUsers } from "~/api/UsersApi";
import { Customer, SiteLocation } from "../../Customers/types";
import CustomerTable from "../../Customers/CustomerTable";
import { fetchCustomerById, fetchCustomers } from "~/api/customerApi";
import { H3 } from "~/components/ui/typography";
import SiteLocationPicker from "../../Customers/SiteLocationPicker";
import { Text } from "~/components/ui/text";

interface AssignCustomerProps {
  onCustomerAssigned: (customer: Customer) => void; // Add this prop
  selectedCustomerId?: string; // Optional customer prop
}
export const AssignCustomer: React.FC<AssignCustomerProps> = ({
  onCustomerAssigned,
}) => {
  const contentInsets = {
    left: 12,
    right: 12,
  };
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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="default">
          <Plus className="text-primary-foreground" size={18} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        insets={contentInsets}
        className="w-auto flex items-start justify-start"
      >
        <DropdownMenuGroup>
          <Text>Select a Customer</Text>
          <CustomerTable
            customers={filteredCustomers}
            onSearch={handleSearch}
            onPress={(customer) => {
              onCustomerAssigned(customer);
            }}
          />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
