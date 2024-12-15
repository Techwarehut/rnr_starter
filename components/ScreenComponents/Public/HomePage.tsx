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

const HomePage = () => {
  return (
    <ScrollView>
      <View className="flex w-full flex-col p-4 gap-4 bg-background">
        {/* Hero Section */}
        <View className="flex flex-col gap-4 mb-10">
          {/* Title Section */}
          <View className="flex max-w-xl lg:max-w-3xl items-center justify-center text-center px-4 self-center gap-4 mb-12">
            <H1 className="leading-tight mb-4">
              Are You Still Running Your Business Like It’s 2010?
            </H1>
            <P>
              For years, businesses has relied on pen, paper, and
              spreadsheets—and it worked… kind of. But what you are missing is
              that time saved is money earned.
            </P>
          </View>

          {/* Cards Grid */}
          <View className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1: Mobile Friendly */}
            <View className="flex flex-col">
              {/*  <H2>Take it easy</H2>
              <P>
                Know exactly what’s going on today with Mobile Apps for
                employees and Manager.
              </P> */}
              <View className="flex w-full h-auto items-center justify-center mt-4">
                <Image
                  source={require("~/assets/images/AppScreens/DashboardFrame.png")}
                  alt="Mobile preview"
                  resizeMode="contain"
                  style={{
                    width: 400, // Fixed width
                    height: 600, // Fixed height
                  }}
                />
              </View>
            </View>

            {/* Card 2: Performance */}
            <View className="flex flex-col gap-8">
              <View className="flex flex-col p-4 bg-primary rounded-md gap-4">
                <H2 className="text-primary-foreground">
                  Tired of the daily grind in your business?
                </H2>
                <P className="text-primary-foreground">
                  Lost schedules, misplaced purchase orders, long hours spent
                  invoicing, and tracking team hours—it’s overwhelming and eats
                  into your productivity.
                </P>
              </View>
              {/* Card 4: Security */}
              <View className="flex flex-col p-4 bg-accent/40 rounded-md md:col-span-2 gap-4 lg:col-span-1">
                <H2>Manage Jobs Anytime, Anywhere</H2>
                <ul className="list-inside space-y-2 text-lg text-foreground">
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    Easily access job details
                  </li>
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    Enhance quality with checklists
                  </li>
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    Log hours seamlessly while on the job
                  </li>
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    Upload images and add quick notes
                  </li>
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    Batch Invoice for completed Jobs
                  </li>
                </ul>

                <Button>
                  <Text>Take a Demo tour</Text>
                </Button>
              </View>
            </View>

            {/* Card 3: Powerful APIs */}
            <View className="flex flex-col ">
              {/*  <H2>Manage Jobs Anytime, Anywhere</H2>
              <P>
                Easily access job details, enhance quality with checklists, and
                log hours seamlessly while on the job. Upload images, add quick
                notes for better documentation, and mark tasks as complete to
                stay organized and efficient.
              </P> */}
              <View className="flex w-full h-auto items-center justify-center mt-4">
                <Image
                  source={require("~/assets/images/AppScreens/JobDetail-1.png")}
                  alt="Mobile preview"
                  resizeMode="contain"
                  style={{
                    width: 400, // Fixed width
                    height: 600, // Fixed height
                  }}
                />
              </View>
            </View>
          </View>
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
    <Image
      src="~/assets/images/AppScreens/DashboardScreen.png"
      alt="Mobile app preview"
      className="flex w-full rounded-lg border-4 border-primary shadow-xl"
    />
    <H3 className="text-xl">{title}</H3>
    <P className="mt-2">{description}</P>
  </View>
);

export default HomePage;
