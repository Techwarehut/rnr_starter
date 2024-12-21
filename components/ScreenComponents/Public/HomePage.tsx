import { View } from "react-native";

import { ScrollView } from "react-native";

import TitleSection from "./Elements/TitleSection";

import ProblemStatement from "./Elements/ProblemStatement";

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
