import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "~/components/ui/card";
import { Job, Project } from "./types";
import { Badge } from "~/components/ui/badge";
import { Text } from "~/components/ui/text";
import { Pressable, View } from "react-native";
import { Button } from "~/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { getInitials } from "~/lib/utils";
import { Plus } from "~/lib/icons/Plus";
import { Phone } from "~/lib/icons/Phone";
import { User2 } from "~/lib/icons/User";
import { Link } from "expo-router";
import { Large, Muted } from "~/components/ui/typography";

interface JobProps {
  job: Job;
}
export const JobCard: React.FC<JobProps> = ({ job }) => {
  const getBadgeVariant = () => {
    switch (job.status) {
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
    <Card className="p-4 gap-4">
      <CardTitle>{job.jobTitle}</CardTitle>

      <CardDescription>{job.jobDescription}</CardDescription>
      <View className="flex-row">
        <Badge variant={getBadgeVariant()} className="p-1 px-4">
          <Text>{job.status}</Text>
        </Badge>
      </View>
      <CardContent>
        <View className="flex gap-4">
          <Muted>Job Number</Muted>
          <View className="bg-secondary gap-2 rounded-md p-1 items-start">
            <Button variant="link">
              <Text>{job._id}</Text>
            </Button>
          </View>
          <Muted>Site Details:</Muted>
          <View className="bg-secondary gap-2 rounded-md p-2">
            <Text>{`${job.customer?.businessName} - ${job.siteLocation?.siteName}`}</Text>
            <View className="flex-row items-center gap-2">
              <User2 className="text-primary" size={18} />

              <Text>{job.siteLocation.siteContactPerson}</Text>
            </View>
          </View>
          <Muted>Assigned:</Muted>

          <View className="flex-row flex-wrap gap-2 bg-secondary p-2 rounded-md items-center">
            {job.assignedTo.map((item) => (
              <Avatar key={item.userId} alt="Avatar" className="w-10 h-10">
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
        </View>
      </CardContent>
      <CardFooter className="justify-between">
        <Button variant="outline">
          <Text>Update Status</Text>
        </Button>
        <Button>
          <Text>Get Directions</Text>
        </Button>
      </CardFooter>
    </Card>
  );
};
