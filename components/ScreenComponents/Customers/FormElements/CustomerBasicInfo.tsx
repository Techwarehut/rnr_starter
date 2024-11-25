// CustomerInfoFields.tsx
import React from "react";
import { View } from "react-native";
import { Customer } from "../types";
import InputField from "../../InputField";
import { Text } from "~/components/ui/text";
import { Muted } from "~/components/ui/typography";

interface CustomerInfoFieldsProps {
  customerData: Customer;
  handleInputChange: (field: string, value: string) => void;
  editMode: boolean;
  handlePhoneChange: (field: string, value: string) => void;
}

const CustomerBasicInfo: React.FC<CustomerInfoFieldsProps> = ({
  customerData,
  handleInputChange,
  editMode,
  handlePhoneChange,
}) => {
  return (
    <View className="flex flex-col  gap-2 w-full md:flex-1">
      <View>
        <Text className="text-xl">Basic Information</Text>
        <Muted>Optional. It will appear on invoice.</Muted>
      </View>

      <View className="flex-col  items-start justify-start gap-4 p-2 py-5 ">
        <InputField
          label="Email"
          value={customerData.email}
          onChangeText={(value) => handleInputChange("email", value)}
          editable={editMode}
          nativeID="email"
        />
        <InputField
          label="Phone"
          value={customerData.phone}
          onChangeText={(value) => handlePhoneChange("phone", value)}
          editable={editMode}
          nativeID="phone"
        />
        <InputField
          label="Website"
          value={customerData.website}
          onChangeText={(value) => handleInputChange("website", value)}
          editable={editMode}
          nativeID="Website"
        />
      </View>
    </View>
  );
};

export default CustomerBasicInfo;
