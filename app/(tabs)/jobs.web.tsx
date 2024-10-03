import { useEffect, useState } from "react";
import { View } from "react-native";
import SearchBar from "~/components/ScreenComponents/SearchBar";
import { Text } from "~/components/ui/text";
import { useIsLargeScreen } from "~/lib/utils";
import projects from "~/data/projects.json"; // Your customer data
import { Stack } from "expo-router";
import { CreateNew } from "~/components/ScreenComponents/Jobs/CreateNew";
import { useToast } from "~/components/ScreenComponents/ToastMessage";
import Toast from "react-native-toast-message";

export default function JobScreen() {
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const { showSuccessToast, showErrorToast } = useToast();
  useEffect(() => {
    setFilteredProjects(projects);
  }, [projects]);

  const handleSearch = (searchText: string) => {
    const filtered = projects.filter(
      (project) =>
        project.projectName.toLowerCase().includes(searchText.toLowerCase()) ||
        project.projectDescription
          .toLowerCase()
          .includes(searchText.toLowerCase()) ||
        project.milestones.some((milestone) =>
          milestone.jobs.some(
            (job) =>
              job.jobTitle.toLowerCase().includes(searchText.toLowerCase()) ||
              job.jobDescription
                .toLowerCase()
                .includes(searchText.toLowerCase())
          )
        )
    );

    setFilteredProjects(filtered);
  };

  const isLargeScreen = useIsLargeScreen();
  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <View className="flex-1 flex-row justify-center items-center m-2 gap-1">
              <CreateNew
                onNewJobAdd={(data) => {
                  // Push updated data into the customers array
                  showSuccessToast("Job Added succesfully!");
                }}
                onNewProjectAdd={(data) => {
                  // Push updated data into the customers array
                  showSuccessToast("Project Added succesfully!");
                }}
              />
            </View>
          ),
        }}
      />

      <View className="flex-1 gap-4 bg-secondary/30 md:pl-20 mx-2">
        <View>
          <SearchBar onSearch={handleSearch} />
          {/* filters */}
          {/*  select Job Type */}
          {/* priority */}
          {/* Group by : none, customer, assigned, projects */}
        </View>
        <View className="flex-1 gap-4 bg-secondary/30 md:flex-row md:flex-nowrap">
          {/* Backlog */}
          <View className="flex-1 bg-secondary"></View>
          {/*  Not Started */}
          <View className="flex-1 bg-secondary"></View>
          {/* In Progress */}
          <View className="flex-1 bg-secondary"></View>
          {/* Complete */}
          <View className="flex-1 bg-secondary"></View>
          {/* Cancelled */}
          <View className="flex-1 bg-secondary"></View>
        </View>
      </View>
      <Toast />
    </>
  );
}
