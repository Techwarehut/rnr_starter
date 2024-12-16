import { View } from "react-native";
import React from "react";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { H2, H3, P } from "~/components/ui/typography";
import { JoinWaitlist } from "../../JoinWaitlist";

const FeatureSummary = () => {
  return (
    <View className="flex flex-col p-8 bg-accent/40 rounded-md gap-4 m-4 max-w-xl">
      <H3>Veylo brings you the solution</H3>
      <P>
        Imagine starting your day knowing exactly who is doing what, where
        they’re working, and all the details at their fingertips.
      </P>
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
          Log hours while on the job
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
      <View className="flex flex-row mt-8 self-end gap-2">
        <Button>
          <Text>Take a Demo tour</Text>
        </Button>
      </View>
    </View>
  );
};

export default FeatureSummary;
