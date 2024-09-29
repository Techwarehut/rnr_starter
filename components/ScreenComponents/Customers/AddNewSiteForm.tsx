import { Platform, View } from "react-native";
import React from "react";

import { Customer, SiteLocation } from "./types"; // Ensure this imports the correct type
import { formatPhoneNumber } from "~/lib/utils";

import { ScrollView } from "react-native-gesture-handler";

import SiteContactInfo from "./SiteLocationElements/SiteContactInfo";
import SiteLocationInfo from "./SiteLocationElements/SiteLocation";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";

interface AddNewSiteFormProps {
  customer: Customer;
  onChange: (data: Customer) => void;
}

const AddNewSiteForm: React.FC<AddNewSiteFormProps> = ({
  customer,
  onChange,
}) => {
  const [newSite, setNewSite] = React.useState<SiteLocation>({
    siteName: "",
    siteContactPerson: "",
    siteContactPhone: "",
    AddressLine: "",
    City: "",
    Province: "",
    zipcode: "",
  });

  const index = customer.siteLocations.length;

  const handleInputChange = (field: string, value: string) => {
    setNewSite((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    if (newSite.siteName && newSite.siteContactPerson) {
      // Validate necessary fields
      const updatedCustomerData = {
        ...customer,
        siteLocations: [...customer.siteLocations, newSite],
      };

      onChange(updatedCustomerData);
      setNewSite({
        // Reset form after saving
        siteName: "",
        siteContactPerson: "",
        siteContactPhone: "",
        AddressLine: "",
        City: "",
        Province: "",
        zipcode: "",
      });
    } else {
      console.warn("Please fill in all required fields.");
    }
  };

  // Phone number formatting
  const handlePhoneChange = (field: string, phone: string, index: number) => {
    const formattedPhone = formatPhoneNumber(phone);
    handleInputChange(field, formattedPhone);
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={Platform.OS === "web"}
      className="p-4 flex-1"
    >
      <SiteContactInfo
        site={newSite}
        handleInputChange={handleInputChange}
        editMode={true}
        index={index}
      />
      <SiteLocationInfo
        site={newSite}
        handleInputChange={handleInputChange}
        handlePhoneChange={handlePhoneChange}
        editMode={true}
        index={index}
      />
      <View className="mt-8">
        <Button onPress={handleSave}>
          <Text>Save</Text>
        </Button>
      </View>
    </ScrollView>
  );
};

export default AddNewSiteForm;
