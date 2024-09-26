import React from "react";
import { View } from "react-native";

import { H3, Muted } from "../ui/typography";

const NothingSelected = () => {
  return (
    <View className="flex-1 items-center justify-center md:border md:border-input md:rounded-md m-2 p-5">
      <H3>Select an item to read</H3>
      <Muted>Nothing is selected</Muted>
    </View>
  );
};

export default NothingSelected;
