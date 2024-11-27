import { Image, View } from "react-native";
import React from "react";
import { Text } from "~/components/ui/text";
import { Large, Muted } from "~/components/ui/typography";
import { Invoice } from "../types";

const InvoiceSummary: React.FC<{ invoice: Invoice }> = ({ invoice }) => {
  // Dummy company logo URL
  const companyLogoUrl = "https://via.placeholder.com/300x200?text=Your+Logo";
  return (
    <View className="flex gap-2">
      <View className="flex-row justify-between">
        <Text>Subtotal:</Text>
        <Text>${invoice.sub_total.toFixed(2)}</Text>
      </View>
      <View className="flex-row justify-between">
        <Text className="text-brand-primary">Discount:</Text>
        <Text className="text-brand-primary">
          -${invoice.discount.toFixed(2)}
        </Text>
      </View>
      <View className="flex-row justify-between">
        <Text>Discounted Total:</Text>
        <Text>${invoice.discounted_total.toFixed(2)}</Text>
      </View>
      <View className="flex-row justify-between">
        <Text>Tax ({(invoice.tax_rate * 100).toFixed(2)}%):</Text>
        <Text>${invoice.tax_amount.toFixed(2)}</Text>
      </View>
      <View className="flex-row justify-between font-bold">
        <Text>Total Amount Due:</Text>
        <Text>${invoice.total_amount_due.toFixed(2)}</Text>
      </View>
    </View>
  );
};

export default InvoiceSummary;
