import { View, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { Text } from "~/components/ui/text";
import { Stack, useLocalSearchParams } from "expo-router";

import { Job } from "~/components/ScreenComponents/Jobs/types"; // Import your Job type
import { getJobById } from "~/api/jobsApi";
import ActionButtons from "~/components/ScreenComponents/ActionButtons";
import { Muted } from "~/components/ui/typography";
import { JobDetailDisplay } from "~/components/ScreenComponents/Jobs/JobDetail";

const JobDetail = () => {
  const { jobID } = useLocalSearchParams();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editMode, setEditMode] = React.useState(false);

  // Ensure jobID is a string
  const id = Array.isArray(jobID) ? jobID[0] : jobID;

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const fetchedJob = await getJobById(id);
        setJob(fetchedJob);
      } catch (err) {
        setError("Error fetching job details");
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [jobID]);

  const handleEditJob = () => {
    setEditMode(false);
  };
  const handleDeleteJob = () => {};

  const handleInputChange = (
    field: keyof Job,
    value: string,
    userId?: String
  ) => {
    setJob((prevData) => {
      // Check if prevData is null
      console.log("I am here with user", userId);
      if (prevData) {
        if (userId != undefined) {
          const updatedAssignedTo = prevData.assignedTo.map((user) => {
            if (user.userId === userId) {
              return {
                ...user,
                [field]: value, // Set to '0' if blank
              };
            }
            return user; // Return the user unchanged if it's not the target
          });

          return {
            ...prevData,
            assignedTo: updatedAssignedTo, // Update the assignedTo array
          };
        } else if (field in prevData.assignedTo) {
          console.log("Iam here with", field, value);
          return {
            ...prevData,
            assignedTo: {
              ...prevData.assignedTo,
              [field]: value,
            },
          };
        } else {
          console.log("Iam in else with", field, value);
          return {
            ...prevData,
            [field]: value,
          };
        }
      }
      return null; // or return an initial job object if desired
    });
  };

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" className="text-brand-primary" />
      </View>
    );
  }

  if (error) {
    return (
      <View>
        <Text>{error}</Text>
      </View>
    );
  }

  if (!job) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>No job found</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen // Replace with your actual component
        options={{
          headerTitleAlign: "left",
          headerRight: () => (
            <ActionButtons
              onEdit={() => setEditMode(true)}
              onDelete={handleDeleteJob}
              onSave={handleEditJob}
              editMode={editMode}
            />
          ),
          /*  headerTitle: () => (
            <View>
              <Text>{job.jobTitle}</Text>
              <Muted>{job._id}</Muted>
            </View>
          ), */
        }}
      />
      <JobDetailDisplay
        job={job}
        handleInputChange={handleInputChange}
        editMode={editMode}
      />
    </>
  );
};

export default JobDetail;
