import { Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";
import Toast from "react-native-toast-message";
import { addInvoice, fetchInvoices } from "~/api/invoicesApi";
import { AddNewInvEst } from "~/components/ScreenComponents/Invoices/AddNewInvEst";
import InvoiceDetail from "~/components/ScreenComponents/Invoices/InvoiceDetail";
import InvoiceTable from "~/components/ScreenComponents/Invoices/InvoiceTable";
import { Invoice } from "~/components/ScreenComponents/Invoices/types";
import NothingSelected from "~/components/ScreenComponents/NothingSelected";
import { useToast } from "~/components/ScreenComponents/ToastMessage";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Text } from "~/components/ui/text";
import { useIsLargeScreen } from "~/lib/utils";

export default function Sales() {
  const [selInv, setSelInv] = useState<Invoice | null>(null);
  const { showSuccessToast, showErrorToast } = useToast();
  const [searchText, setSearchText] = useState("");
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [value, setValue] = useState("invoices");

  const loadInvoices = async () => {
    try {
      const data = await fetchInvoices(); // Call the API
      setInvoices(data);
    } catch (error) {
      showErrorToast("Failed to fetch invoices!");
    }
  };

  const handleAddInvoice = async (newInvoice: Invoice) => {
    try {
      const addedInvoice = await addInvoice(newInvoice);
      setSelInv(addedInvoice);
      // Update state if needed
      showSuccessToast("Invoice Added successfully!");
    } catch (error) {
      showErrorToast("Error Adding invoice!");
    }
  };

  const router = useRouter();
  const showInvoiceDetails = (invoice: Invoice) => {
    // Logic for adding a new customer

    setSelInv(invoice);
    if (!isLargeScreen) {
      router.push({
        pathname: "/sales/[invoiceId]",
        params: {
          invoiceId: invoice.invoice_number,
        }, // Pass the customer object
      });
    }
  };

  useEffect(() => {
    loadInvoices(); // Fetch invoices on mount
  }, []);

  const handleSearch = (searchText: string) => {
    setSearchText(searchText); // Update search text
  };

  const filteredInvoices = invoices.filter(
    (invoice) =>
      invoice.invoice_number.toLowerCase().includes(searchText.toLowerCase()) ||
      invoice.bill_to.business_name
        .toLowerCase()
        .includes(searchText.toLowerCase()) ||
      invoice.status.toLowerCase().includes(searchText.toLowerCase())
  );
  const isLargeScreen = useIsLargeScreen();
  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: "Sales",
          headerRight: () => (
            <View className="flex-1 flex-row justify-center items-center ">
              <AddNewInvEst onNewInvAdd={handleAddInvoice} />
            </View>
          ),
        }}
      />
      <View className="flex-1 flex-column w-full gap-4  md:flex-row md:flex-nowrap md:pl-20 ">
        <View className="flex-1 md:flex-none md:min-w-96">
          <Tabs
            value={value}
            onValueChange={setValue}
            className="flex flex-1 grow"
          >
            <TabsList className="flex-row w-full">
              <TabsTrigger value="invoices" className="flex-1">
                <Text>Invoices</Text>
              </TabsTrigger>
              <TabsTrigger value="estimates" className="flex-1">
                <Text>Estimates</Text>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="invoices" className="flex flex-1">
              <InvoiceTable
                invoices={filteredInvoices}
                onSearch={handleSearch}
                onPress={showInvoiceDetails}
              />
            </TabsContent>
            <TabsContent
              value="estimates"
              className="flex flex-1"
            ></TabsContent>
          </Tabs>
        </View>
        {isLargeScreen &&
          (selInv ? (
            <View className="flex-1 items-start justify-start md:border md:border-input md:rounded-md m-2 p-5">
              <InvoiceDetail invoice={selInv} />
            </View>
          ) : (
            <NothingSelected />
          ))}
      </View>
      <Toast />
    </>
  );
}
