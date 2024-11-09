// LinkedJobSection.tsx
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { View } from "react-native"; // Assuming you're using React Native
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { Muted } from "~/components/ui/typography";

import { addLinkedJob, removeLinkedJob } from "~/api/purchasesApi";
import { Plus } from "~/lib/icons/Plus";
import { LinkJobs } from "../../LinkJobs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import DeleteButton from "../../DeleteButton";

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
  const insets = useSafeAreaInsets();

  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: insets.right,
    right: 12,
  };

  const handleJobClick = () => {
    router.push({
      pathname: "/jobs/[jobID]",
      params: { jobID: jobID },
    });
  };

  const handleLinkJob = () => {
    router.push({
      pathname: "/jobs/linkjob",
    });
  };

  // Add item to order
  const handleAddLinkedJob = async (newJobID: string) => {
    try {
      const updatedOrder = await addLinkedJob(orderNumber, newJobID);
      if (updatedOrder) {
        setLinkedJob(updatedOrder.jobID);
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

            <LinkJobs
              handleJobSelect={(jobs) => {
                // Check if the array is not empty
                if (jobs.length > 0) {
                  handleAddLinkedJob(jobs[0]._id); // Pass the first job to handleAddLinkedJob
                } else {
                  console.log("No jobs selected");
                }
              }}
            />
          </>
        ) : (
          <>
            <Button variant="link" onPress={handleJobClick}>
              <Text>{linkedJob}</Text>
            </Button>
            <View>
              <DeleteButton xIcon={true} onDelete={handleDeleteLinkedJob} />
            </View>
          </>
        )}
      </View>
    </View>
  );
};

export default LinkedJobSection;
