import * as React from "react";
import { View, Platform } from "react-native";
import { Stack, useRouter } from "expo-router";
import { Text } from "~/components/ui/text"; // Assuming you have a Text component
import { ThemeToggle } from "~/components/ThemeToggle";
import { Button } from "~/components/ui/button";
import { useAuth } from "~/ctx/AuthContext";
import HomePage from "~/components/ScreenComponents/Public/HomePage";
import { JoinWaitlist } from "~/components/ScreenComponents/JoinWaitlist";
import { Helmet } from "react-helmet";

export default function Screen() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [hasMounted, setHasMounted] = React.useState(false);

  console.log("Iam here in index");

  const login = () => {
    router.replace("/login");
  };

  // If platform is web, show "I am in Home screen" text
  if (Platform.OS === "web") {
    return (
      <>
        <Helmet>
          <title>Veylo - Job Scheduling & Business Management</title>

          <script type="application/ld+json">
            {`
            {
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "Veylo",
              "url": "https://veylo.app",
              "description": "Veylo is a field service platform for managing purchase orders, jobs, and schedules.",
              "operatingSystem": "Cross-platform",
              "applicationCategory": "BusinessApplication",
              "offers": {
                "@type": "Offer",
                "price": 4.99,
                "priceCurrency": "USD"
              }
            }
          `}
          </script>

          <meta
            name="description"
            content="Veylo is a field service platform for managing purchase orders with vendors, tracking jobs and hours with employees, and handling invoices and estimates with customers—all in one seamless solution."
          />
          <meta
            property="og:title"
            content="Veylo - Job Scheduling & Business Management"
          />
          <meta
            property="og:description"
            content="Veylo is a field service platform for managing purchase orders with vendors, tracking jobs and hours with employees, and handling invoices and estimates with customers—all in one seamless solution."
          />
          <meta
            property="og:image"
            content="https://veylo.app/assets/assets/images/AppScreens/Dark/DashboardTilted.png"
          />
          <meta property="og:url" content="https://veylo.app" />
          <meta property="og:type" content="website" />

          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="twitter:title"
            content="Veylo - Job Scheduling & Business Management"
          />
          <meta
            name="twitter:description"
            content="Veylo empowers small businesses to grow efficiently. Manage clients, jobs, and schedules with ease."
          />
          <meta
            name="twitter:image"
            content="https://veylo.app/VeyloFacebookCover.png"
          />

          <meta
            name="keywords"
            content="Veylo, job scheduling software, business management, small business tools, client management, invoicing, Jobber alternative, field service management"
          />

          <meta name="robots" content="index, follow" />

          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />

          <link rel="canonical" href="https://veylo.app" />
        </Helmet>
        <Stack.Screen
          options={{
            headerRight: () => (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: 2,
                }}
              >
                <ThemeToggle />
                <Button
                  variant="outline"
                  size="sm"
                  accessibilityRole="button"
                  aria-label="UI Demo"
                  onPress={login}
                >
                  <Text>UI Demo</Text>
                </Button>
                <JoinWaitlist />
              </View>
            ),
          }}
        />
        <HomePage />
      </>
    );
  }

  // Ensure that the navigation happens after the component has mounted
  React.useEffect(() => {
    setHasMounted(true); // Mark component as mounted
  }, []);

  React.useEffect(() => {
    // If platform is not web (iOS/Android), redirect to "/login" screen
    if (hasMounted && !isAuthenticated && Platform.OS !== "web") {
      router.replace("/login"); // Perform the navigation
    }
  }, [hasMounted, isAuthenticated, router]);

  return null; // Return nothing, as the user is redirected
}
