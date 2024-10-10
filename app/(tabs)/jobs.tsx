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
import { JobTypeKeys } from "~/components/ScreenComponents/Jobs/Filters/Statustypes";

export default function JobScreen() {
  const [filteredJobs, setFilteredJobs] = useState(jobs);
  const { showSuccessToast } = useToast();
  const [searchText, setSearchText] = useState("");
  const [group, setGroup] = useState("None");
  const [selectedStatuses, setSelectedStatuses] = useState<
    Record<string, boolean>
  >({
    backlog: false,
    inprogress: false,
    onhold: false,
    approvalpending: false,
    accountsreceivable: false,
    invoiced: false,
    paid: false,
  });

  const [selectedJobType, setSelectedJobType] = useState<
    Record<JobTypeKeys, boolean>
  >({
    Inspection: false,
    ServiceVisit: false,
    Consultation: false,
    Maintenance: false,
  });

  useEffect(() => {
    const filtered = jobs.filter((job) => {
      const statusKey = job.status.toLowerCase().replace(/ /g, ""); // Normalize the status
      const jobTypeKey = job.jobType as JobTypeKeys; // Type assertion here

      const statusMatches =
        selectedStatuses[statusKey] === true ||
        !Object.values(selectedStatuses).some(Boolean);
      const jobTypeMatches =
        selectedJobType[jobTypeKey] === true ||
        !Object.values(selectedJobType).some(Boolean);

      return statusMatches && jobTypeMatches;
    });

    setFilteredJobs(filtered);
  }, [selectedStatuses, selectedJobType]);

  const handleStatusChange = (newStates: Record<string, boolean>) => {
    setSelectedStatuses(newStates);
  };

  const handleJobTypeChange = (newStates: Record<string, boolean>) => {
    setSelectedJobType(newStates);
  };

  useEffect(() => {
    setFilteredJobs(jobs);
  }, [jobs]);

  const handleSearch = (searchText: string) => {
    setSearchText(searchText);

    const filtered = jobs.filter(
      (job) =>
        job.jobTitle.toLowerCase().includes(searchText.toLowerCase()) ||
        job.jobDescription.toLowerCase().includes(searchText.toLowerCase())
    );

    setFilteredJobs(filtered);
  };

  const groupJobs = (groupBy: string) => {
    const grouped: { title: string; data: Job[] }[] = [];

    for (const job of filteredJobs) {
      let groupTitle = "";

      if (groupBy === "Customer") {
        groupTitle = job.customer?.businessName
          ? `Customer: ${job.customer.businessName}`
          : "Customer: Unassigned";
      } else if (groupBy === "Assignee") {
        groupTitle =
          job.assignedTo && job.assignedTo.length > 0
            ? job.assignedTo.map((user) => user.name).join(", ")
            : "Unassigned";
      } else if (groupBy === "Project") {
        if (job.projectId) {
          const projectName = job.projectName; // Adjust this according to your data structure
          groupTitle = `${job.projectId}: ${projectName}`;
        } else {
          groupTitle = "No Project"; // Default when there is no project
        }
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
            handleJobTypeChange={handleJobTypeChange}
          />
        </View>

        <JobSectionList sections={groupedJobs} />
      </View>
      <Toast />
    </>
  );
}
