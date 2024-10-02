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
import { Vendor } from "./types";
import AddNewVendorForm from "./AddNewCustomerForm";

interface AddNewVendorProps {
  onNewVendorAdd: (data: Vendor) => void;
}
export const AddNewVendor: React.FC<AddNewVendorProps> = ({
  onNewVendorAdd,
}) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [isOpen, setIsOpen] = useState(false);
  const animatedIndex = useSharedValue<number>(0);
  const animatedPosition = useSharedValue<number>(0);
  const snapPoints = ["80%", "90%"];
  const { isDarkColorScheme, setColorScheme } = useColorScheme();
  // Initialize with a default Customer object, including _id
  const [vendorData, setVendorData] = React.useState<Vendor>({
    _id: "", // Add the required _id property
    companyName: "",
    contactPerson: {
      name: "",
      title: "",
      email: "",
      phone: "",
    },
    address: {
      AddressLine: "",
      City: "",
      Province: "",
      zipcode: "",
    },
  });

  const AddNewVendor = () => {
    onNewVendorAdd(vendorData);
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
      <Button
        size="sm"
        variant="default"
        className="shadow shadow-foreground/5"
        onPress={handlePresentModalPress}
      >
        <Text>Add New Vendor</Text>
      </Button>

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
          <H3 className="text-center">Add New Vendor</H3>
          <AddNewVendorForm onChange={setVendorData} />
          <View className="p-4">
            <Button onPress={AddNewVendor}>
              <Text>Save</Text>
            </Button>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </>
  );
};
