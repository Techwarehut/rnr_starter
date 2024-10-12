// api/customerApi.ts
import {
  Customer,
  SiteLocation,
} from "~/components/ScreenComponents/Customers/types";
import customersData from "~/data/customer.json"; // Your static JSON data
import { generateUniqueId } from "~/lib/utils";

let customers: Customer[] = customersData; // Initialize with JSON data

export const fetchCustomers = async (): Promise<Customer[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(customers);
    }, 1000); // Simulating a delay
  });
};

// If you later switch to an actual API, you could use fetch or axios here
// Example:
// export const fetchCustomers = async () => {
//   const response = await fetch('https://yourapi.com/customers');
//   if (!response.ok) throw new Error('Network response was not ok');
//   return await response.json();
// };

export const addCustomer = async (newCustomer: Customer): Promise<Customer> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      newCustomer._id = generateUniqueId();
      customers.push(newCustomer); // Add customer to the array
      resolve(newCustomer); // Return the newly added customer
    }, 500); // Simulating a delay
  });
};

export const editCustomer = async (
  updatedCustomer: Customer
): Promise<Customer> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      customers = customers.map((customer) =>
        customer._id === updatedCustomer._id ? updatedCustomer : customer
      );
      resolve(updatedCustomer); // Return the updated customer
    }, 500); // Simulating a delay
  });
};

export const deleteCustomer = async (customerId: string): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      customers = customers.filter((customer) => customer._id !== customerId);
      resolve();
    }, 500); // Simulating a delay
  });
};

// api/customerApi.ts
export const fetchCustomerById = async (
  customerId: string
): Promise<Customer | undefined> => {
  const customersList = await fetchCustomers(); // Get the full list
  return customersList.find((customer) => customer._id === customerId); // Return the matching customer
};

export const addSiteLocation = async (
  customerId: string,
  newSiteLocation: SiteLocation
): Promise<SiteLocation> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      newSiteLocation.site_id = generateUniqueId();
      customers = customers.map((customer) => {
        if (customer._id === customerId) {
          return {
            ...customer,
            siteLocations: [...customer.siteLocations, newSiteLocation],
          };
        }
        return customer;
      });
      resolve(newSiteLocation); // Return the newly added site location
    }, 500); // Simulating a delay
  });
};

export const deleteSiteLocation = async (
  customerId: string,
  siteLocationId: string
): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      customers = customers.map((customer) => {
        if (customer._id === customerId) {
          const filteredLocations = customer.siteLocations.filter(
            (location) => location.site_id !== siteLocationId
          );
          return {
            ...customer,
            siteLocations: filteredLocations,
          };
        }
        return customer;
      });
      resolve();
    }, 500); // Simulating a delay
  });
};
