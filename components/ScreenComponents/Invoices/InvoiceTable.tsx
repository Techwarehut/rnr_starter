import React from "react";
import { FlatList, View } from "react-native";

import { Table, TableBody, TableHeader, TableRow } from "~/components/ui/table"; // Assuming you have a Table component
import SearchBar from "~/components/ScreenComponents/SearchBar";
import { useIsLargeScreen } from "~/lib/utils";
import { Invoice } from "./types";
import InvoiceRow from "./InvoiceRow";

interface InvoiceTableProps {
  invoices: Invoice[];
  onSearch: (searchText: string) => void; // Added onSearch prop
  onPress: (item: Invoice) => void;
}

const InvoiceTable: React.FC<InvoiceTableProps> = ({
  invoices,
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
            data={invoices}
            renderItem={({ item, index }) => (
              <InvoiceRow
                key={item.invoice_number}
                item={item}
                index={index}
                onEdit={(invoice) => console.log("Edit", invoice)}
                onDelete={(invoice) => console.log("Delete", invoice)}
                onPress={(item) => onPress(item)}
              />
            )}
            keyExtractor={(item) => item.invoice_number}
            showsVerticalScrollIndicator={isLargeScreen}
          />
        </TableBody>
      </Table>
    </View>
  );
};

export default InvoiceTable;
