import { View } from "react-native";
import React from "react";
import { H3 } from "~/components/ui/typography";
import UserDetail from "~/components/ScreenComponents/Team/UserDetail";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { useToast } from "~/components/ScreenComponents/ToastMessage";
import { User } from "~/components/ScreenComponents/Team/types";
import { addUser } from "~/api/UsersApi";
import Toast from "react-native-toast-message";
import { Stack, useRouter } from "expo-router";

const addnewuser = () => {
  const { showSuccessToast, showErrorToast } = useToast();
  const router = useRouter();
  // Initialize with a default Customer object, including _id
  const [userData, setUserData] = React.useState<User>({
    _id: "", // Add the required _id property
    tenantID: "",

    name: "",

    email: "",
    phone: "",

    emergencyContact: {
      ename: "",
      ephone: "",
    },
    profileUrl: "",
    role: "Team Member",
    activeJobs: 0,
    completedJobs: 0,
  });
  const handleAddUser = async () => {
    try {
      const addedUser = await addUser(userData);

      showSuccessToast("User Added successfully!");
      router.push("/(protected)/(tabs)/team");
    } catch (error) {
      showErrorToast("Error Adding user!");
    }
  };
  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <View className="web:mr-4">
              <Button size="sm" onPress={handleAddUser}>
                <Text>Create</Text>
              </Button>
            </View>
          ),
        }}
      />
      <View className="flex-1 p-2 md:p-12">
        <UserDetail
          user={userData}
          editUserMode={true}
          addNew={true}
          onNewUserAdd={setUserData}
        />
      </View>
      <Toast />
    </>
  );
};

export default addnewuser;
