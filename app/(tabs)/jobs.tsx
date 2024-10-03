import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import Animated, { LinearTransition } from "react-native-reanimated";
import Toast from "react-native-toast-message";
import { CreateNew } from "~/components/ScreenComponents/Jobs/CreateNew";
import { JobCard } from "~/components/ScreenComponents/Jobs/JobCard";
import SearchBar from "~/components/ScreenComponents/SearchBar";
import { useToast } from "~/components/ScreenComponents/ToastMessage";
import { Text } from "~/components/ui/text";
import projects from "~/data/projects.json"; // Your customer data

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
      <View className="flex-1 flex-column w-full gap-4 bg-secondary/30 px-2 gap-4">
        <View>
          <SearchBar onSearch={handleSearch} />
          {/* filters */}
          {/*  select Job Type */}
          {/* priority */}
          {/* Group by : none, customer, assigned, projects */}
        </View>
        <View className="flex-1">
          <Animated.FlatList
            data={filteredProjects}
            contentContainerClassName="flex-1, flexGrow gap-2"
            renderItem={({ item }) => (
              <JobCard
                key={item._id}
                project={item} // Passing the correct job object
              />
            )}
            keyExtractor={(item) => item._id}
            showsVerticalScrollIndicator={false}
            itemLayoutAnimation={LinearTransition}
          />
        </View>
      </View>
      <Toast />
    </>
  );
}
