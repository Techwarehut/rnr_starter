import { View, ScrollView, Platform, Image } from "react-native";
import React, { useState } from "react";
import { Job } from "../types";

import { useIsLargeScreen } from "~/lib/utils";
import { Text } from "~/components/ui/text";
import { Muted } from "~/components/ui/typography";
import { Button } from "~/components/ui/button";
import { Plus } from "~/lib/icons/Plus";
import * as ImagePicker from "expo-image-picker";
import DeleteButton from "../../DeleteButton";
import { addImageToJob, deleteImageFromJob } from "~/api/jobsApi";

interface JobImagesProps {
  job: Job;
  handleInputChange: (field: keyof Job, value: string) => void;
  editMode: boolean;
}

const JobImages: React.FC<JobImagesProps> = ({
  job,
  handleInputChange,
  editMode,
}) => {
  const cardWidth = 300;

  const [image, setImage] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
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
      await addImageToJob(job._id, result.assets[0].uri);
      setRefreshKey((prev) => prev + 1);
    }
  };

  // Function to handle toggling task status using the API
  const handleDeleteImage = async (imageURL: string) => {
    // Call the API function to toggle the task status
    await deleteImageFromJob(job._id, imageURL);
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <>
      <View className="flex-row items-center justify-between">
        <View>
          <Text className="text-xl">Images</Text>
          <Muted>Add before or after images</Muted>
        </View>
        <Button onPress={pickImage} variant="default" size="icon">
          <Plus className="text-primary-foreground" size={18} />
        </Button>
      </View>

      <ScrollView
        pagingEnabled
        scrollEventThrottle={200}
        decelerationRate="fast"
        snapToInterval={cardWidth}
        snapToAlignment="center"
        horizontal
        showsHorizontalScrollIndicator={useIsLargeScreen()}
        contentContainerClassName="p-2"
      >
        <View className="flex-row gap-4">
          {job.images.map((image, index) => (
            <View key={index} className="flex flex-row">
              <Image
                source={{ uri: image }}
                className="h-15 w-15 rounded-md"
                resizeMode="cover"
                // Optional: Add a fallback for error handling
                onError={() => console.log(`Failed to load image: ${image}`)}
              />

              <DeleteButton
                xIcon={true}
                onDelete={() => {
                  handleDeleteImage(image);
                }}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </>
  );
};

export default JobImages;
