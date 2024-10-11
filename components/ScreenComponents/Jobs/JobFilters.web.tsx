import { View } from "react-native";
import { GroupByFilter } from "./Filters/GroupByFilter";
import StatusFilter from "./Filters/StatusFilter";
import { JobTypeKeys, StatusKeys } from "./Filters/Statustypes";
import JobTypeFilter from "./Filters/JobTypeFilter";

interface FilterProps {
  selectedGroupValue: string;
  initialStatusCheckedStates: Record<StatusKeys, boolean>;
  initialJobTypeCheckedStates: Record<JobTypeKeys, boolean>;
  setSelectedGroupValue: (value: string) => void;
  handleStatusChange: (checkedStates: Record<StatusKeys, boolean>) => void;
  handleJobTypeChange: (checkedStates: Record<JobTypeKeys, boolean>) => void;
}

export const JobFilters: React.FC<FilterProps> = ({
  selectedGroupValue,
  initialStatusCheckedStates,
  initialJobTypeCheckedStates,
  setSelectedGroupValue,
  handleStatusChange,
  handleJobTypeChange,
}) => {
  return (
    <>
      <GroupByFilter
        value={selectedGroupValue}
        onValueChange={setSelectedGroupValue}
      />
      <StatusFilter
        initialCheckedStates={initialStatusCheckedStates}
        onChange={handleStatusChange}
      />
      <JobTypeFilter
        initialCheckedStates={initialJobTypeCheckedStates}
        onChange={handleJobTypeChange}
      />
    </>
  );
};
