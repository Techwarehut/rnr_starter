// CustomerInfoFields.tsx
import React from "react";
import { View } from "react-native";
import { Vendor } from "../types";
import InputField from "../../InputField";
import { Text } from "~/components/ui/text";
import { Muted } from "~/components/ui/typography";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";

interface VendorInfoFieldsProps {
  vendorData: Vendor;
  handleInputChange: (field: string, value: string) => void;
  editMode: boolean;
}

const VendorBillingAddress: React.FC<VendorInfoFieldsProps> = ({
  vendorData,
  handleInputChange,
  editMode,
}) => {
  return (
    <View className="flex flex-col gap-2 w-full md:flex-1">
      <View>
        <Text className="text-xl">Address</Text>
        <Muted>Optional. It will appear on purchase orders.</Muted>
      </View>
      <View className="flex-column items-start justify-start gap-4 p-2 py-5">
        <InputField
          label="Address"
          value={vendorData.address.AddressLine}
          onChangeText={(value) => handleInputChange("AddressLine", value)}
          editable={editMode}
          nativeID="Address"
        />

        <InputField
          label="City"
          value={vendorData.address.City}
          onChangeText={(value) => handleInputChange("City", value)}
          editable={editMode}
          nativeID="City"
        />

        <View className="flex-row gap-1 w-full">
          <View className="flex-1 gap-1">
            <Label nativeID="province">Province</Label>
            <Input
              value={vendorData.address.Province}
              onChangeText={(value) => handleInputChange("Province", value)}
              aria-labelledby="province"
              aria-errormessage="inputError"
              editable={editMode}
            />
          </View>
          <View className="flex-1 gap-1">
            <Label nativeID="zipcode">Zip Code</Label>
            <Input
              value={vendorData.address.zipcode}
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

export default VendorBillingAddress;
