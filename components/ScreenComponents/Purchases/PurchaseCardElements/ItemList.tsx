import React, { useState } from "react";
import { View, TextInput } from "react-native"; // Assuming you're using React Native
import { addItemToOrder, deleteItemFromOrder } from "~/api/purchasesApi";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { Muted } from "~/components/ui/typography";
import { getStatusClassName } from "~/lib/utils";
import { PurchaseOrder, PurchaseOrderItem } from "../types";
import DeleteButton from "../../DeleteButton";
import { Plus } from "~/lib/icons/Plus";
import { Input } from "~/components/ui/input";

interface ItemListProps {
  PurchaseOrder: PurchaseOrder;
}

const ItemList: React.FC<ItemListProps> = ({ PurchaseOrder }) => {
  const [refreshKey, setRefreshKey] = useState(0);
  const [items, setItems] = useState<PurchaseOrderItem[]>(PurchaseOrder.items);
  const [newItem, setNewItem] = useState<PurchaseOrderItem>({
    itemName: "",
    quantity: 1,
    price: 0,
    itemId: "", // Empty initially; ID will be generated on add
  });

  // Handler for input changes
  const handleInputChange = (field: keyof PurchaseOrderItem, value: string) => {
    setNewItem((prevItem) => {
      // Handle number fields
      if (field === "quantity" || field === "price") {
        return { ...prevItem, [field]: parseFloat(value) || 0 };
      }
      return { ...prevItem, [field]: value };
    });
  };

  // Add item to order
  const handleAddItem = async () => {
    console.log(newItem);
    if (!newItem.itemName || newItem.price <= 0) {
      console.error("Please fill in the item details.");
      return;
    }

    try {
      const updatedOrder = await addItemToOrder(
        PurchaseOrder.purchaseOrderNumber,
        newItem
      );
      if (updatedOrder) {
        setItems(updatedOrder.items);
        setNewItem({ itemName: "", quantity: 1, price: 0, itemId: "" });
        setRefreshKey((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Error", "Failed to add item.");
    }
  };

  // Delete item from order
  const handleDeleteItem = async (itemId: string) => {
    try {
      const updatedOrder = await deleteItemFromOrder(
        PurchaseOrder.purchaseOrderNumber,
        itemId
      );
      if (updatedOrder) {
        setItems(updatedOrder.items);
        setRefreshKey((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Error", "Failed to delete item.");
    }
  };

  return (
    <View className="md:flex-1 md:mb-4">
      <Muted>Items:</Muted>
      <View className="flex-row justify-between items-center mb-4 bg-secondary p-2 rounded-md">
        <Muted>Item</Muted>
        <Muted>Qty</Muted>
        <Muted>Price</Muted>
        <Muted>Action</Muted>
      </View>

      {items.map((item) => (
        <View
          key={item.itemId}
          className="flex-row justify-between items-center bg-secondary p-2 rounded-md mb-2"
        >
          <Text>{item.itemName}</Text>
          <Text>{item.quantity}</Text>
          <Text>${item.price.toFixed(2)}</Text>
          <DeleteButton
            xIcon={true}
            onDelete={() => handleDeleteItem(item.itemId)}
          />
        </View>
      ))}

      <View className="flex-row justify-between items-center bg-secondary p-2 rounded-md mb-2">
        {/* Item Name Input */}
        <Input
          placeholder="Item"
          value={newItem.itemName}
          onChangeText={(text) => handleInputChange("itemName", text)}
          style={{ borderWidth: 1, flex: 1, marginRight: 8, padding: 8 }}
        />
        {/* Quantity Input */}
        <Input
          placeholder="Qty"
          // value={String(newItem.quantity)}
          onChangeText={(text) => handleInputChange("quantity", text)}
          keyboardType="numeric"
          style={{ borderWidth: 1, flex: 1, marginRight: 8, padding: 8 }}
        />
        {/* Price Input */}
        <Input
          placeholder="Price"
          //value={"String(newItem.price)"}
          onChangeText={(text) => handleInputChange("price", text)}
          keyboardType="numeric"
          style={{ borderWidth: 1, flex: 1, marginRight: 8, padding: 8 }}
        />
        <Button variant="link" onPress={handleAddItem}>
          <Plus size={18} className="text-primary" />
        </Button>
      </View>

      <View className="flex-row items-center justify-between">
        <Text>Total</Text>
        <Text
          className={`text-xl semiBold ${getStatusClassName(
            PurchaseOrder.status
          )}`}
        >
          ${PurchaseOrder.total.toFixed(2)}
        </Text>
      </View>
    </View>
  );
};

export default ItemList;
