import { View, Text, Image } from "react-native";
import React from "react";
import { JoinWaitlist } from "../../JoinWaitlist";
import { H2, H3, P } from "~/components/ui/typography";
import ComingSoon from "./ComingSoon";

const CTA = () => {
  return (
    <View className="flex flex-col p-2 py-12 my-12 bg-accent/40 rounded-md gap-8 items-center justify-around">
      <View className="flex md:flex-row-reverse gap-4 flex-wrap items-center justify-center w-full">
        <View className="flex gap-4 max-w-2xl">
          <H2>Managing Jobs is a Headache—We Get It.</H2>
          <P>
            Imagine having all your jobs, purchase orders, estimates, and
            invoices organized in one place! Easily group and filter
          </P>
          <View className="flex flex-col p-8 bg-secondary/40 rounded-md gap-4 m-4">
            <H3>Don’t wait—shape the tool that’s built for you.</H3>
            <P className="text-primary">
              Limited number of customers get lifetime deals, preferred pricing
              and a FREE marketing shoot.
            </P>
            <ComingSoon />
            <View className="flex flex-row self-end">
              <JoinWaitlist />
            </View>
          </View>
        </View>
        <View className="flex items-center justify-center w-full md:w-auto">
          <Image
            source={require("~/assets/images/AppScreens/Light/JobsLaptop.png")}
            alt="Mobile preview"
            resizeMode="contain"
            className="w-[80%] h-[auto] md:w-[447px] md:h-[558px] max-w-full"
            style={{
              width: 636, // Fixed width
              height: 393, // Fixed height
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default CTA;
