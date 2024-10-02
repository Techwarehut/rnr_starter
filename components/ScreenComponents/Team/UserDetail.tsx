import React, { useEffect } from "react";
import { Platform, Pressable, View } from "react-native";
import { Button } from "~/components/ui/button";
import { H1, H2, H3, H4, Large, Muted } from "~/components/ui/typography";
import { Mail } from "~/lib/icons/Mail";
import { Phone } from "~/lib/icons/Phone";
import { User2 } from "~/lib/icons/User";
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
import { Link, Stack } from "expo-router";

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
    <ScrollView
      showsVerticalScrollIndicator={isLargeScreen}
      className="flex-1 w-full gap-12 p-2"
    >
      {/*  Avatar Section */}
      <View className="flex gap-2 items-center justify-center">
        <Avatar alt="Avatar" className="w-15 h-15">
          <AvatarImage source={{ uri: user.profileUrl }} />
          <AvatarFallback>
            <Text>{getInitials(user.name)}</Text>
          </AvatarFallback>
        </Avatar>

        <H2>{user.name}</H2>
        <Muted>{user.role}</Muted>
      </View>

      <View className="flex-1 flex-row gap-4 items-center justify-center mt-8">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle className="text-brand-secondary">
              {user.activeJobs}
            </CardTitle>
            <CardDescription>Active Jobs</CardDescription>
          </CardHeader>
        </Card>
        <Card className="flex-1">
          <CardHeader>
            <CardTitle className="text-brand-primary">
              {user.completedJobs}
            </CardTitle>
            <CardDescription>Completed Jobs</CardDescription>
          </CardHeader>
        </Card>
      </View>

      {/* User Details Section */}
      <View className="flex flex-col md:flex-row w-full gap-12  mt-8 md:ml-auto md:mr-auto">
        {/*  Mail and Phone */}

        <View className="flex-1 gap-4 ">
          <Large>Contact</Large>
          <View className="flex gap-4 p-4">
            <View className="flex-row items-center gap-2">
              <Link href={`mailto:${user.email}`}>
                <Pressable className="h-8 w-8 bg-foreground rounded-2xl items-center justify-center p-1">
                  <Mail
                    className="text-primary-foreground"
                    size={isLargeScreen ? 18 : 16}
                  />
                </Pressable>
              </Link>
              <Text>{user.email}</Text>
            </View>
            <View className="flex-row items-center gap-2">
              <Link href={`tel:${user.phone.replace(/\D/g, "")}`}>
                <Pressable className="h-8 w-8 bg-foreground rounded-2xl items-center justify-center p-1">
                  <Phone
                    className="text-primary-foreground"
                    size={isLargeScreen ? 18 : 16}
                  />
                </Pressable>
              </Link>
              <Text>{user.phone}</Text>
            </View>
          </View>
        </View>

        {/* Emergency Contact */}
        <View className="flex-1 gap-4">
          <Large className="text-destructive">Emergeny Contact</Large>
          <View className="flex border border-destructive rounded-md gap-4 p-4">
            <View className="flex-row items-center gap-2">
              <User2
                className="text-destructive"
                size={isLargeScreen ? 18 : 18}
              />

              <Text>{user.emergencyContact.name}</Text>
            </View>
            <View className="flex-row items-center gap-2">
              <Link
                href={`tel:${user.emergencyContact.phone.replace(/\D/g, "")}`}
              >
                <Pressable className="h-8 w-8 bg-destructive rounded-2xl items-center justify-center p-1">
                  <Phone
                    className="text-destructive-foreground"
                    size={isLargeScreen ? 18 : 16}
                  />
                </Pressable>
              </Link>
              <Text>{user.emergencyContact.phone}</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default UserDetail;
