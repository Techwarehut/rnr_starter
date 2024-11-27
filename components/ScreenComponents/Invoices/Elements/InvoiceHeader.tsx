import { Image, View } from "react-native";
import React from "react";
import { Text } from "~/components/ui/text";
import { Large, Muted } from "~/components/ui/typography";
import { Invoice } from "../types";

const InvoiceHeader: React.FC<{ invoice: Invoice }> = ({ invoice }) => {
  // Dummy company logo URL
  const companyLogoUrl = "https://via.placeholder.com/300x200?text=Your+Logo";
  return (
    <View className="flex-row bg-secondary p-2 rounded-md items-center justify-between">
      <View className="flex flex-row gap-2 items-center">
        <Image
          source={{ uri: companyLogoUrl }}
          style={{ width: 50, height: 50 }}
        />
        <View className="ml-4">
          <Text className="text-lg font-bold">Company Name</Text>
          <Muted>123 Business St.</Muted>
          <Muted>City, Country</Muted>
        </View>
      </View>
      <View className="text-right">
        <Text className="font-bold">Due</Text>
        <Large className="text-primary">
          ${invoice.total_amount_due.toFixed(2)}
        </Large>
      </View>
    </View>
  );
};

export default InvoiceHeader;
