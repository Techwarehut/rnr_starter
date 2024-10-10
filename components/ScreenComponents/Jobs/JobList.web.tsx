import React from "react";
import {
  Platform,
  Pressable,
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

const MIN_COLUMN_WIDTHS = [100, 120, 100, 120, 120];
const JobSectionList: React.FC<JobSectionListProps> = ({ sections }) => {
  return (
    <SectionList
      sections={sections}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => null} // This could be removed if not needed
      renderSectionHeader={({ section }) => (
        <Collapsible title={section.title}>
          <Table
            aria-labelledby="customer-table"
            className="flex-1 border border-input rounded-md"
          >
            <TableHeader>
              <TableRow style={{ flexDirection: "row" }}>
                <TableHead style={{ flex: 5 }}>
                  <Text>Job</Text>
                </TableHead>
                <TableHead style={{ flex: 5 }}>
                  <Text>Priority</Text>
                </TableHead>
                <TableHead style={{ flex: 40 }}>
                  <Text>Job Description</Text>
                </TableHead>
                <TableHead style={{ flex: 10 }}>
                  <Text>Assigned</Text>
                </TableHead>
                <TableHead style={{ flex: 10 }}>
                  <Text>Job Type</Text>
                </TableHead>

                <TableHead style={{ flex: 15 }}>
                  <Text>Status</Text>
                </TableHead>
                <TableHead style={{ flex: 17 }}>
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
                  <TableCell
                    style={{
                      flex: 5,
                    }}
                  >
                    <Button variant="link">
                      <Text>{job._id}</Text>
                    </Button>
                  </TableCell>
                  <TableCell style={{ flex: 5 }}>
                    <View className="flex-row gap-2 items-center justify-center">
                      {getJobPriorityIcon(job.priority)}
                    </View>
                  </TableCell>
                  <TableCell style={{ flex: 40 }}>
                    <View>
                      <Text className="text-xl">{job.jobTitle}</Text>

                      <Muted numberOfLines={2}>{job.jobDescription}</Muted>
                    </View>
                  </TableCell>

                  <TableCell style={{ flex: 10 }}>
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
                  <TableCell style={{ flex: 10 }}>
                    <Badge className="p-1 px-2">
                      <Text>{job.jobType}</Text>
                    </Badge>
                  </TableCell>

                  <TableCell style={{ flex: 15 }}>
                    <Badge
                      variant={statusKeyMapping[job.status]}
                      className="p-1 px-4"
                    >
                      <Text>{job.status}</Text>
                    </Badge>
                  </TableCell>
                  <TableCell style={{ flex: 17 }}>
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
        </Collapsible>
      )}
      showsVerticalScrollIndicator={Platform.OS === "web"}
      contentContainerStyle={{ flexGrow: 1, gap: 8 }}
    />
  );
};

export default JobSectionList;
