// CustomerInfoFields.tsx
import React from "react";
import { View } from "react-native";
import { Customer } from "../types";
import InputField from "../../InputField";

interface CustomerInfoFieldsProps {
  customerData: Customer;
  handleInputChange: (field: string, value: string) => void;
  editMode: boolean;
}

const CustomerInfoFields: React.FC<CustomerInfoFieldsProps> = ({
  customerData,
  handleInputChange,
  editMode,
}) => {
  return (
    <View className="flex flex-row flex-wrap gap-4 mb-8">
      <InputField
        label="Business Name"
        value={customerData.businessName}
        onChangeText={(value) => handleInputChange("businessName", value)}
        editable={editMode}
        nativeID="businessName"
      />
      <InputField
        label="Customer Name"
        value={customerData.customerName}
        onChangeText={(value) => handleInputChange("customerName", value)}
        editable={editMode}
        nativeID="customerName"
      />
    </View>
  );
};

export default CustomerInfoFields;
