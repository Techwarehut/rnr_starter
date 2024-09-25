// Popover.tsx (for BottomSheet - Mobile)

import React, { useCallback, useMemo, useRef, useState } from "react";
import { View, Pressable, Platform } from "react-native";

import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetHandle,
} from "~/components/ui/bottom-sheet/bottomSheet";

import { useSharedValue } from "react-native-reanimated";
import { cn } from "~/lib/utils";
import { useColorScheme } from "~/lib/useColorScheme";

interface PopoverProps {
  triggerContent: React.ReactNode;
  screenContent: React.ReactNode[];
  snapPoints?: (string | number)[]; // Accept snapPoints as a prop
  contentInsets?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
  popoverKey: string | number; // Add key prop
}

export const Popover: React.FC<PopoverProps> = ({
  triggerContent,
  screenContent,
  snapPoints: propSnapPoints, // destructure the snapPoints from props
  popoverKey, // Add key prop
}) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [isOpen, setIsOpen] = useState(false);
  const animatedIndex = useSharedValue<number>(0);
  const animatedPosition = useSharedValue<number>(0);

  // Use prop snapPoints if provided, otherwise default snap points
  const snapPoints = useMemo(
    () => propSnapPoints || [300, "40%", "50%"],
    [propSnapPoints]
  );
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

  const { isDarkColorScheme, setColorScheme } = useColorScheme();

  return (
    <>
      <Pressable
        key={`${popoverKey}-trigger`}
        onPress={handlePresentModalPress}
      >
        {triggerContent}
      </Pressable>

      <BottomSheetModal
        key={`${popoverKey}-content`}
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
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
        <BottomSheetView className="flex-1 bg-popover">
          {screenContent.map((content, index) => (
            <View key={`${popoverKey}-content-${index}`}>{content}</View>
          ))}
        </BottomSheetView>
      </BottomSheetModal>
    </>
  );
};

export default Popover;
