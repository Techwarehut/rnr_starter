import { View } from "react-native";
import React from "react";
import { H1, P } from "~/components/ui/typography";

const TitleSection = () => {
  return (
    <View className="flex max-w-xl lg:max-w-3xl items-center justify-center text-center px-4 self-center gap-8 my-12">
      <H1 className="leading-tight my-4">
        Are You Still Running Your Business Like It’s 2010?
      </H1>
      <P>
        For years, businesses has relied on pen, paper, and spreadsheets—and it
        worked… kind of. But what you are missing is that time saved is money
        earned.
      </P>
    </View>
  );
};

export default TitleSection;
