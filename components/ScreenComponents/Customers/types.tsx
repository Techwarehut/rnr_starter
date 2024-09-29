// Define the SiteLocation interface
export interface SiteLocation {
  siteName: string;
  siteContactPerson: string;
  siteContactPhone: string;
  AddressLine: string; // Matches the JSON structure
  City: string; // Matches the JSON structure
  Province: string; // Matches the JSON structure
  zipcode: string;
}

// Define the BillingAddress interface
export interface BillingAddress {
  AddressLine: string; // Matches the JSON structure
  City: string; // Matches the JSON structure
  Province: string; // Matches the JSON structure

  zipcode: string;
}

// Define the Customer interface
export interface Customer {
  _id: string;
  businessName: string;
  customerName: string;
  email: string;
  phone: string;
  website: string;

  billingAddress: BillingAddress; // Use the BillingAddress interface
  siteLocations: SiteLocation[]; // Array of SiteLocation
}

// Define the CustomerDetailProps interface for component props
export interface CustomerDetailProps {
  customer: Customer;
}
