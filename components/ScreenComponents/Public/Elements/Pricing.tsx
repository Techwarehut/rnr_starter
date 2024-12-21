import { View } from "react-native";

import { Text } from "~/components/ui/text";
import { H2 } from "~/components/ui/typography";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "~/components/ui/card";
import { JoinWaitlist } from "../../JoinWaitlist";
import PricingFeatures from "./PricingFeatures";

const Pricing = () => {
  return (
    <View className="flex w-full p-8 gap-8 items-center justify-around mt-12 ">
      <H2>Pricing</H2>
      <Text className="text-primary text-lg">
        Five businesses in Toronto, Canada will receive it for FREE, with a
        white-label solution and self-hosting.
      </Text>

      <View className="flex w-full md:flex-row gap-4 items-center justify-evenly flex-wrap">
        <Card className="p-4 max-w-sm gap-4 ring-2">
          <CardTitle>Starter</CardTitle>
          <CardDescription>
            Ideal for businesses that are starting out and have less than 4
            employees
          </CardDescription>
          <CardContent>
            <PricingFeatures />
          </CardContent>
          <CardFooter>
            <View className="flex flex-row items-center justify-between gap-2 w-full">
              <View>
                <Text className="text-primary line-through">$9.99</Text>
                <Text className="text-destructive text-xl">$4.99</Text>
              </View>
              <JoinWaitlist />
            </View>
          </CardFooter>
        </Card>

        <Card className="p-4 max-w-sm gap-4 bg-accent/40 ">
          <CardTitle>Core</CardTitle>
          <CardDescription>
            Ideal for businesses that are growing and have more than 4 but less
            than 15 employees
          </CardDescription>
          <CardContent>
            <PricingFeatures />
          </CardContent>
          <CardFooter>
            <View className="flex flex-row items-center justify-between gap-2 w-full">
              <View>
                <Text className="text-primary line-through">$49.99</Text>
                <Text className="text-destructive text-xl">$19.99</Text>
              </View>
              <JoinWaitlist />
            </View>
          </CardFooter>
        </Card>

        <Card className="p-4 max-w-sm gap-4 bg-secondary ring-2 shadow-2xl">
          <CardTitle>Grow</CardTitle>
          <CardDescription>
            Ideal for businesses than need unlimited employee access and
            premimum dedicated servers.
          </CardDescription>
          <CardContent>
            <PricingFeatures />
          </CardContent>
          <CardFooter>
            <View className="flex flex-row items-center justify-between gap-2 w-full">
              <View>
                <Text className="text-primary line-through">$199.99</Text>
                <Text className="text-destructive text-xl">$59.99</Text>
              </View>
              <JoinWaitlist />
            </View>
          </CardFooter>
        </Card>
      </View>
    </View>
  );
};

export default Pricing;
