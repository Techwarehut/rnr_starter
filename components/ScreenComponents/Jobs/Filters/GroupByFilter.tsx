import { View } from "react-native";
import React from "react";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Label } from "~/components/ui/label";

interface GroupByFilterProps {
  value: string;
  onValueChange: (value: string) => void;
}

export const GroupByFilter: React.FC<GroupByFilterProps> = ({
  value,
  onValueChange,
}) => {
  const onLabelPress = (label: string) => {
    return () => {
      onValueChange(label);
    };
  };

  function RadioGroupItemWithLabel({
    value,
    onLabelPress,
  }: {
    value: string;
    onLabelPress: () => void;
  }) {
    return (
      <View className="flex-row gap-2 items-center">
        <RadioGroupItem
          aria-labelledby={`label-for-${value}`}
          value={value}
          onPress={onLabelPress}
        />
        <Label nativeID={`label-for-${value}`} onPress={onLabelPress}>
          {value}
        </Label>
      </View>
    );
  }

  return (
    <View className="flex-1 justify-start items-start p-2">
      <RadioGroup value={value} onValueChange={onValueChange} className="gap-3">
        <RadioGroupItemWithLabel
          value="None"
          onLabelPress={onLabelPress("None")}
        />
        <RadioGroupItemWithLabel
          value="Assignee"
          onLabelPress={onLabelPress("Assignee")}
        />
        <RadioGroupItemWithLabel
          value="Project"
          onLabelPress={onLabelPress("Project")}
        />
        <RadioGroupItemWithLabel
          value="Customer"
          onLabelPress={onLabelPress("Customer")}
        />
      </RadioGroup>
    </View>
  );
};
