import { SiteLocation } from "../Customers/types";
import { JobPriorityKeys, JobTypeKeys } from "./Filters/Statustypes";

export interface User {
  userId: string; // Unique identifier for the user
  name: string; // Name of the user

  profileUrl: string; // URL of the user's profile picture
  hoursSpent: number;

  // You can add other fields if necessary, but keep them optional or read them only when needed.
}

export interface customer {
  _id: string; // Unique identifier for the user
  businessName: string; // Name of the user
}

// Define the Comment interface
export interface Comment {
  commentId: string; // Unique identifier for the comment
  text: string; // Comment text
  createdBy: {
    userId: string; // ID of the user who created the comment
    name: string; // Name of the user
    profileUrl: string; // URL of the user's profile picture
  };
  createdAt: string; // Timestamp of comment creation
}

// Define the HoursSpent interface
export interface HoursSpent {
  employeeId: string; // ID of the employee
  hours: number; // Number of hours spent
  notes: string; // Notes about the work done
}

// Define the Job interface
export interface Job {
  _id: string; // Unique identifier for the job
  jobTitle: string; // Job title
  jobDescription: string; // Job description
  jobType: JobTypeKeys; // Type of job
  reportedBy: User; // User who reported the job
  assignedTo: User[]; // Array of users assigned to the job
  status: string; // Current status of the job
  purchaseOrderNumber: string; // Associated purchase order number
  dueDate: string; // Due date for the job
  priority: JobPriorityKeys; // Priority level (e.g., P1, P2, P3)
  projectId: string; // ID of the associated project
  projectName: string; // Name of the associated project

  customer: customer; // ID of the associated customer
  siteLocation: SiteLocation; // ID of the associated site location
  estimateId?: string; // ID of the estimate
  invoiceId?: string; // ID of the invoice
  purchaseReqId?: string; // ID of the purchase requisition
  comments?: Comment[]; // Array of comments related to the job
  hoursSpent?: HoursSpent[]; // Array of hours spent on the job
  createdAt: string; // Creation timestamp
  updatedAt: string; // Last update timestamp
  images: string[];
}

// Define the Milestone interface
export interface Milestone {
  milestoneId: string; // Unique identifier for the milestone
  title: string; // Title of the milestone
  description: string; // Description of the milestone
  dueDate: string; // Due date for the milestone
  jobIDs: string[]; // Array of jobs associated with the milestone
  invoiceId: string; // ID of the invoice
}

// Define the Project interface
export interface Project {
  _id: string; // Unique identifier for the project
  projectName: string; // Name of the project
  projectDescription: string; // Description of the project
  status: string; // Current status of the project
  purchaseOrderNumber: string; // Associated purchase order number
  priority: string; // Priority level
  createdAt: string; // Creation timestamp
  updatedAt: string; // Last update timestamp
  milestones: Milestone[]; // Array of milestones associated with the project
  customer: customer; // ID of the associated customer

  estimateId: string; // ID of the estimate
}

// Define the ProjectsListProps interface for component props
export interface ProjectsListProps {
  projects: Project[]; // Array of Project objects
}
