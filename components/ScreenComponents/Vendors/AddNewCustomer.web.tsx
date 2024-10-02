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

import React from "react";
import { Vendor } from "./types";
import AddNewVendorForm from "./AddNewCustomerForm";

interface AddNewVendorProps {
  onNewVendorAdd: (data: Vendor) => void;
}
export const AddNewVendor: React.FC<AddNewVendorProps> = ({
  onNewVendorAdd,
}) => {
  // Initialize with a default Customer object, including _id
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

  const AddNewVendor = () => {};

  return (
    <ScrollView contentContainerClassName="flex-1 justify-center items-center p-6 ">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            size="sm"
            variant="default"
            className="shadow shadow-foreground/5"
          >
            <Text>Add New Vendor</Text>
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-[300px] md:max-w-full">
          <DialogHeader>
            <DialogTitle>Add New Vendor</DialogTitle>
            <DialogDescription>
              <AddNewVendorForm onChange={setVendorData} />
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <DialogClose asChild className="w-full">
              <Button onPress={() => onNewVendorAdd(vendorData)}>
                <Text>Save</Text>
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </ScrollView>
  );
};
