import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { useIsLargeScreen } from "~/lib/utils";

export function useToast() {
  const insets = useSafeAreaInsets();
  const isLargeScreen = useIsLargeScreen();

  const showSuccessToast = (text2: string) => {
    Toast.show({
      type: "success",
      text1: "Success!",
      text2: text2,
      //position: isLargeScreen ? "top" : "bottom",
      topOffset: isLargeScreen ? (insets.top === 0 ? 12 : insets.top) : 0,
      bottomOffset: insets.bottom === 0 ? 12 : insets.bottom,
    });
  };

  const showErrorToast = (text2: string) => {
    Toast.show({
      type: "error",
      text1: "Error",
      text2: text2,
      topOffset: insets.top === 0 ? 12 : insets.top,
    });
  };

  /* const showCustomSuccessToast = (text1: string, text2: string) => {
    Toast.show({
      type: "customSuccessToast",
      text1: text1, // Provide a primary message
      props: { uuid: text2 }, // Optional: Pass additional props if needed
      topOffset: insets.top === 0 ? 12 : insets.top,
    });
  };
 */
  return {
    showSuccessToast,
    showErrorToast,
    //showCustomSuccessToast,
  };
}
