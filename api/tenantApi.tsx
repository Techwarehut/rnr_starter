import { Tenant } from "~/components/ScreenComponents/Settings/types";
import tenants from "~/data/tenant.json"; // Your static JSON data (single tenant)
import { generateUniqueId } from "~/lib/utils"; // Import the unique ID generator

let tenantsData: Tenant = tenants as Tenant;

// Function to get the tenant (since it's a single object)
export const getTenant = async (): Promise<Tenant> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(tenantsData); // Return the single tenant
    }, 1000); // Simulate a delay
  });
};

// Function to get a tenant by ID (if needed for future use, e.g., multi-tenant support)
export const getTenantById = async (tenantId: string): Promise<Tenant> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Assuming we have a single tenant, we can check if the ID matches
      if (tenantsData._id === tenantId) {
        resolve(tenantsData);
      } else {
        reject(new Error("Tenant not found"));
      }
    }, 1000); // Simulate a delay
  });
};

// Function to add a new tenant
// Since you're working with a single tenant, this function might not be needed for your use case
export const addTenant = async (
  newTenant: Omit<Tenant, "_id">
): Promise<Tenant> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const tenantWithId: Tenant = { ...newTenant, _id: generateUniqueId() }; // Generate a unique ID
      // Since this is a single tenant, we're replacing the previous tenant
      tenantsData = tenantWithId;
      resolve(tenantWithId);
    }, 1000); // Simulate a delay
  });
};

// Function to update the tenant
export const updateTenant = async (
  updatedTenant: Partial<Tenant>
): Promise<Tenant> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      tenantsData = { ...tenantsData, ...updatedTenant }; // Merge the updated values
      resolve(tenantsData); // Return the updated tenant
    }, 1000); // Simulate a delay
  });
};

// New Function to update the business logo
export const updateLogo = async (newLogoUrl: string): Promise<Tenant> => {
  return new Promise((resolve) => {
    console.log(newLogoUrl);
    setTimeout(() => {
      // Update the business logo
      tenantsData = { ...tenantsData, businessLogo: newLogoUrl };
      resolve(tenantsData); // Return the updated tenant with the new logo
    }, 1000); // Simulate a delay
  });
};
