// Define the EmergencyContact interface
export interface EmergencyContact {
  ename: string; // Name of the emergency contact
  ephone: string; // Phone number of the emergency contact
}

// Define the User interface
export interface User {
  _id: string; // Unique identifier for the user
  tenantID: string; // Identifier for the tenant
  name: string; // User's name
  email: string; // User's email
  phone: string; // User's phone number
  emergencyContact: EmergencyContact; // Emergency contact details
  profileUrl: string; // URL for the user's profile picture
  role: string; // Role of the user (e.g., Owner, Team Member)
  activeJobs: number;
  completedJobs: number;
}

// Define the UsersListProps interface for component props
export interface UsersListProps {
  users: User[]; // Array of User objects
}
