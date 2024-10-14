import React, { useState } from "react";
import { Alert, Pressable, View } from "react-native";
import { TableCell, TableRow } from "~/components/ui/table"; // Your TableCell component
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { Pencil } from "~/lib/icons/Pencil";
import { Trash2 } from "~/lib/icons/Trash2";
import { Muted } from "~/components/ui/typography"; // Assuming you have a Muted component
import { cn, useIsLargeScreen } from "~/lib/utils";

interface VendorRowProps {
  item: any;
  index: number;
  onEdit: (item: any) => void;
  onDelete: (item: any) => void;
  onPress: (item: any) => void;
}

const VendorRow: React.FC<VendorRowProps> = ({
  item,
  index,
  onEdit,
  onDelete,
  onPress,
}) => {
  return (
    <TableRow
      className={cn("active:bg-secondary", index % 2 && "bg-muted/40 ")}
      onPress={() => onPress(item)}
    >
      <TableCell className="flex-1">
        <Text>{item.companyName}</Text>
        <Muted>{item.contactPerson.name}</Muted>
      </TableCell>
    </TableRow>
  );
};

export default VendorRow;
