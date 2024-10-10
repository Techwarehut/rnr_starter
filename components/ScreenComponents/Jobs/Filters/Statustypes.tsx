import { ChevronsUp } from "~/lib/icons/ChevronsUp";
import { ChevronsDown } from "~/lib/icons/ChevronsDown";
import { MinusCircle } from "~/lib/icons/Minus";
import { Text } from "~/components/ui/text";

// Statustypes.ts
export type StatusKeys =
  | "backlog"
  | "inprogress"
  | "onhold"
  | "approvalpending"
  | "accountsreceivable"
  | "invoiced"
  | "paid";

// Statustypes.ts
export type JobTypeKeys =
  | "Inspection"
  | "ServiceVisit"
  | "Consultation"
  | "Maintenance";

export const statusLabelMapping: Record<StatusKeys, string> = {
  backlog: "Backlog",
  inprogress: "In Progress",
  onhold: "On Hold",
  approvalpending: "Approval Pending",
  accountsreceivable: "Accounts Receivable",
  invoiced: "Invoiced",
  paid: "Paid",
};

export const statusKeyMapping: Record<string, StatusKeys> = {
  Backlog: "backlog",
  "In Progress": "inprogress",
  "On Hold": "onhold",
  "Approval Pending": "approvalpending",
  "Accounts Receivable": "accountsreceivable",
  Invoiced: "invoiced",
  Paid: "paid",
};

export const statusActionMapping: Record<string, string> = {
  Backlog: "Assign",
  "In Progress": "Mark Complete",
  "On Hold": "In Progress",
  "Approval Pending": "Approve",
  "Accounts Receivable": "Generate Invoice",
  Invoiced: "Mark as Paid",
  Paid: "On Hold",
};

export const getJobPriorityIcon = (priority: string) => {
  switch (priority) {
    case "High":
      return (
        <>
          <ChevronsUp size={16} className="text-destructive" />
          <Text className="text-destructive">{priority}</Text>
        </>
      );
      break;
    case "Medium":
      return (
        <>
          <MinusCircle size={16} className="text-brand-primary" />
          <Text className="text-brand-primary">{priority}</Text>
        </>
      );
      break;
    case "Low":
      return (
        <>
          <ChevronsDown size={16} className="text-brand-secondary" />
          <Text className="text-brand-secondary">{priority}</Text>
        </>
      );
      break;
    default:
      return null; // or a default icon
  }
};
