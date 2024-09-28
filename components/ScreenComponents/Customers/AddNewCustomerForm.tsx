import { View } from "react-native";
import React from "react";
import { Text } from "~/components/ui/text";
import CustomerBillingAddress from "./FormElements/CustomerBillingAddress";
import CustomerBasicInfo from "./FormElements/CustomerBasicInfo";
import CustomerInfoFields from "./FormElements/CustomerNameField";
import { Customer } from "./types"; // Ensure this imports the correct type
import { formatPhoneNumber } from "~/lib/utils";

const AddNewCustomerForm = () => {
  // Initialize with a default Customer object, including _id
  const [customerData, setCustomerData] = React.useState<Customer>({
    _id: "", // Add the required _id property
    businessName: "",
    customerName: "",
    email: "",
    phone: "",
    website: "",
    billingAddress: {
      AddressLine: "",
      City: "",
      Province: "",
      zipcode: "",
    },
    siteLocations: [],
  });

  const handleInputChange = (
    field: string,
    value: string,
    siteIndex?: number
  ) => {
    setCustomerData((prevData) => {
      if (!prevData) return prevData; // Handle potential undefined case

      if (siteIndex !== undefined) {
        const updatedSiteLocations = prevData.siteLocations.map(
          (site, index) => {
            if (index === siteIndex) {
              return {
                ...site,
                [field]: value,
              };
            }
            return site;
          }
        );

        return {
          ...prevData,
          siteLocations: updatedSiteLocations,
        };
      } else if (field in prevData.billingAddress) {
        return {
          ...prevData,
          billingAddress: {
            ...prevData.billingAddress,
            [field]: value,
          },
        };
      } else {
        return {
          ...prevData,
          [field]: value,
        };
      }
    });
  };

  const handlePhoneChange = (phone: string) => {
    const formattedPhone = formatPhoneNumber(phone);
    handleInputChange("phone", formattedPhone);
  };

  return (
    <View className="bg-secondary/30 p-4 flex">
      <CustomerInfoFields
        customerData={customerData}
        handleInputChange={handleInputChange}
        editMode={true}
      />

      {/* Top Container */}
      <View className="flex flex-col md:flex-row w-full gap-6">
        {/* Contact Details */}
        <CustomerBasicInfo
          customerData={customerData}
          handleInputChange={handleInputChange}
          handlePhoneChange={handlePhoneChange} // Pass the phone handler if needed
          editMode={true}
        />
        {/* Billing Address */}
        <CustomerBillingAddress
          customerData={customerData}
          handleInputChange={handleInputChange}
          editMode={true}
        />
      </View>
    </View>
  );
};

export default AddNewCustomerForm;
