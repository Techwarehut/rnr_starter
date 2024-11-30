import React, { useState, useEffect } from "react";
import { View, Pressable } from "react-native";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { defaultRecurrence, JobRecurrence } from "./types";
import {
  frequencyOptions,
  generateFrequencyText,
  generateFrequencyText2,
  WeeklyfrequencyOptions,
} from "~/lib/utils";
import { DateType } from "react-native-ui-datepicker";
import { Repeat } from "~/lib/icons/Repeat";
import {
  addWeeks,
  addMonths,
  addYears,
  differenceInCalendarWeeks,
  differenceInCalendarMonths,
  differenceInCalendarYears,
  differenceInDays,
  startOfWeek,
} from "date-fns"; // Import date-fns for recurrence logic
import { Dayjs } from "dayjs";
import { Muted } from "~/components/ui/typography";

interface JobReqFreqUpdateProps {
  recurrence?: JobRecurrence; // Make recurrence optional
  onRecurrenceChange: (recurrence: JobRecurrence) => void; // Callback to handle changes
  dueDate: DateType; // `dueDate` is passed as `DateType`
}

const JobReqFreqUpdate: React.FC<JobReqFreqUpdateProps> = ({
  recurrence,
  onRecurrenceChange,
  dueDate,
}) => {
  const [localrecurrence, setLocalRecurrence] = useState<JobRecurrence>(
    recurrence || defaultRecurrence
  );

  // Use recurrence or fallback to defaultRecurrence
  const { type, daysOfWeek, completedIterations } =
    localrecurrence || defaultRecurrence;

  const [selectedFrequency, setSelectedFrequency] = useState<string>(type);
  const [selectedWeeklyFrequency, setSelectedWeeklyFrequency] =
    useState<string>(daysOfWeek);
  const [showCustomDays, setShowCustomDays] = useState<boolean>(
    type === "weekly"
  );
  const [refreshKey, setRefreshKey] = useState(0);

  // Convert `dueDate` (DateType) to a JavaScript Date object
  const getDateFromDateType = (dateType: DateType): Date => {
    if (dateType === null || dateType === undefined) {
      throw new Error("Received null or undefined dueDate");
    }

    if (typeof dateType === "string") {
      const dateObj = new Date(dateType);

      if (isNaN(dateObj.getTime())) {
        throw new Error("Invalid date string format");
      }

      return dateObj;
    }

    if (typeof dateType === "number") {
      // Treat number as a Unix timestamp (milliseconds)
      return new Date(dateType);
    }

    if (dateType instanceof Date) {
      return dateType; // If it's already a Date object, return as-is
    }

    if (dateType instanceof Dayjs) {
      return dateType.toDate(); // If it's a Dayjs object, convert to Date
    }

    throw new Error("Invalid date type received");
  };

  // Function to calculate the next due date based on recurrence type
  const calculateNextDueDate = (
    currentDueDate: Date,
    recurrence: { type: string; daysOfWeek: string }
  ): Date => {
    let nextDueDate = currentDueDate;

    switch (recurrence.type) {
      case "weekly":
        nextDueDate = addWeeks(currentDueDate, 1); // Add one week for weekly recurrence
        break;
      case "monthly":
        nextDueDate = addMonths(currentDueDate, 1); // Add one month for monthly recurrence
        break;
      case "yearly":
        nextDueDate = addYears(currentDueDate, 1); // Add one year for yearly recurrence
        break;
      case "daily":
        nextDueDate.setDate(currentDueDate.getDate() + 1); // Add one day for daily recurrence
        break;
      case "none":
        break; // No recurrence
      default:
        console.warn("Invalid recurrence type");
        break;
    }

    return nextDueDate;
  };

  // Function to get the next day of the week (e.g., next Monday) from a given date
  const getNextDayOfWeek = (currentDate: Date, dayOfWeek: string): Date => {
    const daysMap: { [key: string]: number } = {
      mon: 1,
      tue: 2,
      wed: 3,
      thu: 4,
      fri: 5,
      sat: 6,
      sun: 0,
    };

    const currentDay = currentDate.getDay();
    const targetDay = daysMap[dayOfWeek.toLowerCase()];
    let daysToAdd = targetDay - currentDay;

    // If the target day is today or has already passed this week, move to next week
    if (daysToAdd <= 0) {
      daysToAdd += 7;
    }

    // Add days to current date
    return new Date(currentDate.setDate(currentDate.getDate() + daysToAdd));
  };

  // Function to calculate total iterations and generate due dates
  const generateDueDates = (
    startDate: Date,
    recurrence: JobRecurrence,
    endDate: Date
  ): Date[] => {
    const dueDates: Date[] = [];
    let nextDueDate = startDate;
    let totalIterations = 0;

    // Calculate total iterations based on recurrence type and difference to dueDate

    switch (recurrence.type) {
      case "weekly":
        totalIterations = differenceInCalendarWeeks(endDate, startDate);

        break;
      case "monthly":
        totalIterations = differenceInCalendarMonths(endDate, startDate);

        break;
      case "yearly":
        totalIterations = differenceInCalendarYears(endDate, startDate);

        break;
      case "daily":
        totalIterations = differenceInDays(endDate, startDate);

        break;
      case "none":
        totalIterations = 0;
        break;
      default:
        console.warn("Invalid recurrence type");
        break;
    }

    // Ensure there is at least one iteration
    totalIterations = totalIterations > 0 ? totalIterations : 1;

    // Generate due dates based on the calculated total iterations
    for (let i = 0; i < totalIterations; i++) {
      if (recurrence.type === "weekly") {
        // If weekly, find the next specific day (e.g., every Monday)
        nextDueDate = getNextDayOfWeek(nextDueDate, recurrence.daysOfWeek);
      } else {
        // Otherwise, apply the recurrence logic (monthly, yearly, etc.)
        nextDueDate = calculateNextDueDate(nextDueDate, recurrence);
      }

      // Corrected: Push the current nextDueDate into dueDates before updating for the next iteration
      if (nextDueDate < endDate) dueDates.push(new Date(nextDueDate)); // <-- This line now comes before the nextDueDate is updated in the loop
    }

    return dueDates;
  };

  // Update the parent component only if there is a real change in recurrence
  useEffect(() => {
    try {
      // Log the type of the dueDateObj
      let dueDateObj;

      if (typeof dueDate === "object")
        dueDateObj = getDateFromDateType(dueDate);
      // Convert dueDate to Date object
      else dueDateObj = getDateFromDateType(dueDate?.toLocaleString()); // Convert dueDate to Date object
      //const dueDateObj =  // Convert dueDate to Date object

      const dueDates = generateDueDates(
        new Date(),
        {
          type: selectedFrequency,
          daysOfWeek: selectedWeeklyFrequency,
          completedIterations: completedIterations,
          totalIterations: 0,

          dueDates: [new Date()],
        },
        dueDateObj
      );

      const newRecurrence = {
        type: selectedFrequency,
        daysOfWeek: selectedWeeklyFrequency,
        completedIterations: completedIterations,
        totalIterations: dueDates.length,
        dueDates,
      };

      setLocalRecurrence(newRecurrence); // Update state

      onRecurrenceChange(newRecurrence); // Use newRecurrence directly
    } catch (error) {
      console.error("Error parsing dueDate:", error);
    }
  }, [selectedFrequency, selectedWeeklyFrequency, recurrence, dueDate]);

  // Toggle custom days visibility based on frequency selection
  const handleFrequencyChange = (frequency: string) => {
    setSelectedFrequency(frequency);
    if (frequency === "weekly") {
      setShowCustomDays(true); // Show custom days option for "weekly"
      setSelectedWeeklyFrequency("mon");
    } else {
      setShowCustomDays(false);
    }
  };

  // Handle weekly frequency selection (which days to repeat)
  const handleWeeklyFrequencyChange = (frequency: string) => {
    setSelectedWeeklyFrequency(frequency);
  };

  return (
    <View className="flex gap-2 p-4 border border-input rounded-md">
      <View className="flex flex-row gap-2 items-center">
        <Repeat className="text-primary" size={18} />
        <Text className="text-xl">Set Recurring Frequency</Text>
      </View>

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
        <View className="flex gap-2">
          <Text>Choose Recurrence Days</Text>
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
      <View className="flex flex-row flex-wrap gap-2 items-center">
        <Text className="text-primary">
          {generateFrequencyText2(
            localrecurrence || defaultRecurrence,
            dueDate
          )}
        </Text>
      </View>
    </View>
  );
};

export default JobReqFreqUpdate;
