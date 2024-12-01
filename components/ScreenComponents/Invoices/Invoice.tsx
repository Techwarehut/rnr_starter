import React, { useEffect } from "react";
import { View, Image } from "react-native";
import { Invoice, InvoiceItem, invStatusKeyMapping } from "./types"; // Assuming you've imported the types
import { Text } from "~/components/ui/text";
import { Large, Muted } from "~/components/ui/typography";
import { Customer, SiteLocation } from "../Customers/types";
import { fetchCustomerById, fetchCustomerSiteById } from "~/api/customerApi";
import InvoiceHeader from "./Elements/InvoiceHeader";
import InvoiceBilling from "./Elements/InvoiceBilling";
import InvoiceDetail from "./InvoiceDetail";
import InvoiceFooter from "./Elements/InvoiceFooter";
import InvoiceSummary from "./Elements/InvoiceSummary";
import InvoiceItems from "./Elements/InvoiceItems";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import InvoiceStatusActions from "./Actions/InvoiceStatusActions";

const InvoiceComponent: React.FC<{
  invoice: Invoice;
  editMode: boolean;
  handleInputChange: (
    field: keyof Invoice | keyof InvoiceItem, // field can be from Invoice or InvoiceItem
    value: string | InvoiceItem, // The value to update
    index?: number
  ) => void;
}> = ({ invoice, editMode, handleInputChange }) => {
  return (
    <>
      <View className="flex flex-row gap-2">
        <Badge
          variant={invStatusKeyMapping[invoice.status]}
          className="p-1 px-4"
        >
          <Text>{invoice.status}</Text>
        </Badge>
      </View>
      <InvoiceStatusActions invoice={invoice} />

      <View className="flex gap-8 p-4 bg-accent/20">
        {/* Company Header */}
        <InvoiceHeader invoice={invoice} />

        {/* Bill To Section */}
        <InvoiceBilling
          invoice={invoice}
          editMode={editMode}
          handleInputChange={handleInputChange}
        />

        {/* Invoice Items Table */}
        <InvoiceItems
          invoice={invoice}
          editMode={editMode}
          handleInputChange={handleInputChange}
        />

        {/* Invoice Summary */}
        <InvoiceSummary invoice={invoice} />

        <InvoiceFooter
          invoice={invoice}
          editMode={editMode}
          handleInputChange={handleInputChange}
        />
      </View>
    </>
  );
};

export default InvoiceComponent;
