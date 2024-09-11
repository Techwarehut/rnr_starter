import { StyleSheet, useWindowDimensions, View } from "react-native";
import { Text } from "~/components/ui/text";

export default function CustomerScreen() {
  const { width } = useWindowDimensions();
  const isLargeScreen = width > 600; // Adjust threshold as needed
  return (
    <View
      style={[styles.container, isLargeScreen && styles.largeScreenPadding]}
    >
      <Text>I am in Customer Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: "center",
    //alignItems: "center",
  },
  largeScreenPadding: {
    paddingLeft: 80, // This matches the width of your sidebar
  },
});
