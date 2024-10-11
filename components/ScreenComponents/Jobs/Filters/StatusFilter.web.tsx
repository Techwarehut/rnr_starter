import { View } from "react-native";
import { Button } from "~/components/ui/button";
import React from "react";
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
import { StatusKeys, statusLabelMapping } from "./Statustypes";
import { useState } from "react";
import { Checkbox } from "~/components/ui/checkbox";

interface StatusFilterProps {
  initialCheckedStates: Record<StatusKeys, boolean>; // Accept initial checked states as prop
  onChange: (checkedStates: Record<StatusKeys, boolean>) => void; // Prop to pass checked states
}

const StatusFilter: React.FC<StatusFilterProps> = ({
  initialCheckedStates,
  onChange,
}) => {
  const [checkedStates, setCheckedStates] =
    useState<Record<StatusKeys, boolean>>(initialCheckedStates);

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
          <Text>Status</Text>
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
            const displayLabel = statusLabelMapping[status as StatusKeys];

            return (
              <DropdownMenuItem
                key={status}
                className="flex-row gap-3 items-center justify-start self-start"
              >
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
