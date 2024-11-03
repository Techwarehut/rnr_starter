import { clsx, type ClassValue } from "clsx";
import dayjs, { Dayjs } from "dayjs";
import { useWindowDimensions } from "react-native";
import { twMerge } from "tailwind-merge";

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

export const formatDueDate = (dueDate: string | number | Dayjs | Date) => {
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
