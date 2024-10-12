import React from "react";
import { View } from "react-native";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "~/components/ui/card"; // Replace with your actual imports
import { Customer } from "./types"; // Make sure to define your Customer type
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { formatPhoneNumber, useIsLargeScreen } from "~/lib/utils";
import SiteContactInfo from "./SiteLocationElements/SiteContactInfo";
import SiteLocationInfo from "./SiteLocationElements/SiteLocation";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import DeleteButton from "../DeleteButton";

interface SiteLocationCardProps {
  customer: Customer;
  editMode: boolean;
  handleInputChange: (field: string, value: string, siteIndex: number) => void;
  handleDelete: (siteId: string) => void; // New prop for delete handler
}

const SiteLocationCard: React.FC<SiteLocationCardProps> = ({
  customer,
  editMode,
  handleInputChange,
  handleDelete,
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
          <CardFooter>
            <DeleteButton onDelete={() => handleDelete(site.site_id)} />
          </CardFooter>
        </Card>
      ))}
    </>
  );
};

export default SiteLocationCard;
