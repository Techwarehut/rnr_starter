import React from "react";
import { View, Text } from "react-native";
import Toast, {
  BaseToast,
  ErrorToast,
  ToastConfigParams,
} from "react-native-toast-message";

import { cn } from "~/lib/utils";

const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={cn("border-l-4 border-pink-500")}
      contentContainerStyle={cn("px-4")}
      text1Style={cn("text-base font-normal")}
    />
  ),
  error: (props: any) => (
    <ErrorToast
      {...props}
      text1Style={cn("text-lg")}
      text2Style={cn("text-base")}
    />
  ),
  /* customSuccessToast: ({ text1, props }: ToastConfigParams<any>) => (
    <View className="h-15 w-full">
      <Text>{text1 || "Default Success Message"}</Text>
      {props?.uuid && <Text>{props.uuid}</Text>}
    </View>
  ), */
};

export default toastConfig;
