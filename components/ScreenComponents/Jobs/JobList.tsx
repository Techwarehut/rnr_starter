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
  return (
    <SectionList
      sections={sections}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => <JobCard key={item._id} job={item} />}
      renderSectionHeader={({ section: { title } }) => (
        <Text className="font-bold text-lg">{title}</Text>
      )}
      showsVerticalScrollIndicator={Platform.OS === "web"}
      contentContainerClassName="flexGrow gap-4 md:mx-4"
    />
  );
};

export default JobSectionList;
