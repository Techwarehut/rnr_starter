import { generateUniqueId } from "~/lib/utils"; // Import the unique ID generator
import purchaseOrdersData from "~/data/purchases.json"; // Your static JSON data
import {
  PurchaseOrder,
  PurchaseOrderItem,
  StatusKeys,
} from "~/components/ScreenComponents/Purchases/types";
import { User } from "~/components/ScreenComponents/Team/types";

let purchaseOrders: PurchaseOrder[] = purchaseOrdersData as PurchaseOrder[];

// Function to fetch all purchase orders
export const getAllPurchaseOrders = async (
  user: User
): Promise<PurchaseOrder[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Check if user is "Owner" or "Team Lead", in which case fetch all jobs
      if (user.role === "Owner" || user.role === "Team Lead") {
        resolve(purchaseOrders); // Resolve with all jobs
      } else if (user.role === "Team Member") {
        // If user is "Team Member", filter jobs based on their assigned userId and exclude certain statuses
        const requestedPurchases = purchaseOrders.filter(
          (purchaseOrder) => purchaseOrder.requestedBy.userId === user._id
        );

        resolve(requestedPurchases); // Resolve with the filtered list of jobs
      } else {
        resolve([]); // No jobs if the role is unknown
      }
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

export const addLinkedJob = async (
  orderNumber: string,
  newJobID: string
): Promise<PurchaseOrder> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const order = purchaseOrders.find(
        (order) => order.purchaseOrderNumber === orderNumber
      );

      if (order) {
        order.jobID = newJobID; // Add the linked job ID
        resolve(order);
      } else {
        reject(new Error("Purchase order not found"));
      }
    }, 1000); // Simulate a delay
  });
};

export const removeLinkedJob = async (
  orderNumber: string
): Promise<PurchaseOrder> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const order = purchaseOrders.find(
        (order) => order.purchaseOrderNumber === orderNumber
      );

      if (order) {
        order.jobID = ""; // Remove the linked job ID (set it to an empty string or null depending on your design)
        resolve(order);
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

// Function to add a new item to a purchase order
export const addItemToOrder = async (
  orderNumber: string,
  newItem: PurchaseOrderItem
): Promise<PurchaseOrder | null> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const order = purchaseOrders.find(
        (order) => order.purchaseOrderNumber === orderNumber
      );

      if (order) {
        // Assign unique ID for the item
        newItem.itemId = generateUniqueId();
        order.items.push(newItem);

        // Update the order's total
        order.total = order.total + newItem.price;
        resolve(order);
      } else {
        reject(new Error("Purchase order not found"));
      }
    }, 1000); // Simulate a delay
  });
};

export const deleteItemFromOrder = async (
  orderNumber: string,
  itemId: string
): Promise<PurchaseOrder | null> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const order = purchaseOrders.find(
        (order) => order.purchaseOrderNumber === orderNumber
      );

      if (order) {
        const itemIndex = order.items.findIndex(
          (item) => item.itemId === itemId
        );

        if (itemIndex !== -1) {
          const removedItem = order.items[itemIndex];
          order.items.splice(itemIndex, 1); // Delete the item

          // Update the order's total
          order.total = order.total - removedItem.price;

          resolve(order); // Return updated order
        } else {
          reject(new Error("Item not found"));
        }
      } else {
        reject(new Error("Purchase order not found"));
      }
    }, 1000); // Simulate a delay
  });
};
