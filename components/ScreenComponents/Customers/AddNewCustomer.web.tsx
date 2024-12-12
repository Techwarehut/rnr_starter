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
import { Customer } from "./types";

interface AddNewCustomerProps {
  onNewCustAdd: (data: Customer) => void;
}
export const AddNewCustomer: React.FC<AddNewCustomerProps> = ({
  onNewCustAdd,
}) => {
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

  const AddNewCust = () => {
    console.log(customerData);
  };

  return (
    <ScrollView contentContainerClassName="flex-1 justify-center items-center p-6 ">
      <Dialog>
        <DialogTrigger asChild>
          <Button size="sm" variant="default">
            <Text>Add New Customer</Text>
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-[300px] md:max-w-full">
          <DialogHeader>
            <DialogTitle>Add New Customer</DialogTitle>
            <DialogDescription>
              <AddNewCustomerForm onChange={setCustomerData} />
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <DialogClose asChild className="w-full">
              <Button onPress={() => onNewCustAdd(customerData)}>
                <Text>Save</Text>
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </ScrollView>
  );
};
