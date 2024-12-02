import { Image, View } from "react-native";
import React from "react";
import { Text } from "~/components/ui/text";
import { Large, Muted } from "~/components/ui/typography";
import { Invoice, InvoiceItem } from "../types";
import InputField from "../../InputField";
import TextField from "../../TextField";

const InvoiceFooter: React.FC<{
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

  return (
    <>
      {/* Payment Terms */}
      <View className="flex p-2 gap-2 bg-secondary rounded-md">
        {editMode ? (
          <TextField
            label="Payment Terms"
            value={invoice.payment_terms}
            onChangeText={(value) => handleInputChange("payment_terms", value)}
            editable={true}
            nativeID="Job Description"
          />
        ) : (
          <View>
            <Text className="font-semibold">Payment Terms:</Text>
            <Text>{invoice.payment_terms}</Text>
          </View>
        )}

        {/* Optional Notes */}
        {invoice.notes &&
          (editMode ? (
            <TextField
              label="Notes"
              value={invoice.notes}
              onChangeText={(value) => handleInputChange("notes", value)} // Ensure you're updating notes
              editable={true}
              nativeID="Notes"
            />
          ) : (
            <View>
              <Text className="font-semibold">Notes:</Text>
              <Text>{invoice.notes}</Text>
            </View>
          ))}
      </View>

      {/* Footer */}
      <View className="mt-4 border-t border-input pt-4">
        <Text className="text-center text-sm">
          Thank you for your business!
        </Text>
      </View>
    </>
  );
};

export default InvoiceFooter;
