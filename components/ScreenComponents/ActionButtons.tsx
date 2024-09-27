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

interface ActionButtonsProps {
  onEdit: () => void;
  onDelete: () => void;
  onSave: () => void;
  editMode: boolean;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  onEdit,
  onDelete,
  onSave,
  editMode,
}) => {
  const [isAlertDialogOpen, setAlertDialogOpen] = useState(false);
  return (
    <View className="flex-row gap-2 mx-2">
      {editMode ? (
        <Button variant="outline" onPress={onSave}>
          <Text className="text-secondary-foreground">Save</Text>
        </Button>
      ) : (
        <Button variant="secondary" onPress={onEdit}>
          <Text className="text-secondary-foreground">Edit</Text>
        </Button>
      )}

      <AlertDialog open={isAlertDialogOpen} onOpenChange={setAlertDialogOpen}>
        <AlertDialogTrigger asChild>
          <Button
            variant="destructive"
            className="shadow-sm shadow-foreground/10 items-center justify-center "
          >
            <Text className="text-destructive-foreground">Delete</Text>
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              selected item.
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
    </View>
  );
};

export default ActionButtons;
