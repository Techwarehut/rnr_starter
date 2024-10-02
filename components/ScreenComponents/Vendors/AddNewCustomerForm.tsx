import { Platform, View } from "react-native";
import React from "react";

import { Address, ContactPerson, Vendor } from "./types"; // Ensure this imports the correct type
import { formatPhoneNumber } from "~/lib/utils";
import { Muted } from "~/components/ui/typography";
import { ScrollView } from "react-native-gesture-handler";
import { Button } from "~/components/ui/button";
import VendorInfoFields from "./FormElements/VendorInfoFields";
import VendorBasicInfo from "./FormElements/VendorBasicInfo";
import VendorBillingAddress from "./FormElements/VendorBillingAddress";

interface AddVendorFormProps {
  onChange: (data: Vendor) => void;
}

const AddNewVendorForm: React.FC<AddVendorFormProps> = ({ onChange }) => {
  const [vendorData, setVendorData] = React.useState<Vendor>({
    _id: "", // Add the required _id property
    companyName: "",
    contactPerson: {
      name: "",
      title: "",
      email: "",
      phone: "",
    },
    address: {
      AddressLine: "",
      City: "",
      Province: "",
      zipcode: "",
    },
  });

  const handleInputChange = (field: string, value: string) => {
    let updatedVendorData = { ...vendorData };

    // Check if the field is a key of BillingAddress
    if (field in updatedVendorData.address) {
      updatedVendorData.address = {
        ...updatedVendorData.address,
        [field as keyof Address]: value, // Cast to BillingAddress key
      };
    } else if (field in updatedVendorData.contactPerson) {
      updatedVendorData.contactPerson = {
        ...updatedVendorData.contactPerson,
        [field as keyof ContactPerson]: value, // Cast to BillingAddress key
      };
    }
    // Check if the field is NOT in BillingAddress but IS in Customer
    else if (field in updatedVendorData) {
      updatedVendorData = {
        ...updatedVendorData,
        [field]: value,
      };
    }
    // Handle case where field is not found in either
    else {
      console.warn(`Field ${field} does not exist `);
    }

    // Update state with the new customer data
    setVendorData(updatedVendorData);
    onChange(updatedVendorData); // Call onChange with the updated data
  };

  const handlePhoneChange = (field: string, phone: string) => {
    const formattedPhone = formatPhoneNumber(phone);

    handleInputChange(field, formattedPhone);
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={Platform.OS === "web"}
      className="p-4 flex-1 "
    >
      <VendorInfoFields
        vendorData={vendorData}
        handleInputChange={handleInputChange}
        editMode={true}
      />

      {/* Top Container */}
      <View className="md:flex-row gap-6">
        {/* Contact Details */}
        <VendorBasicInfo
          vendorData={vendorData}
          handleInputChange={handleInputChange}
          handlePhoneChange={handlePhoneChange} // Pass the phone handler if needed
          editMode={true}
        />
        {/* Billing Address */}
        <VendorBillingAddress
          vendorData={vendorData}
          handleInputChange={handleInputChange}
          editMode={true}
        />
      </View>
    </ScrollView>
  );
};

export default AddNewVendorForm;
