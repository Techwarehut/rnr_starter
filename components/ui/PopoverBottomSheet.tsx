// Popover.tsx (for BottomSheet - Mobile)

import React, { useCallback, useMemo, useRef, useState } from "react";
import { View, Pressable, Platform } from "react-native";
import { Text } from "~/components/ui/text";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetHandle,
} from "~/components/ui/bottom-sheet/bottomSheet";
import { EllipsisVertical } from "~/lib/icons/EllipsisVertical";
import { tabVariants } from "~/components/navigation/TabVariants";
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";

interface PopoverProps {
  triggerContent: React.ReactNode;
  screenContent: React.ReactNode[];
  isFocused: boolean;
  isLargeScreen: boolean;
  isSpecialRoute: boolean;
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
  isFocused,
  isLargeScreen,
  isSpecialRoute,
}) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [isOpen, setIsOpen] = useState(false);
  const animatedIndex = useSharedValue<number>(0);
  const animatedPosition = useSharedValue<number>(0);

  const snapPoints = useMemo(() => [300, "40%", "50%"], []);
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
            className="bg-green-300 mt-2"
            animatedIndex={animatedIndex}
            animatedPosition={animatedPosition}
          />
        )}
      >
        <BottomSheetView className="flex-1 bg-background">
          {screenContent}
        </BottomSheetView>
      </BottomSheetModal>
    </>
  );
};

export default Popover;
