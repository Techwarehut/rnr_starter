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

interface GroupByFilterProps {
  value: string;
  onValueChange: (value: string) => void;
}

export const GroupByFilter: React.FC<GroupByFilterProps> = ({
  value,
  onValueChange,
}) => {
  const contentInsets = {
    left: 12,
    right: 12,
  };

  const onLabelPress = (label: string) => {
    return () => {
      console.log("radio click", label);
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
        <RadioGroupItem aria-labelledby={`label-for-${value}`} value={value} />
        <Label nativeID={`label-for-${value}`} onPress={onLabelPress}>
          {value}
        </Label>
      </View>
    );
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          className="flex-row gap-2 native:pr-3"
        >
          <Text>Group By</Text>
          <ChevronDown size={18} className="text-primary" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        insets={contentInsets}
        className="w-auto flex items-start justify-start"
      >
        <DropdownMenuGroup>
          <RadioGroup
            value={value}
            onValueChange={onValueChange}
            className="gap-3"
          >
            <DropdownMenuItem className="items-center justify-start self-start">
              <RadioGroupItemWithLabel
                value="None"
                onLabelPress={onLabelPress("None")}
              />
            </DropdownMenuItem>
            <DropdownMenuItem className="items-center justify-start self-start">
              <RadioGroupItemWithLabel
                value="Customer"
                onLabelPress={onLabelPress("Customer")}
              />
            </DropdownMenuItem>
            <DropdownMenuItem className="items-center justify-start self-start">
              <RadioGroupItemWithLabel
                value="Job"
                onLabelPress={onLabelPress("Job")}
              />
            </DropdownMenuItem>
          </RadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
