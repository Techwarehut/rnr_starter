import { View } from "react-native";
import { GroupByFilter } from "./Filters/GroupByFilter";
import StatusFilter from "./Filters/StatusFilter";
import { StatusKeys } from "./Filters/Statustypes";

interface FilterProps {
  selectedGroupValue: string;
  setSelectedGroupValue: (value: string) => void;
  handleStatusChange: (checkedStates: Record<StatusKeys, boolean>) => void;
}

export const JobFilters: React.FC<FilterProps> = ({
  selectedGroupValue,
  setSelectedGroupValue,
  handleStatusChange,
}) => {
  return (
    <>
      <GroupByFilter
        value={selectedGroupValue}
        onValueChange={setSelectedGroupValue}
      />
      <StatusFilter onChange={handleStatusChange} />
    </>
  );
};
