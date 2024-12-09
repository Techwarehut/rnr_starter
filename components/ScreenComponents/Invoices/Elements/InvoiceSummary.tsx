import { Image, View } from "react-native";
import React from "react";
import { Text } from "~/components/ui/text";
import { Large, Muted } from "~/components/ui/typography";
import { Invoice, InvoiceItem } from "../types";
import { Input } from "~/components/ui/input";

const InvoiceSummary: React.FC<{
  invoice: Invoice;
  editMode: boolean;
  handleInputChange: (
    field: keyof Invoice | keyof InvoiceItem, // field can be from Invoice or InvoiceItem
    value: string | number, // The value to update
    index?: number,
    array?: "services" | "parts"
  ) => void;
}> = ({ invoice, editMode, handleInputChange }) => {
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
        {editMode ? (
          <View className="flex flex-row">
            <Input
              value={invoice.discount.toFixed(2)}
              onChangeText={(value) => {
                handleInputChange("discount", value);
              }}
              editable={true}
              nativeID="Discount"
              keyboardType="decimal-pad"
              // Ensure it takes up the remaining space
            />
          </View>
        ) : (
          <Text className="text-brand-primary">
            -$
            {(typeof invoice.discount === "number" && !isNaN(invoice.discount)
              ? invoice.discount
              : 0
            ).toFixed(2)}
          </Text>
        )}
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
