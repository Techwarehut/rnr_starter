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

import { Text } from "~/components/ui/text";
import { H3 } from "~/components/ui/typography";
import { Button } from "~/components/ui/button";
import { StatusKeys } from "../types";
import { GroupByFilter } from "../Filter/GroupByFilter";
import StatusFilter from "../Filter/StatusFilter";

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
      <Button variant="secondary" onPress={handlePresentModalPress}>
        <Filter size={21} className="text-secondary-foreground" />
      </Button>

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
        <BottomSheetView className="flex-1 bg-popover gap-2">
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerClassName="flex-1 p-2 gap-4"
          >
            <View className="flex-1 gap-4  ">
              <Text className="text-xl">Group by</Text>
            </View>
            <View className="flex m-4 justify-center ">
              <GroupByFilter
                value={selectedGroupValue}
                onValueChange={setSelectedGroupValue}
              />
            </View>

            <View className="flex-1 gap-4 ">
              <Text className="text-xl">Status</Text>
            </View>
            <View className="flex-1 m-4">
              <StatusFilter
                initialCheckedStates={initialStatusCheckedStates}
                onChange={handleStatusChange}
              />
            </View>
          </ScrollView>
        </BottomSheetView>
      </BottomSheetModal>
    </>
  );
};
