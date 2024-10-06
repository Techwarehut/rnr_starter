import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";
import Toast from "react-native-toast-message";
import { CreateNew } from "~/components/ScreenComponents/Jobs/CreateNew";
import SearchBar from "~/components/ScreenComponents/SearchBar";
import { useToast } from "~/components/ScreenComponents/ToastMessage";
import projects from "~/data/projects.json";
import jobs from "~/data/jobs.json";
import { Job } from "~/components/ScreenComponents/Jobs/types";
import JobSectionList from "~/components/ScreenComponents/Jobs/JobList";
import { H3, H4, Large } from "~/components/ui/typography";
import { Text } from "~/components/ui/text";
import { SearchInput } from "~/components/ScreenComponents/SearchInput";

export default function JobScreen() {
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const { showSuccessToast } = useToast();
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    setFilteredProjects(projects);
  }, [projects]);

  const handleSearch = (searchText: string) => {
    setSearchText(searchText);
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
          <SearchInput
            value={searchText}
            onChangeText={handleSearch}
            placeholder="Search..."
          />
          {/* Scheduling - Backlog, employees (drag and drop) */}
          {/*  Tracking - In Progress, on Hold, Customer approval Pending */}
          {/* Invoicing -  Accounts Receiveable, Invoiced, Paid */}
          {/* Group by : none, customer, assigned, projects, site Locattion */}
        </View>
        <View className="flex-1 gap-4 bg-secondary/30 flex-row flex-nowrap">
          <View className="flex-1 gap-2">
            <Text className="text-destructive">Backlog</Text>
            <View className="flex-1 bg-secondary p-2">
              <JobSectionList sections={groupedJobs} />
            </View>
          </View>
        </View>
      </View>
      <Toast />
    </>
  );
}
