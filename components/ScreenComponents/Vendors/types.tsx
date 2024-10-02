// Define the ContactPerson interface
export interface ContactPerson {
  name: string; // Name of the contact person
  title: string; // Job title of the contact person
  email: string; // Email address for communication
  phone: string; // Phone number of the contact person
}

// Define the Address interface
export interface Address {
  AddressLine: string; // Matches the JSON structure
  City: string; // Matches the JSON structure
  Province: string; // Matches the JSON structure

  zipcode: string;
}

// Define the Vendor interface
export interface Vendor {
  _id: string; // Unique identifier for the vendor
  companyName: string; // Name of the vendor's company
  contactPerson: ContactPerson; // Contact person details
  address: Address; // Address of the vendor
}

// Define the VendorsListProps interface for component props
export interface VendorsListProps {
  vendors: Vendor[]; // Array of Vendor objects
}
