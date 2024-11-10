import { router, Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, SectionList, View } from "react-native";
import Toast from "react-native-toast-message";

import { useToast } from "~/components/ScreenComponents/ToastMessage";

import { Job } from "~/components/ScreenComponents/Jobs/types";
import JobSectionList from "~/components/ScreenComponents/Jobs/JobList";
import { SearchInput } from "~/components/ScreenComponents/SearchInput";
import { JobFilters } from "~/components/ScreenComponents/Jobs/JobFilters";
import { JobTypeKeys } from "~/components/ScreenComponents/Jobs/Filters/Statustypes";
import { getAllJobs, updateJobStatus } from "~/api/jobsApi";

import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { useIsLargeScreen } from "~/lib/utils";
import JobSectionListWeb from "~/components/ScreenComponents/Jobs/JobListWeb";

interface interfaceJobProps {
  selectedJobs?: Job[]; // Array of selected jobs
  isSelectionRequired?: boolean; // Boolean to indicate if selection is required
  canSelectMultiple?: boolean; // Boolean to allow single or multiple selection
  onJobSelect?: (selectedJobs: Job[]) => void; // Callback to handle job selection
}

export default function SelectJob({
  selectedJobs,
  isSelectionRequired = false,
  canSelectMultiple = false,
  onJobSelect,
}: interfaceJobProps) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredjobs, setFilteredJobs] = useState<Job[]>([]);
  const { showSuccessToast, showErrorToast } = useToast();
  const [searchText, setSearchText] = useState("");
  const [group, setGroup] = useState("Purchase Order");
  const [refreshKey, setRefreshKey] = useState(0);

  const [checkboxEnabled, setCheckboxEnabled] = useState(true);

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

  const router = useRouter();
  const fetchJobs = async () => {
    try {
      const data = await getAllJobs(); // Call the API
      setJobs(data);
      setFilteredJobs(data);
    } catch (error) {
      showErrorToast("Failed to fetch Jobs!");
    }
  };
  useEffect(() => {
    fetchJobs();
  }, []);

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

  const handleStatusFilter = (newStates: Record<string, boolean>) => {
    setSelectedStatuses(newStates);
  };

  const handleJobTypeFilter = (newStates: Record<string, boolean>) => {
    setSelectedJobType(newStates);
  };

  const handleChangeStatus = async (jobId: string, newStatus: string) => {
    try {
      const updatedJob = await updateJobStatus(jobId, newStatus);

      setRefreshKey((prev) => prev + 1);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (searchText: string) => {
    setSearchText(searchText);
  };

  const handleJobDetail = (jobID: string) => {
    router.push({
      pathname: "/jobs/[jobID]",
      params: {
        jobID: jobID,
      }, // Pass the customer object
    });
  };

  const handleJobSelect = (selectedJobs: Job[]) => {
    if (!canSelectMultiple && selectedJobs.length === 1) {
      setCheckboxEnabled(false);
    } else {
      setCheckboxEnabled(true);
    }
    if (onJobSelect) onJobSelect(selectedJobs);
  };

  const islargeScreen = useIsLargeScreen();

  const searchfilteredJobs = filteredjobs.filter(
    (job) =>
      job.jobTitle.toLowerCase().includes(searchText.toLowerCase()) ||
      job.jobDescription.toLowerCase().includes(searchText.toLowerCase()) ||
      job.purchaseOrderNumber
        .toLowerCase()
        .includes(searchText.toLowerCase()) ||
      job.assignedTo.some((user) =>
        user.name.toLowerCase().includes(searchText.toLowerCase())
      ) ||
      job.customer.businessName.toLowerCase().includes(searchText.toLowerCase())
  );

  const groupJobs = (groupBy: string) => {
    const grouped: { title: string; data: Job[] }[] = [];

    for (const job of searchfilteredJobs) {
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
      } else if (groupBy === "Purchase Order") {
        if (job.purchaseOrderNumber) {
          const purchaseOrderNumber = job.purchaseOrderNumber; // Adjust this according to your data structure
          groupTitle = `${purchaseOrderNumber}`;
        } else {
          groupTitle = "No Purchase Order"; // Default when there is no project
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

  return (
    <>
      {!isSelectionRequired && (
        <Stack.Screen
          options={{
            headerRight: () => (
              <View className="flex-1 flex-row justify-center items-center m-2 gap-1">
                {/* <Button
                  size="sm"
                  variant="default"
                  className="shadow shadow-foreground/5"
                  onPress={() => {
                    if (onJobSelect) {
                      if (localSelectedJobs.length > 0) {
                        onJobSelect(localSelectedJobs);
                      } else {
                        console.error("no jjob");
                        showErrorToast("Please select a Job");
                      }
                    }
                  }}
                >
                  <Text>Select</Text>
                </Button> */}

                <Button
                  size="sm"
                  variant="default"
                  className="shadow shadow-foreground/5"
                  onPress={() => router.push("/jobs/addnew")}
                >
                  <Text>Add New Job</Text>
                </Button>
              </View>
            ),
          }}
        />
      )}
      <View className="flex-1 gap-4 bg-secondary/30 px-2  md:pl-20 md:mx-2 web:overflow-y-auto">
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
            initialStatusCheckedStates={selectedStatuses}
            initialJobTypeCheckedStates={selectedJobType}
            setSelectedGroupValue={setGroup}
            handleStatusChange={handleStatusFilter}
            handleJobTypeChange={handleJobTypeFilter}
          />
        </View>

        {islargeScreen ? (
          isSelectionRequired ? (
            <JobSectionList
              onChangeStatus={handleChangeStatus}
              sections={groupedJobs}
              onJobDetail={handleJobDetail}
              isSelectionRequired={isSelectionRequired}
              canSelectMultiple={checkboxEnabled}
              selectedJobs={selectedJobs || []}
              onJobSelect={handleJobSelect}
            />
          ) : (
            <JobSectionListWeb
              onChangeStatus={handleChangeStatus}
              sections={groupedJobs}
              onJobDetail={handleJobDetail}
            />
          )
        ) : (
          <JobSectionList
            onChangeStatus={handleChangeStatus}
            sections={groupedJobs}
            onJobDetail={handleJobDetail}
            isSelectionRequired={isSelectionRequired}
            canSelectMultiple={checkboxEnabled}
            selectedJobs={selectedJobs || []}
            onJobSelect={handleJobSelect}
          />
        )}
      </View>
      <Toast />
    </>
  );
}
