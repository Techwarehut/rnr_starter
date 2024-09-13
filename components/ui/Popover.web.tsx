// Popover.web.tsx (for Popover - Web)

import React from "react";

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
}

export const Popover: React.FC<PopoverProps> = ({
  triggerContent,
  screenContent,

  contentInsets,
}) => {
  return (
    <RNPopover>
      <PopoverTrigger asChild>{triggerContent}</PopoverTrigger>
      <PopoverContent side="bottom" insets={contentInsets} className="w-fit">
        {screenContent}
      </PopoverContent>
    </RNPopover>
  );
};

export default Popover;
