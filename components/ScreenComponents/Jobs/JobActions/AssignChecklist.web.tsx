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
import { Plus } from "~/lib/icons/Plus";

import { Pressable, View } from "react-native";
import { User } from "../../Team/types";
import UserTable from "../../Team/UserTable";
import { useEffect, useState } from "react";
import { getAllUsers } from "~/api/UsersApi";
import { fetchChecklists } from "~/api/checklistApi";
import { Checklist } from "../../Checklist/types";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Label } from "~/components/ui/label";
import { Text } from "~/components/ui/text";
import { Muted } from "~/components/ui/typography";

interface AssignJobProps {
  jobId: string;
  handleAddChecklist: (checklistId: string) => void;
}

export const AssignChecklist: React.FC<AssignJobProps> = ({
  jobId,
  handleAddChecklist,
}) => {
  const contentInsets = {
    left: 12,
    right: 12,
  };
  const [value, setValue] = useState("");

  const [checklists, setChecklists] = useState<Checklist[]>([]);
  const [selChecklist, setSelChecklist] = useState<string>("");

  // Fetch all users when the component mounts
  useEffect(() => {
    const fetchChecklist = async () => {
      try {
        const checklists = await fetchChecklists(); // Call the function to fetch users
        setChecklists(checklists); // Set the fetched users to state
      } catch (error) {
        console.error("Error fetching Checklists:", error);
      }
    };

    fetchChecklist(); // Invoke the fetch function
  }, []); // Empty dependency array to run only on mount

  function RadioGroupItemWithLabel({
    value,
    onLabelPress,
  }: {
    value: string;
    onLabelPress: (value: string) => void;
  }) {
    return (
      <View className="flex-row gap-2 items-center">
        <RadioGroupItem
          aria-labelledby={`label-for-${value}`}
          value={value}
          onPress={() => onLabelPress(value)}
        />
        <Label
          nativeID={`label-for-${value}`}
          onPress={() => onLabelPress(value)}
        >
          {value}
        </Label>
      </View>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="default">
          <Plus className="text-primary-foreground" size={18} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        insets={contentInsets}
        className="w-auto flex items-start justify-start bg-popover gap-8 p-4"
      >
        <DropdownMenuGroup>
          <View className="mb-4">
            <Text className="text-xl">Select a Checklist</Text>
            <Muted>Templates are created and maintained by Admin.</Muted>
          </View>
          <RadioGroup
            value={value}
            onValueChange={setSelChecklist}
            className="flex flex-1 gap-4"
          >
            {checklists.map((checklist) => (
              <RadioGroupItemWithLabel
                key={checklist.checklist_id}
                value={checklist.checklist_name}
                onLabelPress={() => {
                  setSelChecklist(checklist.checklist_id);
                  setValue(checklist.checklist_name);
                }}
              />
            ))}
          </RadioGroup>

          <Button
            variant="outline"
            className="mt-4"
            onPress={() => {
              handleAddChecklist(selChecklist);
            }}
          >
            <Text>Add</Text>
          </Button>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
