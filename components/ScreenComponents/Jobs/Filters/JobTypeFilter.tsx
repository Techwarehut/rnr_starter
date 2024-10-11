import { View } from "react-native";
import React from "react";
import { Checkbox } from "~/components/ui/checkbox";
import { Label } from "~/components/ui/label";
import { JobTypeKeys, StatusKeys, statusLabelMapping } from "./Statustypes";

interface JobTypeFilterProps {
  initialCheckedStates: Record<JobTypeKeys, boolean>; // Accept initial checked states as prop
  onChange: (checkedStates: Record<JobTypeKeys, boolean>) => void; // Prop to pass checked states
}

const JobTypeFilter: React.FC<JobTypeFilterProps> = ({
  initialCheckedStates,
  onChange,
}) => {
  const [checkedStates, setCheckedStates] =
    React.useState<Record<JobTypeKeys, boolean>>(initialCheckedStates);

  const handleCheckboxChange = (status: JobTypeKeys) => {
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
        return (
          <View key={status} className="flex-row gap-3 items-center">
            <Checkbox
              aria-labelledby={status}
              checked={checked}
              onCheckedChange={() =>
                handleCheckboxChange(status as JobTypeKeys)
              }
            />
            <Label
              nativeID={status}
              onPress={() => handleCheckboxChange(status as JobTypeKeys)}
            >
              {status}
            </Label>
          </View>
        );
      })}
    </View>
  );
};

export default JobTypeFilter;
