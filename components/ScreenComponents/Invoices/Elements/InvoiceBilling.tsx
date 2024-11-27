import { Image, View } from "react-native";
import React, { useEffect } from "react";
import { Text } from "~/components/ui/text";
import { Large, Muted } from "~/components/ui/typography";
import { Invoice } from "../types";
import { Customer, SiteLocation } from "../../Customers/types";
import { fetchCustomerById, fetchCustomerSiteById } from "~/api/customerApi";

const InvoiceBilling: React.FC<{ invoice: Invoice }> = ({ invoice }) => {
  const [customerData, setCustomerData] = React.useState<Customer>();
  const [serviceSites, setServiceSites] = React.useState<SiteLocation[]>([]);
  const loadCustomerData = async () => {
    try {
      const data = await fetchCustomerById(invoice.bill_to.customer_id); // Call the API
      if (data) setCustomerData(data);
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
    loadSites();
  }, []);
  return (
    <>
      <View className="flex-row justify-between">
        <View className="flex gap-2">
          <Text className="font-bold">Invoice #: {invoice.invoice_number}</Text>
          <Muted>Date Issued: {invoice.date_issued}</Muted>
          <Muted>Due Date: {invoice.due_date}</Muted>
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
        <View className="flex bg-secondary p-2 rounded-md flex-row flex-wrap justify-between gap-2">
          {serviceSites.map((site) => (
            <View key={site.site_id}>
              <Text>{site.siteName}</Text>
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
