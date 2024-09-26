import { clsx, type ClassValue } from "clsx";
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
  const cleaned = phone.replace(/\D/g, "");

  // Check if cleaned string is empty
  if (!cleaned) return "";

  // Apply formatting based on the cleaned string length
  const match = cleaned.match(/^(?:(\d{0,3})(\d{0,3})(\d{0,4}))?$/);

  if (match) {
    const [, areaCode, middle, last] = match;
    if (middle) {
      return `(${areaCode}) ${middle}${last ? "-" + last : ""}`;
    }
    if (areaCode) {
      return `(${areaCode})`;
    }
  }
  return phone; // Return the original if it doesn't match
}
