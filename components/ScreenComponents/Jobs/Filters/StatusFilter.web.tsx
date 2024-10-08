import { View } from "react-native";
import { Button } from "~/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Text } from "~/components/ui/text";
import { ChevronDown } from "~/lib/icons/ChevronDown";
import { StatusKeys } from "./Statustypes";
import { useState } from "react";
import { Checkbox } from "~/components/ui/checkbox";

interface StatusFilterProps {
  onChange: (checkedStates: Record<StatusKeys, boolean>) => void; // Prop to pass checked states
}

const StatusFilter: React.FC<StatusFilterProps> = ({ onChange }) => {
  const [checkedStates, setCheckedStates] = useState<
    Record<StatusKeys, boolean>
  >({
    backlog: false,
    inProgress: false,
    onHold: false,
    customerApprovalPending: false,
    accountsReceivable: false,
    invoiced: false,
    paid: false,
  });

  const contentInsets = {
    left: 12,
    right: 12,
  };

  const handleCheckboxChange = (status: StatusKeys) => {
    setCheckedStates((prev) => {
      const newCheckedStates = { ...prev, [status]: !prev[status] };

      // If any checkbox is unchecked, all others can be individually selected
      onChange(newCheckedStates); // Pass the updated state to the parent
      return newCheckedStates;
    });
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          className="flex-row gap-2 native:pr-3"
        >
          <Text>Filter By</Text>
          <ChevronDown size={18} className="text-primary" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        insets={contentInsets}
        className="w-auto flex items-start justify-start"
      >
        <DropdownMenuGroup>
          {Object.entries(checkedStates).map(([status, checked]) => {
            const formattedStatus = status.replace(/([A-Z])/g, " $1").trim();
            const displayLabel =
              formattedStatus.charAt(0).toUpperCase() +
              formattedStatus.slice(1);

            return (
              <DropdownMenuItem className="flex-row gap-3 items-center justify-start self-start">
                <Checkbox
                  aria-labelledby={status}
                  checked={checked}
                  onCheckedChange={() =>
                    handleCheckboxChange(status as StatusKeys)
                  }
                />
                <Label
                  nativeID={status}
                  onPress={() => handleCheckboxChange(status as StatusKeys)}
                >
                  {displayLabel}
                </Label>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default StatusFilter;
