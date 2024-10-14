// InputField.tsx
import React from "react";
import { View } from "react-native";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { Textarea } from "../ui/textarea";

interface TextFieldProps {
  label: string;
  value: string;
  placeholder?: string;
  onChangeText: (value: string) => void;
  editable: boolean;
  nativeID: string;
}

const TextField: React.FC<TextFieldProps> = ({
  label,
  value,
  placeholder,
  onChangeText,
  editable = true,
  nativeID,
}) => {
  return (
    <View className="gap-1 w-full">
      <Label nativeID={nativeID}>{label}</Label>
      <Textarea
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        editable={editable}
        aria-labelledby={nativeID}
        aria-errormessage="inputError"
      />
    </View>
  );
};

export default TextField;
