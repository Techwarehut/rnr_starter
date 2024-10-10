import { View } from "react-native";
import { GroupByFilter } from "./Filters/GroupByFilter";
import StatusFilter from "./Filters/StatusFilter";
import { JobTypeKeys, StatusKeys } from "./Filters/Statustypes";
import JobTypeFilter from "./Filters/JobTypeFilter";

interface FilterProps {
  selectedGroupValue: string;
  setSelectedGroupValue: (value: string) => void;
  handleStatusChange: (checkedStates: Record<StatusKeys, boolean>) => void;
  handleJobTypeChange: (checkedStates: Record<JobTypeKeys, boolean>) => void;
}

export const JobFilters: React.FC<FilterProps> = ({
  selectedGroupValue,
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
      <StatusFilter onChange={handleStatusChange} />
      <JobTypeFilter onChange={handleJobTypeChange} />
    </>
  );
};
