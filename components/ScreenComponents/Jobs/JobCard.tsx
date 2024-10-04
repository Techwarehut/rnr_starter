import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "~/components/ui/card";
import { Job, Project } from "./types";

interface JobProps {
  job: Job;
}
export const JobCard: React.FC<JobProps> = ({ job }) => {
  return (
    <Card className="p-2">
      <CardTitle>{job.jobTitle}</CardTitle>
      <CardDescription>{job.jobDescription}</CardDescription>
      <CardContent></CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};
