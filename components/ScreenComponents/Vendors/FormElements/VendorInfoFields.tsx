// CustomerInfoFields.tsx
import React from "react";
import { View } from "react-native";
import { Vendor } from "../types";
import InputField from "../../InputField";

interface VendorInfoFieldsProps {
  vendorData: Vendor;
  handleInputChange: (field: string, value: string) => void;
  editMode: boolean;
}

const VendorInfoFields: React.FC<VendorInfoFieldsProps> = ({
  vendorData,
  handleInputChange,
  editMode,
}) => {
  return (
    <View className="flex flex-row flex-wrap gap-4 mb-8">
      <InputField
        label="Comapny Name"
        value={vendorData.companyName}
        onChangeText={(value) => handleInputChange("companyName", value)}
        editable={editMode}
        nativeID="companyName"
      />
      <InputField
        label="Contact Person Name"
        value={vendorData.contactPerson.name}
        onChangeText={(value) => handleInputChange("name", value)}
        editable={editMode}
        nativeID="name"
      />
    </View>
  );
};

export default VendorInfoFields;
