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
  statusActionMapping,
} from "./Filters/Statustypes";

interface UpdateStatusProps {
  onUpdateStatus: (data: string) => void;
  status: string;
}

export const UpdateStatus: React.FC<UpdateStatusProps> = ({
  onUpdateStatus,
  status,
}) => {
  const contentInsets = {
    left: 12,
    right: 12,
  };
  const actions = (statusActionMapping[status] || []).slice(1);

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
          {actions.map((action, index) => (
            <DropdownMenuItem
              key={index} // Ensure this is unique
              className="flex-1 w-full items-center self-start"
              onPress={() => onUpdateStatus(actionStatusMapping[action])}
            >
              <Text>{action}</Text>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
