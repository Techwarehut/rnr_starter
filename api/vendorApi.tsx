import VendorBasicInfo from "~/components/ScreenComponents/Vendors/FormElements/VendorBasicInfo";
import { Vendor } from "~/components/ScreenComponents/Vendors/types";
import vendorsData from "~/data/vendor.json"; // Your static JSON data
import { generateUniqueId } from "~/lib/utils"; // Import the unique ID generator

let vendors: Vendor[] = vendorsData; // Initialize with JSON data
// Function to fetch all vendors
export const getAllVendors = async (): Promise<Vendor[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(vendorsData);
    }, 1000); // Simulate a delay
  });
};

// Function to add a new vendor
export const addVendor = async (
  newVendor: Omit<Vendor, "_id">
): Promise<Vendor> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const vendorWithId = { ...newVendor, _id: generateUniqueId() }; // Generate a unique ID
      vendorsData.push(vendorWithId);
      resolve(vendorWithId);
    }, 1000); // Simulate a delay
  });
};

// Function to update a vendor
export const editVendor = async (updatedVendor: Vendor): Promise<Vendor> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      vendors = vendors.map((vendor) =>
        vendor._id === updatedVendor._id ? updatedVendor : vendor
      );
      resolve(updatedVendor);
    }, 1000); // Simulate a delay
  });
};

// Function to delete a vendor
export const deleteVendor = async (vendorId: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = vendorsData.findIndex((v) => v._id === vendorId);
      if (index !== -1) {
        vendorsData.splice(index, 1);
        resolve(true);
      } else {
        reject(new Error("Error deleting vendor"));
      }
    }, 1000); // Simulate a delay
  });
};
