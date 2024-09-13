// Popover.tsx (for BottomSheet - Mobile)

import React, { useCallback, useMemo, useRef, useState } from "react";
import { View, Pressable, Platform } from "react-native";

import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetHandle,
} from "~/components/ui/bottom-sheet/bottomSheet";

import { useSharedValue } from "react-native-reanimated";

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
}

export const Popover: React.FC<PopoverProps> = ({
  triggerContent,
  screenContent,
  snapPoints: propSnapPoints, // destructure the snapPoints from props
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

  return (
    <>
      <Pressable onPress={handlePresentModalPress}>{triggerContent}</Pressable>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        handleComponent={() => (
          <BottomSheetHandle
            className="bg-popover"
            indicatorStyle={{ backgroundColor: "#658b38" }} // Customize the dash color
            animatedIndex={animatedIndex}
            animatedPosition={animatedPosition}
          />
        )}
      >
        <BottomSheetView className="flex-1 bg-popover">
          {screenContent}
        </BottomSheetView>
      </BottomSheetModal>
    </>
  );
};

export default Popover;
