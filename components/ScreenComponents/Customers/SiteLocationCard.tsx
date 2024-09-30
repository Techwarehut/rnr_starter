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
import SiteContactInfo from "./SiteLocationElements/SiteContactInfo";
import SiteLocationInfo from "./SiteLocationElements/SiteLocation";

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
    console.log(phone);
    const formattedPhone = formatPhoneNumber(phone);
    console.log(formattedPhone);
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
          <CardContent>
            <SiteContactInfo
              site={site}
              handleInputChange={handleInputChange}
              editMode={editMode}
              index={index}
            />
            <SiteLocationInfo
              site={site}
              handleInputChange={handleInputChange}
              handlePhoneChange={handlePhoneChange}
              editMode={editMode}
              index={index}
            />
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default SiteLocationCard;
