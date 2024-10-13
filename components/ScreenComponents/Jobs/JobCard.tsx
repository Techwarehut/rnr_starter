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
import {
  getJobPriorityIcon,
  statusActionMapping,
  statusKeyMapping,
} from "./Filters/Statustypes";
import { UpdateStatus } from "./UpdateStatus";
import JobStatusUpdate from "./JobStatusUpdate";

interface JobProps {
  job: Job;
  onChangeStatus: (jobId: string, newStatus: string) => void;
}
export const JobCard: React.FC<JobProps> = ({ job, onChangeStatus }) => {
  return (
    <Card className="p-4 gap-4">
      <View className="flex-row gap-2 items-center">
        {getJobPriorityIcon(job.priority)}
      </View>
      <CardTitle>{job.jobTitle}</CardTitle>

      <CardDescription numberOfLines={2}>{job.jobDescription}</CardDescription>
      <View className="flex-row gap-2">
        <Badge className="p-1 px-4">
          <Text>{job.jobType}</Text>
        </Badge>
        <Badge variant={statusKeyMapping[job.status]} className="p-1 px-4">
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
      <CardFooter className="flex-none">
        <JobStatusUpdate
          onChangeStatus={(newStatus) => onChangeStatus(job._id, newStatus)}
          status={job.status}
        />
      </CardFooter>
    </Card>
  );
};
