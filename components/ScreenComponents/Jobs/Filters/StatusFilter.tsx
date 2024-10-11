import { View } from "react-native";
import React from "react";
import { Checkbox } from "~/components/ui/checkbox";
import { Label } from "~/components/ui/label";
import { StatusKeys, statusLabelMapping } from "./Statustypes";

interface StatusFilterProps {
  initialCheckedStates: Record<StatusKeys, boolean>; // Accept initial checked states as prop
  onChange: (checkedStates: Record<StatusKeys, boolean>) => void; // Prop to pass checked states
}

const StatusFilter: React.FC<StatusFilterProps> = ({
  initialCheckedStates,
  onChange,
}) => {
  const [checkedStates, setCheckedStates] =
    React.useState<Record<StatusKeys, boolean>>(initialCheckedStates);
  const handleCheckboxChange = (status: StatusKeys) => {
    setCheckedStates((prev) => {
      const newCheckedStates = { ...prev, [status]: !prev[status] };

      // If any checkbox is unchecked, all others can be individually selected
      onChange(newCheckedStates); // Pass the updated state to the parent
      return newCheckedStates;
    });
  };

  return (
    <View className="flex-1 justify-start items-start p-2 gap-2">
      {Object.entries(checkedStates).map(([status, checked]) => {
        const displayLabel = statusLabelMapping[status as StatusKeys];

        return (
          <View key={status} className="flex-row gap-3 items-center">
            <Checkbox
              aria-labelledby={status}
              checked={checked}
              onCheckedChange={() => handleCheckboxChange(status as StatusKeys)}
            />
            <Label
              nativeID={status}
              onPress={() => handleCheckboxChange(status as StatusKeys)}
            >
              {displayLabel}
            </Label>
          </View>
        );
      })}
    </View>
  );
};

export default StatusFilter;
