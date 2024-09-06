import { StyleSheet, Text, View } from "react-native";
import { ThemeToggle } from "~/components/ThemeToggle";

export default function SignUp() {
  return (
    <View style={styles.container}>
      <Text>I am in Purchases Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
