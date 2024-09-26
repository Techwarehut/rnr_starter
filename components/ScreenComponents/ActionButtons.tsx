import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Button } from "../ui/button";

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
  return (
    <View className="flex-row gap-2">
      {editMode ? (
        <Button
          variant="secondary"
          className="shadow-sm shadow-foreground/10 items-center justify-center "
          onPress={onSave}
        >
          <Text>Save</Text>
        </Button>
      ) : (
        <Button
          variant="secondary"
          className="shadow-sm shadow-foreground/10 items-center justify-center "
          onPress={onEdit}
        >
          <Text>Edit</Text>
        </Button>
      )}
      <Button
        variant="destructive"
        className="shadow-sm shadow-foreground/10 items-center justify-center "
        onPress={onDelete}
      >
        <Text>Delete</Text>
      </Button>
    </View>
  );
};

export default ActionButtons;
