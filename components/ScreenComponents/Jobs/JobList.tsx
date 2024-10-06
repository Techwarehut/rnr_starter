import React from "react";
import { Platform, SectionList, View } from "react-native";

import { Text } from "~/components/ui/text";
import { Job } from "./types";
import { JobCard } from "./JobCard";
import { Collapsible } from "../Collapsible";

interface JobSectionListProps {
  sections: { title: string; data: Job[] }[];
}

const JobSectionList: React.FC<JobSectionListProps> = ({ sections }) => {
  return (
    <SectionList
      sections={sections}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => null}
      renderSectionHeader={({ section }) => (
        <Collapsible title={section.title}>
          {section.data.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </Collapsible>
      )}
      showsVerticalScrollIndicator={Platform.OS === "web"}
      contentContainerStyle={{ flexGrow: 1, gap: 8 }}
    />
  );
};

export default JobSectionList;
