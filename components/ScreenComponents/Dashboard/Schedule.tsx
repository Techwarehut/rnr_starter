import { Platform, ScrollView, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Large, Muted } from "~/components/ui/typography";
import SelectJob from "../SelectJobs";
import { defaultRecurrence, Job } from "../Jobs/types";
import { useToast } from "../ToastMessage";
import {
  cn,
  formatDueDate,
  generateFrequencyText,
  getInitials,
  useIsLargeScreen,
} from "~/lib/utils";
import { useRouter } from "expo-router";
import { getAllJobs, getInProgressJobs, updateJobStatus } from "~/api/jobsApi";
import { Text } from "~/components/ui/text";
import { SearchInput } from "../SearchInput";
import { JobFilters } from "../Jobs/JobFilters";
import { getJobPriorityIcon, JobTypeKeys } from "../Jobs/Filters/Statustypes";
import { Collapsible } from "../Collapsible";
import { User2 } from "~/lib/icons/User";

import { Button } from "~/components/ui/button";

import { JobCard } from "../Jobs/JobCard";
import { Table, TableCell, TableRow } from "~/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Repeat } from "~/lib/icons/Repeat";
import { useAuth } from "~/ctx/AuthContext";

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
  const { user } = useAuth();

  const fetchJobs = async () => {
    try {
      if (user) {
        const data = await getInProgressJobs(user); // Call the API
        // const data = await getAllJobs(); // Call the API
        setJobs(data);
        setFilteredJobs(data);
      }
    } catch (error) {
      showErrorToast("Failed to fetch Jobs!");
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleJobDetail = (jobID: string) => {
    router.push({
      pathname: "/jobs/[jobID]",
      params: {
        jobID: jobID,
      }, // Pass the customer object
    });
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
      } else if (groupBy === "Label") {
        if (job.purchaseOrderNumber) {
          const purchaseOrderNumber = job.purchaseOrderNumber; // Adjust this according to your data structure
          groupTitle = `${purchaseOrderNumber}`;
        } else {
          groupTitle = "No Label"; // Default when there is no project
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

        <Button onPress={() => router.push("/(protected)/(tabs)/jobs")}>
          <Text>View All Jobs</Text>
        </Button>
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
        {groupedJobs && groupedJobs.length > 0 ? (
          groupedJobs.map((group) => (
            <Collapsible key={group.title} title={group.title}>
              <Table className="border border-input rounded-md p-2">
                {group.data.map((job, index) => (
                  <TableRow
                    className={cn(
                      "active:bg-secondary w-full ",
                      index % 2 && "bg-muted/40 "
                    )}
                    key={job._id}
                  >
                    <TableCell className="flex w-full items-start">
                      <View className="flex flex-row gap-2 w-full items-center justify-between">
                        <View className="flex flex-row gap-2 items-center ">
                          {getJobPriorityIcon(job.priority)}
                        </View>
                        <View className="flex-row flex-wrap gap-2">
                          {job.assignedTo.map((item) => (
                            <Avatar
                              key={item.userId}
                              alt="Avatar"
                              className="w-10 h-10"
                            >
                              <AvatarImage source={{ uri: item.profileUrl }} />
                              <AvatarFallback>
                                <Text>{getInitials(item.name)}</Text>
                              </AvatarFallback>
                            </Avatar>
                          ))}
                        </View>
                      </View>

                      <View className="flex-row gap-2 items-center">
                        <Button
                          variant="link"
                          onPress={() => {
                            handleJobDetail(job._id);
                          }}
                        >
                          <Text>{job._id}</Text>
                        </Button>
                        <Text>{job.jobTitle}</Text>
                      </View>
                      {job.jobType === "Maintenance" && (
                        <View className="flex flex-row gap-2 items-center">
                          <Repeat className="text-primary" size={18} />
                          <Text className="text-primary">
                            {generateFrequencyText(
                              job.recurrence || defaultRecurrence,
                              job.dueDate
                            )}
                          </Text>
                        </View>
                      )}

                      <Muted>Site Details:</Muted>
                      <View className="bg-secondary gap-2 w-full rounded-md p-2">
                        <Text>{`${job.customer?.businessName} - ${job.siteLocation?.siteName}`}</Text>
                        <View className="flex-row items-center gap-2">
                          <User2 className="text-primary" size={18} />

                          <Text>{job.siteLocation.siteContactPerson}</Text>
                        </View>
                      </View>
                    </TableCell>
                  </TableRow>
                ))}
              </Table>
            </Collapsible>
          ))
        ) : (
          <View className="flex items-center justify-center">
            <Text>No Jobs to show</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default Schedule;
