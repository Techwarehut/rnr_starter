import { View } from "react-native";

import { useIsLargeScreen } from "~/lib/utils";

import { useEffect, useState } from "react";
import { User } from "~/components/ScreenComponents/Team/types";
import { router } from "expo-router";
import NothingSelected from "~/components/ScreenComponents/NothingSelected";
import UserTable from "~/components/ScreenComponents/Team/UserTable";
import UserDetail from "~/components/ScreenComponents/Team/UserDetail";
import { getAllUsers } from "~/api/UsersApi";

export default function Team() {
  const [users, setUsers] = useState<User[]>([]);
  const [selUser, setSelUser] = useState<User | null>(null);
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

  const showUserDetails = (user: User) => {
    // Logic for adding a new customer

    const formattedUsername = user.name.replace(/\s+/g, "");
    setSelUser(user);
    if (!isLargeScreen) {
      router.push({
        pathname: "/(user)/[username]",
        params: {
          username: formattedUsername,
          userParam: JSON.stringify(user),
        }, // Pass the customer object
      });
    }
  };

  const handleSearch = (searchText: string) => {
    setSearchText(searchText);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const isLargeScreen = useIsLargeScreen();

  return (
    <View className="flex-1 flex-column w-full gap-4 bg-secondary/30 md:flex-row md:flex-nowrap md:pl-20 ">
      <View className="flex-1 md:flex-none md:min-w-96">
        <UserTable
          users={filteredUsers}
          onSearch={handleSearch}
          onPress={showUserDetails}
        />
      </View>
      {isLargeScreen &&
        (selUser ? (
          <View className="flex-1 items-start justify-start md:border md:border-input md:rounded-md m-2 p-5">
            <UserDetail user={selUser} />
          </View>
        ) : (
          <NothingSelected />
        ))}
    </View>
  );
}
