import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Button } from "../ui/button";

import DeleteButton from "./DeleteButton";

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

      <DeleteButton onDelete={onDelete} />
    </View>
  );
};

export default ActionButtons;
