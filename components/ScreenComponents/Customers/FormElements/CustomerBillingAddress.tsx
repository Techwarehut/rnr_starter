// CustomerInfoFields.tsx
import React from "react";
import { View } from "react-native";
import { Customer } from "../types";
import InputField from "../../InputField";
import { Text } from "~/components/ui/text";
import { Muted } from "~/components/ui/typography";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";

interface CustomerInfoFieldsProps {
  customerData: Customer;
  handleInputChange: (field: string, value: string) => void;
  editMode: boolean;
}

const CustomerBillingAddress: React.FC<CustomerInfoFieldsProps> = ({
  customerData,
  handleInputChange,
  editMode,
}) => {
  return (
    <View className="flex flex-col gap-2 w-full md:flex-1">
      <View>
        <Text className="text-xl">Billing Address</Text>
        <Muted>Optional. It will appear on invoice.</Muted>
      </View>
      <View className="flex-column items-start justify-start gap-4 p-2 py-5">
        <InputField
          label="Address"
          value={customerData.billingAddress.AddressLine}
          onChangeText={(value) => handleInputChange("AddressLine", value)}
          editable={editMode}
          nativeID="Address"
        />

        <InputField
          label="City"
          value={customerData.billingAddress.City}
          onChangeText={(value) => handleInputChange("City", value)}
          editable={editMode}
          nativeID="City"
        />

        <View className="flex-row gap-1 w-full">
          <View className="flex-1 gap-1">
            <Label nativeID="province">Province</Label>
            <Input
              value={customerData.billingAddress.Province}
              onChangeText={(value) => handleInputChange("Province", value)}
              aria-labelledby="province"
              aria-errormessage="inputError"
              editable={editMode}
            />
          </View>
          <View className="flex-1 gap-1">
            <Label nativeID="zipcode">Zip Code</Label>
            <Input
              value={customerData.billingAddress.zipcode}
              onChangeText={(value) => handleInputChange("zipcode", value)}
              aria-labelledby="zipcode"
              aria-errormessage="inputError"
              editable={editMode}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default CustomerBillingAddress;
