import { CreatedUser } from "../Jobs/types";

export interface PurchaseOrderItem {
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
  status: "Purchase Request" | "Approved" | "PO Issued" | "Rejected"; // Status of the purchase order
  total: number; // Total cost of the purchase order
  jobID: string; // Linked job ID
  requestedBy: CreatedUser; // User who requested the purchase order
  approvedBy: CreatedUser | null; // User who approved the purchase order (can be null)
}
