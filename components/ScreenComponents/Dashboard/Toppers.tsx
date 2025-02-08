import { useEffect, useState } from "react";
import { View } from "react-native";
import { getUserById } from "~/api/UsersApi";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "~/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "~/components/ui/table";
import { Text } from "~/components/ui/text";
import { Muted } from "~/components/ui/typography";
import { User } from "../Team/types";
import { cn, getInitials } from "~/lib/utils";
import { fetchCustomers } from "~/api/customerApi";
import { Customer } from "../Customers/types";
import RoleWrapper from "../RoleWrapper";

const Toppers = () => {
  const [user, setUser] = useState<User | null>(null);
  const [customers, setCustomers] = useState<Customer[]>([]);

  const loadCustomers = async () => {
    try {
      const data = await fetchCustomers(); // Call the API
      setCustomers(data);
    } catch (error) {
      console.error("Failed to fetch customers!");
    }
  };

  // Fetch all users when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const user = await getUserById("1"); // Call the function to fetch users
        setUser(user); // Set the fetched users to state
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers(); // Invoke the fetch function
    loadCustomers(); // Fetch customers on mount
  }, []); // Empty dependency array to run only on mount
  return (
    <View className="flex gap-2">
      <View className="flex gap-2">
        <Card className="flex flex-1 p-4 m-2 gap-4">
          <CardDescription className="text-primary">
            Employee of the Month
          </CardDescription>
          <CardContent>
            <View className="flex-1 flex-row gap-4">
              <Avatar alt="Avatar" className="w-10 h-10">
                <AvatarImage source={{ uri: user?.profileUrl }} />
                <AvatarFallback>
                  <Text>{user ? getInitials(user.name) : ""}</Text>
                </AvatarFallback>
              </Avatar>
              <View>
                <Text>{user?.name}</Text>
                <Muted>10 completed Jobs</Muted>
              </View>
            </View>
          </CardContent>
        </Card>
      </View>
      <RoleWrapper roles={["Owner", "Team Lead"]}>
        <View className="flex gap-2">
          <Card className="flex flex-1 p-4 m-2 gap-4">
            <CardDescription className="text-primary">
              Revenue Stars
            </CardDescription>

            <CardContent>
              {customers.slice(0, 3).map((item, index) => (
                <TableRow
                  className={cn(
                    "active:bg-secondary w-full",
                    index % 2 && "bg-muted/40 "
                  )}
                  key={item._id}
                >
                  <TableCell className="flex-1">
                    <Text>{item.businessName}</Text>
                    <Muted>$5000 in Revenue</Muted>
                  </TableCell>
                </TableRow>
              ))}
            </CardContent>
          </Card>
        </View>
      </RoleWrapper>
    </View>
  );
};

export default Toppers;
