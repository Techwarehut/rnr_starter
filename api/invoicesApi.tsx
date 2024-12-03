import { Customer } from "~/components/ScreenComponents/Customers/types";
import {
  Invoice,
  InvoiceItem,
} from "~/components/ScreenComponents/Invoices/types";
import invoicesData from "~/data/invoices.json"; // Your static JSON data
import { generateUniqueId } from "~/lib/utils";

let invoices: Invoice[] = invoicesData; // Initialize with JSON data

// Fetch all invoices
export const fetchInvoices = async (): Promise<Invoice[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(invoices);
    }, 1000); // Simulating a delay
  });
};

// Fetch an invoice by ID
export const fetchInvoiceById = async (
  invoiceId: string
): Promise<Invoice | undefined> => {
  const invoice = invoices.find(
    (invoice) => invoice.invoice_number === invoiceId
  );
  return invoice;
};

// Add a new invoice
export const addInvoice = async (newInvoice: Invoice): Promise<Invoice> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      newInvoice.invoice_number = generateUniqueId(); // Ensure a unique invoice number
      invoices.push(newInvoice); // Add new invoice
      resolve(newInvoice); // Return the newly added invoice
    }, 500); // Simulating a delay
  });
};

// Edit an existing invoice
export const editInvoice = async (
  updatedInvoice: Invoice
): Promise<Invoice> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      invoices = invoices.map((invoice) =>
        invoice.invoice_number === updatedInvoice.invoice_number
          ? updatedInvoice
          : invoice
      );
      resolve(updatedInvoice); // Return the updated invoice
    }, 500); // Simulating a delay
  });
};

// Delete an invoice
export const deleteInvoice = async (invoiceId: string): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      invoices = invoices.filter(
        (invoice) => invoice.invoice_number !== invoiceId
      );
      resolve(); // Return nothing after deletion
    }, 500); // Simulating a delay
  });
};

// Add an item to an invoice
export const addItemToInvoiceServices = async (
  invoiceId: string,
  newItem: InvoiceItem
): Promise<InvoiceItem> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Ensure item has description, quantity, unit_price, and total
      if (
        !newItem.description ||
        newItem.quantity <= 0 ||
        newItem.unit_price <= 0
      ) {
        throw new Error("Invalid invoice item details");
      }

      newItem.total = newItem.quantity * newItem.unit_price; // Calculate total for the item
      invoices = invoices.map((invoice) => {
        if (invoice.invoice_number === invoiceId) {
          return {
            ...invoice,
            services: [...invoice.services, newItem], // Add the new item
            sub_total: invoice.sub_total + newItem.total, // Update subtotal
            discounted_total: invoice.discounted_total + newItem.total, // Update discounted total
            tax_amount:
              (invoice.discounted_total + newItem.total) * invoice.tax_rate, // Update tax amount
            total_amount_due:
              invoice.discounted_total +
              newItem.total +
              (invoice.discounted_total + newItem.total) * invoice.tax_rate, // Update total amount due
          };
        }
        return invoice;
      });
      resolve(newItem); // Return the newly added item
    }, 500); // Simulating a delay
  });
};

// Remove an item from an invoice
export const deleteItemFromInvoiceServices = async (
  invoiceId: string,
  itemId: string
): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      invoices = invoices.map((invoice) => {
        if (invoice.invoice_number === invoiceId) {
          console.log(invoiceId, itemId);
          const updatedItems = invoice.services.filter(
            (item) => item._id !== itemId
          );
          const itemToRemove = invoice.services.find(
            (item) => item._id === itemId
          );

          console.log("itemToRemove", itemToRemove);
          console.log("updatedItems", updatedItems);

          const itemTotal = itemToRemove ? itemToRemove.total : 0;
          return {
            ...invoice,
            services: updatedItems, // Remove the item from the invoice
            sub_total: invoice.sub_total - itemTotal, // Update subtotal
            discounted_total: invoice.discounted_total - itemTotal, // Update discounted total
            tax_amount:
              (invoice.discounted_total - itemTotal) * invoice.tax_rate, // Update tax amount
            total_amount_due:
              invoice.discounted_total -
              itemTotal +
              (invoice.discounted_total - itemTotal) * invoice.tax_rate, // Update total amount due
          };
        }
        return invoice;
      });
      resolve(); // Return nothing after deletion
    }, 500); // Simulating a delay
  });
};

// Add an item to an invoice
export const addItemToInvoiceParts = async (
  invoiceId: string,
  newItem: InvoiceItem
): Promise<InvoiceItem> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Ensure item has description, quantity, unit_price, and total
      if (
        !newItem.description ||
        newItem.quantity <= 0 ||
        newItem.unit_price <= 0
      ) {
        throw new Error("Invalid invoice item details");
      }

      newItem.total = newItem.quantity * newItem.unit_price; // Calculate total for the item
      invoices = invoices.map((invoice) => {
        if (invoice.invoice_number === invoiceId) {
          return {
            ...invoice,
            parts: [...invoice.parts, newItem], // Add the new item
            sub_total: invoice.sub_total + newItem.total, // Update subtotal
            discounted_total: invoice.discounted_total + newItem.total, // Update discounted total
            tax_amount:
              (invoice.discounted_total + newItem.total) * invoice.tax_rate, // Update tax amount
            total_amount_due:
              invoice.discounted_total +
              newItem.total +
              (invoice.discounted_total + newItem.total) * invoice.tax_rate, // Update total amount due
          };
        }
        return invoice;
      });
      resolve(newItem); // Return the newly added item
    }, 500); // Simulating a delay
  });
};

// Remove an item from an invoice
export const deleteItemFromInvoiceParts = async (
  invoiceId: string,
  itemId: string
): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      invoices = invoices.map((invoice) => {
        if (invoice.invoice_number === invoiceId) {
          const updatedItems = invoice.parts.filter(
            (item) => item._id !== itemId
          );
          const itemToRemove = invoice.parts.find(
            (item) => item._id === itemId
          );
          const itemTotal = itemToRemove ? itemToRemove.total : 0;
          return {
            ...invoice,
            parts: updatedItems, // Remove the item from the invoice
            sub_total: invoice.sub_total - itemTotal, // Update subtotal
            discounted_total: invoice.discounted_total - itemTotal, // Update discounted total
            tax_amount:
              (invoice.discounted_total - itemTotal) * invoice.tax_rate, // Update tax amount
            total_amount_due:
              invoice.discounted_total -
              itemTotal +
              (invoice.discounted_total - itemTotal) * invoice.tax_rate, // Update total amount due
          };
        }
        return invoice;
      });
      resolve(); // Return nothing after deletion
    }, 500); // Simulating a delay
  });
};

// Apply discount to an invoice
export const applyDiscountToInvoice = async (
  invoiceId: string,
  discountAmount: number
): Promise<Invoice> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      invoices = invoices.map((invoice) => {
        if (invoice.invoice_number === invoiceId) {
          invoice.discount = discountAmount; // Set the discount
          invoice.discounted_total = invoice.sub_total - invoice.discount; // Calculate discounted total
          invoice.tax_amount = invoice.discounted_total * invoice.tax_rate; // Update tax amount
          invoice.total_amount_due =
            invoice.discounted_total + invoice.tax_amount; // Calculate total amount due
        }
        return invoice;
      });
      const updatedInvoice = invoices.find(
        (invoice) => invoice.invoice_number === invoiceId
      );
      resolve(updatedInvoice!); // Return the updated invoice
    }, 500); // Simulating a delay
  });
};

// Apply tax rate to an invoice (recalculate tax based on discounted total)
export const applyTaxToInvoice = async (
  invoiceId: string,
  taxRate: number
): Promise<Invoice> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      invoices = invoices.map((invoice) => {
        if (invoice.invoice_number === invoiceId) {
          invoice.tax_rate = taxRate; // Set the new tax rate
          invoice.tax_amount = invoice.discounted_total * invoice.tax_rate; // Recalculate tax amount
          invoice.total_amount_due =
            invoice.discounted_total + invoice.tax_amount; // Recalculate total amount due
        }
        return invoice;
      });
      const updatedInvoice = invoices.find(
        (invoice) => invoice.invoice_number === invoiceId
      );
      resolve(updatedInvoice!); // Return the updated invoice
    }, 500); // Simulating a delay
  });
};

// Apply tax rate to an invoice (recalculate tax based on discounted total)
export const UpdateInvoiceCustomer = async (
  invoiceId: string,
  customer: Customer
): Promise<Invoice> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      invoices = invoices.map((invoice) => {
        if (invoice.invoice_number === invoiceId) {
          invoice.bill_to.customer_id = customer._id;
          invoice.bill_to.business_name = customer.businessName;
        }
        return invoice;
      });
      const updatedInvoice = invoices.find(
        (invoice) => invoice.invoice_number === invoiceId
      );
      resolve(updatedInvoice!); // Return the updated invoice
    }, 500); // Simulating a delay
  });
};

// Apply tax rate to an invoice (recalculate tax based on discounted total)
export const DeleteInvoiceCustomer = async (
  invoiceId: string
): Promise<Invoice> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      invoices = invoices.map((invoice) => {
        if (invoice.invoice_number === invoiceId) {
          invoice.bill_to.customer_id = "";
          invoice.bill_to.business_name = "";
          invoice.service_site_id = [];
          invoice.parts = [];
          invoice.services = [];
          invoice.sub_total = 0;
          invoice.discount = 0;
          invoice.discounted_total = 0;
          invoice.status = "Draft";
          invoice.date_issued = new Date().toISOString();
          invoice.due_date = "";
          invoice.linked_job_id = [];
          invoice.tax_amount = 0;
          invoice.total_amount_due = 0;
        }
        return invoice;
      });
      const updatedInvoice = invoices.find(
        (invoice) => invoice.invoice_number === invoiceId
      );
      resolve(updatedInvoice!); // Return the updated invoice
    }, 500); // Simulating a delay
  });
};
