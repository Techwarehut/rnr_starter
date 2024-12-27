import { View } from "react-native";
import { GroupByFilter } from "./Filters/GroupByFilter";
import StatusFilter from "./Filters/StatusFilter";
import { JobTypeKeys, StatusKeys } from "./Filters/Statustypes";
import JobTypeFilter from "./Filters/JobTypeFilter";
import React from "react";

interface FilterProps {
  selectedGroupValue: string;
  initialStatusCheckedStates: Record<StatusKeys, boolean>;
  initialJobTypeCheckedStates: Record<JobTypeKeys, boolean>;
  setSelectedGroupValue: (value: string) => void;
  handleStatusChange: (checkedStates: Record<StatusKeys, boolean>) => void;
  handleJobTypeChange: (checkedStates: Record<JobTypeKeys, boolean>) => void;
  dashboardView?: boolean;
}

export const JobFilters: React.FC<FilterProps> = ({
  selectedGroupValue,
  initialStatusCheckedStates,
  initialJobTypeCheckedStates,
  setSelectedGroupValue,
  handleStatusChange,
  handleJobTypeChange,
  dashboardView = false,
}) => {
  return (
    <>
      <GroupByFilter
        value={selectedGroupValue}
        onValueChange={setSelectedGroupValue}
      />

      {/* Conditionally render filters based on the dashboardView flag */}
      {!dashboardView && (
        <>
          <StatusFilter
            initialCheckedStates={initialStatusCheckedStates}
            onChange={handleStatusChange}
          />
          <JobTypeFilter
            initialCheckedStates={initialJobTypeCheckedStates}
            onChange={handleJobTypeChange}
          />
        </>
      )}
    </>
  );
};
