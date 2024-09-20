import * as React from "react";
import { View, Image, useWindowDimensions, ScrollView } from "react-native";
import Animated, {
  FadeInUp,
  FadeOutDown,
  LayoutAnimationConfig,
} from "react-native-reanimated";
import { Info } from "~/lib/icons/Info";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Progress } from "~/components/ui/progress";
import { Text } from "~/components/ui/text";

import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { useRouter } from "expo-router";
import { FastForward } from "~/lib/icons/FastForward";
import { Stack } from "expo-router";
import { ThemeToggle } from "~/components/ThemeToggle";
import { H1, H2, Muted } from "~/components/ui/typography";

export default function Screen() {
  const [userName, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");

  const router = useRouter();

  const onChangeUserName = (text: string) => {
    setUserName(text);
  };

  const onChangePassword = (text: string) => {
    setPassword(text);
  };

  const signUp = () => {
    router.push("/SignUp");
  };

  const login = () => {
    router.replace("/(tabs)");
  };

  const googleLogoUri =
    "https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg";

  const { width } = useWindowDimensions();
  const isLargeScreen = width > 680; // Adjust threshold as needed

  return (
    <>
      <Stack.Screen
        options={{
          title: "App Name",
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
              <Button className="shadow shadow-foreground/5" onPress={signUp}>
                <Text>Sign Up</Text>
              </Button>
            </View>
          ),
        }}
      />

      <View /* className="flex-1 justify-between items-center p-4"> */
      className={`${
        isLargeScreen
          ? "flex-row"
          : "flex-col"
      }  flex-1 justify-between items-center p-4`}>
        <View className="gap-4">
          <H1 className="text-foreground text-left">Sign into your account</H1>
          <Text className="text-base text-left">
            Run your business from anywhere!
          </Text>
        </View>
        <View className="gap-4 justify-center items-center w-full p-4">
          {/* <Button variant="outline" size="lg" onPress={login}>
            <View className="flex-row items-center gap-1 w-full">
              <Image
                source={{ uri: googleLogoUri }}
                style={{ width: 20, height: 20, marginRight: 8 }} // Adjust size and margin
              />
              <Text>Sign in with Google</Text>
            </View>
          </Button>

          <View className="flex-row items-center gap-3">
            <View className="flex-1 h-px bg-muted" />
            <Muted>OR CONTINUE WITH</Muted>
            <View className="flex-1 h-px bg-muted" />
          </View> */}
          <View className="gap-4 w-full">
            <View className="gap-2">
              <Label nativeID="email">Email</Label>
              <Input
                placeholder="Business Email"
                value={userName}
                onChangeText={onChangeUserName}
                aria-labelledby="email"
                aria-errormessage="inputError"
              />
            </View>

            <View className="gap-2">
              <Label nativeID="password">Password</Label>
              <Input
                placeholder="Password"
                value={password}
                onChangeText={onChangePassword}
                aria-labelledby="password"
                aria-errormessage="inputError"
                secureTextEntry={true}
              />
              <View style={{ alignSelf: "flex-end" }}>
                <Button variant="link" onPress={login}>
                  <Text className="text-primary text-right">
                    Forgot Password
                  </Text>
                </Button>
              </View>
            </View>
          </View>
          <Button
            // variant="outline"
            size="lg"
            className="shadow shadow-foreground/5 w-full"
            onPress={login}
          >
            <Text>Login</Text>
          </Button>
          <View>
            <Muted className="text-center">
              By continuing, you agree to our{" "}
              <Muted className="underline">Terms of Service</Muted> and{" "}
              <Muted className="underline">Privacy Policy</Muted>
            </Muted>
          </View>
        </View>
      </View>
    </>
  );
}
