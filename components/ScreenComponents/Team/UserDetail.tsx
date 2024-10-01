import React, { useEffect } from "react";
import { Platform, View } from "react-native";
import { Button } from "~/components/ui/button";
import { H1, H2, H3, H4, Large, Muted } from "~/components/ui/typography";
import { Mail } from "~/lib/icons/Mail";
import { Phone } from "~/lib/icons/Phone";
import { MapPin } from "~/lib/icons/MapPin";
import { formatPhoneNumber, getInitials, useIsLargeScreen } from "~/lib/utils";
import { Text } from "~/components/ui/text";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { ScrollView } from "react-native-gesture-handler";
import ActionButtons from "../ActionButtons";
import { Stack } from "expo-router";

import { useToast } from "../ToastMessage";
import Toast from "react-native-toast-message";
import { User } from "./types";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

interface UserDetailProps {
  user: User;
}

const UserDetail: React.FC<UserDetailProps> = ({ user }) => {
  const isLargeScreen = useIsLargeScreen();

  const [editMode, setEditMode] = React.useState(false);
  const [userData, setUserData] = React.useState<User>(user);
  const { showSuccessToast, showErrorToast } = useToast();

  // Optional: Update state when prop changes
  useEffect(() => {
    setUserData(user);
  }, [user]);
  const onSave = () => {
    setEditMode(false);
    // To show a success toast with custom text2
    console.log("Before showing toast");
    showSuccessToast("User saved succesfully!");
  };

  // Phone number formatting
  const handlePhoneChange = (field: string, phone: string) => {
    const formattedPhone = formatPhoneNumber(phone);
    //handleInputChange(field, formattedPhone);
  };

  return (
    <>
      {!isLargeScreen && (
        <Stack.Screen
          // Replace with your actual component
          options={{
            headerTitleAlign: "left",
            headerRight: () => (
              <ActionButtons
                onEdit={() => setEditMode(true)}
                onDelete={() => console.log("Delete pressed")}
                onSave={onSave}
                editMode={editMode}
              />
            ),
            /* headerTitle: () => (
              <View>
                <Text>{user.name}</Text>
              </View>
            ), */
          }}
        />
      )}

      <ScrollView
        showsVerticalScrollIndicator={isLargeScreen}
        className="flex-1 w-full gap-10 p-2"
      >
        {/* Header with Edit and Delete buttton */}
        {isLargeScreen && (
          <View className="w-full flex-row gap-1 items-center justify-between gap-2 mb-4">
            <View>
              {/*  <H3>{user.name}</H3>
              <Text>{user.role}</Text> */}
            </View>
            <ActionButtons
              onEdit={() => setEditMode(true)}
              onDelete={() => console.log("Delete pressed")}
              onSave={onSave}
              editMode={editMode}
            />
          </View>
        )}
        <View className="flex gap-4 items-center justify-center">
          <Avatar alt="Avatar" className="w-15 h-15">
            <AvatarImage source={{ uri: user.profileUrl }} />
            <AvatarFallback>
              <Text>{getInitials(user.name)}</Text>
            </AvatarFallback>
          </Avatar>

          <H2>{user.name}</H2>
          <H3>{user.role}</H3>

          {/* User Details Section */}
          <View className="flex-1">
            <View className="flex gap-2">
              <View className="flex-row items-center gap-2">
                <Mail className="text-primary" size={isLargeScreen ? 21 : 18} />
                <Text>{user.email}</Text>
              </View>
              <View className="flex-row items-center">
                <Phone
                  className="text-primary"
                  size={isLargeScreen ? 21 : 18}
                />
                <Text>{formatPhoneNumber(user.phone)}</Text>
              </View>
              <View className="flex-row items-center">
                <MapPin className="mr-2" />
                <Text>
                  {user.emergencyContact.name} -{" "}
                  {formatPhoneNumber(user.emergencyContact.phone)}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <Toast />
    </>
  );
};

export default UserDetail;
