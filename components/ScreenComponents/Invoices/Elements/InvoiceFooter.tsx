import { Image, View } from "react-native";
import React from "react";
import { Text } from "~/components/ui/text";
import { Large, Muted } from "~/components/ui/typography";
import { Invoice } from "../types";

const InvoiceFooter: React.FC<{ invoice: Invoice }> = ({ invoice }) => {
  // Dummy company logo URL
  const companyLogoUrl = "https://via.placeholder.com/300x200?text=Your+Logo";
  return (
    <>
      {/* Payment Terms */}
      <View className="flex p-2 gap-2 bg-secondary rounded-md">
        <View>
          <Text className="font-semibold">Payment Terms:</Text>
          <Text>{invoice.payment_terms}</Text>
        </View>

        {/* Optional Notes */}
        {invoice.notes && (
          <View>
            <Text className="font-semibold">Notes:</Text>
            <Text>{invoice.notes}</Text>
          </View>
        )}
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
