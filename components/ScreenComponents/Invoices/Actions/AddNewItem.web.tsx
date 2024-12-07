import { View } from "react-native";
import { Button } from "~/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Text } from "~/components/ui/text";
import { ChevronDown } from "~/lib/icons/ChevronDown";

import { useRouter } from "expo-router";
import { InvoiceItem } from "../types";
import { useEffect, useState } from "react";
import InputField from "../../InputField";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popoverCore";

interface AddNewInvEstProps {
  onNewItemAdd: (data: InvoiceItem) => void;
}
export const AddNewInvItem: React.FC<AddNewInvEstProps> = ({
  onNewItemAdd,
}) => {
  const contentInsets = {
    left: 12,
    right: 12,
  };
  const [newItem, setNewItem] = useState<InvoiceItem>({
    _id: "", // Default value, should be unique (perhaps from a backend or generated)
    description: "",
    quantity: 1, // Default quantity, can be adjusted
    unit_price: 0, // Default unit price
    total: 0, // Total should be updated based on quantity and unit_price
  });

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
    <View className="flex-1 justify-center items-center">
      <Popover>
        <PopoverTrigger asChild>
          <Button size="sm" variant="link">
            <Text>Add Items</Text>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          side={"bottom"}
          insets={contentInsets}
          className="w-80 flex gap-4"
        >
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
            }}
          >
            <Text>Add New</Text>
          </Button>
        </PopoverContent>
      </Popover>
    </View>
  );
};
