// LinkedJobSection.tsx
import { useRouter } from "expo-router";
import React from "react";
import { View } from "react-native"; // Assuming you're using React Native
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { Muted } from "~/components/ui/typography";

interface LinkedJobSectionProps {
  jobID: string;
}

const LinkedJobSection: React.FC<LinkedJobSectionProps> = ({ jobID }) => {
  const router = useRouter();

  const handleJobClick = () => {
    router.push({
      pathname: "/jobs/[jobID]",
      params: { jobID: jobID }, // 'query' is used for dynamic route params in Next.js
    });
  };

  return (
    <View>
      <Muted>Linked Job:</Muted>
      <View className="flex-row flex-wrap gap-2 bg-secondary p-2 rounded-md items-center justify-between">
        <Button variant="link" onPress={handleJobClick}>
          <Text>{jobID}</Text>
        </Button>
      </View>
    </View>
  );
};

export default LinkedJobSection;
