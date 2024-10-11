import React from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  SectionList,
  useWindowDimensions,
  View,
} from "react-native";

import { Text } from "~/components/ui/text";
import { Job } from "./types";
import { JobCard } from "./JobCard";
import { Collapsible } from "../Collapsible";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Button } from "~/components/ui/button";
import { cn, getInitials } from "~/lib/utils";
import { User2 } from "~/lib/icons/User";
import { H3, Large, Muted } from "~/components/ui/typography";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Plus } from "~/lib/icons/Plus";
import { Badge } from "~/components/ui/badge";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  getJobPriorityIcon,
  statusActionMapping,
  statusKeyMapping,
} from "./Filters/Statustypes";
import { UpdateStatus } from "./UpdateStatus";

interface JobSectionListProps {
  sections: { title: string; data: Job[] }[];
}

const MIN_COLUMN_WIDTHS = [70, 90, 250, 100, 120, 160, 177]; // Minimum widths for each of the 7 columns

// Use columnWidths in your layout as needed

const JobSectionList: React.FC<JobSectionListProps> = ({ sections }) => {
  const { width } = useWindowDimensions();
  console.log(width);

  // Define the desired percentages for each column
  const percentages = [0.05, 0.1, 0.275, 0.1, 0.1, 0.13, 0.15]; // Adjusted percentages for 7 columns

  const columnWidths = React.useMemo(() => {
    const totalAvailableWidth = width; // Total width available

    return MIN_COLUMN_WIDTHS.map((minWidth, index) => {
      const calculatedWidth = totalAvailableWidth * percentages[index]; // Calculate based on percentage
      console.log("width", calculatedWidth, minWidth);
      return Math.max(calculatedWidth, minWidth); // Ensure it doesn't go below minWidth
    });
  }, [width]);

  return (
    <SectionList
      sections={sections}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => null} // This could be removed if not needed
      renderSectionHeader={({ section }) => (
        <Collapsible title={section.title}>
          <ScrollView
            horizontal
            bounces={false}
            showsHorizontalScrollIndicator={false}
          >
            <Table
              aria-labelledby="customer-table"
              className="flex-1 border border-input rounded-md"
            >
              <TableHeader>
                <TableRow style={{ flexDirection: "row" }}>
                  <TableHead style={{ width: columnWidths[0] }}>
                    <Text>Job</Text>
                  </TableHead>
                  <TableHead style={{ width: columnWidths[1] }}>
                    <Text>Priority</Text>
                  </TableHead>
                  <TableHead style={{ width: columnWidths[2] }}>
                    <Text>Job Description</Text>
                  </TableHead>
                  <TableHead style={{ width: columnWidths[3] }}>
                    <Text>Assigned</Text>
                  </TableHead>
                  <TableHead style={{ width: columnWidths[4] }}>
                    <Text>Job Type</Text>
                  </TableHead>

                  <TableHead style={{ width: columnWidths[5] }}>
                    <Text>Status</Text>
                  </TableHead>
                  <TableHead style={{ width: columnWidths[6] }}>
                    <Text>Action</Text>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {section.data.map((job, index) => (
                  <TableRow
                    key={job._id}
                    className={cn(
                      "active:bg-secondary items-center justify-center",
                      index % 2 && "bg-muted/40 items-center justify-center"
                    )}
                  >
                    <TableCell style={{ width: columnWidths[0] }}>
                      <Button variant="link">
                        <Text>{job._id}</Text>
                      </Button>
                    </TableCell>
                    <TableCell style={{ width: columnWidths[1] }}>
                      <View className="flex-row gap-2 items-center justify-center">
                        {getJobPriorityIcon(job.priority)}
                      </View>
                    </TableCell>
                    <TableCell style={{ width: columnWidths[2] }}>
                      <View>
                        <Text className="text-xl">{job.jobTitle}</Text>

                        <Muted numberOfLines={2}>{job.jobDescription}</Muted>
                      </View>
                    </TableCell>

                    <TableCell style={{ width: columnWidths[3] }}>
                      <View className="flex-row flex-wrap gap-2 items-center">
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
                    </TableCell>
                    <TableCell style={{ width: columnWidths[4] }}>
                      <Badge className="p-1 px-2">
                        <Text>{job.jobType}</Text>
                      </Badge>
                    </TableCell>

                    <TableCell style={{ width: columnWidths[5] }}>
                      <Badge
                        variant={statusKeyMapping[job.status]}
                        className="p-1 px-4"
                      >
                        <Text>{job.status}</Text>
                      </Badge>
                    </TableCell>
                    <TableCell style={{ width: columnWidths[6] }}>
                      <View className="flex-row border border-input bg-background rounded-md items-center justify-center">
                        <Pressable className="flex-1 p-2 web:hover:bg-accent web:hover:text-accent-foreground active:bg-accent">
                          <Text className="group-active:text-accent-foreground">
                            {statusActionMapping[job.status]}
                          </Text>
                        </Pressable>
                        <UpdateStatus
                          onUpdateStatus={() =>
                            console.log("Job status updated!")
                          }
                          selectedOption=""
                        />
                      </View>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollView>
        </Collapsible>
      )}
      showsVerticalScrollIndicator={true}
      showsHorizontalScrollIndicator={true}
      contentContainerStyle={{ flexGrow: 1, gap: 8 }}
    />
  );
};

export default JobSectionList;
