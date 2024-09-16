import * as React from "react";
import { View } from "react-native";
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

export default function Screen() {
  const [userName, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmpassword, setConfirmPassword] = React.useState("");

  const router = useRouter();

  const onChangeUserName = (text: string) => {
    setUserName(text);
  };

  const onChangePassword = (text: string) => {
    setPassword(text);
  };
  const onChangeConfirmPassword = (text: string) => {
    setConfirmPassword(text);
  };

  const SignUp = () => {
    router.replace("/(tabs)");
  };

  const login = () => {
    router.replace("/");
  };

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
              <Button className="shadow shadow-foreground/5" onPress={login}>
                <Text>Sign Up</Text>
              </Button>
            </View>
          ),
        }}
      />
      <View className="flex-1 justify-center items-center gap-5 p-6 bg-secondary/30">
        <Card className="w-full max-w-sm p-6 rounded-2xl">
          <CardHeader className="items-center">
            <FastForward
              className="text-foreground"
              size={86}
              strokeWidth={1.25}
            />
            <View className="p-3" />
            <CardTitle className="pb-2 text-center">Sign up</CardTitle>
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
              </View>
              <View className="gap-2">
                <Label nativeID="confirmpassword">Confirm Password</Label>
                <Input
                  placeholder="Password"
                  value={confirmpassword}
                  onChangeText={onChangeConfirmPassword}
                  aria-labelledby="confirmpassword"
                  aria-errormessage="inputError"
                  secureTextEntry={true}
                />
              </View>
            </View>
          </CardContent>
          <CardFooter className="flex-col gap-3 pb-0">
            <Button
              // variant="outline"
              size="lg"
              className="shadow shadow-foreground/5 w-full"
              onPress={SignUp}
            >
              <Text>Sign Up</Text>
            </Button>
          </CardFooter>
        </Card>
      </View>
    </>
  );
}
