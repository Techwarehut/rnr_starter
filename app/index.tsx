import * as React from "react";
import { View, Platform } from "react-native";
import { Stack, useRouter } from "expo-router";
import { Text } from "~/components/ui/text"; // Assuming you have a Text component
import { ThemeToggle } from "~/components/ThemeToggle";
import { Button } from "~/components/ui/button";
import { useAuth } from "~/ctx/AuthContext";
import HomePage from "~/components/ScreenComponents/Public/HomePage";
import { JoinWaitlist } from "~/components/ScreenComponents/JoinWaitlist";
import Head from "expo-router/head";

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
        <Head>
          <title>Veylo - Streamline Job Scheduling & Business Management</title>

          <meta
            name="description"
            content="Veylo helps small businesses manage clients, schedule jobs, and streamline operations with ease. Discover the ultimate tool to boost productivity and grow your business today."
          />

          <meta
            property="og:title"
            content="Veylo - Streamline Job Scheduling & Business Management"
          />
          <meta
            property="og:description"
            content="Streamline your business operations with Veylo. Manage clients, schedules, invoices, and more with ease."
          />
          <meta
            property="og:image"
            content="https://veylo.app/assets/assets/images/AppScreens/Light/DashboardTilted.png"
          />
          <meta property="og:url" content="https://yourdomain.com" />
          <meta property="og:type" content="website" />

          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="twitter:title"
            content="Veylo - Streamline Job Scheduling & Business Management"
          />
          <meta
            name="twitter:description"
            content="Veylo empowers small businesses to grow efficiently. Manage clients, jobs, and schedules with ease."
          />
          <meta
            name="twitter:image"
            content="https://veylo.app/assets/assets/images/AppScreens/Light/DashboardTilted.png"
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
        </Head>

        <Stack.Screen
          options={{
            headerRight: () => (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: 10,
                }}
              >
                <ThemeToggle />
                {/* <Button className="shadow shadow-foreground/5" onPress={login}>
                  <Text>Login</Text>
                </Button> */}
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
