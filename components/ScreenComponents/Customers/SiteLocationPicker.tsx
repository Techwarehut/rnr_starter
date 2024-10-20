import React from "react";
import { FlatList, View } from "react-native";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { cn, useIsLargeScreen } from "~/lib/utils";
import { SiteLocation } from "./types";
import { Text } from "~/components/ui/text";
import { Muted } from "~/components/ui/typography";

interface SiteLocationProps {
  siteLocations: SiteLocation[];
  onPress: (item: SiteLocation) => void; // Type this according to your data
}

const SiteLocationPicker: React.FC<SiteLocationProps> = ({
  siteLocations,
  onPress,
}) => {
  const isLargeScreen = useIsLargeScreen();

  const renderItem = ({
    item,
    index,
  }: {
    item: SiteLocation;
    index: number;
  }) => {
    console.log("Rendering item:", item); // Log the item here
    return (
      <TableRow
        className={cn("active:bg-secondary", index % 2 && "bg-muted/40")}
        onPress={() => onPress(item)}
      >
        <TableCell className="flex-1">
          <Text>{item.siteName}</Text>
          <Muted>{item.siteContactPerson}</Muted>
        </TableCell>
      </TableRow>
    );
  };

  if (!siteLocations.length) {
    return (
      <View>
        <Text>No site locations available</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 mr-2">
      <FlatList
        data={siteLocations}
        renderItem={renderItem} // Use the extracted function here
        keyExtractor={(item) => item.site_id.toString()}
        showsVerticalScrollIndicator={isLargeScreen}
        style={{ flex: 1, flexGrow: 1 }}
        contentContainerStyle={{ flexGrow: 1, flex: 1 }}
      />
    </View>
  );
};

export default SiteLocationPicker;
