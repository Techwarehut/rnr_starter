import React from "react";
import { View } from "react-native";
import { Invoice } from "../types";
import { Text } from "~/components/ui/text";
import { Button } from "~/components/ui/button";

const InvoiceStatusActions: React.FC<{ invoice: Invoice }> = ({ invoice }) => {
  return (
    <View className="flex gap-2 mt-2 ">
      {/* Conditionally render content based on invoice status */}
      {invoice.status === "Draft" && (
        <>
          <View className="flex">
            <Text>
              Invoice is currently in draft status. Download to print or Email.
            </Text>
          </View>
          <View className="flex flex-row gap-2 self-end justify-between">
            <Button variant="outline">
              <Text>Download</Text>
            </Button>
            <Button variant="outline">
              <Text>Email</Text>
            </Button>
          </View>
        </>
      )}

      {invoice.status === "Invoiced" && (
        <>
          <View className="flex">
            <Text>Invoice can be previewed as below.</Text>
          </View>
          <View className="flex flex-row gap-2 self-end justify-between">
            <Button variant="outline">
              <Text>Mark as Paid</Text>
            </Button>
            <Button variant="outline">
              <Text>Send Reminder</Text>
            </Button>
          </View>
        </>
      )}

      {invoice.status === "Paid" && (
        <>
          <View className="flex">
            <Text>This invoice has been paid. Thank you!</Text>
          </View>
          <View className="flex flex-row gap-2 self-end justify-between">
            <Button variant="outline">
              <Text>View Receipt</Text>
            </Button>
          </View>
        </>
      )}
    </View>
  );
};

export default InvoiceStatusActions;
