import { View } from "react-native";
import { GroupByFilter } from "../Filter/GroupByFilter";
import StatusFilter from "../Filter/StatusFilter";
import { StatusKeys } from "../types";

interface FilterProps {
  selectedGroupValue: string;
  initialStatusCheckedStates: Record<StatusKeys, boolean>;

  setSelectedGroupValue: (value: string) => void;
  handleStatusChange: (checkedStates: Record<StatusKeys, boolean>) => void;
}

export const PurchaseFilters: React.FC<FilterProps> = ({
  selectedGroupValue,
  initialStatusCheckedStates,

  setSelectedGroupValue,
  handleStatusChange,
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
    </>
  );
};
