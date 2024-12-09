import { View } from "react-native";
import React from "react";
import { Text } from "~/components/ui/text";
import { Large } from "~/components/ui/typography";
import { Invoice, InvoiceItem } from "../types";
import InputField from "../../InputField";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import DeleteButton from "../../DeleteButton";
import { AddNewInvItem } from "../Actions/AddNewItem";

const InvoiceItems: React.FC<{
  invoice: Invoice;
  editMode: boolean;
  handleInputChange: (
    field: keyof Invoice | keyof InvoiceItem, // field can be from Invoice or InvoiceItem
    value: string | number, // The value to update
    index?: number,
    array?: "services" | "parts"
  ) => void;
  onAddItemServices: (data: InvoiceItem) => void;
  handleDeleteItemServices: (itemId: string) => void;
  onAddItemParts: (data: InvoiceItem) => void;
  handleDeleteItemParts: (itemId: string) => void;
}> = ({
  invoice,
  editMode,
  handleInputChange,
  onAddItemServices,
  handleDeleteItemServices,
  onAddItemParts,
  handleDeleteItemParts,
}) => {
  return (
    <View className="flex gap-2">
      <View className="md:flex-row justify-between font-semibold border-b border-input pb-2">
        <Text className="md:flex-1">Description</Text>
        <View className="flex-row justify-between items-center">
          <Text className="w-28 text-right">Qty</Text>
          <Text className="w-28 text-right">Unit Price</Text>
          <Text className="w-28 text-right">Total</Text>
          <View className="w-20"></View>
        </View>
      </View>

      <Large>Services</Large>
      <View className="bg-secondary p-2 rounded-md">
        {invoice.services.map((item, index) => (
          <View
            key={index}
            className="md:flex-row justify-between py-2 border-b border-input"
          >
            {/* Item Description */}
            {editMode ? (
              <View className="flex-1 m-2">
                <Input
                  value={item.description}
                  onChangeText={(value) =>
                    handleInputChange("description", value, index, "services")
                  }
                  editable={true}
                  nativeID="Item Description"
                  // Ensure it takes up the remaining space
                />
              </View>
            ) : (
              <Text className="md:flex-1 md:justify-center md:m-2">
                {item.description}
              </Text>
            )}
            <View
              key={index}
              className="flex-row justify-between  items-center"
            >
              {/* Item Quantity */}
              {editMode ? (
                <View className="flex w-28 text-right m-2 items-end ">
                  <Input
                    value={item.quantity.toString()}
                    onChangeText={(value) =>
                      handleInputChange("quantity", value, index, "services")
                    }
                    editable={true}
                    nativeID="Item Quantity"
                    keyboardType="numeric"
                    className="w-12 text-right" // Match the header width
                  />
                </View>
              ) : (
                <Text className="w-28 text-right">{item.quantity}</Text>
              )}

              {/* Item Unit Price */}
              {editMode ? (
                <View className="flex w-24 text-right m-2 items-end ">
                  <Input
                    value={item.unit_price.toFixed(2)}
                    onChangeText={(value) =>
                      handleInputChange("unit_price", value, index, "services")
                    }
                    editable={true}
                    nativeID="Item Unit Price"
                    keyboardType="numeric"
                    className="w-24 text-right" // Match the header width
                  />
                </View>
              ) : (
                <Text className="w-28 text-right">
                  ${item.unit_price.toFixed(2)}
                </Text>
              )}

              {/* Item Total */}
              {editMode ? (
                <View className="flex w-24 text-right m-2 items-end ">
                  <Input
                    value={item.total.toFixed(2)}
                    onChangeText={(value) =>
                      handleInputChange("total", value, index, "services")
                    }
                    editable={true}
                    nativeID="Item Total"
                    keyboardType="numeric"
                    className="w-24 text-right" // Match the header width
                  />
                </View>
              ) : (
                <Text className="w-28 text-right">
                  ${item.total.toFixed(2)}
                </Text>
              )}
              <DeleteButton
                xIcon={true}
                onDelete={() => handleDeleteItemServices(item._id)}
              />
            </View>
          </View>
        ))}
        <View className="flex flex-row self-end my-4">
          <AddNewInvItem onNewItemAdd={onAddItemServices} />
        </View>
      </View>

      <Large>Parts</Large>
      <View className="bg-secondary p-2 rounded-md">
        {invoice.parts.map((item, index) => (
          <View
            key={index}
            className="md:flex-row justify-between py-2 border-b border-input"
          >
            {/* Item Description */}
            {editMode ? (
              <View className="flex-1 m-2">
                <Input
                  value={item.description}
                  onChangeText={(value) =>
                    handleInputChange("description", value, index, "parts")
                  }
                  editable={true}
                  nativeID="Item Description"
                  className="flex-1" // Ensure it takes up the remaining space
                />
              </View>
            ) : (
              <Text className="md:flex-1 md:justify-center md:m-2">
                {item.description}
              </Text>
            )}
            <View key={index} className="flex-row justify-between items-center">
              {/* Item Quantity */}
              {editMode ? (
                <View className="flex w-28 text-right m-2 items-end ">
                  <Input
                    value={item.quantity.toString()}
                    onChangeText={(value) =>
                      handleInputChange("quantity", value, index, "parts")
                    }
                    editable={true}
                    nativeID="Item Quantity"
                    keyboardType="numeric"
                    className="w-12 text-right" // Match the header width
                  />
                </View>
              ) : (
                <Text className="w-28 text-right">{item.quantity}</Text>
              )}

              {/* Item Unit Price */}
              {editMode ? (
                <View className="flex w-24 text-right m-2 items-end ">
                  <Input
                    value={item.unit_price.toFixed(2)}
                    onChangeText={(value) =>
                      handleInputChange("unit_price", value, index, "parts")
                    }
                    editable={true}
                    nativeID="Item Unit Price"
                    keyboardType="numeric"
                    className="w-24 text-right" // Match the header width
                  />
                </View>
              ) : (
                <Text className="w-28 text-right">
                  ${item.unit_price.toFixed(2)}
                </Text>
              )}

              {/* Item Total */}
              {editMode ? (
                <View className="flex w-24 text-right m-2 items-end ">
                  <Input
                    value={item.total.toFixed(2)}
                    onChangeText={(value) =>
                      handleInputChange("total", value, index, "parts")
                    }
                    editable={true}
                    nativeID="Item Total"
                    keyboardType="numeric"
                    className="w-24 text-right" // Match the header width
                  />
                </View>
              ) : (
                <Text className="w-28 text-right">
                  ${item.total.toFixed(2)}
                </Text>
              )}
              <DeleteButton
                xIcon={true}
                onDelete={() => handleDeleteItemParts(item._id)}
              />
            </View>
          </View>
        ))}
        <View className="flex flex-row self-end my-4">
          <AddNewInvItem onNewItemAdd={onAddItemParts} />
        </View>
      </View>
    </View>
  );
};

export default InvoiceItems;
