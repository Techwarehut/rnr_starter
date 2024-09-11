// Popover.web.tsx (for Popover - Web)

import React from "react";
import { View, Pressable } from "react-native";
import {
  Popover as RNPopover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Ellipsis } from "~/lib/icons/Ellipsis";
import { Text } from "~/components/ui/text";
import { tabVariants } from "~/components/navigation/TabVariants";

interface PopoverProps {
  triggerContent: React.ReactNode;
  screenContent: React.ReactNode[];
  isFocused: boolean;
  isLargeScreen: boolean;
  isSpecialRoute: boolean;
  contentInsets: { top: number; bottom: number; left: number; right: number };
}

export const Popover: React.FC<PopoverProps> = ({
  triggerContent,
  screenContent,

  isFocused,
  isLargeScreen,
  isSpecialRoute,
  contentInsets,
}) => {
  return (
    <RNPopover>
      <PopoverTrigger asChild>{triggerContent}</PopoverTrigger>
      <PopoverContent side="bottom" insets={contentInsets} className="w-auto">
        {screenContent}
      </PopoverContent>
    </RNPopover>
  );
};

export default Popover;
