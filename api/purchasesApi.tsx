import { generateUniqueId } from "~/lib/utils"; // Import the unique ID generator
import purchaseOrdersData from "~/data/purchases.json"; // Your static JSON data
import {
  PurchaseOrder,
  StatusKeys,
} from "~/components/ScreenComponents/Purchases/types";

let purchaseOrders: PurchaseOrder[] = purchaseOrdersData as PurchaseOrder[];

// Function to fetch all purchase orders
export const getAllPurchaseOrders = async (): Promise<PurchaseOrder[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(purchaseOrders);
    }, 1000); // Simulate a delay
  });
};

// Function to add a new purchase order
export const addPurchaseOrder = async (
  newOrder: PurchaseOrder
): Promise<PurchaseOrder> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      newOrder.purchaseOrderNumber = `PN-${generateUniqueId()}`; // Set unique PO number
      purchaseOrders.push(newOrder);
      resolve(newOrder);
    }, 1000); // Simulate a delay
  });
};

// Function to edit an existing purchase order
export const editPurchaseOrder = async (
  updatedOrder: PurchaseOrder
): Promise<PurchaseOrder> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      purchaseOrders = purchaseOrders.map((order) =>
        order.purchaseOrderNumber === updatedOrder.purchaseOrderNumber
          ? updatedOrder
          : order
      );
      resolve(updatedOrder);
    }, 1000); // Simulate a delay
  });
};

// Function to delete a purchase order
export const deletePurchaseOrder = async (
  orderNumber: string
): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = purchaseOrders.findIndex(
        (order) => order.purchaseOrderNumber === orderNumber
      );
      if (index !== -1) {
        purchaseOrders.splice(index, 1);
        resolve(true); // Successfully deleted
      } else {
        reject(new Error("Error deleting purchase order"));
      }
    }, 1000); // Simulate a delay
  });
};

// Function to update the status of a purchase order
export const updatePurchaseOrderStatus = async (
  orderNumber: string,
  newStatus: StatusKeys
): Promise<PurchaseOrder> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = purchaseOrders.findIndex(
        (order) => order.purchaseOrderNumber === orderNumber
      );
      if (index !== -1) {
        purchaseOrders[index].status = newStatus; // Update status
        resolve(purchaseOrders[index]);
      } else {
        reject(new Error("Purchase order not found"));
      }
    }, 1000); // Simulate a delay
  });
};

// Function to update the linked job for a purchase order
export const updateLinkedJob = async (
  orderNumber: string,
  newJobID: string
): Promise<PurchaseOrder> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = purchaseOrders.findIndex(
        (order) => order.purchaseOrderNumber === orderNumber
      );
      if (index !== -1) {
        purchaseOrders[index].jobID = newJobID; // Update linked job
        resolve(purchaseOrders[index]);
      } else {
        reject(new Error("Purchase order not found"));
      }
    }, 1000); // Simulate a delay
  });
};

// Function to fetch a purchase order by its number
export const getPurchaseOrderByNumber = async (
  orderNumber: string
): Promise<PurchaseOrder | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const order = purchaseOrders.find(
        (o) => o.purchaseOrderNumber === orderNumber
      );
      resolve(order ? order : null); // Return null if not found
    }, 1000); // Simulate a delay
  });
};

// Function to fetch all purchase orders for a specific JobID
export const getPurchaseOrdersByJobID = async (
  jobID: string
): Promise<PurchaseOrder[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filteredOrders = purchaseOrders.filter(
        (order) => order.jobID === jobID
      );
      resolve(filteredOrders);
    }, 1000); // Simulate a delay
  });
};
