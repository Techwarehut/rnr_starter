import React, { useCallback, useRef, useState } from "react";
import { View, Pressable, StyleSheet } from "react-native";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetHandle,
} from "~/components/ui/bottom-sheet/bottomSheet";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { useSharedValue } from "react-native-reanimated";
import { useColorScheme } from "~/lib/useColorScheme";

import { ChevronDown } from "~/lib/icons/ChevronDown";
import DateTimePicker, { DateType } from "react-native-ui-datepicker";
import { Calendar } from "~/lib/icons/Calendar";

interface DatePicketProps {
  date: DateType;
  onChangeDate: (date: DateType) => void; // Add this prop
}
export const DatePicker: React.FC<DatePicketProps> = ({
  date,
  onChangeDate,
}) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [isOpen, setIsOpen] = useState(false);
  const animatedIndex = useSharedValue<number>(0);
  const animatedPosition = useSharedValue<number>(0);
  const snapPoints = ["40%", "50%"];
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
      <Pressable className=" mr-4" onPress={handlePresentModalPress}>
        <Calendar className="text-primary" size={21} />
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
        <BottomSheetView className="flex-1 bg-popover gap-2 items-center justify-center p-4 ">
          <DateTimePicker
            date={date}
            mode="single"
            onChange={(params) => {
              handlePresentModalPress();
              onChangeDate(params.date);
            }}
            calendarTextStyle={{ color: isDarkColorScheme ? "#FFF" : "#000" }}
            selectedTextStyle={{ color: isDarkColorScheme ? "#000" : "#FFF" }}
            headerTextStyle={{ color: isDarkColorScheme ? "#FFF" : "#000" }}
            selectedItemColor={isDarkColorScheme ? "#FFF" : "#000"}
            headerButtonColor={isDarkColorScheme ? "#FFF" : "#000"}
            weekDaysTextStyle={{ color: isDarkColorScheme ? "#FFF" : "#000" }}
          />
        </BottomSheetView>
      </BottomSheetModal>
    </>
  );
};
