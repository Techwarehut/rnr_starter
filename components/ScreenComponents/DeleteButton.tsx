import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Button } from "../ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { X } from "~/lib/icons/X";

interface ActionButtonsProps {
  onDelete: () => void;
  xIcon?: boolean;
}

const DeleteButton: React.FC<ActionButtonsProps> = ({
  onDelete,
  xIcon = false,
}) => {
  const [isAlertDialogOpen, setAlertDialogOpen] = useState(false);

  console.log("Alert Dialog", xIcon);

  return (
    <AlertDialog open={isAlertDialogOpen} onOpenChange={setAlertDialogOpen}>
      <AlertDialogTrigger asChild>
        <Button variant={xIcon ? "link" : "destructive"}>
          {xIcon ? (
            <X className="text-destructive" size={18} />
          ) : (
            <Text className="text-destructive-foreground">Delete</Text>
          )}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            {xIcon ? " data for selected item" : " selected item"}.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            <Text className="text-accent-foreground">Cancel</Text>
          </AlertDialogCancel>
          <AlertDialogAction
            onPress={onDelete}
            className="bg-destructive text-destructive-foreground"
          >
            <Text className="text-destructive-foreground">Continue</Text>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteButton;
