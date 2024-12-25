export interface BusinessBillingAddress {
  addressLine: string;
  city: string;
  zipCode: string;
  province: string;
  country: string;
}

export interface CustomerNotificationPreferences {
  email: boolean;
  sms: boolean;
}

export interface Tenant {
  _id: string;
  businessName: string;
  businessLogo: string;
  businessType: string;
  businessPhone: string;
  businessEmail: string;
  businessWebsite: string;
  businessBillingAddress: BusinessBillingAddress;
  businessTaxID: string;
  taxRate: number;
  employeeCount: number;
  customerNotificationPreferences: CustomerNotificationPreferences;
  planType: "Starter" | "Core" | "Grow"; // You can add more plan types if needed
  subscriptionStartDate: string; // ISO 8601 date string (e.g., "2024-01-01")
  subscriptionEndDate: string; // ISO 8601 date string (e.g., "2025-01-01")
  paymentStatus: "Paid" | "Pending" | "Overdue"; // These could be string literals depending on your use case
}

export const defaultTenant = {
  _id: "", // Provide a default value for _id
  businessName: "", // Default empty string
  businessLogo: "",
  businessType: "HVAC", // Provide a default business type
  businessPhone: "",
  businessEmail: "",
  businessWebsite: "",
  businessBillingAddress: {
    addressLine: "",
    city: "",
    zipCode: "",
    province: "",
    country: "",
  },
  businessTaxID: "",
  taxRate: 0,
  employeeCount: 0,
  customerNotificationPreferences: { email: true, sms: true },
  planType: "Starter", // Default value for planType
  subscriptionStartDate: "",
  subscriptionEndDate: "",
  paymentStatus: "Paid", // Default payment status
};

export interface BusinessInfoFieldsProps {
  tenant: Tenant;
  handleInputChange: (field: string, value: string) => void;
  editMode: boolean;
  handlePhoneChange: (field: string, value: string) => void;
}
