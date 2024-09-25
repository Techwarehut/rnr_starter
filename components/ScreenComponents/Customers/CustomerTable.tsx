import React from "react";
import { FlatList, View } from "react-native";
import CustomerRow from "./CustomerRow";
import { Table, TableBody, TableHeader, TableRow } from "~/components/ui/table"; // Assuming you have a Table component
import SearchBar from "~/components/ScreenComponents/SearchBar";
import { useIsLargeScreen } from "~/lib/utils";

interface CustomerTableProps {
  customers: any[];
  onSearch: (searchText: string) => void; // Added onSearch prop
  onPress: (item: any) => void;
}

const CustomerTable: React.FC<CustomerTableProps> = ({
  customers,
  onSearch,
  onPress,
}) => {
  const isLargeScreen = useIsLargeScreen();
  return (
    <View className="flex-1 mr-2">
      <Table aria-labelledby="customer-table" className="flex-1">
        <TableHeader>
          <TableRow>
            <SearchBar onSearch={onSearch} />
          </TableRow>
        </TableHeader>
        <TableBody className="md:border md:border-input md:m-2 md:rounded-md ">
          <FlatList
            data={customers}
            renderItem={({ item, index }) => (
              <CustomerRow
                key={item._id}
                item={item}
                index={index}
                onEdit={(customer) => console.log("Edit", customer)}
                onDelete={(customer) => console.log("Delete", customer)}
                onPress={(item) => onPress(item)}
              />
            )}
            keyExtractor={(item) => item._id}
            showsVerticalScrollIndicator={isLargeScreen}
          />
        </TableBody>
      </Table>
    </View>
  );
};

export default CustomerTable;
