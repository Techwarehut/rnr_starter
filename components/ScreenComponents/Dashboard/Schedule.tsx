import { Platform, ScrollView, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Large, Muted } from "~/components/ui/typography";
import SelectJob from "../SelectJobs";
import { Job } from "../Jobs/types";
import { useToast } from "../ToastMessage";
import { formatDueDate, getInitials, useIsLargeScreen } from "~/lib/utils";
import { useRouter } from "expo-router";
import { getAllJobs, getInProgressJobs, updateJobStatus } from "~/api/jobsApi";
import { Text } from "~/components/ui/text";
import { SearchInput } from "../SearchInput";
import { JobFilters } from "../Jobs/JobFilters";
import { JobTypeKeys } from "../Jobs/Filters/Statustypes";
import { Collapsible } from "../Collapsible";

import { Button } from "~/components/ui/button";

import { JobCard } from "../Jobs/JobCard";

const Schedule = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredjobs, setFilteredJobs] = useState<Job[]>([]);
  const { showSuccessToast, showErrorToast } = useToast();
  const [searchText, setSearchText] = useState("");
  const [group, setGroup] = useState("Assignee");
  const [refreshKey, setRefreshKey] = useState(0);
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

  const islargeScreen = useIsLargeScreen();
  const router = useRouter();

  const fetchJobs = async () => {
    try {
      const data = await getInProgressJobs(); // Call the API
      // const data = await getAllJobs(); // Call the API
      setJobs(data);
      setFilteredJobs(data);
    } catch (error) {
      showErrorToast("Failed to fetch Jobs!");
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

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
    <ScrollView
      contentContainerClassName="flex gap-4 px-2 md:mx-2 web:overflow-y-auto md:border md:border-input md:p-4 md:rounded-md"
      showsVerticalScrollIndicator={Platform.OS === "web"}
    >
      <View className="flex flex-row items-center justify-between">
        <Large>Today's Schedule</Large>
        <View className="flex flex-row gap-2">
          <Button variant="secondary">
            <Text>Email</Text>
          </Button>
          <Button>
            <Text>Print</Text>
          </Button>
        </View>
      </View>
      <View className="flex-row gap-2 items-center">
        <SearchInput
          onChangeText={handleSearch}
          placeholder="Search..."
          value={searchText}
        />

        <JobFilters
          selectedGroupValue={group}
          initialStatusCheckedStates={selectedStatuses}
          initialJobTypeCheckedStates={selectedJobType}
          setSelectedGroupValue={setGroup}
          handleStatusChange={() => {}}
          handleJobTypeChange={() => {}}
          dashboardView={true}
        />
      </View>
      <View className="flex flex-1">
        {groupedJobs.map((group) => (
          <Collapsible key={group.title} title={group.title}>
            {group.data.map((job) => (
              <JobCard
                key={job._id}
                onChangeStatus={handleChangeStatus}
                job={job}
                onJobDetail={handleJobDetail}
                isSelectionRequired={false}
                checkboxEnabled={false}
                selectedJobs={[]}
                onJobSelect={(jobs) => {}}
              />
            ))}
          </Collapsible>
        ))}
      </View>
    </ScrollView>
  );
};

export default Schedule;
