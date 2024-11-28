import { Image, View } from "react-native";
import React from "react";
import { Text } from "~/components/ui/text";
import { Large, Muted } from "~/components/ui/typography";
import { Invoice } from "../types";

const InvoiceItems: React.FC<{ invoice: Invoice }> = ({ invoice }) => {
  return (
    <View className="flex gap-2">
      <View className="flex-row justify-between font-semibold border-b border-input pb-2">
        <Text className="flex-1">Description</Text>
        <Text className="w-20 text-right">Qty</Text>
        <Text className="w-28 text-right">Unit Price</Text>
        <Text className="w-28 text-right">Total</Text>
      </View>
      <Large>Services</Large>
      <View className="bg-secondary p-2 rounded-md">
        {invoice.services.map((item, index) => (
          <View
            key={index}
            className="flex-row justify-between py-2 border-b border-input"
          >
            <Text className="flex-1">{item.description}</Text>
            <Text className="w-20 text-right">{item.quantity}</Text>
            <Text className="w-28 text-right">
              ${item.unit_price.toFixed(2)}
            </Text>
            <Text className="w-28 text-right">${item.total.toFixed(2)}</Text>
          </View>
        ))}
      </View>

      <Large>Parts</Large>
      <View className="bg-secondary p-2 rounded-md">
        {invoice.parts.map((item, index) => (
          <View
            key={index}
            className="flex-row justify-between py-2 border-b border-input"
          >
            <Text className="flex-1">{item.description}</Text>
            <Text className="w-20 text-right">{item.quantity}</Text>
            <Text className="w-28 text-right">
              ${item.unit_price.toFixed(2)}
            </Text>
            <Text className="w-28 text-right">${item.total.toFixed(2)}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default InvoiceItems;
