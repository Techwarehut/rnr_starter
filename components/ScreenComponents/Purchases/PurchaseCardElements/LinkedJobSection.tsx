// LinkedJobSection.tsx
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { View } from "react-native"; // Assuming you're using React Native
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { Muted } from "~/components/ui/typography";
import DeleteButton from "../../DeleteButton";
import { addLinkedJob, removeLinkedJob } from "~/api/purchasesApi";
import { Plus } from "~/lib/icons/Plus";

interface LinkedJobSectionProps {
  jobID: string;
  orderNumber: string;
}

const LinkedJobSection: React.FC<LinkedJobSectionProps> = ({
  jobID,
  orderNumber,
}) => {
  const router = useRouter();
  const [refreshKey, setRefreshKey] = useState(0);
  const [linkedJob, setLinkedJob] = useState<string>(jobID);

  const handleJobClick = () => {
    router.push({
      pathname: "/jobs/[jobID]",
      params: { jobID: jobID }, // 'query' is used for dynamic route params in Next.js
    });
  };

  // Add item to order
  const handleAddLinkedJob = async (newJobID: string) => {
    try {
      const updatedOrder = await addLinkedJob(orderNumber, newJobID);
      if (updatedOrder) {
        setRefreshKey((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Error", "Failed to add item.");
    }
  };

  // Delete item from order
  const handleDeleteLinkedJob = async () => {
    try {
      const updatedOrder = await removeLinkedJob(orderNumber);
      setLinkedJob("");

      setRefreshKey((prev) => prev + 1);
    } catch (error) {
      console.error("Error", "Failed to delete job.");
    }
  };

  return (
    <View>
      <Muted>Linked Job:</Muted>
      <View className="flex-row flex-wrap gap-2 bg-secondary p-2 rounded-md items-center justify-between">
        {linkedJob === "" ? (
          <>
            <Text>Link a Job</Text>
            <Button variant="link" onPress={() => handleAddLinkedJob("1")}>
              <Plus size={18} className="text-primary" />
            </Button>
          </>
        ) : (
          <>
            <Button variant="link" onPress={handleJobClick}>
              <Text>{linkedJob}</Text>
            </Button>
            <DeleteButton xIcon={true} onDelete={handleDeleteLinkedJob} />
          </>
        )}
      </View>
    </View>
  );
};

export default LinkedJobSection;
