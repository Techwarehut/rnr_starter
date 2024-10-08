import * as React from "react";
import { Pressable, TextInput, View } from "react-native";
import { cn } from "~/lib/utils";

import { X } from "~/lib/icons/X";

const SearchInput = React.forwardRef<
  React.ElementRef<typeof TextInput>,
  React.ComponentPropsWithoutRef<typeof TextInput> & {
    // Only keeping the necessary props
    value: string; // Make value required
  }
>(({ className, placeholderClassName, value, onChangeText, ...props }, ref) => {
  const handleClear = () => {
    if (onChangeText) {
      onChangeText(""); // Clear the text when the icon is pressed
    }
  };

  return (
    <View className="relative flex-1">
      <TextInput
        ref={ref}
        value={value} // Use the value prop from the parent
        onChangeText={onChangeText} // Call the parent's onChangeText directly
        className={cn(
          "web:flex h-10 native:h-12 rounded-md border border-input bg-background px-3 web:py-2 text-base lg:text-sm native:text-lg native:leading-[1.25] text-foreground placeholder:text-muted-foreground web:ring-offset-background file:border-0 file:bg-transparent file:font-medium web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2",
          className
        )}
        placeholderClassName={cn("text-muted-foreground", placeholderClassName)}
        {...props}
      />
      {value.length > 0 && (
        <Pressable
          onPress={handleClear}
          className="absolute right-3 top-1/2 transform -translate-y-1/2"
        >
          <X className="text-primary" size={18} />
        </Pressable>
      )}
    </View>
  );
});

SearchInput.displayName = "SearchInput";

export { SearchInput };
