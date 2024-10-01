import React, { useState } from "react";
import { View } from "react-native";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

import { TableCell, TableRow } from "~/components/ui/table"; // Your TableCell component

import { Text } from "~/components/ui/text";

import { Muted } from "~/components/ui/typography"; // Assuming you have a Muted component
import { cn, getInitials } from "~/lib/utils";

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
  const initials = getInitials(item.name);

  return (
    <TableRow
      className={cn("active:bg-secondary", index % 2 && "bg-muted/40 ")}
      onPress={() => onPress(item)}
    >
      <TableCell className="flex-1 flex-row gap-4">
        <Avatar alt="Avatar" className="w-10 h-10">
          <AvatarImage source={{ uri: item.profileUrl }} />
          <AvatarFallback>
            <Text>{initials}</Text>
          </AvatarFallback>
        </Avatar>
        <View>
          <Text>{item.name}</Text>
          <Muted>{item.role}</Muted>
        </View>
      </TableCell>
    </TableRow>
  );
};

export default UserRow;
