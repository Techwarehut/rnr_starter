import React from "react";
import { View, Linking, Platform } from "react-native";
import { Button } from "~/components/ui/button";
import { Facebook } from "~/lib/icons/Facebook";
import { Linkedin } from "~/lib/icons/Linkedin";
import { Youtube } from "~/lib/icons/Youtube";
import { Instagram } from "~/lib/icons/Instagram";
import { Twitter } from "~/lib/icons/Twitter";
import { Text } from "~/components/ui/text";
import { useRouter } from "expo-router";

const Footer = () => {
  const openLink = (url: string) => {
    if (Platform.OS === "web") {
      window.open(url, "_blank"); // Open in a new tab for the web
    } else {
      Linking.openURL(url).catch((err) =>
        console.error("Failed to open link", err)
      );
    }
  };

  const router = useRouter();

  return (
    <View className="flex md:flex-row bg-secondary p-4 border-t border-input items-center justify-around gap-2">
      <Text className="bg-accent-secondary">© 2025 Veylo</Text>
      <View className="flex flex-row gap-2">
        <Button variant="link" onPress={() => router.push("/termsofservice")}>
          <Text className="bg-accent-secondary">Terms of Service</Text>
        </Button>
        <Button variant="link" onPress={() => router.push("/privacypolicy")}>
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
