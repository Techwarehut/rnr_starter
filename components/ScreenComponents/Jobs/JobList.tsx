// JobSectionList.tsx
import React from "react";
import { Platform, SectionList, View } from "react-native";

import { Text } from "~/components/ui/text";
import { Job } from "./types";
import { JobCard } from "./JobCard";

interface JobSectionListProps {
  sections: { title: string; data: Job[] }[];
}

const JobSectionList: React.FC<JobSectionListProps> = ({ sections }) => {
  console.log(sections);
  return (
    <SectionList
      sections={sections}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => <JobCard key={item._id} job={item} />}
      renderSectionHeader={({ section: { title } }) => (
        <Text className="text-lg my-2">{title}</Text>
      )}
      showsVerticalScrollIndicator={Platform.OS === "web"}
      contentContainerStyle={{ flexGrow: 1, gap: 8 }}
    />
  );
};

export default JobSectionList;
