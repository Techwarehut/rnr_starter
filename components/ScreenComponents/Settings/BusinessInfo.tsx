import { View } from "react-native";
import React, { useEffect, useState } from "react";
import { Text } from "~/components/ui/text";
import { getTenantById } from "~/api/tenantApi";
import { BusinessInfoFieldsProps, Tenant } from "./types";
import { Muted } from "~/components/ui/typography";
import InputField from "../InputField";

const BusinessInfo: React.FC<BusinessInfoFieldsProps> = ({
  tenant,
  handleInputChange,
  editMode,
  handlePhoneChange,
}) => {
  return (
    <View className="flex gap-4 flex-1">
      <View className="flex flex-col  gap-2 w-full md:flex-1">
        <View>
          <Text className="text-xl">Basic Information</Text>
          <Muted>It will appear on invoice.</Muted>
        </View>
        <View className="flex-col  items-start justify-start gap-4 p-2 py-5 ">
          <InputField
            label="Business Name"
            value={tenant?.businessName || ""}
            onChangeText={(value) => handleInputChange("businessName", value)}
            editable={editMode}
            nativeID="email"
          />
          <InputField
            label="Email"
            value={tenant.businessEmail}
            onChangeText={(value) => handlePhoneChange("businessEmail", value)}
            editable={editMode}
            nativeID="Email"
          />
          <InputField
            label="Phone"
            value={tenant.businessPhone}
            onChangeText={(value) => handlePhoneChange("businessPhone", value)}
            editable={editMode}
            nativeID="phone"
          />
          <InputField
            label="Website"
            value={tenant.businessWebsite}
            onChangeText={(value) =>
              handleInputChange("businessWebsite", value)
            }
            editable={editMode}
            nativeID="Website"
          />
        </View>
      </View>
    </View>
  );
};

export default BusinessInfo;
