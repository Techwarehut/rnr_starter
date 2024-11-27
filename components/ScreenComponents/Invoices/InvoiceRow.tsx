import React, { useState } from "react";
import { Alert, Pressable, View } from "react-native";
import { TableCell, TableRow } from "~/components/ui/table"; // Your TableCell component
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { Pencil } from "~/lib/icons/Pencil";
import { Trash2 } from "~/lib/icons/Trash2";
import { Muted } from "~/components/ui/typography"; // Assuming you have a Muted component
import { cn, formatCurrency, useIsLargeScreen } from "~/lib/utils";
import { Invoice, invStatusKeyMapping } from "./types";
import { Badge } from "~/components/ui/badge";
import { getLocales, getCalendars } from "expo-localization";

interface InvoiceRowProps {
  item: Invoice;
  index: number;
  onEdit: (item: Invoice) => void;
  onDelete: (item: Invoice) => void;
  onPress: (item: Invoice) => void;
}

const InvoiceRow: React.FC<InvoiceRowProps> = ({
  item,
  index,
  onEdit,
  onDelete,
  onPress,
}) => {
  // Fetch the device's current locale
  const locales = getLocales();

  const userLocale = locales.length > 0 ? locales[0].languageTag : "en-US";

  // Extract currency code from the locale
  const currencyCode = locales?.[0]?.currencyCode ?? "USD"; // Default to 'USD' if no currency code

  // Format the amount based on the user's locale and currency
  const formattedAmount = formatCurrency(
    item.total_amount_due,
    currencyCode,
    userLocale
  );

  return (
    <TableRow
      className={cn("active:bg-secondary", index % 2 && "bg-muted/40 ")}
      onPress={() => onPress(item)}
    >
      <TableCell className="flex-1 flex-row items-center justify-between">
        <View>
          <Muted>{item.invoice_number}</Muted>
          <Text>{item.bill_to.business_name}</Text>
        </View>
        <View className="flex items-center justify-center gap-2">
          <Badge
            variant={invStatusKeyMapping[item.status]}
            className="p-1 px-4"
          >
            <Text>{item.status}</Text>
          </Badge>
          <Text>{formattedAmount}</Text>
        </View>
      </TableCell>
    </TableRow>
  );
};

export default InvoiceRow;
