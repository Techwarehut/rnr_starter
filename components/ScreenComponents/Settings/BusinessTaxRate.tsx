import { View } from "react-native";
import React from "react";
import { Text } from "~/components/ui/text";
import { Muted } from "~/components/ui/typography";
import InputField from "../InputField";
import { BusinessInfoFieldsProps } from "./types";

const BusinessTaxRate: React.FC<BusinessInfoFieldsProps> = ({
  tenant,
  handleInputChange,
  editMode,
  handlePhoneChange,
}) => {
  return (
    <View className="flex flex-col gap-2 w-full md:flex-1 md:bg-secondary rounded-md md:p-4">
      <View>
        <Text className="text-xl">Tax Information</Text>
        <Muted>It will appear on invoice.</Muted>
      </View>
      <View className="flex-column items-start justify-start gap-4 p-2 py-5">
        <InputField
          label="Tax ID"
          value={tenant.businessTaxID}
          onChangeText={(value) => handleInputChange("businessTaxID", value)}
          editable={editMode}
          nativeID="Tax ID"
        />

        <InputField
          label="Tax Rate"
          value={tenant.taxRate.toLocaleString()}
          onChangeText={(value) => handleInputChange("taxRate", value)}
          editable={editMode}
          nativeID="Tax Rate"
        />
      </View>
    </View>
  );
};

export default BusinessTaxRate;
