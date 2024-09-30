import React from "react";
import { FlatList, View } from "react-native";

import { Table, TableBody, TableHeader, TableRow } from "~/components/ui/table"; // Assuming you have a Table component
import SearchBar from "~/components/ScreenComponents/SearchBar";
import { useIsLargeScreen } from "~/lib/utils";
import UserRow from "./UserRow";

interface UserTableProps {
  users: any[];
  onSearch: (searchText: string) => void; // Added onSearch prop
  onPress: (item: any) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, onSearch, onPress }) => {
  const isLargeScreen = useIsLargeScreen();
  return (
    <View className="flex-1 mr-2">
      <Table aria-labelledby="user-table" className="flex-1">
        <TableHeader>
          <TableRow>
            <SearchBar onSearch={onSearch} />
          </TableRow>
        </TableHeader>
        <TableBody className="md:border md:border-input md:m-2 md:rounded-md ">
          <FlatList
            data={users}
            renderItem={({ item, index }) => (
              <UserRow
                key={item._id}
                item={item}
                index={index}
                onEdit={(user) => console.log("Edit", user)}
                onDelete={(user) => console.log("Delete", user)}
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

export default UserTable;
