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
import { Pressable } from "react-native";
import {
  actionStatusMapping,
  jobTypeKeys,
  JobTypeKeys,
  statusActionMapping,
} from "./Filters/Statustypes";

interface JobTypeProps {
  type: JobTypeKeys;
  onChangeType: (newtype: JobTypeKeys) => void; // Add this prop
}
export const UpdateType: React.FC<JobTypeProps> = ({ type, onChangeType }) => {
  const contentInsets = {
    left: 12,
    right: 12,
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Pressable className="flex p-1 py-2 h-full web:hover:bg-accent web:hover:text-accent-foreground active:bg-accent">
          <ChevronDown
            size={21}
            className="group-active:text-accent-foreground text-primary"
          />
        </Pressable>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        insets={contentInsets}
        className="w-auto flex items-start justify-start"
      >
        <DropdownMenuGroup>
          {jobTypeKeys.map((action, index) => (
            <DropdownMenuItem
              key={index} // Ensure this is unique
              className="flex-1 w-full items-center self-start"
              onPress={() => onChangeType(action)}
            >
              <Text>{action}</Text>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
