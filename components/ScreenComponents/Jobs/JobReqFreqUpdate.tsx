import React, { useState } from "react";
import { View, Pressable } from "react-native";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { Large } from "~/components/ui/typography";
import { cn } from "~/lib/utils";

// Frequency options for recurring events
const frequencyOptions = [
  { label: "None", value: "none" },
  { label: "Daily", value: "daily" },
  { label: "Weekly", value: "weekly" },
  { label: "Monthly", value: "monthly" },
  { label: "Yearly", value: "yearly" },
];

// Frequency options for recurring events
const WeeklyfrequencyOptions = [
  { label: "Mon", value: "mon" },
  { label: "Tue", value: "tue" },
  { label: "Wed", value: "wed" },
  { label: "Thu", value: "thu" },
  { label: "Fri", value: "fri" },
  { label: "Sat", value: "sat" },
  { label: "Sun", value: "sun" },
];

const JobReqFreqUpdate = () => {
  const [selectedFrequency, setSelectedFrequency] = useState<string>("none");
  const [selectedWeeklyFrequency, setSelectedWeeklyFrequency] =
    useState<string>("mon");
  const [showCustomDays, setShowCustomDays] = useState(false); // For showing custom day selection

  // Toggle custom days visibility based on frequency selection
  const handleFrequencyChange = (frequency: string) => {
    setSelectedFrequency(frequency);
    if (frequency === "weekly") {
      setShowCustomDays(true); // Show custom days option for "weekly"
    } else {
      setShowCustomDays(false);
    }
  };

  // Toggle custom days visibility based on frequency selection
  const handleWeeklyFrequencyChange = (frequency: string) => {
    setSelectedWeeklyFrequency(frequency);
  };

  return (
    <View className="flex gap-2 p-4 border border-input rounded-md">
      <Large>Set Recurring Frequency</Large>

      {/* Render frequency options */}
      {frequencyOptions.map((option) => (
        <Button
          key={option.value}
          onPress={() => handleFrequencyChange(option.value)}
          variant={selectedFrequency === option.value ? "default" : "secondary"}
        >
          <Text>{option.label}</Text>
        </Button>
      ))}

      {/* Show custom days selection if Weekly is selected */}
      {showCustomDays && (
        <View className="my-4">
          <Large>Choose Recurrence Days</Large>
          <View className="flex flex-row flex-wrap gap-2">
            {WeeklyfrequencyOptions.map((option) => (
              <Button
                key={option.value}
                onPress={() => handleWeeklyFrequencyChange(option.value)}
                variant={
                  selectedWeeklyFrequency === option.value
                    ? "default"
                    : "secondary"
                }
              >
                <Text>{option.label}</Text>
              </Button>
            ))}
          </View>
        </View>
      )}

      {/* Display selected frequency */}

      <Text>
        Selected Frequency:{" "}
        {selectedFrequency === "none" ? "None" : selectedFrequency} until Due
        Date.
      </Text>
    </View>
  );
};

export default JobReqFreqUpdate;
