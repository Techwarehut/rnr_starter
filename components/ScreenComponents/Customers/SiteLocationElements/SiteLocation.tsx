// CustomerInfoFields.tsx
import React from "react";
import { View } from "react-native";
import { SiteLocation } from "../types";
import InputField from "../../InputField";
import { Text } from "~/components/ui/text";
import { Muted } from "~/components/ui/typography";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

interface SiteLocationInfoProps {
  site: SiteLocation;
  handleInputChange: (field: string, value: string, siteIndex: number) => void;
  handlePhoneChange: (field: string, phone: string, siteIndex: number) => void;
  editMode: boolean;
  index: number;
}

const SiteLocationInfo: React.FC<SiteLocationInfoProps> = ({
  site,
  handleInputChange,
  handlePhoneChange,
  editMode,
  index,
}) => {
  return (
    <View className="gap-4 mt-2">
      <View className="gap-1">
        <InputField
          label="Phone"
          value={site.siteContactPhone}
          onChangeText={(value) =>
            handlePhoneChange("siteContactPhone", value, index)
          }
          editable={editMode}
          nativeID="phone"
        />
      </View>
      <View className="gap-1">
        <Label nativeID={`address-${index}`}>Address</Label>
        <Input
          aria-labelledby={`address-${index}`}
          defaultValue={site.AddressLine}
          editable={editMode}
          onChangeText={(value) =>
            handleInputChange("AddressLine", value, index)
          }
        />
      </View>
      <View className="gap-1">
        <Label nativeID={`city-${index}`}>City</Label>
        <Input
          id={`city-${index}`}
          defaultValue={site.City}
          editable={editMode}
          onChangeText={(value) => handleInputChange("City", value, index)}
        />
      </View>
      <View className="flex-row gap-1">
        <View className="flex-1 gap-1">
          <Label nativeID={`province-${index}`}>Province</Label>
          <Input
            id={`province-${index}`}
            defaultValue={site.Province}
            editable={editMode}
            onChangeText={(value) =>
              handleInputChange("Province", value, index)
            }
          />
        </View>
        <View className="flex-1 gap-1">
          <Label nativeID={`zipcode-${index}`}>Zip Code</Label>
          <Input
            id={`zipcode-${index}`}
            defaultValue={site.zipcode}
            editable={editMode}
            onChangeText={(value) => handleInputChange("zipcode", value, index)}
          />
        </View>
      </View>
    </View>
  );
};

export default SiteLocationInfo;
