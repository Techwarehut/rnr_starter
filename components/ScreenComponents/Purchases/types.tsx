import { CreatedUser, customer } from "../Jobs/types";

// types.ts (or wherever your types are defined)

export type StatusKeys = "Request" | "Approved" | "Issued" | "Rejected";

export interface PurchaseOrderItem {
  itemId: string;
  itemName: string; // Name of the item
  quantity: number; // Quantity of the item
  price: number; // Price of the item
}

export interface Vendor {
  id: string; // Unique identifier for the vendor
  name: string; // Name of the vendor
}

export interface PurchaseOrder {
  purchaseOrderNumber: string; // Unique identifier for the purchase order
  vendor: Vendor; // Vendor object with id and name
  items: PurchaseOrderItem[]; // Array of items in the purchase order
  status: StatusKeys; // Status of the purchase order
  total: number; // Total cost of the purchase order
  jobID: string; // Linked job ID
  requestedBy: CreatedUser; // User who requested the purchase order
  approvedBy: CreatedUser | null; // User who approved the purchase order (can be null)
  customer: customer;
}
