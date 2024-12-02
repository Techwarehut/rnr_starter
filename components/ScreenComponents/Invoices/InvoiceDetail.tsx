import React, { useEffect } from "react";
import { Platform, View } from "react-native";
import { Button } from "~/components/ui/button";
import { H1, H2, H3, H4, Large, Muted } from "~/components/ui/typography";

import { formatPhoneNumber, useIsLargeScreen } from "~/lib/utils";
import { Text } from "~/components/ui/text";

import { ScrollView } from "react-native-gesture-handler";
import ActionButtons from "../ActionButtons";
import { router, Stack } from "expo-router";

import { useToast } from "../ToastMessage";
import Toast from "react-native-toast-message";
import InputField from "../InputField";

import toastConfig from "../CustomToast";
import {
  addSiteLocation,
  deleteCustomer,
  deleteSiteLocation,
  editCustomer,
  fetchCustomerById,
  fetchCustomers,
} from "~/api/customerApi";
import { Invoice, InvoiceItem } from "./types";
import {
  addItemToInvoiceParts,
  addItemToInvoiceServices,
  deleteInvoice,
  deleteItemFromInvoiceParts,
  deleteItemFromInvoiceServices,
  editInvoice,
  fetchInvoiceById,
} from "~/api/invoicesApi";
import InvoiceComponent from "./Invoice";

interface InvoiceDetailProps {
  invoice: Invoice;
  edit?: boolean;
}

const InvoiceDetail: React.FC<InvoiceDetailProps> = ({
  invoice,
  edit = false,
}) => {
  const isLargeScreen = useIsLargeScreen();
  const [value, setValue] = React.useState("active");
  const [editMode, setEditMode] = React.useState(edit);
  const [invoiceData, setInvoiceData] = React.useState<Invoice>(invoice);
  const { showSuccessToast, showErrorToast } = useToast();

  // Optional: Update state when prop changes
  useEffect(() => {
    setInvoiceData(invoice);
  }, [invoice]);

  const handleEditInvoice = async () => {
    try {
      setEditMode(false);
      const returnedInvoice = await editInvoice(invoiceData);

      setInvoiceData(returnedInvoice);

      showSuccessToast("Invoice updated successfully!");
    } catch (error) {
      showErrorToast("Error updating invoice!");
    }
  };

  const handleDeleteInvoice = async () => {
    try {
      await deleteInvoice(invoiceData.invoice_number);

      showSuccessToast("Invoice deleted successfully!");
      router.replace("/(tabs)/sales");
    } catch (error) {
      showErrorToast("Error deleting invoice!");
    }
  };

  const onAddItemServices = async (data: InvoiceItem) => {
    try {
      await addItemToInvoiceServices(invoiceData.invoice_number, data);

      // Fetch the specific customer by ID after adding the site
      const updatedInvoice = await fetchInvoiceById(invoiceData.invoice_number);
      if (updatedInvoice) {
        setInvoiceData(updatedInvoice); // Update customer state with the fetched data
      }

      showSuccessToast("Item added successfully!");
    } catch (error) {
      console.error("Error adding Item:", error);
      showErrorToast("Failed to add Item. Please try again.");
    }
  };

  const handleDeleteItemServices = async (itemId: string) => {
    try {
      await deleteItemFromInvoiceServices(invoiceData.invoice_number, itemId); // Call your API to delete the site
      // Fetch the specific customer by ID after adding the site
      const updatedInvoice = await fetchInvoiceById(invoiceData.invoice_number);
      if (updatedInvoice) {
        setInvoiceData(updatedInvoice); // Update customer state with the fetched data
      }
      showSuccessToast("Item deleted successfully!");
    } catch (error) {
      console.error("Error deleting Item:", error);
      showErrorToast("Failed to delete Item. Please try again.");
    }
  };

  const onAddItemParts = async (data: InvoiceItem) => {
    try {
      await addItemToInvoiceParts(invoiceData.invoice_number, data);

      // Fetch the specific customer by ID after adding the site
      const updatedInvoice = await fetchInvoiceById(invoiceData.invoice_number);
      if (updatedInvoice) {
        setInvoiceData(updatedInvoice); // Update customer state with the fetched data
      }

      showSuccessToast("Item added successfully!");
    } catch (error) {
      console.error("Error adding Item:", error);
      showErrorToast("Failed to add Item. Please try again.");
    }
  };

  const handleDeleteItemParts = async (itemId: string) => {
    try {
      await deleteItemFromInvoiceParts(invoiceData.invoice_number, itemId); // Call your API to delete the site
      // Fetch the specific customer by ID after adding the site
      const updatedInvoice = await fetchInvoiceById(invoiceData.invoice_number);
      if (updatedInvoice) {
        setInvoiceData(updatedInvoice); // Update customer state with the fetched data
      }
      showSuccessToast("Item deleted successfully!");
    } catch (error) {
      console.error("Error deleting Item:", error);
      showErrorToast("Failed to delete Item. Please try again.");
    }
  };

  const handleInputChange = (
    field: keyof Invoice | keyof InvoiceItem, // Can be from Invoice or InvoiceItem
    value: string | number, // The value to update (can be string or number)
    index?: number, // Optional index, used for updating individual items in services/parts
    array?: "services" | "parts" // Optional array, used when updating an item in services/parts
  ) => {
    setInvoiceData((prevData) => {
      // Case 1: Updating a property on the Invoice object (e.g., invoice_number, notes)
      if (!array) {
        return {
          ...prevData,
          [field]: value, // Update the field directly on the Invoice object
        };
      }

      // Case 2: Updating an item inside the services or parts array
      if (array && prevData[array]) {
        const items = prevData[array];

        // Ensure value is valid based on the field type (e.g., number for quantity, string for description)
        if (
          (field === "quantity" ||
            field === "unit_price" ||
            field === "total") &&
          typeof value === "string"
        ) {
          value = parseFloat(value);
        }

        // Update the specific item at the provided index
        const updatedItems = items.map((item, idx) => {
          if (idx === index) {
            const updatedItem = { ...item, [field]: value };

            // Recalculate total if quantity or unit_price changes
            if (field === "quantity" || field === "unit_price") {
              updatedItem.total = updatedItem.quantity * updatedItem.unit_price; // Recalculate total
            }

            return updatedItem;
          }
          return item;
        });

        // Now, we need to recalculate the totals at the Invoice level:
        const newSubTotal = [...prevData.services, ...prevData.parts].reduce(
          (sum, item) => sum + item.total,
          0
        );

        // Calculate other fields based on the new sub_total
        const discountedTotal = newSubTotal - prevData.discount;
        const taxAmount = discountedTotal * prevData.tax_rate;
        const totalAmountDue = discountedTotal + taxAmount;

        return {
          ...prevData,
          [array]: updatedItems, // Update the services/parts array
          sub_total: newSubTotal, // Update the sub_total
          discounted_total: discountedTotal, // Update discounted_total
          tax_amount: taxAmount, // Update tax_amount
          total_amount_due: totalAmountDue, // Update total_amount_due
        };
      }

      // If we reach here, it means the field is not recognized for updating
      return prevData;
    });
  };

  return (
    <>
      {!isLargeScreen && (
        <Stack.Screen
          // Replace with your actual component
          options={{
            headerTitleAlign: "left",
            headerRight: () => (
              <ActionButtons
                onEdit={() => setEditMode(true)}
                onDelete={handleDeleteInvoice}
                onSave={handleEditInvoice}
                editMode={editMode}
              />
            ),
            headerTitle: () => (
              <View>
                <Text>{invoiceData.invoice_number}</Text>
              </View>
            ),
          }}
        />
      )}

      <ScrollView
        showsVerticalScrollIndicator={isLargeScreen}
        className="flex-1 w-full gap-10 p-2"
      >
        {/* Header with Edit and Delete buttton */}
        {isLargeScreen && (
          <View className="w-full flex-row gap-1 items-center justify-between gap-2 mb-4">
            <View>
              <H3>{invoiceData.bill_to.business_name}</H3>
              <Text>{invoiceData.invoice_number}</Text>
            </View>
            <ActionButtons
              onEdit={() => setEditMode(true)}
              onDelete={handleDeleteInvoice}
              onSave={handleEditInvoice}
              editMode={editMode}
            />
          </View>
        )}
        <InvoiceComponent
          invoice={invoiceData}
          editMode={editMode}
          handleInputChange={handleInputChange}
          onAddItemServices={onAddItemServices}
          handleDeleteItemServices={handleDeleteItemServices}
          onAddItemParts={onAddItemParts}
          handleDeleteItemParts={handleDeleteItemParts}
        />
      </ScrollView>
      <Toast />
    </>
  );
};

export default InvoiceDetail;
