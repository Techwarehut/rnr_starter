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
  onCustomerAssigned: (customer: Customer, site: SiteLocation) => void; // Add this prop
  selectedCustomerId?: string; // Optional customer prop
}
export const AssignCustomer: React.FC<AssignCustomerProps> = ({
  onCustomerAssigned,
  selectedCustomerId,
}) => {
  const contentInsets = {
    left: 12,
    right: 12,
  };
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
          {selCust ? (
            <>
              <Text>Select a Site Location</Text>
              <SiteLocationPicker
                siteLocations={selCust.siteLocations}
                onPress={(site) => {
                  onCustomerAssigned(selCust, site);
                }}
              />
            </>
          ) : (
            <>
              <Text>Select a Customer</Text>
              <CustomerTable
                customers={filteredCustomers}
                onSearch={handleSearch}
                onPress={(customer) => {
                  setSelCust(customer);
                }}
              />
            </>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
