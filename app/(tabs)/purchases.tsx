import { Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";
import Toast from "react-native-toast-message";
import { getAllPurchaseOrders } from "~/api/purchasesApi";
import PurchasesList from "~/components/ScreenComponents/Purchases/PurchasesList";
import { PurchaseOrder } from "~/components/ScreenComponents/Purchases/types";
import { SearchInput } from "~/components/ScreenComponents/SearchInput";
import { useToast } from "~/components/ScreenComponents/ToastMessage";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { useIsLargeScreen } from "~/lib/utils";

export default function Purchases() {
  const [purchases, setPurchases] = useState<PurchaseOrder[]>([]);
  const { showSuccessToast, showErrorToast } = useToast();
  const [searchText, setSearchText] = useState("");
  const router = useRouter();

  const fetchPurchases = async () => {
    try {
      const data = await getAllPurchaseOrders(); // Call the API
      setPurchases(data);
    } catch (error) {
      showErrorToast("Failed to fetch Purchases!");
    }
  };

  useEffect(() => {
    fetchPurchases();
  }, []);

  const handleSearch = (searchText: string) => {
    setSearchText(searchText);
  };

  const filteredPurchases = purchases.filter(
    (po) =>
      po.purchaseOrderNumber.toLowerCase().includes(searchText.toLowerCase()) ||
      po.vendor.name.toLowerCase().includes(searchText.toLowerCase()) ||
      po.jobID.toLowerCase().includes(searchText.toLowerCase()) ||
      po.items.some((item) =>
        item.itemName.toLowerCase().includes(searchText.toLowerCase())
      )
  );

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <View className="flex-1 flex-row justify-center items-center m-2 gap-1">
              <Button
                size="sm"
                variant="default"
                className="shadow shadow-foreground/5"
                onPress={() => router.push("/jobs/addnew")}
              >
                <Text>New Purchase</Text>
              </Button>
            </View>
          ),
        }}
      />
      <View className="flex-1 gap-4 bg-secondary/30 px-2  md:pl-20 md:mx-2">
        <View className="flex-row gap-2 items-center">
          <SearchInput
            onChangeText={handleSearch}
            placeholder="Search..."
            value={searchText}
          />
          {/* Scheduling - Backlog, employees (drag and drop) */}
          {/* Filters and other UI components */}
        </View>
        <PurchasesList purchases={filteredPurchases} />
      </View>
      <Toast />
    </>
  );
}
