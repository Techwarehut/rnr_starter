import { View, Text, Image } from "react-native";
import React from "react";
import { JoinWaitlist } from "../../JoinWaitlist";
import { H2, H3, P } from "~/components/ui/typography";
import ComingSoon from "./ComingSoon";
import { useColorScheme } from "~/lib/useColorScheme";

const CTA = () => {
  const { isDarkColorScheme } = useColorScheme();

  /* const ImageURL = isDarkColorScheme
    ? "/assets/images/AppScreens/Dark/JobsLaptop.png"
    : "/assets/images/AppScreens/Light/JobsLaptop.png"; */
  return (
    <View className="flex flex-col p-4 py-12 md:p-8 my-12 gap-8 items-center justify-around bg-accent/40">
      <View className="flex md:flex-row-reverse gap-4 flex-wrap items-center justify-center w-full">
        <View className="flex gap-4 max-w-2xl">
          <H2>Managing Jobs is a Headache—We Get It.</H2>
          <P>
            Imagine having all your jobs, purchase orders, estimates, and
            invoices neatly organized in one place! Effortlessly group, filter,
            and update job statuses with ease.
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
            source={
              isDarkColorScheme
                ? require("~/assets/images/AppScreens/Dark/JobsLaptop.png")
                : require("~/assets/images/AppScreens/Light/JobsLaptop.png")
            }
            // source={{ uri: ImageURL }} // Dynamic URI
            alt="Mobile preview of Job Detail showing job description, logged hours, site contact and Checklist. Also a Laptop preview showing the list of Jobs to easily group and filter."
            resizeMode="contain"
            className="w-[80%] h-[auto] md:w-[636px] md:h-[393px] max-w-full"
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
