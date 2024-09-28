import React from "react";
import { View, Text } from "react-native";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";

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
  /* tomatoToast: ({ text1, props }: { text1: string; props: any }) => (
    <View style={NativeWindStyleSheet('h-15 w-full bg-tomato')}>
      <Text>{text1}</Text>
      <Text>{props.uuid}</Text>
    </View>
  ), */
};

export function App() {
  return (
    <>
      {/* Other components go here */}
      <Toast config={toastConfig} />
    </>
  );
}
