import { View } from "react-native";
import React from "react";
import SelectJob from "~/components/ScreenComponents/SelectJobs";
import { Stack } from "expo-router";
import { Job } from "~/components/ScreenComponents/Jobs/types";

const linkjob = () => {
  const handleJobSelect = (selectedJobs: Job[]) => {
    console.log(selectedJobs);
  };
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "Select Job(s)",
        }}
      />
      <SelectJob isSelectionRequired={true} onJobSelect={handleJobSelect} />
    </>
  );
};

export default linkjob;
