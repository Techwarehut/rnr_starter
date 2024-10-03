import { Button } from "~/components/ui/button";
import { Job } from "./types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Text } from "~/components/ui/text";
import { ChevronDown } from "~/lib/icons/ChevronDown";
import { AddNewProject } from "./AddNewProject";
import { AddNewJob } from "./AddNewJob";

interface AddNewProjectProps {
  onNewProjectAdd: (data: Job) => void;
  onNewJobAdd: (data: Job) => void;
}

export const CreateNew: React.FC<AddNewProjectProps> = ({
  onNewProjectAdd,
  onNewJobAdd,
}) => {
  const contentInsets = {
    left: 12,
    right: 12,
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="sm"
          variant="default"
          className="flex-row gap-2 native:pr-3"
        >
          <Text>Create New</Text>
          <ChevronDown size={18} className="text-primary-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        insets={contentInsets}
        className="w-auto flex items-start justify-start"
      >
        <DropdownMenuGroup>
          <DropdownMenuItem className="h-12 items-center self-start">
            <AddNewProject onNewProjectAdd={onNewProjectAdd} />
          </DropdownMenuItem>
          <DropdownMenuItem className="h-12 items-center self-start">
            <AddNewJob onNewJobAdd={onNewJobAdd} />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
