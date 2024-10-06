import { View, Text } from "react-native";
import React from "react";

import CustomerDetail from "~/components/ScreenComponents/Customers/CustomerDetail";
import { Stack, useLocalSearchParams } from "expo-router";
import { H3, Muted } from "~/components/ui/typography";
import { Button } from "~/components/ui/button";
import NothingSelected from "~/components/ScreenComponents/NothingSelected";
import ActionButtons from "~/components/ScreenComponents/ActionButtons";
import { Customer } from "~/components/ScreenComponents/Customers/types";
import Toast from "react-native-toast-message";
import { User } from "~/components/ScreenComponents/Team/types";
import UserDetail from "~/components/ScreenComponents/Team/UserDetail";

const UserDetailScreen: React.FC = () => {
  const { userParam } = useLocalSearchParams(); // Get the customer from navigation params
  let user: User | null = null;

  if (typeof userParam === "string") {
    try {
      user = JSON.parse(userParam); // Deserialize the customer
    } catch (error) {
      console.error("Failed to parse user data", error);
    }
  }

  return (
    <>
      {user ? (
        <View className="flex-1 items-center justify-center m-2">
          <UserDetail user={user} />
        </View>
      ) : (
        <NothingSelected />
      )}
    </>
  );
};

export default UserDetailScreen;
