import { View } from "react-native";
import React from "react";
import { Text } from "~/components/ui/text";
import { BusinessInfoFieldsProps } from "./types";
import { Muted } from "~/components/ui/typography";
import InputField from "../InputField";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";

const BusinessBillingAddr: React.FC<BusinessInfoFieldsProps> = ({
  tenant,
  handleInputChange,
  editMode,
  handlePhoneChange,
}) => {
  return (
    <View className="flex flex-col gap-2 w-full md:flex-1">
      <View>
        <Text className="text-xl">Billing Address</Text>
        <Muted>It will appear on invoice.</Muted>
      </View>
      <View className="flex-column items-start justify-start gap-4 p-2 py-5">
        <InputField
          label="Address"
          value={tenant.businessBillingAddress.addressLine}
          onChangeText={(value) => handleInputChange("addressLine", value)}
          editable={editMode}
          nativeID="addressLine"
        />

        <InputField
          label="City"
          value={tenant.businessBillingAddress.city}
          onChangeText={(value) => handleInputChange("city", value)}
          editable={editMode}
          nativeID="City"
        />

        <View className="flex-row gap-1 w-full">
          <View className="flex-1 gap-1">
            <Label nativeID="province">Province</Label>
            <Input
              value={tenant.businessBillingAddress.province}
              onChangeText={(value) => handleInputChange("province", value)}
              aria-labelledby="province"
              aria-errormessage="inputError"
              editable={editMode}
            />
          </View>
          <View className="flex-1 gap-1">
            <Label nativeID="zipcode">Zip Code</Label>
            <Input
              value={tenant.businessBillingAddress.zipCode}
              onChangeText={(value) => handleInputChange("zipCode", value)}
              aria-labelledby="zipcode"
              aria-errormessage="inputError"
              editable={editMode}
            />
          </View>
        </View>

        <InputField
          label="Country"
          value={tenant.businessBillingAddress.country}
          onChangeText={(value) => handleInputChange("country", value)}
          editable={false}
          nativeID="Country"
        />
      </View>
    </View>
  );
};

export default BusinessBillingAddr;
