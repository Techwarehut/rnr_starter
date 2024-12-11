import React, { useCallback, useRef, useState } from "react";
import { View, Pressable, StyleSheet, ScrollView } from "react-native";
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
import { Invoice } from "./types";
import { ChevronDown } from "~/lib/icons/ChevronDown";
import { useRouter } from "expo-router";

interface AddNewInvEstProps {
  onNewInvAdd: (data: Invoice) => void;
}
export const AddNewInvEst: React.FC<AddNewInvEstProps> = ({ onNewInvAdd }) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [isOpen, setIsOpen] = useState(false);
  const animatedIndex = useSharedValue<number>(0);
  const animatedPosition = useSharedValue<number>(0);
  const snapPoints = ["10%", "20%"];
  const { isDarkColorScheme, setColorScheme } = useColorScheme();
  const router = useRouter();

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
      <Button
        size="sm"
        className="flex flex-row gap-2 mr-1"
        onPress={handlePresentModalPress}
      >
        <Text>New</Text>
        <ChevronDown size={18} className="text-primary-foreground" />
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
        <BottomSheetView className="flex flex-1 bg-popover gap-2 ">
          <Button
            variant="ghost"
            onPress={() => {
              handlePresentModalPress();
              router.push("/sales/addnewinvoice");
            }}
          >
            <Text>Invoice</Text>
          </Button>
          <Button variant="ghost">
            <Text>Estimate</Text>
          </Button>
        </BottomSheetView>
      </BottomSheetModal>
    </>
  );
};
