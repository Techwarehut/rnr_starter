// CustomerInfoFields.tsx
import React from "react";
import { View } from "react-native";
import { Vendor } from "../types";
import InputField from "../../InputField";
import { Text } from "~/components/ui/text";
import { Muted } from "~/components/ui/typography";

interface VendorInfoFieldsProps {
  vendorData: Vendor;
  handleInputChange: (field: string, value: string) => void;
  editMode: boolean;
  handlePhoneChange: (field: string, value: string) => void;
}

const VendorBasicInfo: React.FC<VendorInfoFieldsProps> = ({
  vendorData,
  handleInputChange,
  editMode,
  handlePhoneChange,
}) => {
  return (
    <View className="flex flex-col gap-2 w-full md:flex-1">
      <View>
        <Text className="text-xl">Contact Information</Text>
        <Muted>Optional. It will appear on purchase orders.</Muted>
      </View>

      <View className="flex-column items-start justify-start gap-4 p-2 py-5 ">
        <InputField
          label="Email"
          value={vendorData.contactPerson.email}
          onChangeText={(value) => handleInputChange("email", value)}
          editable={editMode}
          nativeID="email"
        />
        <InputField
          label="Phone"
          value={vendorData.contactPerson.phone}
          onChangeText={(value) => handlePhoneChange("phone", value)}
          editable={editMode}
          nativeID="phone"
        />
        <InputField
          label="Title"
          value={vendorData.contactPerson.title}
          onChangeText={(value) => handleInputChange("title", value)}
          editable={editMode}
          nativeID="Title"
        />
      </View>
    </View>
  );
};

export default VendorBasicInfo;
