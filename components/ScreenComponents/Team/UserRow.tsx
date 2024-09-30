import React, { useState } from "react";

import { TableCell, TableRow } from "~/components/ui/table"; // Your TableCell component

import { Text } from "~/components/ui/text";

import { Muted } from "~/components/ui/typography"; // Assuming you have a Muted component
import { cn } from "~/lib/utils";

interface CustomerRowProps {
  item: any;
  index: number;
  onEdit: (item: any) => void;
  onDelete: (item: any) => void;
  onPress: (item: any) => void;
}

const UserRow: React.FC<CustomerRowProps> = ({
  item,
  index,

  onPress,
}) => {
  return (
    <TableRow
      className={cn("active:bg-secondary", index % 2 && "bg-muted/40 ")}
      onPress={() => onPress(item)}
    >
      <TableCell className="flex-1">
        <Text>{item.name}</Text>
        <Muted>{item.role}</Muted>
      </TableCell>
    </TableRow>
  );
};

export default UserRow;
