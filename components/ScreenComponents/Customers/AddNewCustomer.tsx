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
import { Customer } from "./types";

interface AddNewCustomerProps {
  onNewCustAdd: (data: Customer) => void;
}
export const AddNewCustomer: React.FC<AddNewCustomerProps> = ({
  onNewCustAdd,
}) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [isOpen, setIsOpen] = useState(false);
  const animatedIndex = useSharedValue<number>(0);
  const animatedPosition = useSharedValue<number>(0);
  const snapPoints = ["80%", "90%"];
  const { isDarkColorScheme, setColorScheme } = useColorScheme();
  // Initialize with a default Customer object, including _id
  const [customerData, setCustomerData] = React.useState<Customer>({
    _id: "", // Add the required _id property
    businessName: "",
    customerName: "",
    email: "",
    phone: "",
    website: "",
    billingAddress: {
      AddressLine: "",
      City: "",
      Province: "",
      zipcode: "",
    },
    siteLocations: [],
  });

  const AddNewCust = () => {
    console.log("Adding Customer", customerData.customerName);
    onNewCustAdd(customerData);
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
        <Text>Add New Customer</Text>
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
          <H3 className="text-center">Add New Customer</H3>
          <AddNewCustomerForm onChange={setCustomerData} />
          <View className="p-4">
            <Button onPress={AddNewCust}>
              <Text>Save</Text>
            </Button>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </>
  );
};
