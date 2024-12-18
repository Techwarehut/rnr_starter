import React from "react";
import { View, Linking } from "react-native";
import { Button } from "~/components/ui/button";
import { Facebook } from "~/lib/icons/Facebook";
import { Linkedin } from "~/lib/icons/Linkedin";
import { Youtube } from "~/lib/icons/Youtube";
import { Instagram } from "~/lib/icons/Instagram";
import { Twitter } from "~/lib/icons/Twitter";
import { Text } from "~/components/ui/text";

const Footer = () => {
  const openLink = (url: string) => {
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open link", err)
    );
  };

  return (
    <View className="flex md:flex-row bg-secondary p-4 border-t border-input items-center justify-around gap-2">
      <Text className="bg-accent-secondary">© 2025 Veylo</Text>
      <View className="flex flex-row gap-2">
        <Button
          variant="link"
          onPress={() => openLink("https://example.com/terms")}
        >
          <Text className="bg-accent-secondary">Terms and Conditions</Text>
        </Button>
        <Button
          variant="link"
          onPress={() => openLink("https://example.com/privacy")}
        >
          <Text className="bg-accent-secondary">Privacy Policy</Text>
        </Button>
      </View>
      <View className="flex flex-row gap-2">
        <Button
          variant="link"
          onPress={() => openLink("https://facebook.com/veyloapp")}
        >
          <Facebook className="text-primary" size={18} />
        </Button>
        <Button variant="link" onPress={() => openLink("https://twitter.com")}>
          <Youtube className="text-primary" size={18} />
        </Button>
        <Button
          variant="link"
          onPress={() => openLink("https://www.instagram.com/veyloapp")}
        >
          <Instagram className="text-primary" size={18} />
        </Button>
        <Button
          variant="link"
          onPress={() => openLink("https://www.linkedin.com/company/veyloapp")}
        >
          <Linkedin className="text-primary" size={18} />
        </Button>
        <Button
          variant="link"
          onPress={() => openLink("https://www.youtube.com/@VeyloApp")}
        >
          <Youtube className="text-primary" size={18} />
        </Button>
        <Button
          variant="link"
          onPress={() => openLink("https://x.com/VeyloApp")}
        >
          <Twitter className="text-primary" size={18} />
        </Button>
      </View>
    </View>
  );
};

export default Footer;
