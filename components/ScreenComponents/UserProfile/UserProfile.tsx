import React, { useCallback, useRef, useState } from "react";
import { View, Pressable, StyleSheet } from "react-native";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetHandle,
} from "~/components/ui/bottom-sheet/bottomSheet";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { useSharedValue } from "react-native-reanimated";
import { useColorScheme } from "~/lib/useColorScheme";

import { ChevronDown } from "~/lib/icons/ChevronDown";
import DateTimePicker, { DateType } from "react-native-ui-datepicker";
import { Calendar } from "~/lib/icons/Calendar";
import { useAuth } from "~/ctx/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { getInitials } from "~/lib/utils";
import UserDetail from "../Team/UserDetail";

interface ShowUserProfileProps {}
export const ShowUserProfile: React.FC<ShowUserProfileProps> = ({}) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [isOpen, setIsOpen] = useState(false);
  const animatedIndex = useSharedValue<number>(0);
  const animatedPosition = useSharedValue<number>(0);
  const snapPoints = ["80%", "90%"];
  const { isDarkColorScheme, setColorScheme } = useColorScheme();
  const [editMode, setEditMode] = useState(false);

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

  const { logout, user } = useAuth();

  const handlelogout = () => {
    handlePresentModalPress();
    logout();

    //router.replace("/createaccount");
  };

  console.log("rendering again", editMode);

  return (
    <>
      <Pressable onPress={handlePresentModalPress}>
        <Avatar alt="Rick Sanchez's Avatar" className="w-10 h-10">
          <AvatarImage source={{ uri: user?.profileUrl }} />
          <AvatarFallback>
            <Text>{getInitials(user?.name || "")}</Text>
          </AvatarFallback>
        </Avatar>
      </Pressable>

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
        <BottomSheetView className="flex-1 bg-popover gap-2 items-center justify-center p-4 ">
          <View className="flex flex-row gap-2 self-end mb-2">
            {editMode ? (
              <Button variant="outline" onPress={() => setEditMode(false)}>
                <Text>Save</Text>
              </Button>
            ) : (
              <Button variant="outline" onPress={() => setEditMode(true)}>
                <Text>Edit Profile</Text>
              </Button>
            )}
            <Button onPress={handlelogout}>
              <Text>Log Out</Text>
            </Button>
          </View>
          {user ? (
            <UserDetail
              user={user}
              userProfile={true}
              editUserMode={editMode}
            />
          ) : (
            <Text>No user data available</Text>
          )}
        </BottomSheetView>
      </BottomSheetModal>
    </>
  );
};
