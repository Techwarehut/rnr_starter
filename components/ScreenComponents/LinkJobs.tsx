import React, { useCallback, useRef, useState } from "react";
import {
  View,
  Pressable,
  StyleSheet,
  ScrollView,
  Platform,
} from "react-native";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetHandle,
  BottomSheetTrigger,
} from "~/components/ui/bottom-sheet/bottomSheet";

import { useSharedValue } from "react-native-reanimated";
import { useColorScheme } from "~/lib/useColorScheme";

import { Filter } from "~/lib/icons/Filter";

import { Text } from "~/components/ui/text";
import { H3, Large } from "~/components/ui/typography";
import { Button } from "~/components/ui/button";
import SelectJob from "./SelectJobs";
import { Job } from "./Jobs/types";
import { Plus } from "~/lib/icons/Plus";

interface LinkJobProps {
  handleJobSelect: (selectedJobs: Job[]) => void; // Callback to handle job selection
}

export const LinkJobs: React.FC<LinkJobProps> = ({ handleJobSelect }) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [isOpen, setIsOpen] = useState(false);
  const animatedIndex = useSharedValue<number>(0);
  const animatedPosition = useSharedValue<number>(0);
  const snapPoints = ["80%", "90%"];
  const { isDarkColorScheme, setColorScheme } = useColorScheme();
  const [localSelectedJobs, setLocalSelectedJobs] = useState<Job[]>([]);

  const handleSheetChanges = useCallback((index: number) => {
    // handle sheet changes
    console.log("handleSheetChanges", index);
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

  console.log("Iam gere");
  return (
    <>
      {Platform.OS !== "web" && (
        <Button variant="link" onPress={handlePresentModalPress}>
          <Plus size={18} className="text-primary" />
        </Button>
      )}

      <BottomSheetModal
        ref={Platform.OS !== "web" ? bottomSheetModalRef : null}
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
        {Platform.OS === "web" && (
          <>
            <BottomSheetTrigger>
              <Plus size={18} className="text-primary" />
            </BottomSheetTrigger>
          </>
        )}
        <BottomSheetView className="flex-1 bg-popover web:overflow-y-auto">
          {Platform.OS === "web" && (
            <BottomSheetHandle
              className="bg-gray-300 mt-2"
              animatedIndex={animatedIndex}
              animatedPosition={animatedPosition}
            />
          )}
          <View className="flex flex-row p-2 justify-between">
            <Large>Select Job(s)</Large>
            <Button
              size="sm"
              variant="default"
              className="shadow shadow-foreground/5"
              onPress={() => {
                handleJobSelect(localSelectedJobs);
                handlePresentModalPress();
              }}
            >
              <Text>Select</Text>
            </Button>
          </View>

          <SelectJob
            selectedJobs={localSelectedJobs}
            isSelectionRequired={true}
            onJobSelect={setLocalSelectedJobs}
          />
        </BottomSheetView>
      </BottomSheetModal>
    </>
  );
};
