// UserAvatarSection.tsx
import React from "react";
import { View } from "react-native"; // Assuming you're using React Native
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Text } from "~/components/ui/text";
import { Muted } from "~/components/ui/typography";
import { getInitials } from "~/lib/utils";

interface User {
  userId: string;
  profileUrl: string;
  name: string;
}

interface UserAvatarSectionProps {
  label: string;
  user: User | null; // The user can be null if not provided
}

const UserAvatarSection: React.FC<UserAvatarSectionProps> = ({
  label,
  user,
}) => {
  return (
    <View>
      <Muted>{label}:</Muted>
      <View className="flex-row flex-wrap gap-2 bg-secondary p-2 rounded-md items-center justify-between">
        <View className="flex-row flex-wrap gap-2">
          {user ? (
            <Avatar key={user.userId} alt="Avatar" className="w-10 h-10">
              <AvatarImage source={{ uri: user.profileUrl }} />
              <AvatarFallback>
                <Text>{getInitials(user.name)}</Text>
              </AvatarFallback>
            </Avatar>
          ) : (
            <Text>Pending Approval</Text>
          )}
        </View>
      </View>
    </View>
  );
};

export default UserAvatarSection;
