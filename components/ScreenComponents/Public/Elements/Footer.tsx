import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";

const Footer = () => {
  const openLink = (url: string) => {
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open link", err)
    );
  };

  return (
    <View style={styles.footer}>
      <Text style={styles.copyright}>© 2024 Your Company Name</Text>
      <View style={styles.linksContainer}>
        <TouchableOpacity onPress={() => openLink("https://example.com/terms")}>
          <Text style={styles.link}>Terms and Conditions</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => openLink("https://example.com/privacy")}
        >
          <Text style={styles.link}>Privacy Policy</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.socialLinks}>
        <TouchableOpacity onPress={() => openLink("https://facebook.com")}>
          <Text style={styles.social}>Facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openLink("https://twitter.com")}>
          <Text style={styles.social}>Twitter</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openLink("https://instagram.com")}>
          <Text style={styles.social}>Instagram</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    backgroundColor: "#f8f8f8",
    padding: 16,
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#e0e0e0",
  },
  copyright: {
    fontSize: 14,
    color: "#555",
    marginBottom: 8,
  },
  linksContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 8,
  },
  link: {
    fontSize: 14,
    color: "#007BFF",
    marginHorizontal: 8,
    textDecorationLine: "underline",
  },
  socialLinks: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 8,
  },
  social: {
    fontSize: 14,
    color: "#555",
    marginHorizontal: 8,
  },
});

export default Footer;
