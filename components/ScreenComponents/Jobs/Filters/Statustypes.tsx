// Statustypes.ts
export type StatusKeys =
  | "backlog"
  | "inprogress"
  | "onhold"
  | "approvalpending"
  | "accountsreceivable"
  | "invoiced"
  | "paid";

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
