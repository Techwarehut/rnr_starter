import { StyleSheet, Text, useWindowDimensions, View } from "react-native";

export default function Settings() {
  const { width } = useWindowDimensions();
  const isLargeScreen = width > 600; // Adjust threshold as needed
  return (
    <View
      style={[styles.container, isLargeScreen && styles.largeScreenPadding]}
    >
      <Text className="text-primary">I am in Settings Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: "center",
    // alignItems: "center",
  },
  largeScreenPadding: {
    paddingLeft: 80, // This matches the width of your sidebar
  },
});
