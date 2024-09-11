import { cva, type VariantProps } from "class-variance-authority";
export const tabVariants = cva("flex items-center justify-center", {
  variants: {
    isFocused: {
      true: "text-primary",
      false: "text-accent",
    },
    size: {
      largeScreen: "w-full h-16 p-5",
      default: "flex-1 p-3",
    },
  },
  defaultVariants: {
    isFocused: false,
    size: "default",
  },
});
