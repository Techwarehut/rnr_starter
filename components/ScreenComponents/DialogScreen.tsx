import React from "react";
import { ScrollView } from "react-native";
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

interface DialogScreenProps {
  title: React.ReactNode;
  content: React.ReactNode;
  trigger: React.ReactNode;
  action: React.ReactNode;
}

const DialogScreen: React.FC<DialogScreenProps> = ({
  title,
  content,
  trigger,
  action,
}) => {
  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
      }}
    >
      <Dialog>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{content}</DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <DialogClose asChild>
              <Button>
                <Text>Cancel</Text>
              </Button>
            </DialogClose>
            {action}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </ScrollView>
  );
};

export default DialogScreen;
