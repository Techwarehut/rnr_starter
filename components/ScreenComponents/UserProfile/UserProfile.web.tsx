import { Pressable, View } from "react-native";
import { Button } from "~/components/ui/button";

import { Text } from "~/components/ui/text";

import { useEffect, useState } from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popoverCore";
import { useAuth } from "~/ctx/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { getInitials } from "~/lib/utils";
import UserDetail from "../Team/UserDetail";

interface ShowUserProfileProps {}
export const ShowUserProfile: React.FC<ShowUserProfileProps> = ({}) => {
  const contentInsets = {
    left: 12,
    right: 12,
  };

  const { logout, user } = useAuth();
  const [editMode, setEditMode] = useState(false);

  const handlelogout = () => {
    logout();
    //router.replace("/createaccount");
  };

  return (
    <View className="flex-1 justify-center items-center">
      <Popover>
        <PopoverTrigger asChild>
          <Pressable className="mr-4">
            <Avatar alt="Rick Sanchez's Avatar" className="w-10 h-10">
              <AvatarImage source={{ uri: user?.profileUrl }} />
              <AvatarFallback>
                <Text>{getInitials(user?.name || "")}</Text>
              </AvatarFallback>
            </Avatar>
          </Pressable>
        </PopoverTrigger>
        <PopoverContent
          side={"bottom"}
          insets={contentInsets}
          className="flex gap-4 w-fit "
        >
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
        </PopoverContent>
      </Popover>
    </View>
  );
};
