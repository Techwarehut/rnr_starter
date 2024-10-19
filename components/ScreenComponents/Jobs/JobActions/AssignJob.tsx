import React, { useCallback, useEffect, useRef, useState } from "react";
import { View, Pressable, StyleSheet } from "react-native";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetHandle,
} from "~/components/ui/bottom-sheet/bottomSheet";
import { Button } from "~/components/ui/button";
import { Plus } from "~/lib/icons/Plus";
import { useSharedValue } from "react-native-reanimated";
import { useColorScheme } from "~/lib/useColorScheme";

import { H1, H3 } from "~/components/ui/typography";

import { User } from "../../Team/types";
import UserTable from "../../Team/UserTable";
import { getAllUsers } from "~/api/UsersApi";

interface AssignJobyProps {
  onJobAssigned: (user: User) => void; // Add this prop
}
export const AssignJob: React.FC<AssignJobyProps> = ({ onJobAssigned }) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [isOpen, setIsOpen] = useState(false);
  const animatedIndex = useSharedValue<number>(0);
  const animatedPosition = useSharedValue<number>(0);
  const snapPoints = ["80%", "90%"];
  const { isDarkColorScheme, setColorScheme } = useColorScheme();
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

  const handleSheetChanges = useCallback((index: number) => {
    // handle sheet changes
  }, []);

  const handlePresentModalPress = useCallback(() => {
    if (isOpen) {
      bottomSheetModalRef.current?.dismiss();
      setIsOpen(false);
    } else {
      bottomSheetModalRef.current?.present();
      setIsOpen(true);
    }
  }, [isOpen]);

  return (
    <>
      <Button onPress={handlePresentModalPress} variant="default">
        <Plus className="text-primary-foreground" size={18} />
      </Button>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backgroundStyle={{
          backgroundColor: isDarkColorScheme ? "#000" : "#FFF",
        }}
        handleComponent={() => (
          <BottomSheetHandle
            className="bg-popover"
            indicatorStyle={{
              backgroundColor: isDarkColorScheme ? "#FFF" : "#000",
            }} // Customize the dash color
            animatedIndex={animatedIndex}
            animatedPosition={animatedPosition}
          />
        )}
      >
        <BottomSheetView className="flex-1 bg-popover gap-2 p-4 ">
          <UserTable
            users={filteredUsers}
            onSearch={handleSearch}
            onPress={(user) => {
              handlePresentModalPress();
              onJobAssigned(user);
            }}
          />
        </BottomSheetView>
      </BottomSheetModal>
    </>
  );
};
