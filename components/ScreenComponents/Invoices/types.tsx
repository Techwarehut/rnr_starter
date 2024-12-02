import { StatusKeys } from "../Jobs/Filters/Statustypes";

// Define the InvoiceItem type for services and parts
export type InvoiceItem = {
  _id: string;
  description: string; // Description of the service/item
  quantity: number; // Number of items or quantity of service
  unit_price: number; // Unit price of the item or service
  total: number; // Total cost for this item (quantity * unit_price)
};

// Define the Invoice type with separated services and parts
export type Invoice = {
  invoice_number: string; // Unique invoice number
  date_issued: string; // Invoice issue date (e.g., "2024-11-26")
  due_date: string; // Payment due date (e.g., "2024-12-10")
  bill_to: {
    customer_id: string; // Unique customer ID
    business_name: string; // Customer's business name
  };
  service_site_id: string[]; // Service site ID (to link with customer site)
  linked_job_id: string[]; // Linked job IDs (array of job IDs)

  // Separate lists for services and parts
  services: InvoiceItem[]; // List of service items
  parts: InvoiceItem[]; // List of parts/items

  sub_total: number; // Subtotal amount before discount and tax
  discount: number; // Discount applied to the subtotal
  discounted_total: number; // Subtotal after applying discount
  tax_rate: number; // Tax rate (e.g., 0.10 for 10%)
  tax_amount: number; // Tax amount calculated based on discounted_total
  total_amount_due: number; // Total amount due after tax
  notes?: string; // Optional field for any additional notes
  payment_terms: string; // Payment terms (e.g., "Net 30")
  payment_methods: string[]; // Array of available payment methods (e.g., ["Bank Transfer", "Credit Card"])
  status: string;
};

// Define the mapping for invoice status
export const invStatusKeyMapping: Record<string, StatusKeys> = {
  Draft: "backlog",
  Invoiced: "invoiced",
  Paid: "paid",
};
