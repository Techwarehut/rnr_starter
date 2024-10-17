import { View, ScrollView, Platform, Image } from "react-native";
import React from "react";
import { Job } from "../types";
import { Text } from "~/components/ui/text";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Muted } from "~/components/ui/typography";
import { Badge } from "~/components/ui/badge";
import { useIsLargeScreen } from "~/lib/utils";

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

  // Function to calculate total value of items in a purchase order
  const getStatusClassName = (status: string) => {
    switch (status) {
      case "Approved":
        return "text-brand-primary";
      case "Rejected":
        return "text-destructive";
      default:
        return "text-muted-foreground"; // Default class for Pending or other statuses
    }
  };

  return (
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
          <Image
            key={index}
            source={{ uri: image }}
            className="h-15 w-15 rounded-md"
            resizeMode="cover"
            // Optional: Add a fallback for error handling
            onError={() => console.log(`Failed to load image: ${image}`)}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default JobImages;
