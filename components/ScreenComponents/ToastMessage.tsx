import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { useIsLargeScreen } from "~/lib/utils";

export function useToast() {
  const insets = useSafeAreaInsets();
  const isLargeScreen = useIsLargeScreen();
  console.log(insets);

  const showSuccessToast = (text2: string) => {
    console.log("I am here");
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

  /*  const showBaseToast = (text2: string) => {
    Toast.show({
      type: "base",
      text1: "Heads up!",
      text2:
        text2 || "You can use a terminal to run commands on your computer.",
      props: {
        // icon: Terminal,
      },
      topOffset: insets.top === 0 ? 12 : insets.top,
    });ß
  }; */

  return {
    showSuccessToast,
    showErrorToast,
  };
}
