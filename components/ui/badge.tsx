import { cva, type VariantProps } from "class-variance-authority";
import { View } from "react-native";
import * as Slot from "@rn-primitives/slot";
import type { SlottableViewProps } from "@rn-primitives/types";
import { cn } from "~/lib/utils";
import { TextClassContext } from "~/components/ui/text";

const badgeVariants = cva(
  "web:inline-flex items-center rounded-full border border-border px-2.5 py-0.5 web:transition-colors web:focus:outline-none web:focus:ring-2 web:focus:ring-ring web:focus:ring-offset-2",
  {
    variants: {
      variant: {
        backlog: "text-foreground",
        inProgress:
          "border-brand-primary bg-secondary web:hover:opacity-80 active:opacity-80",
        onHold:
          "border-transparent bg-destructive web:hover:opacity-80 active:opacity-80",
        customerApprovalPending:
          "border-transparent bg-destructive web:hover:opacity-80 active:opacity-80",
        accountsReceivable:
          "border-transparent bg-brand-secondary web:hover:opacity-80 active:opacity-80",
        invoiced:
          "border-transparent bg-brand-primaryLight web:hover:opacity-80 active:opacity-80",
        paid: "border-transparent bg-brand-primary web:hover:opacity-80 active:opacity-80",
        default:
          "border-transparent bg-primary web:hover:opacity-80 active:opacity-80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const badgeTextVariants = cva("text-xs font-semibold ", {
  variants: {
    variant: {
      backlog: "text-foreground",
      inProgress: "text-secondary-foreground",
      onHold: "text-destructive-foreground",
      customerApprovalPending: "text-destructive-foreground",
      accountsReceivable: "text-brand-secondary-foreground",
      invoiced: "text-brand-primary-light-foreground",
      paid: "text-brand-primary-foreground",
      default: "text-primary-foreground",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type BadgeProps = SlottableViewProps & VariantProps<typeof badgeVariants>;

function Badge({ className, variant, asChild, ...props }: BadgeProps) {
  const Component = asChild ? Slot.View : View;
  return (
    <TextClassContext.Provider value={badgeTextVariants({ variant })}>
      <Component
        className={cn(badgeVariants({ variant }), className)}
        {...props}
      />
    </TextClassContext.Provider>
  );
}

export { Badge, badgeTextVariants, badgeVariants };
export type { BadgeProps };
