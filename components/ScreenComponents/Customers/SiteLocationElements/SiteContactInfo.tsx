// CustomerInfoFields.tsx
import React from "react";
import { View } from "react-native";
import { SiteLocation } from "../types";
import InputField from "../../InputField";
import { Text } from "~/components/ui/text";
import { Muted } from "~/components/ui/typography";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

interface SiteContactInfoProps {
  site: SiteLocation;
  handleInputChange: (field: string, value: string, siteIndex: number) => void;
  editMode: boolean;
  index: number;
}

const SiteContactInfo: React.FC<SiteContactInfoProps> = ({
  site,
  handleInputChange,
  editMode,
  index,
}) => {
  return (
    <View className="gap-4">
      {editMode && (
        <>
          <View className=" gap-1">
            <Label nativeID={`siteName-${index}`}>Site Name</Label>
            <Input
              aria-labelledby={`siteName-${index}`}
              defaultValue={site.siteName}
              editable={editMode}
              onChangeText={
                (value) => handleInputChange("siteName", value, index) // Ensure the correct order of params
              }
            />
          </View>
          <View className="gap-1">
            <Label nativeID={`siteContactPerson-${index}`}>
              Site Contact Person
            </Label>
            <Input
              aria-labelledby={`siteName-${index}`}
              defaultValue={site.siteContactPerson}
              editable={editMode}
              onChangeText={(value) =>
                handleInputChange("siteContactPerson", value, index)
              }
            />
          </View>
        </>
      )}
    </View>
  );
};

export default SiteContactInfo;
