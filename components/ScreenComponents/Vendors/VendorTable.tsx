import React from "react";
import { FlatList, View } from "react-native";
import CustomerRow from "./VendorRow";
import { Table, TableBody, TableHeader, TableRow } from "~/components/ui/table"; // Assuming you have a Table component
import SearchBar from "~/components/ScreenComponents/SearchBar";
import { useIsLargeScreen } from "~/lib/utils";

interface VendorTableProps {
  vendors: any[];
  onSearch: (searchText: string) => void; // Added onSearch prop
  onPress: (item: any) => void;
}

const VendorTable: React.FC<VendorTableProps> = ({
  vendors,
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
            data={vendors}
            renderItem={({ item, index }) => (
              <CustomerRow
                key={item._id}
                item={item}
                index={index}
                onEdit={(vendor) => console.log("Edit", vendor)}
                onDelete={(vendor) => console.log("Delete", vendor)}
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

export default VendorTable;
