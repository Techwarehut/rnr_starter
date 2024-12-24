import * as React from "react";
import { View } from "react-native";

import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Text } from "~/components/ui/text";
import RoleWrapper from "../RoleWrapper";

interface RoleSelectProps {
  value: string;
  onValueChange: (value: string) => void;
}

export const RoleSelect: React.FC<RoleSelectProps> = ({
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
  console.log(value);

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
        <Button variant="outline">
          <Text>{value || "Select Role"}</Text>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent insets={contentInsets} className="w-64 native:w-72">
        <RadioGroup
          value={value}
          onValueChange={onValueChange}
          className="gap-3"
        >
          <DropdownMenuItem>
            <RadioGroupItemWithLabel
              value="Team Member"
              onLabelPress={onLabelPress("Team Member")}
            />
          </DropdownMenuItem>
          <DropdownMenuItem>
            <RadioGroupItemWithLabel
              value="Team Lead"
              onLabelPress={onLabelPress("Team Lead")}
            />
          </DropdownMenuItem>
        </RadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
