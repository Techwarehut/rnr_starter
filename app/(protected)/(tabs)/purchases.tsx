import { Stack, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import Toast from "react-native-toast-message";
import { getAllPurchaseOrders } from "~/api/purchasesApi";
import { PurchaseFilters } from "~/components/ScreenComponents/Purchases/PurchaseCardElements/PurchaseFilters";
import PurchasesList from "~/components/ScreenComponents/Purchases/PurchasesList";
import {
  PurchaseOrder,
  StatusKeys,
} from "~/components/ScreenComponents/Purchases/types";
import { SearchInput } from "~/components/ScreenComponents/SearchInput";
import { useToast } from "~/components/ScreenComponents/ToastMessage";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { useAuth } from "~/ctx/AuthContext";
import { useIsLargeScreen } from "~/lib/utils";

export default function Purchases() {
  const [purchases, setPurchases] = useState<PurchaseOrder[]>([]);
  const [filteredPurchases, setfilteredPurchases] = useState<PurchaseOrder[]>(
    []
  );
  const { showSuccessToast, showErrorToast } = useToast();
  const [searchText, setSearchText] = useState("");
  const [group, setGroup] = useState("Vendor");
  const [selectedStatuses, setSelectedStatuses] = useState<
    Record<StatusKeys, boolean>
  >({
    Request: false,
    Approved: false,
    Issued: false,
    Rejected: false,
  });
  const router = useRouter();

  const { user } = useAuth();
  const fetchPurchases = async () => {
    try {
      if (user) {
        const data = await getAllPurchaseOrders(user); // Call the API
        setPurchases(data);
        setfilteredPurchases(data);
      }
    } catch (error) {
      showErrorToast("Failed to fetch Purchases!");
    }
  };

  useEffect(() => {
    fetchPurchases();
  }, []);

  useEffect(() => {
    const filtered = purchases.filter((purchase) => {
      // Normalize the purchase status to match the key in selectedStatuses
      const statusKey = purchase.status.replace(/\s+/g, "") as StatusKeys; // Remove spaces and cast to StatusKeys

      const statusMatches =
        selectedStatuses[statusKey] === true ||
        !Object.values(selectedStatuses).some(Boolean);

      return statusMatches;
    });

    setfilteredPurchases(filtered);
  }, [selectedStatuses]);

  const handleStatusFilter = (newStates: Record<string, boolean>) => {
    setSelectedStatuses(newStates);
  };

  const handleSearch = (searchText: string) => {
    setSearchText(searchText);
  };

  const searchfilteredPurchases = filteredPurchases.filter(
    (po) =>
      po.purchaseOrderNumber.toLowerCase().includes(searchText.toLowerCase()) ||
      po.vendor.companyName.toLowerCase().includes(searchText.toLowerCase()) ||
      po.jobID.toLowerCase().includes(searchText.toLowerCase()) ||
      po.items.some((item) =>
        item.itemName.toLowerCase().includes(searchText.toLowerCase())
      )
  );

  const groupPurchases = (groupBy: string) => {
    const grouped: { title: string; data: PurchaseOrder[] }[] = [];

    for (const purchase of searchfilteredPurchases) {
      let groupTitle = "";

      if (groupBy === "Customer") {
        groupTitle = purchase.customer?.businessName
          ? `Customer: ${purchase.customer.businessName}`
          : "Customer: Unassigned";
      } else if (groupBy === "Job") {
        groupTitle = purchase.jobID
          ? `Job: ${purchase.jobID}`
          : "Job: Unassigned";
      } else if (groupBy === "Vendor") {
        groupTitle = purchase.vendor.companyName
          ? `Vendor: ${purchase.vendor.companyName}`
          : "Vendor: Unassigned";
      } else {
        groupTitle = "All Purchases"; // Default title when no grouping
      }

      const existingGroup = grouped.find((g) => g.title === groupTitle);
      if (existingGroup) {
        existingGroup.data.push(purchase);
      } else {
        grouped.push({ title: groupTitle, data: [purchase] });
      }
    }

    return grouped;
  };

  const groupedPurchases = groupPurchases(group);

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <View className="flex-1 flex-row justify-center items-center m-2 gap-1">
              <Button
                size="sm"
                variant="default"
                onPress={() => router.push("/purchases/addnew")}
              >
                <Text>New Purchase</Text>
              </Button>
            </View>
          ),
        }}
      />
      <View className="flex-1 gap-4  px-2  md:pl-20 md:mx-2">
        <View className="flex-row gap-2 items-center web:mt-2">
          <SearchInput
            onChangeText={handleSearch}
            placeholder="Search..."
            value={searchText}
          />
          {/* Scheduling - Backlog, employees (drag and drop) */}
          {/* Filters and other UI components */}
          <PurchaseFilters
            selectedGroupValue={group}
            initialStatusCheckedStates={selectedStatuses}
            setSelectedGroupValue={setGroup}
            handleStatusChange={handleStatusFilter}
          />
        </View>
        <PurchasesList sections={groupedPurchases} />
      </View>
      <Toast />
    </>
  );
}
