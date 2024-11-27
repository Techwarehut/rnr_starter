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
}

const InvoiceDetail: React.FC<InvoiceDetailProps> = ({ invoice }) => {
  const isLargeScreen = useIsLargeScreen();
  const [value, setValue] = React.useState("active");
  const [editMode, setEditMode] = React.useState(false);
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

  const handleInputChange = (field: string, value: string) => {
    setInvoiceData((prevData) => {
      if (field in prevData.bill_to) {
        // Update the billing address if the field is in billingAddress
        return {
          ...prevData,
          billingAddress: {
            ...prevData.bill_to,
            [field]: value,
          },
        };
      } else {
        // Otherwise, update the customer field directly
        return {
          ...prevData,
          [field]: value,
        };
      }
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
        <InvoiceComponent invoice={invoiceData} />
      </ScrollView>
      <Toast />
    </>
  );
};

export default InvoiceDetail;
