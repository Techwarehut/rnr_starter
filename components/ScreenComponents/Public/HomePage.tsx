import * as React from "react";
import { View } from "react-native";
import { Text } from "~/components/ui/text";
import { H1, H3, P } from "~/components/ui/typography";
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

const HomePage = () => {
  return (
    <ScrollView>
      <View className="flex w-full flex-col p-4 gap-4 bg-secondary">
        {/* Hero Section */}
        <View className="flex w-full mb-8 bg-primary text-white p-8 rounded-lg shadow-lg">
          <H1 className="text-primary-foreground">
            Are You Still Running Your Business Like It’s 2010?
          </H1>
          <P className="mt-2 text-primary-foreground">
            For years, businesses have relied on pen, paper, and
            spreadsheets—and it worked… kind of. But what you're missing is that
            time saved is money earned.
          </P>
          <H3 className="mt-4 text-primary-foreground">
            Upgrade to a mobile app and automated scheduling with us!
          </H3>
          <Button variant="outline">Get Started</Button>
        </View>

        {/* Features Section */}
        <View className="flex w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <FeatureCard
            title="Create Jobs"
            icon="🛠️"
            description="Easily create and manage jobs directly from your mobile app."
          />
          <FeatureCard
            title="Schedule"
            icon="📅"
            description="Schedule jobs and track progress in real-time."
          />
          <FeatureCard
            title="Purchase Orders"
            icon="🛒"
            description="Link images and notes to jobs and manage purchases."
          />
          <FeatureCard
            title="Batch Invoice"
            icon="💸"
            description="Batch invoice customers, saving time and reducing errors."
          />
          <FeatureCard
            title="Employee Hours"
            icon="⏰"
            description="Add and track hours for each employee per job."
          />
          <FeatureCard
            title="Job Approval"
            icon="✔️"
            description="Select approved jobs and pull all necessary data automatically."
          />
        </View>

        {/* Detailed Feature Descriptions Section */}
        <View className="flex w-full grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <DetailedFeature
            title="Create Jobs"
            image="job-create.jpg"
            description="Create, edit, and track jobs seamlessly. Attach relevant documents, images, and notes."
          />
          <DetailedFeature
            title="Scheduling"
            image="scheduling.jpg"
            description="Automatically schedule jobs based on availability and priority."
          />
          <DetailedFeature
            title="Purchase Orders"
            image="purchase-orders.jpg"
            description="Manage purchases directly within the app and approve them as needed."
          />
          <DetailedFeature
            title="Batch Invoice"
            image="batch-invoicing.jpg"
            description="Easily batch and send invoices, saving time and streamlining billing."
          />
        </View>

        {/* Testimonial Section */}
        <View className="flex w-full text-center bg-secondary text-white py-12">
          <H3 className="text-2xl mb-4">What Our Clients Say</H3>
          <P className="text-lg mb-4">
            "This app transformed how we manage jobs. We save hours every week!"
          </P>
          <Text className="font-semibold">John Doe, CEO of Acme Corp</Text>
        </View>

        {/* Final Call to Action Section */}
        <View className="flex w-full text-center py-12 bg-accent text-white">
          <H3 className="text-2xl mb-4">Ready to Start?</H3>
          <P className="mb-6">
            Join the hundreds of businesses that trust us to streamline their
            workflow.
          </P>
          <Text className="bg-white text-accent py-3 px-8 rounded-full font-semibold cursor-pointer hover:bg-accent-dark transition-all">
            Start Your Free Trial
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

// Feature Card Component using Card
const FeatureCard = ({
  title,
  icon,
  description,
}: {
  title: string;
  icon: string;
  description: string;
}) => (
  <Card className="flex flex-col items-center p-6">
    <CardHeader className="flex flex-col items-center">
      <Text className="text-5xl">{icon}</Text>
      <CardTitle className="mt-4">{title}</CardTitle>
    </CardHeader>
    <CardContent className="text-center">
      <CardDescription>{description}</CardDescription>
    </CardContent>
  </Card>
);

// Detailed Feature Component
const DetailedFeature = ({
  title,
  image,
  description,
}: {
  title: string;
  image: string;
  description: string;
}) => (
  <View className="flex items-center">
    <img
      src={`/assets/${image}`}
      alt={title}
      className="w-full h-auto rounded-lg shadow-md mb-4"
    />
    <H3 className="text-xl">{title}</H3>
    <P className="mt-2">{description}</P>
  </View>
);

export default HomePage;
