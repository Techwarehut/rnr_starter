import { clsx, type ClassValue } from 'clsx';
import { useWindowDimensions } from 'react-native';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function useIsLargeScreen() {
  const { width } = useWindowDimensions();
  return width > 680; // Adjust threshold as needed
}
