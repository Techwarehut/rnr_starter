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

import { H1, H3 } from "~/components/ui/typography";
import { Job } from "./types";
import { AddNewProject } from "./AddNewProject";
import { AddNewJob } from "./AddNewJob";
import { ChevronDown } from "~/lib/icons/ChevronDown";
import {
  actionStatusMapping,
  jobTypeKeys,
  JobTypeKeys,
  statusActionMapping,
} from "./Filters/Statustypes";

interface JobTypeProps {
  type: JobTypeKeys;
  onChangeType: (newtype: JobTypeKeys) => void; // Add this prop
}
export const UpdateType: React.FC<JobTypeProps> = ({ type, onChangeType }) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [isOpen, setIsOpen] = useState(false);
  const animatedIndex = useSharedValue<number>(0);
  const animatedPosition = useSharedValue<number>(0);
  const snapPoints = ["30%", "40%"];
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
        onPress={handlePresentModalPress}
        className="flex p-1 py-2 h-full web:hover:bg-accent web:hover:text-accent-foreground active:bg-accent"
      >
        <ChevronDown
          size={21}
          className="group-active:text-accent-foreground text-primary"
        />
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
          {jobTypeKeys.map((action, index) => (
            <Button
              variant="ghost"
              key={index}
              onPress={() => {
                handlePresentModalPress();
                onChangeType(action);
              }}
            >
              <Text>{action}</Text>
            </Button>
          ))}
        </BottomSheetView>
      </BottomSheetModal>
    </>
  );
};
