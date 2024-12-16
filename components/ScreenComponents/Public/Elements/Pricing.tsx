import { View } from "react-native";
import React from "react";
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

const Pricing = () => {
  return (
    <View className="flex w-full p-8 gap-8 items-center justify-around mt-12 ">
      <H2>Pricing</H2>

      <View className="flex w-full md:flex-row gap-4 items-center justify-evenly">
        <Card className="p-4 max-w-sm gap-4 ring-2">
          <CardTitle>Starter</CardTitle>
          <CardDescription>
            Ideal for businesses that are starting out and have less than 4
            employees
          </CardDescription>
          <CardContent></CardContent>
          <CardFooter>
            <JoinWaitlist />
          </CardFooter>
        </Card>

        <Card className="p-4 max-w-sm gap-4 bg-secondary ring-2">
          <CardTitle>Core</CardTitle>
          <CardDescription>
            Ideal for businesses that are growing and have more than 4 but less
            than 15 employees
          </CardDescription>
          <CardContent></CardContent>
          <CardFooter>
            <JoinWaitlist />
          </CardFooter>
        </Card>

        <Card className="p-4 max-w-sm gap-4 bg-accent ring-2 shadow-2xl">
          <CardTitle>Grow</CardTitle>
          <CardDescription>
            Ideal for businesses than need unlimited employee support.
          </CardDescription>
          <CardContent></CardContent>
          <CardFooter>
            <JoinWaitlist />
          </CardFooter>
        </Card>
      </View>
    </View>
  );
};

export default Pricing;
