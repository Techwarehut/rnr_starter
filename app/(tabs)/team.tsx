import { View } from "react-native";
import { Text } from "~/components/ui/text";
import { useIsLargeScreen } from "~/lib/utils";
import users from "~/data/team.json"; // Your customer data
import { useEffect, useState } from "react";
import { User } from "~/components/ScreenComponents/Team/types";
import { router } from "expo-router";
import NothingSelected from "~/components/ScreenComponents/NothingSelected";
import UserTable from "~/components/ScreenComponents/Team/UserTable";
import UserDetail from "~/components/ScreenComponents/Team/UserDetail";

export default function Team() {
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [selUser, setSelUser] = useState<User | null>(null);

  const showUserDetails = (user: User) => {
    // Logic for adding a new customer

    setSelUser(user);
    if (!isLargeScreen) {
      router.push({
        pathname: "/(user)/[username]",
        params: { username: user.name, userParam: JSON.stringify(user) }, // Pass the customer object
      });
    }
  };

  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

  const handleSearch = (searchText: string) => {
    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(searchText.toLowerCase())
    );

    setFilteredUsers(filtered);
  };
  const isLargeScreen = useIsLargeScreen();

  return (
    <View className="flex-1 flex-column w-full gap-4 bg-secondary/30 md:flex-row md:flex-nowrap md:pl-20 ">
      <View className="flex-1 md:flex-none md:min-w-80">
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
