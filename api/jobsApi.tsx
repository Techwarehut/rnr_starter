import { Customer } from "~/components/ScreenComponents/Customers/types";
import {
  JobPriorityKeys,
  JobTypeKeys,
} from "~/components/ScreenComponents/Jobs/Filters/Statustypes";
import { AssignedUser, Job } from "~/components/ScreenComponents/Jobs/types"; // Import your Job type
import { User } from "~/components/ScreenComponents/Team/types";
import jobsData from "~/data/jobs.json"; // Your static JSON data
import { generateUniqueId } from "~/lib/utils"; // Import the unique ID generator

let jobs: Job[] = jobsData as Job[];

// Initialize an array to store users (this can be replaced with a more permanent storage)
let assignedUsers: AssignedUser[] = [];

// Function to fetch all jobs
export const getAllJobs = async (): Promise<Job[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(jobs);
    }, 1000); // Simulate a delay
  });
};

export const addJob = async (newJob: Job): Promise<Job> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      newJob._id = generateUniqueId();

      jobs.push(newJob);
      resolve(newJob);
    }, 1000); // Simulate a delay
  });
};

// Function to update a job
export const editJob = async (updatedJob: Job): Promise<Job> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      jobs = jobs.map((job) => (job._id === updatedJob._id ? updatedJob : job));
      resolve(updatedJob);
    }, 1000); // Simulate a delay
  });
};

// Function to delete a job
export const deleteJob = async (jobId: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = jobsData.findIndex((j) => j._id === jobId);
      if (index !== -1) {
        jobsData.splice(index, 1);
        resolve(true);
      } else {
        reject(new Error("Error deleting job"));
      }
    }, 1000); // Simulate a delay
  });
};
// Function to update only job status
export const updateJobStatus = async (
  jobId: string,
  newStatus: string
): Promise<Job> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = jobs.findIndex((job) => job._id === jobId);
      if (index !== -1) {
        jobs[index].status = newStatus; // Update status
        resolve(jobs[index]);
      } else {
        reject(new Error("Job not found"));
      }
    }, 1000); // Simulate a delay
  });
};

// Function to update only job status
export const updateJobType = async (
  jobId: string,
  newType: JobTypeKeys
): Promise<Job> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = jobs.findIndex((job) => job._id === jobId);
      if (index !== -1) {
        jobs[index].jobType = newType; // Update status
        resolve(jobs[index]);
      } else {
        reject(new Error("Job not found"));
      }
    }, 1000); // Simulate a delay
  });
};

// Function to update only job status
export const updateJobPriority = async (
  jobId: string,
  newPriority: JobPriorityKeys
): Promise<Job> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = jobs.findIndex((job) => job._id === jobId);
      if (index !== -1) {
        jobs[index].priority = newPriority; // Update status
        resolve(jobs[index]);
      } else {
        reject(new Error("Job not found"));
      }
    }, 1000); // Simulate a delay
  });
};

// Function to fetch a job by ID
export const getJobById = async (jobId: string): Promise<Job | null> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const job = jobs.find((j) => j._id === jobId);
      if (job) {
        resolve(job);
      } else {
        resolve(null); // Return null if no job is found
      }
    }, 1000); // Simulate a delay
  });
};

export const assignJob = async (
  jobId: string,
  newUser: User
): Promise<AssignedUser | null> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const assignedUser: AssignedUser = {
        userId: newUser._id, // Use the user's _id as the userId
        name: newUser.name, // Copy the user's name
        profileUrl: newUser.profileUrl, // Copy the user's profile URL
        hoursSpent: 0, // Initialize hoursSpent to 0
      };

      // Find the job by ID
      const jobIndex = jobs.findIndex((job) => job._id === jobId);
      if (jobIndex !== -1) {
        // Check if the user is already assigned to the job
        const userExists = jobs[jobIndex].assignedTo.some(
          (user) => user.userId === assignedUser.userId
        );

        if (!userExists) {
          // Add the assigned user to the job's assignedTo array
          jobs[jobIndex].assignedTo.push(assignedUser);
          assignedUsers.push(assignedUser); // Add the new assigned user to the global array
          resolve(assignedUser); // Resolve with the new assigned user
        } else {
          // User already exists, resolve with null or a message
          resolve(null); // or you could return a message: reject(new Error("User already assigned to this job"));
        }
      } else {
        reject(new Error("Job not found")); // Reject if job is not found
      }
    }, 1000); // Simulate a delay
  });
};

export const deleteUserFromJob = async (
  jobId: string,
  userId: string
): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Find the job by ID
      const jobIndex = jobs.findIndex((job) => job._id === jobId);
      if (jobIndex !== -1) {
        // Find the user in the assignedTo array
        const userIndex = jobs[jobIndex].assignedTo.findIndex(
          (user) => user.userId === userId
        );

        if (userIndex !== -1) {
          // Remove the user from the assignedTo array
          jobs[jobIndex].assignedTo.splice(userIndex, 1);
          resolve(true); // Successfully removed the user
        } else {
          reject(new Error("User not found in this job")); // User not found
        }
      } else {
        reject(new Error("Job not found")); // Job not found
      }
    }, 1000); // Simulate a delay
  });
};

// Function to delete the customer from a job
export const deleteCustomerFromJob = async (
  jobId: string
): Promise<Job | null> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const jobIndex = jobs.findIndex((job) => job._id === jobId);
      if (jobIndex !== -1) {
        // Clear the customer field
        jobs[jobIndex].customer = { _id: "", businessName: "" }; // Reset or clear customer
        resolve(jobs[jobIndex]); // Resolve with the updated job
      } else {
        reject(new Error("Job not found")); // Reject if job is not found
      }
    }, 1000); // Simulate a delay
  });
};

// Function to add a customer to a job
export const addCustomerToJob = async (
  jobId: string,
  newCustomer: Customer
): Promise<Job | null> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const jobIndex = jobs.findIndex((job) => job._id === jobId);
      if (jobIndex !== -1) {
        // Assign the new customer to the job
        jobs[jobIndex].customer = newCustomer;
        resolve(jobs[jobIndex]); // Resolve with the updated job
      } else {
        reject(new Error("Job not found")); // Reject if job is not found
      }
    }, 1000); // Simulate a delay
  });
};
