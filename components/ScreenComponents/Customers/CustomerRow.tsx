import React, { useState } from "react";
import { Alert, View } from "react-native";
import { TableCell, TableRow } from "~/components/ui/table"; // Your TableCell component
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { Pencil } from "~/lib/icons/Pencil";
import { Trash2 } from "~/lib/icons/Trash2";
import { Muted } from "~/components/ui/typography"; // Assuming you have a Muted component
import { cn, useIsLargeScreen } from "~/lib/utils";

interface CustomerRowProps {
  item: any;
  index: number;
  onEdit: (item: any) => void;
  onDelete: (item: any) => void;
}

const CustomerRow: React.FC<CustomerRowProps> = ({
  item,
  index,
  onEdit,
  onDelete,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const isLargeScreen = useIsLargeScreen();

  return (
    <TableRow
      className={cn("active:bg-secondary", index % 2 && "bg-muted/40 ")}
      onHoverIn={() => setHoveredIndex(index)}
      onHoverOut={() => setHoveredIndex(null)}
    >
      <TableCell className="flex-1">
        <View className="flex-row justify-between items-center gap-4">
          <View>
            <Text>{item.businessName}</Text>
            <Muted>{item.customerName}</Muted>
          </View>
          <View className="flex-row gap-2 justify-end opacity-100">
            <Button
              variant="secondary"
              size="sm"
              className="shadow-sm shadow-foreground/10 p-1 items-center justify-center "
              style={{
                opacity: hoveredIndex === index ? 1 : 0,
              }}
              onHoverIn={() => setHoveredIndex(index)}
              /* onHoverOut={() => setHoveredIndex(null)} */
              onPress={() => {
                Alert.alert("action taken");
              }}
            >
              <Pencil
                className="text-foreground items-center justify-center p-1"
                size={isLargeScreen ? 24 : 21}
                strokeWidth={1.25}
              />
            </Button>
            <Button
              variant="destructive"
              size="sm"
              className="shadow-sm shadow-foreground/10 p-1 items-center justify-center "
              onHoverIn={() => setHoveredIndex(index)}
              /* onHoverOut={() => setHoveredIndex(null)} */
              style={{
                opacity: hoveredIndex === index ? 1 : 0,
              }}
              onPress={() => {
                Alert.alert("action taken");
              }}
            >
              <Trash2
                className="text-foreground items-center justify-center p-1"
                size={isLargeScreen ? 24 : 21}
                strokeWidth={1.25}
              />
            </Button>
          </View>
        </View>
      </TableCell>
    </TableRow>
  );
};

export default CustomerRow;
