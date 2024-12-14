import { clsx, type ClassValue } from "clsx";
import { addMonths, addWeeks, addYears } from "date-fns";
import dayjs, { Dayjs } from "dayjs";
import { useWindowDimensions } from "react-native";
import { DateType } from "react-native-ui-datepicker";
import { twMerge } from "tailwind-merge";
import { StatusKeys } from "~/components/ScreenComponents/Jobs/Filters/Statustypes";
import { JobRecurrence } from "~/components/ScreenComponents/Jobs/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function useIsLargeScreen() {
  const { width } = useWindowDimensions();
  return width > 768; // Adjust threshold as needed
  /*  Here's a quick overview of the default breakpoints in Tailwind CSS:

sm: 640px (small screens)
md: 768px (medium screens)
lg: 1024px (large screens)
xl: 1280px (extra large screens)
2xl: 1536px (double extra large screens) */
}

export function formatPhoneNumber(phone: string) {
  // Remove non-digit characters
  console.log(phone);
  const cleaned = phone.replace(/\D/g, "").slice(0, 10); // Limit to 10 characters
  console.log("cleaced", cleaned);
  // Check if cleaned string is empty
  if (!cleaned) return "";

  // Apply formatting based on the cleaned string length
  const match = cleaned.match(/^(?:(\d{0,3})(\d{0,3})(\d{0,4}))?$/);
  console.log("match", match);

  if (match) {
    const [, areaCode, middle, last] = match;
    if (middle) {
      return `(${areaCode}) ${middle}${last ? "-" + last : ""}`;
    }
    if (areaCode) {
      return `(${areaCode})`;
    }
  }
  return cleaned; // Return the cleaned version limited to 10 characters
}

export function getInitials(name: string): string {
  // Split the name into an array
  const nameParts = name.trim().split(" ");

  // Check if the array has at least two parts
  if (nameParts.length < 2) {
    return ""; // Return empty string if there's no last name
  }

  // Get the first and last names
  const firstName = nameParts[0];
  const lastName = nameParts[nameParts.length - 1];

  // Extract the initials
  const initials = `${firstName.charAt(0).toUpperCase()}${lastName
    .charAt(0)
    .toUpperCase()}`;

  return initials;
}

export const generateUniqueId = () => {
  return `${Date.now()}-${Math.floor(Math.random() * 1000)}`;
};

export const formatDueDate = (
  dueDate: string | number | Dayjs | Date | DateType
) => {
  if (dueDate instanceof Date) {
    // If it's a Date object
    return dueDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  } else if (dayjs.isDayjs(dueDate)) {
    // If it's a Dayjs object
    return dueDate.format("MMM DD, YYYY"); // Customize format as needed
  } else if (typeof dueDate === "string" || typeof dueDate === "number") {
    // Convert from string or number to Date
    const date = new Date(dueDate);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  }
  return ""; // Default return if none of the types match
};

export const getStatusClassName = (status: string) => {
  switch (status) {
    case "Approved":
      return "text-brand-primary";
    case "Rejected":
      return "text-destructive";
    default:
      return "text-muted-foreground"; // Default class for Pending or other statuses
  }
};

// Function to format the currency based on locale and currency code
export const formatCurrency = (
  amount: number,
  currencyCode: string,
  locale: string = "en-US"
): string => {
  const formatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currencyCode,
  });
  return formatter.format(amount);
};

// Frequency options for recurring events
export const frequencyOptions = [
  { label: "None", value: "none" },
  { label: "Daily", value: "daily" },
  { label: "Weekly", value: "weekly" },
  { label: "Monthly", value: "monthly" },
  { label: "Yearly", value: "yearly" },
];

// Frequency options for weekly recurring events
export const WeeklyfrequencyOptions = [
  { label: "Mon", value: "mon" },
  { label: "Tue", value: "tue" },
  { label: "Wed", value: "wed" },
  { label: "Thu", value: "thu" },
  { label: "Fri", value: "fri" },
  { label: "Sat", value: "sat" },
  { label: "Sun", value: "sun" },
];

// Function to generate the dynamic text based on recurrence and due date
export const generateFrequencyText = (
  recurrence: JobRecurrence,
  dueDate: DateType
) => {
  const { type, daysOfWeek } = recurrence;

  // Format the due date (optional: you can use a library like `date-fns` or `moment` to format the date)
  const formattedDueDate = formatDueDate(dueDate); // Example format: "MM/DD/YYYY"
  const upcomingFormattedDueDate = formatDueDate(
    recurrence.dueDates[recurrence.completedIterations]
  ); // Example format: "MM/DD/YYYY"

  switch (type) {
    case "none":
      return "No recurrence selected.";
    case "daily":
      return ` ${recurrence.completedIterations} of ${recurrence.totalIterations}.`;
    case "weekly":
      const selectedDay = WeeklyfrequencyOptions.find(
        (day) => day.value === daysOfWeek
      )?.label;
      return selectedDay
        ? `${recurrence.completedIterations} of ${recurrence.totalIterations}.`
        : "Weekly recurrence, but no specific day selected.";
    case "monthly":
      return `${recurrence.completedIterations} of ${recurrence.totalIterations}.`;
    case "yearly":
      return `${recurrence.completedIterations} of ${recurrence.totalIterations}.`;
    default:
      return "Invalid selection.";
  }
};

// Function to generate the dynamic text based on recurrence and due date
export const generateFrequencyText2 = (
  recurrence: JobRecurrence,
  dueDate: DateType
) => {
  const { type, daysOfWeek } = recurrence;

  // Format the due date (optional: you can use a library like `date-fns` or `moment` to format the date)
  const formattedDueDate = formatDueDate(dueDate); // Example format: "MM/DD/YYYY"
  const upcomingFormattedDueDate = formatDueDate(
    recurrence.dueDates[recurrence.completedIterations]
  ); // Example format: "MM/DD/YYYY"

  switch (type) {
    case "none":
      return "No recurrence selected.";
    case "daily":
      return `This action will create ${recurrence.totalIterations} Jobs. Every day until ${formattedDueDate}.`;
    case "weekly":
      const selectedDay = WeeklyfrequencyOptions.find(
        (day) => day.value === daysOfWeek
      )?.label;
      return selectedDay
        ? `This action will create ${recurrence.totalIterations} Jobs. Every ${selectedDay} until ${formattedDueDate}.`
        : "Weekly recurrence, but no specific day selected.";
    case "monthly":
      return `This action will create ${recurrence.totalIterations} Jobs. Every month until ${formattedDueDate}.`;
    case "yearly":
      return `This action will create ${recurrence.totalIterations} Jobs. Every year until ${formattedDueDate}.`;
    default:
      return "Invalid selection.";
  }
};

// Function to calculate the next due date based on recurrence type
const calculateNextDueDate = (
  currentDueDate: Date,
  recurrence: { type: string; daysOfWeek: string }
) => {
  let nextDueDate = currentDueDate;

  switch (recurrence.type) {
    case "weekly":
      // Add one week to the current due date
      nextDueDate = addWeeks(currentDueDate, 1);
      break;
    case "monthly":
      // Add one month to the current due date
      nextDueDate = addMonths(currentDueDate, 1);
      break;
    case "yearly":
      // Add one year to the current due date
      nextDueDate = addYears(currentDueDate, 1);
      break;
    case "daily":
      // Add one day to the current due date
      nextDueDate.setDate(currentDueDate.getDate() + 1);
      break;
    case "none":
      // No recurrence, return the same date
      nextDueDate = currentDueDate;
      break;
    default:
      console.warn("Invalid recurrence type");
      break;
  }

  return nextDueDate;
};
