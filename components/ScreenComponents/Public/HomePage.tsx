import * as React from "react";
import { Image, View } from "react-native";
import { Text } from "~/components/ui/text";
import { H1, H2, H3, P } from "~/components/ui/typography";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "~/components/ui/card";
import { ScrollView } from "react-native";
import { Button } from "~/components/ui/button";
import TitleSection from "./Elements/TitleSection";

import ProblemStatement from "./Elements/ProblemStatement";
import FeatureSummary from "./Elements/FeatureSummary";
import CTA from "./Elements/CTA";
import Pricing from "./Elements/Pricing";
import Footer from "./Elements/Footer";
import Faq from "./Elements/faq";
import Vision from "./Elements/Vision";

const HomePage = () => {
  return (
    <ScrollView>
      <View className="flex w-full flex-col bg-background">
        <TitleSection />

        <ProblemStatement />
        <Vision />
        <CTA />

        <Pricing />
        <Faq />
        <Footer />
      </View>
    </ScrollView>
  );
};

export default HomePage;
