import React, { useState } from "react";
import { Platform, Pressable, SectionList, View } from "react-native";
import { Text } from "~/components/ui/text";
import { Job } from "./types";
import { JobCard } from "./JobCard";
import { ChevronDown } from "~/lib/icons/ChevronDown";
import { ChevronRight } from "~/lib/icons/ChevronRight";

interface JobSectionListProps {
  sections: { title: string; data: Job[] }[];
}

const JobSectionList: React.FC<JobSectionListProps> = ({ sections }) => {
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
      keyExtractor={(item) => item._id}
      renderItem={({ item, section }) =>
        expandedSections[section.title] ? <JobCard job={item} /> : null
      }
      renderSectionHeader={({ section }) => (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={
            expandedSections[section.title] ? "Collapse" : "Expand"
          }
          accessibilityState={{ expanded: expandedSections[section.title] }}
          className="flex-row items-center gap-2"
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
      showsVerticalScrollIndicator={Platform.OS === "web"}
      contentContainerStyle={{ flexGrow: 1, gap: 8 }}
    />
  );
};

export default JobSectionList;
