import React, { useEffect, useState } from "react";
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
import * as ImagePicker from "expo-image-picker";
import { ScrollView } from "react-native-gesture-handler";
import ActionButtons from "../ActionButtons";
import { Link, Stack, useRouter } from "expo-router";

import { useToast } from "../ToastMessage";
import Toast from "react-native-toast-message";
import { User } from "./types";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { deleteUser, updateUser } from "~/api/UsersApi";
import RoleWrapper from "../RoleWrapper";
import InputField from "../InputField";
import { RoleSelect } from "./RoleSelect";

interface UserDetailProps {
  user: User;
  editUserMode?: boolean;
  userProfile?: boolean;
  onNewUserAdd?: (data: User) => void;
  addNew?: boolean;
}

const UserDetail: React.FC<UserDetailProps> = ({
  user,
  editUserMode = false,
  userProfile = false,
  onNewUserAdd,
  addNew = false,
}) => {
  const isLargeScreen = useIsLargeScreen();

  const [editMode, setEditMode] = React.useState(editUserMode);
  const [userData, setUserData] = React.useState<User>(user);
  const { showSuccessToast, showErrorToast } = useToast();

  const router = useRouter();

  // Sync editMode with editUserMode prop
  useEffect(() => {
    setEditMode(editUserMode);
  }, [editUserMode]); // Runs when editUserMode prop changes

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

  const handleEditUser = async () => {
    try {
      setEditMode(false);
      const returnedUser = await updateUser(userData._id, userData);

      setUserData(returnedUser);

      showSuccessToast("User updated successfully!");
    } catch (error) {
      showErrorToast("Error updating User!");
    }
  };

  const handleDeleteUser = async () => {
    try {
      if (userData.role === "Owner") {
        showErrorToast("Cannot delete Owner!");
      } else {
        await deleteUser(userData._id);

        showSuccessToast("User deleted successfully!");
        router.replace("/(tabs)/team");
      }
    } catch (error) {
      showErrorToast("Error deleting customer!");
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setUserData((prevData) => {
      // If siteIndex is defined, update a site location

      if (field in prevData.emergencyContact) {
        return {
          ...prevData,
          emergencyContact: {
            ...prevData.emergencyContact,
            [field]: value,
          },
        };
      } else {
        // Otherwise, update the  field directly
        return {
          ...prevData,
          [field]: value,
        };
      }
    });
  };

  useEffect(() => {
    if (onNewUserAdd && userData) {
      onNewUserAdd(userData);
    }
  }, [onNewUserAdd, userData]);

  // Phone number formatting
  const handlePhoneChange = (field: string, phone: string) => {
    const formattedPhone = formatPhoneNumber(phone);
    handleInputChange(field, formattedPhone);
  };

  const [image, setImage] = useState<string | null>(null);
  const [status, requestPermission] = ImagePicker.useCameraPermissions();
  const [mediaStatus, requestMediaPermission] =
    ImagePicker.useMediaLibraryPermissions();

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      handleInputChange("profileUrl", result.assets[0].uri);
    }
  };

  return (
    <>
      {!isLargeScreen && !userProfile && !addNew && (
        <Stack.Screen
          // Replace with your actual component
          options={{
            headerTitleAlign: "left",
            headerRight: () => (
              <RoleWrapper roles={["Owner"]}>
                <ActionButtons
                  onEdit={() => setEditMode(true)}
                  onDelete={handleDeleteUser}
                  onSave={handleEditUser}
                  editMode={editMode}
                />
              </RoleWrapper>
            ),
          }}
        />
      )}

      <ScrollView
        showsVerticalScrollIndicator={isLargeScreen}
        className="flex-1 w-full gap-12 p-2"
      >
        {/* Header with Edit and Delete buttton */}
        {isLargeScreen && !userProfile && !addNew && (
          <View className="w-full flex-row gap-1 items-center justify-end self-end gap-2 mb-4">
            <RoleWrapper roles={["Owner"]}>
              <ActionButtons
                onEdit={() => setEditMode(true)}
                onDelete={handleDeleteUser}
                onSave={handleEditUser}
                editMode={editMode}
              />
            </RoleWrapper>
          </View>
        )}

        {/*  Avatar Section */}
        <View className="flex gap-2 items-center justify-center">
          <Avatar alt="Avatar" className="w-15 h-15">
            <AvatarImage source={{ uri: userData.profileUrl }} />
            <AvatarFallback>
              <Text>{getInitials(userData.name)}</Text>
            </AvatarFallback>
          </Avatar>
          <Button variant="link" onPress={pickImage}>
            <Text>Change Picture</Text>
          </Button>

          {editMode ? (
            <>
              <InputField
                label="Name"
                value={userData.name}
                onChangeText={(value) => handleInputChange("name", value)}
                editable={editMode}
                nativeID="Name"
              />

              {userData.role != "Owner" && !userProfile && (
                <RoleSelect
                  value={userData.role}
                  onValueChange={(newRole) =>
                    handleInputChange("role", newRole)
                  }
                />
              )}
            </>
          ) : (
            <>
              <H2>{userData.name}</H2>
              <Muted>{userData.role}</Muted>
            </>
          )}
        </View>

        {!userProfile && !addNew && (
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
        )}

        {/* User Details Section */}
        <View className="flex flex-col md:flex-row w-full gap-4 mt-8 ">
          {/*  Mail and Phone */}

          <View className="flex flex-1 gap-4 ">
            <Large>Contact</Large>
            {editMode ? (
              <View className="flex gap-2">
                <InputField
                  label="Email"
                  value={userData.email}
                  onChangeText={(value) => handleInputChange("email", value)}
                  editable={editMode}
                  nativeID="Email"
                />
                <InputField
                  label="Phone"
                  value={userData.phone}
                  onChangeText={(value) => handlePhoneChange("phone", value)}
                  editable={editMode}
                  nativeID="Phone"
                />
              </View>
            ) : (
              <View className="flex md:flex-1 bg-secondary rounded-md gap-4 p-4">
                <View className="flex flex-row items-center gap-2">
                  <Link href={`mailto:${userData.email}`}>
                    <Pressable className="h-8 w-8 bg-primary rounded-2xl items-center justify-center p-1">
                      <Mail
                        className="text-primary-foreground"
                        size={isLargeScreen ? 18 : 16}
                      />
                    </Pressable>
                  </Link>

                  <Text className="text-wrap break-all">{userData.email}</Text>
                </View>
                <View className="flex-row items-center gap-2">
                  <Link href={`tel:${userData.phone.replace(/\D/g, "")}`}>
                    <Pressable className="h-8 w-8 bg-primary rounded-2xl items-center justify-center p-1">
                      <Phone
                        className="text-primary-foreground"
                        size={isLargeScreen ? 18 : 16}
                      />
                    </Pressable>
                  </Link>
                  <Text>{userData.phone}</Text>
                </View>
              </View>
            )}
          </View>

          {/* Emergency Contact */}
          <View className="flex flex-1 gap-4">
            <Large className="text-destructive">Emergeny Contact</Large>
            {editMode ? (
              <View className="flex gap-2">
                <InputField
                  label="Name"
                  value={userData.emergencyContact.ename}
                  onChangeText={(value) => handleInputChange("ename", value)}
                  editable={editMode}
                  nativeID="Name"
                />
                <InputField
                  label="Phone"
                  value={userData.emergencyContact.ephone}
                  onChangeText={(value) => handlePhoneChange("ephone", value)}
                  editable={editMode}
                  nativeID="Phone"
                />
              </View>
            ) : (
              <View className="flex md:flex-1 border border-destructive rounded-md gap-4 p-4">
                <View className="flex-row items-center gap-2">
                  <View className="h-8 w-8 bg-primary-foreground rounded-2xl items-center justify-center p-1">
                    <User2
                      className="text-destructive"
                      size={isLargeScreen ? 18 : 18}
                    />
                  </View>
                  <Text>{userData.emergencyContact.ename}</Text>
                </View>
                <View className="flex-row items-center gap-2">
                  <Link
                    href={`tel:${userData.emergencyContact.ephone.replace(
                      /\D/g,
                      ""
                    )}`}
                  >
                    <Pressable className="h-8 w-8 bg-destructive rounded-2xl items-center justify-center p-1">
                      <Phone
                        className="text-destructive-foreground"
                        size={isLargeScreen ? 18 : 16}
                      />
                    </Pressable>
                  </Link>
                  <Text>{userData.emergencyContact.ephone}</Text>
                </View>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
      <Toast />
    </>
  );
};

export default UserDetail;
