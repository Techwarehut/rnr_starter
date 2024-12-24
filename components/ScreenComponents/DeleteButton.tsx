import React, { useState } from "react";
import { View } from "react-native";
import { Button } from "../ui/button"; // Assuming this renders a <button> element

import { X } from "~/lib/icons/X";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Text } from "../ui/text";

interface ActionButtonsProps {
  onDelete: () => void;
  xIcon?: boolean;
}

const DeleteButton: React.FC<ActionButtonsProps> = ({
  onDelete,
  xIcon = false,
}) => {
  const [isAlertDialogOpen, setAlertDialogOpen] = useState(false);

  // Handle the delete action and close the dialog
  const handleDeleteAndClose = () => {
    onDelete(); // Call the delete function passed as a prop
    setAlertDialogOpen(false); // Close the dialog after performing the delete action
  };

  return (
    <Dialog open={isAlertDialogOpen} onOpenChange={setAlertDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant={xIcon ? "link" : "destructive"}
          onPress={() => setAlertDialogOpen(true)}
          size={xIcon ? "icon" : "default"}
        >
          {xIcon ? (
            <X className="text-destructive" size={18} />
          ) : (
            <Text className="text-destructive-foreground">Delete</Text>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the
            {xIcon ? " data for selected item" : " selected item"}.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">
              <Text>Cancel</Text>
            </Button>
          </DialogClose>
          <Button variant="destructive" onPress={handleDeleteAndClose}>
            <Text>Continue</Text>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteButton;
