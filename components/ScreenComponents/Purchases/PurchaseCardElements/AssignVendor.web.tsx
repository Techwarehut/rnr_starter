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
import { Vendor } from "../../Vendors/types";
import { getAllVendors } from "~/api/vendorApi";
import VendorTable from "../../Vendors/VendorTable";

interface AssignVendorProps {
  onVendorAssigned: (vendor: Vendor) => void; // Add this prop
  selectedVendorId?: string; // Optional customer prop
}
export const AssignVendor: React.FC<AssignVendorProps> = ({
  onVendorAssigned,
  selectedVendorId,
}) => {
  const contentInsets = {
    left: 12,
    right: 12,
  };
  const [searchText, setSearchText] = useState("");
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [selVendor, setSelVendor] = useState<Vendor | undefined>(undefined); // Handle undefined

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
          <Text>Select a Vendor</Text>
          <VendorTable
            vendors={filteredVendors}
            onSearch={handleSearch}
            onPress={(vendor) => {
              onVendorAssigned(vendor);
            }}
          />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
