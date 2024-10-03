import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "~/components/ui/card";
import { Job, Project } from "./types";

interface JobProps {
  project: Project;
}
export const JobCard: React.FC<JobProps> = ({ project }) => {
  return (
    <Card className="p-2">
      <CardTitle>{project.projectName}</CardTitle>
      <CardDescription>{project.projectDescription}</CardDescription>
      <CardContent></CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};
