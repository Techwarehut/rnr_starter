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
import { AssignCustomer } from "./Actions/AssignCustomer";
import DeleteButton from "../DeleteButton";
import { UpdateInvoiceCustomer } from "~/api/invoicesApi";

const InvoiceComponent: React.FC<{
  invoice: Invoice;
  editMode: boolean;
  handleInputChange: (
    field: keyof Invoice | keyof InvoiceItem, // field can be from Invoice or InvoiceItem
    value: string | number | { customer_id: string; business_name: string }, // The value to update
    index?: number,
    array?: "services" | "parts"
  ) => void;

  onAddItemServices: (data: InvoiceItem) => void;
  handleDeleteItemServices: (itemId: string) => void;
  onAddItemParts: (data: InvoiceItem) => void;
  handleDeleteItemParts: (itemId: string) => void;
  handleDeleteCustomer: () => void;
  handleAddCustomer: (customer: Customer) => void;
}> = ({
  invoice,
  editMode,
  handleInputChange,
  onAddItemServices,
  handleDeleteItemServices,
  onAddItemParts,
  handleDeleteItemParts,
  handleDeleteCustomer,
  handleAddCustomer,
}) => {
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
      <View className="flex md:flex-row md:flex-wrap gap-2 m-2">
        <View className="flex md:flex-1">
          <Text>Customer</Text>
          <View className="flex flex-row justify-between items-center bg-secondary p-2 rounded-md">
            {invoice.bill_to.customer_id === "" ? (
              <>
                <Text>No Customer Selected</Text>
                <AssignCustomer onCustomerAssigned={handleAddCustomer} />
              </>
            ) : (
              <>
                <Text>{invoice.bill_to.business_name}</Text>
                <DeleteButton xIcon={true} onDelete={handleDeleteCustomer} />
              </>
            )}
          </View>
        </View>
        <View className="flex md:flex-1">
          <Text>Linked Jobs</Text>
          <View className="flex flex-row justify-between items-center bg-secondary p-2 rounded-md">
            <Text>No Jobs Selected</Text>
          </View>
        </View>
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
          onAddItemServices={onAddItemServices}
          handleDeleteItemServices={handleDeleteItemServices}
          onAddItemParts={onAddItemParts}
          handleDeleteItemParts={handleDeleteItemParts}
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
