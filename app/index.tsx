import * as React from "react";
import { View, ScrollView } from "react-native";

import { Button } from "~/components/ui/button";
import Animated, {
  withTiming,
  useSharedValue,
  useAnimatedStyle,
  withDelay,
} from "react-native-reanimated";
import { Text } from "~/components/ui/text";

import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Link, useRouter } from "expo-router";

import { Stack } from "expo-router";
import { ThemeToggle } from "~/components/ThemeToggle";
import { H1, H2, H3, Muted, P, Small } from "~/components/ui/typography";
import { useIsLargeScreen } from "~/lib/utils";
import { useAuth } from "~/ctx/AuthContext";

import { Helmet } from "react-helmet";

export default function Login() {
  const [userName, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { login } = useAuth();

  const router = useRouter();

  const onChangeUserName = (text: string) => {
    setUserName(text);
  };

  const onChangePassword = (text: string) => {
    setPassword(text);
  };

  const signUp = () => {
    router.push("/createaccount");
  };

  const handlelogin = (user: string, pwd: string) => {
    login(user, pwd);
    // router.replace("/(tabs)");
  };

  // Shared value to control the visibility of each item
  const animations = Array(4)
    .fill(null)
    .map((_, index) => useSharedValue(0));

  const isLargeScreen = useIsLargeScreen();

  return (
    <>
      <Helmet>
        <title>Login - Veylo</title>

        <meta
          name="description"
          content="Log in to your Veylo account to manage jobs, clients, invoices, and schedules with ease. Secure and efficient access to your business management tools."
        />
        <meta property="og:title" content="Login - Veylo" />
        <meta
          property="og:description"
          content="Log in to your Veylo account to manage jobs, clients, invoices, and schedules with ease."
        />
        <meta
          property="og:image"
          content="https://veylo.app/VeyloFacebookCover.png"
        />
        <meta property="og:url" content="https://veylo.app/login" />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Login - Veylo" />
        <meta
          name="twitter:description"
          content="Log in to your Veylo account to manage jobs, clients, and schedules seamlessly."
        />
        <meta
          name="twitter:image"
          content="https://veylo.app/VeyloFacebookCover.png"
        />

        <meta name="robots" content="index, follow" />

        <link rel="canonical" href="https://veylo.app/login" />
      </Helmet>

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
              <Button className="shadow shadow-foreground/5" onPress={signUp}>
                <Text>Sign Up</Text>
              </Button>
            </View>
          ),
        }}
      />
      <ScrollView
        bounces={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View
          className={`${
            isLargeScreen ? "items-center justify-center" : ""
          }   flex p-4 gap-4`}
        >
          <H1 className="text-foreground text-left">
            Run your business from anywhere
          </H1>
          <H2>Sign into your account</H2>
        </View>
        <View /* className="flex-1 justify-between items-center p-4"> */
          className={`${
            isLargeScreen
              ? "flex-1 flex-row flex-wrap justify-evenly gap-8"
              : "flex-1 flex-col justify-between"
          }   items-center p-4`}
        >
          <View className="gap-8">
            {isLargeScreen && (
              <H3>Everything you need and nothing you don't!</H3>
            )}
            {[
              "Send Professional Estimates",
              "Schedule Jobs",
              "Track Purchases",
              "Batch Invoice",
            ].map((text, index) => {
              const animatedStyle = useAnimatedStyle(() => {
                return {
                  opacity: animations[index].value,
                  transform: [
                    {
                      translateY: withTiming(
                        animations[index].value === 1 ? 0 : 10
                      ),
                    },
                  ],
                };
              });

              React.useEffect(() => {
                animations[index].value = withDelay(
                  index * 300,
                  withTiming(1, { duration: 2500 })
                );
              }, []);

              // Move the return statement outside the curly braces
              return (
                isLargeScreen && (
                  <Animated.View key={index} style={animatedStyle}>
                    <P
                      className={`text-foreground text-left border-l-4 pl-4 mb-2 ml-8 ${
                        index % 2 === 0
                          ? "border-brand-primary"
                          : "border-brand-secondary"
                      }`}
                    >
                      {text}
                    </P>
                  </Animated.View>
                )
              );
            })}
          </View>
          <View /* className="flex-1 justify-between items-center p-4"> */
            className={`${
              isLargeScreen ? "w-auto" : "w-full"
            }   gap-4 justify-center items-center p-4`}
          >
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
            {/* <View className="gap-4 w-full">
              <View className="gap-2">
                <Label nativeID="email">Email</Label>
                <Input
                  placeholder="Business Email"
                  value={userName}
                  onChangeText={onChangeUserName}
                  aria-labelledby="email"
                  aria-errormessage="inputError"
                />
                <Small className="text-destructive">
                  Use 'owner', 'lead' or 'member' to check out different roles.
                </Small>
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
                <Small className="text-destructive">
                  Leave Password blank.
                </Small>
                <View style={{ alignSelf: "flex-end" }}>
                  <Button variant="link" onPress={() => {}}>
                    <Text className="text-primary text-right">
                      Forgot Password
                    </Text>
                  </Button>
                </View>
              </View>
            </View> */}
            <P>
              Check out what you as a business owner, your team lead or your
              employee would see!
            </P>
            <Button
              // variant="outline"
              size="lg"
              className="shadow shadow-foreground/5 w-full"
              onPress={() => handlelogin("owner", "")}
            >
              <Text>Login as Business Owner</Text>
            </Button>
            <Button
              variant="secondary"
              size="lg"
              className="shadow shadow-foreground/5 w-full"
              onPress={() => handlelogin("lead", "")}
            >
              <Text>Login as Team Lead</Text>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="shadow shadow-foreground/5 w-full"
              onPress={() => handlelogin("member", "")}
            >
              <Text>Login as Employee</Text>
            </Button>

            <View>
              <Muted className="text-center">
                By continuing, you agree to our{" "}
                <Link href="https://veylo.app/termsofservice">
                  <Muted className="underline">Terms of Service</Muted>
                </Link>{" "}
                and{" "}
                <Link href="https://veylo.app/privacypolicy">
                  <Muted className="underline">Privacy Policy</Muted>
                </Link>
              </Muted>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
