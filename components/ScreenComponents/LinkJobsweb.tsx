// Popover.web.tsx (for Popover - Web)

import React from "react";
import { View } from "react-native";

import {
  Popover as RNPopover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popoverCore";
import { Button } from "../ui/button";
import { Plus } from "~/lib/icons/Plus";
import { Text } from "../ui/text";
import SelectJob from "./SelectJobs";
import { Job } from "./Jobs/types";

interface LinkJobProps {
  handleJobSelect: (selectedJobs: Job[]) => void; // Callback to handle job selection
  contentInsets: { top: number; bottom: number; left: number; right: number };
}

export const LinkJobs: React.FC<LinkJobProps> = ({
  handleJobSelect,
  contentInsets,
}) => {
  return (
    <RNPopover>
      <PopoverTrigger asChild>
        <Button variant="link">
          <Plus size={18} className="text-primary" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side="bottom"
        insets={contentInsets}
        className="flex flex-1 w-full"
      >
        <View className="flex flex-row p-2 self-end">
          <Button
            size="sm"
            variant="default"
            className="shadow shadow-foreground/5"
            onPress={() => {}}
          >
            <Text>Select</Text>
          </Button>
        </View>
        <SelectJob isSelectionRequired={true} onJobSelect={handleJobSelect} />
      </PopoverContent>
    </RNPopover>
  );
};

export default LinkJobs;
