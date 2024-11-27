import { View, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { Text } from "~/components/ui/text";
import { Stack, useLocalSearchParams } from "expo-router";

import { Job } from "~/components/ScreenComponents/Jobs/types"; // Import your Job type
import {
  assignJob,
  getJobById,
  updateJobPriority,
  updateJobStatus,
  updateJobType,
} from "~/api/jobsApi";
import ActionButtons from "~/components/ScreenComponents/ActionButtons";
import { Muted } from "~/components/ui/typography";
import { JobDetailDisplay } from "~/components/ScreenComponents/Jobs/JobDetail";
import {
  JobPriorityKeys,
  JobTypeKeys,
} from "~/components/ScreenComponents/Jobs/Filters/Statustypes";
import { User } from "~/components/ScreenComponents/Team/types";

import { DateType } from "react-native-ui-datepicker";
import {
  Customer,
  SiteLocation,
} from "~/components/ScreenComponents/Customers/types";
import { Invoice } from "~/components/ScreenComponents/Invoices/types";
import { fetchInvoiceById } from "~/api/invoicesApi";
import InvoiceDetail from "~/components/ScreenComponents/Invoices/InvoiceDetail";

const invoiceDetailScreen = () => {
  const { invoiceId } = useLocalSearchParams();
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editMode, setEditMode] = React.useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  // Ensure jobID is a string
  const id = Array.isArray(invoiceId) ? invoiceId[0] : invoiceId;

  useEffect(() => {
    const fetchInvoiceDetails = async () => {
      try {
        const fetchedInvoice = await fetchInvoiceById(id);
        if (fetchedInvoice) setInvoice(fetchedInvoice);
      } catch (err) {
        setError("Error fetching invoice details");
      } finally {
        setLoading(false);
      }
    };

    fetchInvoiceDetails();
  }, [invoiceId]);

  const handleEditInvoice = () => {
    setEditMode(false);
  };
  const handleDeleteInvoice = () => {};

  const handleChangeStatus = async (jobId: string, newStatus: string) => {
    try {
      setRefreshKey((prev) => prev + 1);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" className="text-brand-primary" />
      </View>
    );
  }

  if (error) {
    return (
      <View>
        <Text>{error}</Text>
      </View>
    );
  }

  if (!invoice) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>No Invoice found</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 items-center  justify-center m-2">
      <InvoiceDetail invoice={invoice} />
    </View>
  );
};

export default invoiceDetailScreen;
