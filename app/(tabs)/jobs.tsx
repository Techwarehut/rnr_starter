import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, SectionList, View } from "react-native";
import Toast from "react-native-toast-message";
import { CreateNew } from "~/components/ScreenComponents/Jobs/CreateNew";
import { JobCard } from "~/components/ScreenComponents/Jobs/JobCard";
import SearchBar from "~/components/ScreenComponents/SearchBar";
import { useToast } from "~/components/ScreenComponents/ToastMessage";
import { Text } from "~/components/ui/text";
import projects from "~/data/projects.json";
import jobs from "~/data/jobs.json";
import { Job } from "~/components/ScreenComponents/Jobs/types";
import JobSectionList from "~/components/ScreenComponents/Jobs/JobList";

export default function JobScreen() {
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const { showSuccessToast } = useToast();

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
          milestone.jobIDs.some((jobId: string) => {
            const job = jobs.find((j) => j._id === jobId);
            return (
              job &&
              (job.jobTitle.toLowerCase().includes(searchText.toLowerCase()) ||
                job.jobDescription
                  .toLowerCase()
                  .includes(searchText.toLowerCase()))
            );
          })
        )
    );

    setFilteredProjects(filtered);
  };

  const groupJobs = (groupBy: "customer" | "assignee" | "project" | "none") => {
    const grouped: { title: string; data: Job[] }[] = [];

    for (const project of filteredProjects) {
      for (const milestone of project.milestones) {
        if ("jobIDs" in milestone) {
          for (const jobId of milestone.jobIDs) {
            const job = jobs.find((j) => j._id === jobId);
            if (job) {
              let groupTitle = "";

              if (groupBy === "customer") {
                groupTitle = `Customer: ${project.customer.businessName}`; // Replace with actual customer name if available
              } else if (groupBy === "assignee") {
                groupTitle =
                  job.assignedTo.map((user) => user.name).join(", ") ||
                  "Unassigned";
              } else if (groupBy === "project") {
                groupTitle = project.projectName; // Use project name for grouping
              } else {
                groupTitle = "Jobs"; // Default title when no grouping
              }

              const existingGroup = grouped.find((g) => g.title === groupTitle);
              if (existingGroup) {
                existingGroup.data.push(job);
              } else {
                grouped.push({ title: groupTitle, data: [job] });
              }
            }
          }
        }
      }
    }

    return grouped;
  };

  const groupedJobs = groupJobs("customer");

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <View className="flex-1 flex-row justify-center items-center m-2 gap-1">
              <CreateNew
                onNewJobAdd={() => showSuccessToast("Job Added successfully!")}
                onNewProjectAdd={() =>
                  showSuccessToast("Project Added successfully!")
                }
              />
            </View>
          ),
        }}
      />
      <View className="flex-1 gap-4 bg-secondary/30 px-2">
        <View className="flex mb-12">
          <SearchBar onSearch={handleSearch} />
          {/* Filters and other UI components */}
        </View>

        <JobSectionList sections={groupedJobs} />
      </View>
      <Toast />
    </>
  );
}
