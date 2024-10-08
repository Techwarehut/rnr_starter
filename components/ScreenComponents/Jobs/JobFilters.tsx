import React, { useCallback, useRef, useState } from "react";
import { View, Pressable, StyleSheet } from "react-native";
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
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [isOpen, setIsOpen] = useState(false);
  const animatedIndex = useSharedValue<number>(0);
  const animatedPosition = useSharedValue<number>(0);
  const snapPoints = ["50%", "60%"];
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
      <Pressable
        className="flex-row gap-2 native:pr-3"
        onPress={handlePresentModalPress}
      >
        <Filter size={26} className="text-primary" />
      </Pressable>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
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
        <BottomSheetView className="flex-1 bg-popover mb-8 p-2 gap-4">
          <View className="flex ">
            <Text className="text-xl">Group by</Text>
          </View>
          <View className="flex-1 ml-4">
            <GroupByFilter
              value={selectedGroupValue}
              onValueChange={setSelectedGroupValue}
            />
          </View>
          <View className="flex ">
            <Text className="text-xl">Filter by</Text>
          </View>
          <View className="flex-1 ml-4">
            <StatusFilter onChange={handleStatusChange} />
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </>
  );
};
