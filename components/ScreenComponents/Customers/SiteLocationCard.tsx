import React from "react";
import { View } from "react-native";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "~/components/ui/card"; // Replace with your actual imports
import { Customer } from "./types"; // Make sure to define your Customer type
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { formatPhoneNumber, useIsLargeScreen } from "~/lib/utils";

interface SiteLocationCardProps {
  customer: Customer;
  editMode: boolean;
  handleInputChange: (field: string, value: string, siteIndex: number) => void;
}

const SiteLocationCard: React.FC<SiteLocationCardProps> = ({
  customer,
  editMode,
  handleInputChange,
}) => {
  // Phone number formatting
  const handlePhoneChange = (field: string, phone: string, index: number) => {
    const formattedPhone = formatPhoneNumber(phone);
    handleInputChange(field, formattedPhone, index);
  };

  return (
    <>
      {customer.siteLocations.map((site, index) => (
        <Card key={index} className="min-w-80">
          <CardHeader>
            <CardTitle>{site.siteName}</CardTitle>
            <CardDescription>Contact: {site.siteContactPerson}</CardDescription>
          </CardHeader>
          <CardContent className="gap-4 native:gap-2">
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
            <View className="gap-1">
              <Label nativeID={`phone-${index}`}>Phone</Label>
              <Input
                aria-labelledby={`phone-${index}`}
                defaultValue={site.siteContactPhone}
                editable={editMode}
                onChangeText={(value) =>
                  handlePhoneChange("siteContactPhone", value, index)
                }
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
                onChangeText={(value) =>
                  handleInputChange("City", value, index)
                }
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
                  onChangeText={(value) =>
                    handleInputChange("zipcode", value, index)
                  }
                />
              </View>
            </View>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default SiteLocationCard;
