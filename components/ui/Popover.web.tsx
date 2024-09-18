// Popover.web.tsx (for Popover - Web)

import React from "react";
import { View } from "react-native";

import {
  Popover as RNPopover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popoverCore";

interface PopoverProps {
  triggerContent: React.ReactNode;
  screenContent: React.ReactNode[];
  snapPoints?: (string | number)[]; // Accept snapPoints as a prop, not used here
  contentInsets: { top: number; bottom: number; left: number; right: number };
  popoverKey: string | number; // Add key prop
}

export const Popover: React.FC<PopoverProps> = ({
  triggerContent,
  screenContent,

  contentInsets,
  popoverKey, // Add key prop
}) => {
  return (
    <RNPopover key={`${popoverKey}-trigger`}>
      <PopoverTrigger asChild>{triggerContent}</PopoverTrigger>
      <PopoverContent side="bottom" insets={contentInsets} className="w-fit">
      {screenContent.map((content, index) => (
            <View key={`${popoverKey}-content-${index}`}>{content}</View>
          ))}
      </PopoverContent>
    </RNPopover>
  );
};

export default Popover;
