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

interface AssignJobyProps {
  onJobAssigned: (user: User) => void; // Add this prop
}
export const AssignJob: React.FC<AssignJobyProps> = ({ onJobAssigned }) => {
  const contentInsets = {
    left: 12,
    right: 12,
  };
  const [users, setUsers] = useState<User[]>([]);

  const [searchText, setSearchText] = useState("");

  // Fetch all users when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await getAllUsers(); // Call the function to fetch users

        setUsers(users); // Set the fetched users to state
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers(); // Invoke the fetch function
  }, []); // Empty dependency array to run only on mount

  const handleSearch = (searchText: string) => {
    setSearchText(searchText);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchText.toLowerCase())
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
          <UserTable
            users={filteredUsers}
            onSearch={handleSearch}
            onPress={onJobAssigned}
          />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
