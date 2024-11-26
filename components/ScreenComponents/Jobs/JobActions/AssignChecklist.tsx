import React, { useCallback, useEffect, useRef, useState } from "react";
import { View, Pressable, StyleSheet } from "react-native";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetHandle,
} from "~/components/ui/bottom-sheet/bottomSheet";
import { Button } from "~/components/ui/button";
import { Plus } from "~/lib/icons/Plus";
import { useSharedValue } from "react-native-reanimated";
import { useColorScheme } from "~/lib/useColorScheme";

import { H1, H3, Muted } from "~/components/ui/typography";

import { User } from "../../Team/types";
import UserTable from "../../Team/UserTable";
import { getAllUsers } from "~/api/UsersApi";
import { fetchChecklists } from "~/api/checklistApi";
import { Checklist } from "../../Checklist/types";
import { Text } from "~/components/ui/text";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Label } from "~/components/ui/label";
import { addChecklistToJob } from "~/api/jobsApi";

interface AssignJobProps {
  jobId: string;
  handleAddChecklist: (checklistId: string) => void;
}

export const AssignChecklist: React.FC<AssignJobProps> = ({
  jobId,
  handleAddChecklist,
}) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [isOpen, setIsOpen] = useState(false);
  const animatedIndex = useSharedValue<number>(0);
  const animatedPosition = useSharedValue<number>(0);
  const snapPoints = ["50%", "80%"];
  const { isDarkColorScheme, setColorScheme } = useColorScheme();
  const [checklists, setChecklists] = useState<Checklist[]>([]);
  const [selChecklist, setSelChecklist] = useState<string>("");
  const [value, setValue] = React.useState("");

  // Fetch all users when the component mounts
  useEffect(() => {
    const fetchChecklist = async () => {
      try {
        const checklists = await fetchChecklists(); // Call the function to fetch users

        setChecklists(checklists); // Set the fetched users to state
      } catch (error) {
        console.error("Error fetching Checklists:", error);
      }
    };

    fetchChecklist(); // Invoke the fetch function
  }, []); // Empty dependency array to run only on mount

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

  function RadioGroupItemWithLabel({
    value,
    onLabelPress,
  }: {
    value: string;
    onLabelPress: (value: string) => void;
  }) {
    return (
      <View className="flex-row gap-2 items-center">
        <RadioGroupItem
          aria-labelledby={`label-for-${value}`}
          value={value}
          onPress={() => onLabelPress(value)}
        />
        <Label
          nativeID={`label-for-${value}`}
          onPress={() => onLabelPress(value)}
        >
          {value}
        </Label>
      </View>
    );
  }

  return (
    <>
      <Button onPress={handlePresentModalPress} variant="default">
        <Plus className="text-primary-foreground" size={18} />
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
        <BottomSheetScrollView contentContainerClassName=" flex flex-1 bg-popover gap-8 p-4">
          <View>
            <Text className="text-xl">Select a Checklist</Text>
            <Muted>Templates are created and maintained by Admin.</Muted>
          </View>
          <RadioGroup
            value={value}
            onValueChange={setSelChecklist}
            className="gap-3"
          >
            {checklists.map((checklist) => (
              <RadioGroupItemWithLabel
                key={checklist.checklist_id}
                value={checklist.checklist_name}
                onLabelPress={() => {
                  setSelChecklist(checklist.checklist_id);
                  setValue(checklist.checklist_name);
                }}
              />
            ))}
          </RadioGroup>

          <Button
            onPress={() => {
              handleAddChecklist(selChecklist);
              handlePresentModalPress();
            }}
          >
            <Text>Add</Text>
          </Button>
        </BottomSheetScrollView>
      </BottomSheetModal>
    </>
  );
};
