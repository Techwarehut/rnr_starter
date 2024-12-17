import { Image, View } from "react-native";
import React from "react";
import { H2, Large, P } from "~/components/ui/typography";
import { Text } from "~/components/ui/text";
import FeatureSummary from "./FeatureSummary";
import { JoinWaitlist } from "../../JoinWaitlist";

const ProblemStatement = () => {
  return (
    <View className="flex flex-col p-2 py-12 my-12  bg-secondary/40 rounded-md gap-8 items-center justify-around">
      <View className="flex md:flex-row gap-4 flex-wrap items-center justify-center w-full">
        <View className="flex gap-4 max-w-2xl">
          <H2>Tired of the daily grind in your business?</H2>
          <P>
            Lost schedules, misplaced purchase orders, long hours spent
            invoicing, and tracking team hours?
          </P>
          <FeatureSummary />
        </View>

        <View className="flex items-center justify-center w-full md:w-auto">
          <Image
            source={require("~/assets/images/AppScreens/Light/DashboardTilted.png")}
            alt="Mobile preview"
            resizeMode="contain"
            className="w-[80%] h-[auto] md:w-[447px] md:h-[558px] max-w-full"
            style={{
              width: 447, // Fixed width
              height: 558, // Fixed height
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default ProblemStatement;
