// InputField.tsx
import React from "react";
import { KeyboardTypeOptions, View } from "react-native";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";

interface InputFieldProps {
  label: string;
  value: string;
  placeholder?: string;
  onChangeText: (value: string) => void;
  editable: boolean;
  nativeID: string;
  keyboardType?: KeyboardTypeOptions;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  placeholder,
  onChangeText,
  editable = true,
  nativeID,
  keyboardType,
}) => {
  return (
    <View className="gap-1 w-full">
      <Label nativeID={nativeID}>{label}</Label>
      <Input
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        editable={editable}
        aria-labelledby={nativeID}
        aria-errormessage="inputError"
        keyboardType={keyboardType || "default"}
      />
    </View>
  );
};

export default InputField;
