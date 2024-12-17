import { View } from "react-native";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { Text } from "~/components/ui/text";
import { H2 } from "~/components/ui/typography";

const Faq = () => {
  return (
    <View className="flex md:flex-row w-full p-8 gap-8 items-center justify-around mt-12 ">
      <H2>Frequently Asked Questions</H2>
      <Accordion
        type="multiple"
        collapsible
        defaultValue={["item-1"]}
        className="w-full max-w-2xl"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <Text className="text-primary">What is Veylo?</Text>
          </AccordionTrigger>
          <AccordionContent>
            <Text>
              Veylo is an all-in-one business management platform built to
              simplify operations, manage clients, and streamline B2X
              transactions for service-based businesses. Whether you’re managing
              jobs, scheduling, or team coordination, Veylo helps you operate
              seamlessly and grow efficiently.
            </Text>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>
            <Text className="text-primary">When will Veylo launch?</Text>
          </AccordionTrigger>
          <AccordionContent>
            <Text>
              Veylo is scheduled to launch in mid-2025. By joining our waitlist,
              you’ll be among the first to access the platform and its full
              range of features.
            </Text>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>
            <Text className="text-primary">
              What are the benefits of joining the waitlist?
            </Text>
          </AccordionTrigger>
          <AccordionContent>
            <Text>
              Joining the waitlist early gives you: - **Free access** to Veylo
              for the entire **first year**. - Access to the **Grow Plan**,
              which allows you to add **unlimited employees**. - A chance to
              participate in a **professional photo shoot** to showcase your
              business in our marketing campaigns, giving you added visibility.
            </Text>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>
            <Text className="text-primary">How do I join the waitlist?</Text>
          </AccordionTrigger>
          <AccordionContent>
            <Text>
              Simply visit [insert website link], enter your email, and secure
              your spot. We’ll keep you updated with the latest news and let you
              know as soon as Veylo is live.
            </Text>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
          <AccordionTrigger>
            <Text className="text-primary">
              How will I know if I’m selected for the photo shoot?
            </Text>
          </AccordionTrigger>
          <AccordionContent>
            <Text>
              If you’re selected for the photo shoot, our team will reach out to
              you directly with details and next steps. It’s a great opportunity
              to showcase your business while helping us market Veylo.
            </Text>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-6">
          <AccordionTrigger>
            <Text className="text-primary">
              Is there any cost to join the waitlist?
            </Text>
          </AccordionTrigger>
          <AccordionContent>
            <Text>
              No, joining the waitlist is completely **free**. You’ll also
              receive exclusive early access and a full year of premium benefits
              at no cost.
            </Text>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </View>
  );
};

export default Faq;
