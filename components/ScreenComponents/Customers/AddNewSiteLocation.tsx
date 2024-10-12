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
import AddNewCustomerForm from "./AddNewCustomerForm";
import { H1, H3 } from "~/components/ui/typography";
import { Customer, SiteLocation } from "./types";
import AddNewSiteForm from "./AddNewSiteForm";

interface AddNewSiteProps {
  onAddNewSite: (data: SiteLocation) => void;
}

export const AddNewSiteLocation: React.FC<AddNewSiteProps> = ({
  onAddNewSite,
}) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [isOpen, setIsOpen] = useState(false);
  const animatedIndex = useSharedValue<number>(0);
  const animatedPosition = useSharedValue<number>(0);
  const snapPoints = ["60%", "70%"];
  const { isDarkColorScheme, setColorScheme } = useColorScheme();
  const [newSiteLocation, setNewSiteLocation] = React.useState<SiteLocation>({
    site_id: "",
    siteName: "",
    siteContactPerson: "",
    siteContactPhone: "",
    AddressLine: "",
    City: "",
    Province: "",
    zipcode: "",
  });

  // State for new site location data
  // Initialize with a default Customer object, including _id

  const AddNewSite = () => {
    if (onAddNewSite) onAddNewSite(newSiteLocation);
    handlePresentModalPress();
  };

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
      <View className="flex items-end">
        <Button onPress={handlePresentModalPress}>
          <Text>Add New</Text>
        </Button>
      </View>

      <BottomSheetModal
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
        <BottomSheetView className="flex-1 bg-popover mb-8">
          <H3 className="text-center">Add New Site</H3>

          <AddNewSiteForm onChange={setNewSiteLocation} />
          <View className="p-4">
            <Button onPress={AddNewSite}>
              <Text>Save</Text>
            </Button>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </>
  );
};
