import { Image, View } from "react-native";
import React, { useState } from "react";
import { Text } from "~/components/ui/text";
import * as ImagePicker from "expo-image-picker";
import { BusinessInfoFieldsProps, Tenant } from "./types";
import DeleteButton from "../DeleteButton";
import { Muted } from "~/components/ui/typography";
import { Button } from "~/components/ui/button";
import { updateLogo } from "~/api/tenantApi";

const BusinessLogo: React.FC<BusinessInfoFieldsProps> = ({
  tenant,
  handleInputChange,
  editMode,
  handlePhoneChange,
}) => {
  const [status, requestPermission] = ImagePicker.useCameraPermissions();
  const [mediaStatus, requestMediaPermission] =
    ImagePicker.useMediaLibraryPermissions();
  const [tenantData, setTenantData] = useState<Tenant>(tenant);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const updatedtenant = await updateLogo(result.assets[0].uri);
      setTenantData(updatedtenant);
      // setRefreshKey((prev) => prev + 1);
    }
  };

  // Function to handle toggling task status using the API
  const handleDeleteImage = async () => {
    // Call the API function to toggle the task status
    const updatedtenant = await updateLogo(
      "https://via.placeholder.com/300x200?text=Logo+Placeholder"
    );
    setTenantData(updatedtenant);
  };

  console.log(tenant.businessLogo);
  return (
    <View className="flex flex-col gap-2 w-full md:flex-1">
      <View className="flex flex-row justify-between">
        <View>
          <Text className="text-xl">Logo</Text>
          <Muted>It will appear on invoice.</Muted>
        </View>
        <Button onPress={pickImage} variant="link">
          <Text>Change Logo</Text>
        </Button>
      </View>

      <View className="flex flex-row">
        <Image
          source={{ uri: tenantData.businessLogo }}
          className="h-15 w-15 rounded-md"
          resizeMode="cover"
          // Optional: Add a fallback for error handling
          onError={() => console.log("Failed to load logo")}
        />

        <DeleteButton
          xIcon={true}
          onDelete={() => {
            handleDeleteImage();
          }}
        />
      </View>
    </View>
  );
};

export default BusinessLogo;
