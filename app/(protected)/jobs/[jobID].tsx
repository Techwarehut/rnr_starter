import { View, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { Text } from "~/components/ui/text";
import { Stack, useLocalSearchParams } from "expo-router";

import { Job } from "~/components/ScreenComponents/Jobs/types"; // Import your Job type
import {
  assignJob,
  editJob,
  getJobById,
  updateJobPriority,
  updateJobStatus,
  updateJobType,
} from "~/api/jobsApi";
import ActionButtons from "~/components/ScreenComponents/ActionButtons";
import { Muted } from "~/components/ui/typography";
import { JobDetailDisplay } from "~/components/ScreenComponents/Jobs/JobDetail";
import {
  JobPriorityKeys,
  JobTypeKeys,
} from "~/components/ScreenComponents/Jobs/Filters/Statustypes";
import { User } from "~/components/ScreenComponents/Team/types";

import { DateType } from "react-native-ui-datepicker";
import {
  Customer,
  SiteLocation,
} from "~/components/ScreenComponents/Customers/types";

const JobDetail = () => {
  const { jobID } = useLocalSearchParams();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editMode, setEditMode] = React.useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

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

  const handleEditJob = async () => {
    setEditMode(false);
    if (job) await editJob(job);
  };
  const handleDeleteJob = () => {};

  const handleChangeStatus = async (jobId: string, newStatus: string) => {
    try {
      const updatedJob = await updateJobStatus(jobId, newStatus);

      setJob(updatedJob);
      setRefreshKey((prev) => prev + 1);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChangeJobType = async (jobId: string, newType: JobTypeKeys) => {
    try {
      const updatedJob = await updateJobType(jobId, newType);

      setJob(updatedJob);
      setRefreshKey((prev) => prev + 1);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChangeJobPriority = async (
    jobId: string,
    newPriority: JobPriorityKeys
  ) => {
    try {
      const updatedJob = await updateJobPriority(jobId, newPriority);

      setJob(updatedJob);
      setRefreshKey((prev) => prev + 1);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (
    field: keyof Job,
    value: string | Customer | SiteLocation | DateType,
    userId?: String
  ) => {
    setJob((prevData) => {
      // Check if prevData is null

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
          return {
            ...prevData,
            assignedTo: {
              ...prevData.assignedTo,
              [field]: value,
            },
          };
        } else if (field === "images") {
          // Ensure 'value' is a string before adding to images
          if (typeof value === "string") {
            return {
              ...prevData,
              images: [...prevData.images, value], // Add the string value
            };
          }
          // Handle case where value is not a string, for example, if it's a Customer, SiteLocation, or DateType
          console.error("Invalid value type for images:", value);
        } else {
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
        onChangeStatus={handleChangeStatus}
        onChangePriority={handleChangeJobPriority}
        onChangeType={handleChangeJobType}
        editMode={editMode}
      />
    </>
  );
};

export default JobDetail;
