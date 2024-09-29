import { Platform, View } from "react-native";
import React from "react";
import { Text } from "~/components/ui/text";
import CustomerBillingAddress from "./FormElements/CustomerBillingAddress";
import CustomerBasicInfo from "./FormElements/CustomerBasicInfo";
import CustomerInfoFields from "./FormElements/CustomerNameField";
import { BillingAddress, Customer } from "./types"; // Ensure this imports the correct type
import { formatPhoneNumber } from "~/lib/utils";
import { Muted } from "~/components/ui/typography";
import { ScrollView } from "react-native-gesture-handler";
import { Button } from "~/components/ui/button";

interface AddCustomerFormProps {
  customer: Customer;
  onChange: (data: Customer) => void;
}

const AddNewCustomerForm: React.FC<AddCustomerFormProps> = ({
  customer,
  onChange,
}) => {
  const [customerData, setCustomerData] = React.useState<Customer>(customer);

  const handleInputChange = (field: string, value: string) => {
    let updatedCustomerData = { ...customerData };

    // Check if the field is a key of BillingAddress
    if (field in updatedCustomerData.billingAddress) {
      updatedCustomerData.billingAddress = {
        ...updatedCustomerData.billingAddress,
        [field as keyof BillingAddress]: value, // Cast to BillingAddress key
      };
    }
    // Check if the field is NOT in BillingAddress but IS in Customer
    else if (
      !(field in updatedCustomerData.billingAddress) &&
      !(field in updatedCustomerData.siteLocations) &&
      field in updatedCustomerData
    ) {
      updatedCustomerData = {
        ...updatedCustomerData,
        [field]: value,
      };
    }
    // Handle case where field is not found in either
    else {
      console.warn(
        `Field ${field} does not exist in Customer or BillingAddress.`
      );
    }

    // Update state with the new customer data
    setCustomerData(updatedCustomerData);
    onChange(updatedCustomerData); // Call onChange with the updated data
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
      <CustomerInfoFields
        customerData={customerData}
        handleInputChange={handleInputChange}
        editMode={true}
      />

      {/* Top Container */}
      <View className="md:flex-row gap-6">
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
      <View className="flex w-full gap-4 mb-8">
        <Muted>You can add site loactions after adding customer.</Muted>
      </View>
    </ScrollView>
  );
};

export default AddNewCustomerForm;
