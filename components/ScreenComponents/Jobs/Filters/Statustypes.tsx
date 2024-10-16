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
  | "paid"
  | "baddebt"
  | "cancelled";

// Statustypes.ts
export type JobTypeKeys =
  | "Inspection"
  | "ServiceVisit"
  | "Consultation"
  | "Maintenance";

// Statustypes.ts
export type JobPriorityKeys = "High" | "Medium" | "Low";

export const jobTypeKeys: JobTypeKeys[] = [
  "Inspection",
  "ServiceVisit",
  "Consultation",
  "Maintenance",
];
export const jobPriorityKeys: JobPriorityKeys[] = ["High", "Medium", "Low"];
export const statusLabelMapping: Record<StatusKeys, string> = {
  backlog: "Backlog",
  inprogress: "In Progress",
  onhold: "On Hold",
  approvalpending: "Approval Pending",
  accountsreceivable: "Accounts Receivable",
  invoiced: "Invoiced",
  paid: "Paid",
  baddebt: "Bad Debt",
  cancelled: "Cancelled",
};

export const statusKeyMapping: Record<string, StatusKeys> = {
  Backlog: "backlog",
  "In Progress": "inprogress",
  "On Hold": "onhold",
  "Approval Pending": "approvalpending",
  "Accounts Receivable": "accountsreceivable",
  Invoiced: "invoiced",
  Paid: "paid",
  "Bad Debt": "baddebt",
  Cancelled: "cancelled",
};

export const statusActionMapping: Record<string, string[]> = {
  Backlog: ["Assign", "Mark as Cancelled"],
  "In Progress": ["Mark Complete", "On Hold", "Mark as Cancelled"],
  "On Hold": ["In Progress", "Mark as Cancelled"],
  "Approval Pending": ["Approve", "Back to In Progress"],
  "Accounts Receivable": ["Generate Invoice", "Mark as Bad Debt"],
  Invoiced: ["Mark as Paid", "Send Reminder", "Mark as Bad Debt"],
  Paid: ["Re Open"],
  "Bad Debt": ["Mark as Paid"],
  Cancelled: ["In Progress"],
};

export const actionStatusMapping: Record<string, string> = {
  Assign: "In Progress",
  "Mark as Cancelled": "Cancelled",
  "In Progress": "In Progress",
  "Mark Complete": "Approval Pending",
  "On Hold": "On Hold",
  Approve: "Accounts Receivable",
  "Back to In Progress": "In Progress",

  "Generate Invoice": "Invoiced",
  "Send Reminder": "Invoiced",
  "Mark as Bad Debt": "Bad Debt",
  "Mark as Paid": "Paid",
  "Re Open": "Backlog",
};

export const getJobPriorityIcon = (priority: JobPriorityKeys) => {
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
