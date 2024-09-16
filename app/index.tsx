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
      <ScrollView className="flex-1">
        <View className="flex-1 flex-row flex-wrap justify-center items-center">
          {isLargeScreen && (
            <View
              style={{ minWidth: 400 }}
              className="flex gap-8 p-8 align-left"
            >
              <H1 className="text-foreground text-left">Your tagline</H1>
              <View className="flex gap-3">
                <Muted className="text-base text-left ml-8">Feature1</Muted>
                <Muted className="text-base text-left ml-8">Feature2</Muted>
                <Muted className="text-base text-left ml-8">Feature3</Muted>
                <Muted className="text-base text-left ml-8">Feature4</Muted>
                <Muted className="text-base text-left ml-8">Feature5</Muted>
              </View>
            </View>
          )}
          <View className="border border-input flex justify-center items-center m-2 rounded-lg">
            <View className="p-4 native:pb-24 max-w-md gap-6">
              <View className="gap-4">
                <H2 className="text-foreground text-center">
                  Sign into your account
                </H2>
                <Muted className="text-base text-center">
                  Sign in with your google account or use your email below.
                </Muted>
                <Button variant="outline" onPress={login}>
                  <View className="flex-row items-center gap-1">
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
                </View>
                <View className="gap-4">
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
                      <Button
                        variant="link"
                        className="shadow shadow-foreground/5"
                        onPress={login}
                      >
                        <Text className="text-primary mt-2 text-right">
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
          </View>
        </View>
      </ScrollView>
      {/*<View className="flex-1 justify-center items-center gap-5 p-6 bg-secondary/30">
        <Card className="w-full max-w-sm md:w-1/2 p-6 rounded-2xl">
          <CardHeader className="items-center">
            <FastForward
              className="text-foreground"
              size={86}
              strokeWidth={1.25}
            />
            <View className="p-3" />
            <CardTitle className="pb-2 text-center">
              Log in to your account
            </CardTitle>
            <View className="flex-row">
              <CardDescription className="text-base font-semibold">
                Manage your business with Brisk
              </CardDescription>
            </View>
          </CardHeader>

          <CardContent>
            <View className="gap-4">
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
                  <Button
                    variant="link"
                    className="shadow shadow-foreground/5"
                    onPress={login}
                  >
                    <Text className="text-primary mt-2 text-right">
                      Forgot Password
                    </Text>
                  </Button>
                </View>
              </View>
            </View>
          </CardContent>
          <CardFooter className="flex-col gap-3 pb-0">
            <Button
              // variant="outline"
              size="lg"
              className="shadow shadow-foreground/5 w-full"
              onPress={login}
            >
              <Text>Login</Text>
            </Button>
          </CardFooter>
        </Card>
      </View>*/}
    </>
  );
}
