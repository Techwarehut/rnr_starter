import { View } from "react-native";
import React from "react";
import { Large } from "~/components/ui/typography";
import SelectJob from "../SelectJobs";

const Schedule = () => {
  return (
    <View className="flex flex-1 p-2 gap-4">
      <Large>Today's Schedule</Large>
      <View className="flex flex-1">
        <SelectJob filterInProgress={true} />
      </View>
    </View>
  );
};

export default Schedule;
