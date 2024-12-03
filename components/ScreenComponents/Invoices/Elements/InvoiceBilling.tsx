import { Image, View } from "react-native";
import React, { useEffect } from "react";
import { Text } from "~/components/ui/text";
import { Large, Muted } from "~/components/ui/typography";
import { Invoice, InvoiceItem } from "../types";
import { Customer, SiteLocation } from "../../Customers/types";
import { fetchCustomerById, fetchCustomerSiteById } from "~/api/customerApi";
import { formatDueDate } from "~/lib/utils";

const InvoiceBilling: React.FC<{
  invoice: Invoice;
  editMode: boolean;
  handleInputChange: (
    field: keyof Invoice | keyof InvoiceItem, // field can be from Invoice or InvoiceItem
    value: string | number, // The value to update
    index?: number,
    array?: "services" | "parts"
  ) => void;
}> = ({ invoice, editMode, handleInputChange }) => {
  const [customerData, setCustomerData] = React.useState<Customer>();
  const [serviceSites, setServiceSites] = React.useState<SiteLocation[]>([]);
  const loadCustomerData = async () => {
    try {
      if (invoice.bill_to.customer_id == "") {
        setCustomerData({
          _id: "", // Add the required _id property
          businessName: "",
          customerName: "",
          email: "",
          phone: "",
          website: "",
          billingAddress: {
            AddressLine: "",
            City: "",
            Province: "",
            zipcode: "",
          },
          siteLocations: [],
        });

        setServiceSites([]);
      } else {
        const data = await fetchCustomerById(invoice.bill_to.customer_id); // Call the API
        if (data) setCustomerData(data);
        loadSites();
      }
    } catch (error) {
      console.error("Failed to fetch customers!");
    }
  };

  // Load all sites related to the customer (using service_site_id array)
  const loadSites = async () => {
    try {
      // Fetch all sites corresponding to the service_site_ids in the invoice
      const sites = await Promise.all(
        invoice.service_site_id.map(async (siteId) => {
          // Fetch each site by ID
          const site = await fetchCustomerSiteById(
            invoice.bill_to.customer_id,
            siteId
          );
          return site; // Returns undefined if no site is found
        })
      );

      // Filter out any undefined values and update the serviceSites state
      setServiceSites(
        sites.filter((site) => site !== undefined) as SiteLocation[]
      );
    } catch (error) {
      console.error("Failed to fetch sites!");
    }
  };
  // Optional: Update state when prop changes
  useEffect(() => {
    loadCustomerData();
  }, [invoice.bill_to.customer_id]);

  console.log("rendering Invoice Billing", invoice.bill_to.business_name);
  return (
    <>
      <View className="flex-row justify-between">
        <View className="flex gap-2">
          <Text className="font-bold">Invoice #: {invoice.invoice_number}</Text>
          <Muted>Date Issued: {formatDueDate(invoice.date_issued)}</Muted>
          <Muted>
            Due Date: {invoice.due_date && formatDueDate(invoice.due_date)}
          </Muted>
        </View>
        <View>
          <Text className="font-semibold">Bill To:</Text>
          <Text>{customerData?.businessName}</Text>
          <Muted>{customerData?.billingAddress.AddressLine}</Muted>
          <Muted>{customerData?.billingAddress.City}</Muted>
          <View className="flex flex-row gap-2">
            <Muted>{customerData?.billingAddress.Province}</Muted>
            <Muted>{customerData?.billingAddress.zipcode}</Muted>
          </View>
        </View>
      </View>
      <View className="flex gap-2">
        <Text className="font-semibold">Serviced Sites</Text>
        <View className="flex p-2 rounded-md flex-row flex-wrap justify-between gap-2 border border-input ">
          {serviceSites.map((site) => (
            <View key={site.site_id}>
              <Text className="underline">{site.siteName}</Text>
              <Muted>{site.AddressLine}</Muted>
              <Muted>{site.City}</Muted>
              <View className="flex flex-row gap-2">
                <Muted>{site.Province}</Muted>
                <Muted>{site.zipcode}</Muted>
              </View>
            </View>
          ))}
        </View>
      </View>
    </>
  );
};

export default InvoiceBilling;
