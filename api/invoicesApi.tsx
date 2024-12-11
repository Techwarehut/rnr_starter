import { Customer } from "~/components/ScreenComponents/Customers/types";
import {
  Invoice,
  InvoiceItem,
} from "~/components/ScreenComponents/Invoices/types";
import { Job } from "~/components/ScreenComponents/Jobs/types";
import invoicesData from "~/data/invoices.json"; // Your static JSON data
import { generateUniqueId } from "~/lib/utils";
import { getPurchaseOrdersByJobID } from "./purchasesApi";

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

export const UpdateInvoiceLinkedJobs = async (
  invoiceId: string,
  jobs: Job[],
  existingInvoice?: Invoice // Optional parameter for existing invoice
): Promise<Invoice> => {
  console.log(invoiceId);

  return new Promise(async (resolve) => {
    setTimeout(async () => {
      if (invoiceId === "") {
        // Case for creating a new invoice (no invoiceId provided)
        const newInvoice: Invoice = existingInvoice
          ? existingInvoice
          : {
              // Optional parameter for existing invoice // Optional parameter for existing invoice{
              invoice_number: generateUniqueId(), // Assuming you have a function to generate invoice numbers
              linked_job_id: jobs.map((job) => job._id),
              date_issued: "", // Empty string for date issued
              due_date: "", // Empty string for due date
              bill_to: {
                customer_id: "", // Empty string for customer ID
                business_name: "", // Empty string for business name
              },
              service_site_id: [], // Empty array for service site IDs

              services: [], // Empty array for services
              parts: [], // Empty array for parts

              sub_total: 0, // 0 for subtotal
              discount: 0, // 0 for discount
              discounted_total: 0, // 0 for discounted total
              tax_rate: 0.1, // 0 tax rate
              tax_amount: 0, // 0 tax amount
              total_amount_due: 0, // 0 total amount due
              notes: "Net 30", // Empty string for notes
              payment_terms: "", // Empty string for payment terms
              payment_methods: [], // Empty array for payment methods
              status: "Draft", // Default status as "Draft"
            };
        // Collect all job IDs and push them to the linked_job_id array
        jobs.forEach((job) => {
          if (!newInvoice.linked_job_id.includes(job._id)) {
            newInvoice.linked_job_id.push(job._id);
          }
        });
        // Add all job titles and details to the new invoice
        jobs.forEach((job) => {
          const totalHours = job.assignedTo.reduce(
            (sum, assignedUser) => sum + (assignedUser.hoursSpent || 0),
            0
          );

          // Add job item to services array
          const newItem: InvoiceItem = {
            _id: job._id,
            description: job.jobTitle,
            quantity: totalHours,
            unit_price: 100, // Assume unit price is 100
            total: totalHours * 100,
          };

          newInvoice.sub_total += newItem.total;
          newInvoice.discounted_total += newItem.total;
          newInvoice.tax_amount =
            newInvoice.discounted_total * newInvoice.tax_rate;
          newInvoice.total_amount_due =
            newInvoice.discounted_total + newInvoice.tax_amount;

          newInvoice.services.push(newItem);

          // Add site location to service_site_id
          if (!newInvoice.service_site_id.includes(job.siteLocation.site_id)) {
            newInvoice.service_site_id.push(job.siteLocation.site_id);
          }
        });

        // Fetch and add purchase orders linked to the jobs
        const purchaseOrders = await Promise.all(
          jobs.map(async (job) => await getPurchaseOrdersByJobID(job._id))
        );

        // Add purchase order items to parts array and update totals
        for (const purchaseOrder of purchaseOrders.flat()) {
          for (const po of purchaseOrder.items) {
            const partTotal = po.quantity * po.price;

            newInvoice.sub_total += partTotal;
            newInvoice.discounted_total += partTotal;
            newInvoice.tax_amount =
              newInvoice.discounted_total * newInvoice.tax_rate;
            newInvoice.total_amount_due =
              newInvoice.discounted_total + newInvoice.tax_amount;

            const newPart: InvoiceItem = {
              _id: po.itemId,
              description: po.itemName,
              quantity: po.quantity,
              unit_price: po.price,
              total: partTotal,
            };

            newInvoice.parts.push(newPart);
          }
        }

        // Return the newly created invoice
        resolve(newInvoice);
      } else {
        // Case for updating an existing invoice (invoiceId is provided)
        invoices = await Promise.all(
          invoices.map(async (invoice) => {
            if (invoice.invoice_number === invoiceId) {
              // Collect all job IDs and push them to the linked_job_id array
              jobs.forEach((job) => {
                if (!invoice.linked_job_id.includes(job._id)) {
                  invoice.linked_job_id.push(job._id);
                }
              });

              // Add all job titles and details to the services array
              for (const job of jobs) {
                const totalHours = job.assignedTo.reduce(
                  (sum, assignedUser) => sum + (assignedUser.hoursSpent || 0),
                  0
                );

                const newItem: InvoiceItem = {
                  _id: job._id,
                  description: job.jobTitle,
                  quantity: totalHours,
                  unit_price: 100,
                  total: totalHours * 100,
                };

                invoice.sub_total += newItem.total;
                invoice.discounted_total += newItem.total;
                invoice.tax_amount =
                  invoice.discounted_total * invoice.tax_rate;
                invoice.total_amount_due =
                  invoice.discounted_total + invoice.tax_amount;

                invoice.services.push(newItem);

                // Update service_site_id with job's site location
                if (
                  !invoice.service_site_id.includes(job.siteLocation.site_id)
                ) {
                  invoice.service_site_id.push(job.siteLocation.site_id);
                }
              }

              // Fetch and add purchase orders linked to the jobs
              const purchaseOrders = await Promise.all(
                jobs.map(async (job) => await getPurchaseOrdersByJobID(job._id))
              );

              // Add purchase order items to the parts array and update totals
              for (const purchaseOrder of purchaseOrders.flat()) {
                for (const po of purchaseOrder.items) {
                  const partTotal = po.quantity * po.price;

                  invoice.sub_total += partTotal;
                  invoice.discounted_total += partTotal;
                  invoice.tax_amount =
                    invoice.discounted_total * invoice.tax_rate;
                  invoice.total_amount_due =
                    invoice.discounted_total + invoice.tax_amount;

                  const newPart: InvoiceItem = {
                    _id: po.itemId,
                    description: po.itemName,
                    quantity: po.quantity,
                    unit_price: po.price,
                    total: partTotal,
                  };

                  invoice.parts.push(newPart);
                }
              }
            }
            return invoice;
          })
        );

        // Find the updated invoice
        const updatedInvoice = invoices.find(
          (invoice) => invoice.invoice_number === invoiceId
        );

        resolve(updatedInvoice!); // Assuming the invoice will exist
      }
    }, 500); // Simulating a delay
  });
};
