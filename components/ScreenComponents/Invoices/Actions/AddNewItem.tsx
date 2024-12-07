import React, { useCallback, useEffect, useRef, useState } from "react";
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

import { ChevronDown } from "~/lib/icons/ChevronDown";
import { useRouter } from "expo-router";
import { InvoiceItem } from "../types";
import InputField from "../../InputField";

interface AddNewInvEstProps {
  onNewItemAdd: (data: InvoiceItem) => void;
}
export const AddNewInvItem: React.FC<AddNewInvEstProps> = ({
  onNewItemAdd,
}) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [isOpen, setIsOpen] = useState(false);
  const animatedIndex = useSharedValue<number>(0);
  const animatedPosition = useSharedValue<number>(0);
  const snapPoints = ["50%", "60%"];
  const { isDarkColorScheme, setColorScheme } = useColorScheme();
  const [newItem, setNewItem] = useState<InvoiceItem>({
    _id: "", // Default value, should be unique (perhaps from a backend or generated)
    description: "",
    quantity: 1, // Default quantity, can be adjusted
    unit_price: 0, // Default unit price
    total: 0, // Total should be updated based on quantity and unit_price
  });

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

  // Update total automatically when quantity or unit_price changes
  useEffect(() => {
    setNewItem((prevItem) => ({
      ...prevItem,
      total: prevItem.quantity * prevItem.unit_price,
    }));
  }, [newItem.quantity, newItem.unit_price]); // Recalculate total when quantity or unit_price changes

  // Handle input field changes
  const handleDescriptionChange = (text: string) => {
    setNewItem((prevItem) => ({
      ...prevItem,
      description: text,
    }));
  };

  const handleQuantityChange = (text: string) => {
    const quantity = parseInt(text, 10) || 0; // Ensure it's a valid number
    setNewItem((prevItem) => ({
      ...prevItem,
      quantity,
    }));
  };

  const handleUnitPriceChange = (text: string) => {
    const unitPrice = parseFloat(text) || 0; // Ensure it's a valid number
    setNewItem((prevItem) => ({
      ...prevItem,
      unit_price: unitPrice,
    }));
  };

  return (
    <>
      <Button size="sm" variant="link" onPress={handlePresentModalPress}>
        <Text>Add Items</Text>
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
        <BottomSheetView className="flex flex-1 bg-popover gap-4 p-2">
          <InputField
            label="Item Description"
            value={newItem.description}
            onChangeText={handleDescriptionChange}
            editable={true}
            nativeID="Item Description"
          />

          <InputField
            label="Quantity"
            value={newItem.quantity.toString()}
            onChangeText={handleQuantityChange}
            editable={true}
            keyboardType="numeric"
            nativeID="Quantity"
          />

          <InputField
            label="Unit Price"
            value={newItem.unit_price.toString()}
            onChangeText={handleUnitPriceChange}
            editable={true}
            keyboardType="numeric"
            nativeID="Unit Price"
          />

          <Text>Total: {newItem.total}</Text>
          <Button
            onPress={() => {
              onNewItemAdd(newItem);
              handlePresentModalPress();
            }}
          >
            <Text>Add New</Text>
          </Button>
        </BottomSheetView>
      </BottomSheetModal>
    </>
  );
};
