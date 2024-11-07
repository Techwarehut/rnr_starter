import { View, FlatList, SectionList, Pressable } from "react-native";
import React, { useState } from "react";
import { PurchaseOrder } from "./types";

import PurchaseCard from "./PurchaseCard";
import { Text } from "~/components/ui/text";
import { ChevronDown } from "~/lib/icons/ChevronDown";
import { ChevronRight } from "~/lib/icons/ChevronRight";

interface PurchaseProps {
  sections: { title: string; data: PurchaseOrder[] }[];
}

export const PurchasesList: React.FC<PurchaseProps> = ({ sections }) => {
  const [expandedSections, setExpandedSections] = useState<{
    [key: string]: boolean;
  }>({});

  const toggleSection = (title: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <SectionList
      sections={sections}
      renderItem={({ item, section }) =>
        expandedSections[section.title] ? <PurchaseCard item={item} /> : null
      }
      keyExtractor={(item) => item.purchaseOrderNumber}
      contentContainerClassName="flex flex-col gap-2"
      renderSectionHeader={({ section }) => (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={
            expandedSections[section.title] ? "Collapse" : "Expand"
          }
          accessibilityState={{ expanded: expandedSections[section.title] }}
          className="flex-row items-center gap-2 web:mb-4"
          onPress={() => toggleSection(section.title)}
        >
          {expandedSections[section.title] ? (
            <ChevronDown className="text-primary" size={18} />
          ) : (
            <ChevronRight className="text-primary" size={18} />
          )}
          <Text>{section.title}</Text>
        </Pressable>
      )}
    />
  );
};

export default PurchasesList;
