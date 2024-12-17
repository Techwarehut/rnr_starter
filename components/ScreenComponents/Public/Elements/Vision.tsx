import { Image, View } from "react-native";
import React from "react";
import { Text } from "~/components/ui/text";
import { H2 } from "~/components/ui/typography";

const Vision = () => {
  return (
    <View className="flex flex-col p-2 pt-12 rounded-md gap-2 items-center justify-center my-12">
      <View className="flex md:flex-row gap-2 items-center justify-around flex-wrap w-full">
        <View className="flex items-center justify-center w-full md:w-auto">
          <Image
            source={require("~/assets/images/AppScreens/Light/Checklists.png")}
            alt="Mobile preview"
            resizeMode="contain"
            className="w-[80%] h-[auto] md:w-[397px] md:h-[326px] max-w-full"
            style={{
              width: 397, // Fixed width
              height: 326, // Fixed height
            }}
          />
        </View>
        <View className="flex gap-8 max-w-2xl p-2">
          <H2>Veylo is a platform designed for all B2X transactions.</H2>
          <Text>
            Veylo is a field service platform for managing purchase orders with
            vendors, tracking jobs and hours with employees, and handling
            invoices and estimates with customers—all in one seamless solution.
          </Text>
        </View>

        <View className="flex items-center justify-center w-full md:w-auto">
          <Image
            source={require("~/assets/images/AppScreens/Light/JobFeatures.png")}
            alt="Mobile preview"
            resizeMode="contain"
            className="w-[80%] h-[auto] md:w-[397px] md:h-[326px] max-w-full"
            style={{
              width: 397, // Fixed width
              height: 326, // Fixed height
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default Vision;
