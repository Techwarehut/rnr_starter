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
import { H3, Large } from "~/components/ui/typography";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Plus } from "~/lib/icons/Plus";
import { Badge } from "~/components/ui/badge";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface JobSectionListProps {
  sections: { title: string; data: Job[] }[];
}

const MIN_COLUMN_WIDTHS = [100, 120, 100, 120, 120];
const JobSectionList: React.FC<JobSectionListProps> = ({ sections }) => {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const columnWidths = React.useMemo(() => {
    return MIN_COLUMN_WIDTHS.map((minWidth) => {
      const evenWidth = width / MIN_COLUMN_WIDTHS.length;
      return evenWidth > minWidth ? evenWidth : minWidth;
    });
  }, [width]);
  const getBadgeVariant = (status: string) => {
    switch (status) {
      case "Backlog":
        return "backlog"; // Example variant for "In Progress"
      case "In Progress":
        return "inProgress"; // Example variant for "Completed"
      case "on Hold":
        return "onHold"; // Example variant for "Pending"
      case "Customer approval Pending":
        return "customerApprovalPending"; // Example variant for "Cancelled"
      case "Accounts Receiveable":
        return "accountsReceivable"; // Example variant for "Cancelled"
      case "Invoiced":
        return "invoiced"; // Example variant for "Cancelled"
      case "Paid":
        return "paid"; // Example variant for "Cancelled"
      default:
        return "default"; // Default variant
    }
  };

  return (
    <SectionList
      sections={sections}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => null} // This could be removed if not needed
      renderSectionHeader={({ section }) => (
        <Collapsible title={section.title}>
          <Table aria-labelledby="customer-table" className="flex-1">
            <TableHeader>
              <TableRow style={{ flexDirection: "row" }}>
                <TableHead style={{ flex: 1 }}>
                  <Text>Job</Text>
                </TableHead>
                <TableHead style={{ flex: 4 }}>
                  <Text>Job Description</Text>
                </TableHead>
                <TableHead style={{ flex: 2 }}>
                  <Text>Site Details</Text>
                </TableHead>
                <TableHead style={{ flex: 3 }}>
                  <Text>Assigned</Text>
                </TableHead>
                <TableHead style={{ flex: 2 }}>
                  <Text>Status</Text>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {section.data.map((job, index) => (
                <TableRow
                  key={job._id}
                  className={cn(
                    "active:bg-secondary ",
                    index % 2 && "bg-muted/40 "
                  )}
                >
                  <TableCell
                    style={{
                      flex: 1,
                    }}
                  >
                    <View>
                      <Button variant="link">
                        <Text>{job._id}</Text>
                      </Button>
                    </View>
                  </TableCell>
                  <TableCell style={{ flex: 4 }}>
                    <View>
                      <Large>{job.jobTitle}</Large>
                      <Text>{job.jobDescription}</Text>
                    </View>
                  </TableCell>
                  <TableCell style={{ flex: 2 }}>
                    <View>
                      <Text>{`${job.customer?.businessName} - ${job.siteLocation?.siteName}`}</Text>
                      <View className="flex-row items-center gap-2">
                        <User2 className="text-primary" size={18} />

                        <Text>{job.siteLocation.siteContactPerson}</Text>
                      </View>
                    </View>
                  </TableCell>
                  <TableCell style={{ flex: 3 }}>
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

                      <Pressable className="h-10 w-10 bg-brand-primary rounded-3xl items-center justify-center p-1">
                        <Plus className="text-primary-foreground" size={18} />
                      </Pressable>
                    </View>
                  </TableCell>

                  <TableCell style={{ flex: 2 }}>
                    <Badge
                      variant={getBadgeVariant(job.status)}
                      className="p-1 px-4"
                    >
                      <Text>{job.status}</Text>
                    </Badge>
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
