// ItemList.tsx
import React from "react";
import { View } from "react-native"; // Assuming you're using React Native
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { Muted } from "~/components/ui/typography";
import { getStatusClassName } from "~/lib/utils";

// Type for the item structure
interface Item {
  itemName: string;
  quantity: number;
  price: number;
}

interface ItemListProps {
  items: Item[];
  total: number;
  status: string;
}

const ItemList: React.FC<ItemListProps> = ({ items, total, status }) => {
  return (
    <View className="md:flex-1 md:mb-4">
      <Muted>Items:</Muted>
      <View className="flex-row justify-between items-center mb-4 bg-secondary p-2 rounded-md">
        <Muted>Item</Muted>
        <Muted>Qty</Muted>
        <Muted>Price</Muted>
      </View>

      {items.map((item, index) => (
        <View
          key={index}
          className="flex-row justify-between items-center bg-secondary p-2 rounded-md mb-2"
        >
          <Text>{item.itemName}</Text>
          <Text>{item.quantity}</Text>
          <Text>${item.price.toFixed(2)}</Text>
        </View>
      ))}

      <View className="flex-row mt-4 justify-end items-center bg-secondary py-2 rounded-md mb-2">
        <Button variant="link">
          <Text>Add Items</Text>
        </Button>
      </View>

      <View className="flex-row items-center justify-between">
        <Text>Total</Text>
        <Text className={`text-xl semiBold ${getStatusClassName(status)}`}>
          ${total.toFixed(2)}
        </Text>
      </View>
    </View>
  );
};

export default ItemList;
