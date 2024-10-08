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
import { SearchInput } from "~/components/ScreenComponents/SearchInput";
import { JobFilters } from "~/components/ScreenComponents/Jobs/JobFilters";

export default function JobScreen() {
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const { showSuccessToast } = useToast();
  const [searchText, setSearchText] = useState("");
  const [group, setGroup] = useState("assignee");
  const [selectedStatuses, setSelectedStatuses] = useState<
    Record<string, boolean>
  >({
    backlog: false,
    inProgress: false,
    onHold: false,
    customerApprovalPending: false,
    accountsReceivable: false,
    invoiced: false,
    paid: false,
  });

  const handleStatusChange = (newStates: Record<string, boolean>) => {
    setSelectedStatuses(newStates);
    console.log(newStates); // Log the current checked states or handle as needed
  };

  useEffect(() => {
    setFilteredProjects(projects);
  }, [projects]);

  const handleSearch = (searchText: string) => {
    setSearchText(searchText);
    console.log("Iam in search", searchText);
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

  const groupJobs = (groupBy: string) => {
    const grouped: { title: string; data: Job[] }[] = [];

    for (const project of filteredProjects) {
      for (const milestone of project.milestones) {
        if ("jobIDs" in milestone) {
          for (const jobId of milestone.jobIDs) {
            const job = jobs.find((j) => j._id === jobId);
            if (job) {
              let groupTitle = "";

              if (groupBy === "Customer") {
                groupTitle = `Customer: ${project.customer.businessName}`; // Replace with actual customer name if available
              } else if (groupBy === "Assignee") {
                groupTitle =
                  job.assignedTo.map((user) => user.name).join(", ") ||
                  "Unassigned";
              } else if (groupBy === "Project") {
                groupTitle = project.projectName; // Use project name for grouping
              } else {
                groupTitle = "All Jobs"; // Default title when no grouping
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

  const groupedJobs = groupJobs(group);

  console.log("before render", searchText);

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
      <View className="flex-1 gap-4 bg-secondary/30 px-2  md:pl-20 md:mx-2">
        <View className="flex-row gap-2 items-center">
          <SearchInput
            onChangeText={handleSearch}
            placeholder="Search..."
            value={searchText}
          />
          {/* Scheduling - Backlog, employees (drag and drop) */}
          {/* Filters and other UI components */}
          <JobFilters
            selectedGroupValue={group}
            setSelectedGroupValue={setGroup}
            handleStatusChange={handleStatusChange}
          />
        </View>

        <JobSectionList sections={groupedJobs} />
      </View>
      <Toast />
    </>
  );
}
