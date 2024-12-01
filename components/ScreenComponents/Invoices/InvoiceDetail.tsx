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
  addItemToInvoice,
  deleteInvoice,
  deleteItemFromInvoice,
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

  const onAddItem = async (data: InvoiceItem) => {
    try {
      await addItemToInvoice(invoiceData.invoice_number, data);

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

  const handleDeleteItem = async (itemId: string) => {
    try {
      await deleteItemFromInvoice(invoiceData.invoice_number, itemId); // Call your API to delete the site
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
    field: keyof Invoice | keyof InvoiceItem, // field can be from Invoice or InvoiceItem
    value: string | InvoiceItem, // The value to update
    index?: number // Optional index if we're updating a specific InvoiceItem in services or parts
  ) => {
    setInvoiceData((prevData) => {
      // Handle case for updating an InvoiceItem in 'services' or 'parts'
      if (field === "services" || field === "parts") {
        const items = prevData[field as "services" | "parts"]; // Access either services or parts

        // Ensure value is of type InvoiceItem before spreading
        if (typeof value === "object" && value !== null) {
          const updatedItems = items.map((item, idx) => {
            if (idx === index) {
              // If index matches, update the specific InvoiceItem
              return { ...item, ...value }; // Merge the changes into the item
            }
            return item;
          });

          return {
            ...prevData,
            [field]: updatedItems, // Update the respective field (services or parts)
          };
        }

        // If value is not an object (unexpected case), return prevData unchanged
        return prevData;
      }

      // For other fields in the Invoice, update them directly
      return {
        ...prevData,
        [field]: value, // Update the field directly in the invoice
      };
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
        />
      </ScrollView>
      <Toast />
    </>
  );
};

export default InvoiceDetail;
