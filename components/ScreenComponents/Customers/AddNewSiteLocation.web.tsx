import { ScrollView, View } from "react-native";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Text } from "~/components/ui/text";
import AddNewCustomerForm from "./AddNewCustomerForm";
import React from "react";
import { Customer, SiteLocation } from "./types";
import AddNewSiteForm from "./AddNewSiteForm";

interface AddNewSiteProps {
  onAddNewSite: (data: SiteLocation) => void;
}

export const AddNewSiteLocation: React.FC<AddNewSiteProps> = ({
  onAddNewSite,
}) => {
  // Initialize with a default Customer object, including _id
  // Initialize with a default Customer object, including _id
  const [newSiteLocation, setNewSiteLocation] = React.useState<SiteLocation>({
    site_id: "",
    siteName: "",
    siteContactPerson: "",
    siteContactPhone: "",
    AddressLine: "",
    City: "",
    Province: "",
    zipcode: "",
  });

  const AddNewSite = () => {
    if (onAddNewSite) onAddNewSite(newSiteLocation);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Text>Add New</Text>
        </Button>
      </DialogTrigger>
      <DialogContent className="flex-1 w-full">
        <DialogHeader>
          <DialogTitle>Add New Site</DialogTitle>
          <DialogDescription>
            <AddNewSiteForm
              onChange={(data) => {
                setNewSiteLocation(data);
                // Programmatically close the dialog
              }}
            />
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button onPress={AddNewSite}>
              <Text>Save</Text>
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
