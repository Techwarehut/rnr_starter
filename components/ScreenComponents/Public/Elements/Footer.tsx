import React from "react";
import { View, Text, Linking } from "react-native";
import { Button } from "~/components/ui/button";

const Footer = () => {
  const openLink = (url: string) => {
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open link", err)
    );
  };

  return (
    <View className="flex bg-accent p-4 border-t border-input items-center gap-2">
      <Text>© 2025 Veylo</Text>
      <View className="flex flex-row gap-2">
        <Button
          variant="link"
          onPress={() => openLink("https://example.com/terms")}
        >
          <Text>Terms and Conditions</Text>
        </Button>
        <Button
          variant="link"
          onPress={() => openLink("https://example.com/privacy")}
        >
          <Text>Privacy Policy</Text>
        </Button>
      </View>
      <View className="flex flex-row gap-2">
        <Button variant="link" onPress={() => openLink("https://facebook.com")}>
          <Text>Facebook</Text>
        </Button>
        <Button variant="link" onPress={() => openLink("https://twitter.com")}>
          <Text>Twitter</Text>
        </Button>
        <Button
          variant="link"
          onPress={() => openLink("https://instagram.com")}
        >
          <Text>Instagram</Text>
        </Button>
      </View>
    </View>
  );
};

export default Footer;
