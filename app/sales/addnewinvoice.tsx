import { View } from "react-native";
import React from "react";
import AddNewJobForm from "~/components/ScreenComponents/Jobs/AddNewJobFrom";
import { Stack, useRouter } from "expo-router";
import { Button } from "~/components/ui/button";
import { Job } from "~/components/ScreenComponents/Jobs/types";
import { addChecklistToJob, addJob } from "~/api/jobsApi";
import { useToast } from "~/components/ScreenComponents/ToastMessage";
import Toast from "react-native-toast-message";
import { Text } from "~/components/ui/text";
import { Invoice } from "~/components/ScreenComponents/Invoices/types";
import { addInvoice } from "~/api/invoicesApi";
import InvoiceHeader from "~/components/ScreenComponents/Invoices/Elements/InvoiceHeader";
import InvoiceDetail from "~/components/ScreenComponents/Invoices/InvoiceDetail";

const addnewInvoice = () => {
  const [invoice, setInvoice] = React.useState<Invoice>({
    invoice_number: "", // Empty string for invoice number
    date_issued: Date(), // Empty string for date issued
    due_date: "", // Empty string for due date
    bill_to: {
      customer_id: "", // Empty string for customer ID
      business_name: "", // Empty string for business name
    },
    service_site_id: [], // Empty array for service site IDs
    linked_job_id: [], // Empty array for linked job IDs

    services: [], // Empty array for services
    parts: [], // Empty array for parts

    sub_total: 0, // 0 for subtotal
    discount: 0, // 0 for discount
    discounted_total: 0, // 0 for discounted total
    tax_rate: 0, // 0 tax rate
    tax_amount: 0, // 0 tax amount
    total_amount_due: 0, // 0 total amount due
    notes: "", // Empty string for notes
    payment_terms: "", // Empty string for payment terms
    payment_methods: [], // Empty array for payment methods
    status: "Draft", // Default status as "Draft"
  });

  const router = useRouter();
  const { showSuccessToast, showErrorToast } = useToast();
  const handleAddInvoice = async () => {
    try {
      const addedInvoice = await addInvoice(invoice); // Now addedJobs is an array of jobs

      showSuccessToast("Invoice Added successfully!");

      // Go back to the previous page after successfully adding the job(s)
      if (router.canGoBack()) {
        router.back();
      }
    } catch (error) {
      showErrorToast("Error Adding Invoice!");
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <View className="web:mr-4">
              <Button size="sm" onPress={handleAddInvoice}>
                <Text>Create</Text>
              </Button>
            </View>
          ),
        }}
      />
      <View className="flex-1 items-center  justify-center m-2 web:p-8">
        <InvoiceDetail
          invoice={invoice}
          edit={true}
          addNew={true}
          onChangeInvoice={setInvoice}
        />
      </View>
      <Toast />
    </>
  );
};

export default addnewInvoice;
