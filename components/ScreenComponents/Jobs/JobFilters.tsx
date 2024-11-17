import React, { useCallback, useRef, useState } from "react";
import { View, Pressable, StyleSheet, ScrollView } from "react-native";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetHandle,
} from "~/components/ui/bottom-sheet/bottomSheet";

import { useSharedValue } from "react-native-reanimated";
import { useColorScheme } from "~/lib/useColorScheme";

import { Filter } from "~/lib/icons/Filter";
import { GroupByFilter } from "./Filters/GroupByFilter";
import { Text } from "~/components/ui/text";
import { H3 } from "~/components/ui/typography";
import StatusFilter from "./Filters/StatusFilter";
import { JobTypeKeys, StatusKeys } from "./Filters/Statustypes";
import { Button } from "~/components/ui/button";
import JobTypeFilter from "./Filters/JobTypeFilter";

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
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [isOpen, setIsOpen] = useState(false);
  const animatedIndex = useSharedValue<number>(0);
  const animatedPosition = useSharedValue<number>(0);
  const snapPoints = ["70%", "80%"];
  const dashboardSnapPoints = ["40%", "50%"];
  const { isDarkColorScheme, setColorScheme } = useColorScheme();

  const handleSheetChanges = useCallback((index: number) => {
    // handle sheet changes
  }, []);

  const handlePresentModalPress = useCallback(() => {
    if (isOpen) {
      bottomSheetModalRef.current?.dismiss();
      setIsOpen(false);
    } else {
      bottomSheetModalRef.current?.present();
      setIsOpen(true);
    }
  }, [isOpen]);

  return (
    <>
      <Button variant="secondary" onPress={handlePresentModalPress}>
        <Filter size={21} className="text-secondary-foreground" />
      </Button>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={dashboardView ? dashboardSnapPoints : snapPoints}
        onChange={handleSheetChanges}
        backgroundStyle={{
          backgroundColor: isDarkColorScheme ? "#000" : "#FFF",
        }}
        handleComponent={() => (
          <BottomSheetHandle
            className="bg-popover"
            indicatorStyle={{
              backgroundColor: isDarkColorScheme ? "#FFF" : "#000",
            }} // Customize the dash color
            animatedIndex={animatedIndex}
            animatedPosition={animatedPosition}
          />
        )}
      >
        <BottomSheetView className="flex-1 bg-popover gap-2">
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerClassName="flex-1 p-2"
          >
            <Text className="text-xl">Group by</Text>

            <View className="flex flex-1 mx-4 mt-2 justify-center ">
              <GroupByFilter
                value={selectedGroupValue}
                onValueChange={setSelectedGroupValue}
              />
            </View>

            {/* Conditionally render filters based on the dashboardView flag */}
            {!dashboardView && (
              <>
                <Text className="text-xl">Status</Text>

                <View className="flex flex-1 mb-8 mx-4 mt-2">
                  <StatusFilter
                    initialCheckedStates={initialStatusCheckedStates}
                    onChange={handleStatusChange}
                  />
                </View>

                <Text className="text-xl">Job Type</Text>

                <View className="flex flex-1 m-4 ">
                  <JobTypeFilter
                    initialCheckedStates={initialJobTypeCheckedStates}
                    onChange={handleJobTypeChange}
                  />
                </View>
              </>
            )}
          </ScrollView>
        </BottomSheetView>
      </BottomSheetModal>
    </>
  );
};
