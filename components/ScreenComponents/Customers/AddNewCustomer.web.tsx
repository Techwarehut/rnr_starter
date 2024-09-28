import { View } from "react-native";
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
export function AddNewCustomer() {
  return (
    <View className="flex-1 flex-row justify-center items-center m-2 gap-1">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            size="sm"
            variant="default"
            className="shadow shadow-foreground/5"
          >
            <Text>Add New Customer</Text>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Custome</DialogTitle>
            <DialogDescription>Form will appear here</DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <DialogClose asChild>
              <Button>
                <Text>Cancel</Text>
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </View>
  );
}
