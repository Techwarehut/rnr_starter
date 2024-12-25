import { DateType } from "react-native-ui-datepicker";
import {
  Customer,
  SiteLocation,
} from "~/components/ScreenComponents/Customers/types";
import {
  JobPriorityKeys,
  JobTypeKeys,
} from "~/components/ScreenComponents/Jobs/Filters/Statustypes";
import {
  AssignedUser,
  Comment,
  Job,
  JobRecurrence,
} from "~/components/ScreenComponents/Jobs/types"; // Import your Job type
import { User } from "~/components/ScreenComponents/Team/types";
import jobsData from "~/data/jobs.json"; // Your static JSON data
import { generateUniqueId } from "~/lib/utils"; // Import the unique ID generator
import checklistsData from "~/data/checklist.json"; // Your static JSON data
import jobChecklistsData from "~/data/jobchecklist.json"; // Your static JSON data
import {
  Checklist,
  JobChecklist,
  Task,
} from "~/components/ScreenComponents/Checklist/types";
import { useAuth } from "~/ctx/AuthContext";

let checklists: Checklist[] = checklistsData; // Initialize with JSON data
let jobchecklists: JobChecklist[] = jobChecklistsData; // Initialize with JSON data

let jobs: Job[] = jobsData as Job[];

// Initialize an array to store users (this can be replaced with a more permanent storage)
let assignedUsers: AssignedUser[] = [];

export const getAllJobs = async (user: User): Promise<Job[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Check if user is "Owner" or "Team Lead", in which case fetch all jobs
      if (user.role === "Owner" || user.role === "Team Lead") {
        resolve(jobs); // Resolve with all jobs
      } else if (user.role === "Team Member") {
        // If user is "Team Member", filter jobs based on their assigned userId and exclude certain statuses
        const assignedJobs = jobs
          .filter((job) =>
            job.assignedTo.some((assignee) => assignee.userId === user._id)
          )
          .filter((job) => {
            // Filter out jobs with statuses like "Accounts Receivable", "Invoiced", "Paid", "Cancelled"
            return ![
              "approval pending",
              "accounts receivable",
              "invoiced",
              "paid",
              "cancelled",
            ].includes(job.status.toLowerCase());
          });

        resolve(assignedJobs); // Resolve with the filtered list of jobs
      } else {
        resolve([]); // No jobs if the role is unknown
      }
    }, 1000); // Simulate a delay
  });
};

export const addJob = async (newJob: Job): Promise<Job[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      newJob._id = generateUniqueId(); // Generate ID for the first job

      const createdJobs: Job[] = [];

      // If recurrence is defined, create jobs based on the dueDates
      if (newJob.recurrence && newJob.recurrence.totalIterations > 1) {
        const { totalIterations, dueDates } = newJob.recurrence;

        for (let i = 0; i < totalIterations; i++) {
          // Create a new job for each recurrence iteration
          const jobCopy = { ...newJob };

          // Set the new due date based on the recurrence
          jobCopy.dueDate = dueDates[i] || newJob.dueDate; // Default to original dueDate if no recurrence due date

          // Modify job details to reflect the iteration (e.g., "Iteration #")
          // jobCopy.jobTitle = `${newJob.jobTitle} - Iteration ${i + 1}`;
          jobCopy.dueDate = newJob.recurrence.dueDates[i];
          jobCopy.recurrence = newJob.recurrence;

          /*  if (jobCopy.recurrence)
            jobCopy.recurrence.completedIterations = i + 1; // Update the completed iterations */

          // Create a fresh copy of the recurrence object for this iteration
          jobCopy.recurrence = {
            ...newJob.recurrence, // Shallow copy of the recurrence object
            completedIterations: i + 1, // Update the completed iterations for this job copy
          };

          jobCopy._id = generateUniqueId(); // Generate a new unique ID for each job

          console.log(jobCopy.recurrence.completedIterations);

          createdJobs.push(jobCopy);
        }
      } else {
        // No recurrence, just add the job as is
        createdJobs.push(newJob);
      }

      console.log(createdJobs);

      // Push the jobs (recurring or single) into the jobs array
      jobs.push(...createdJobs);

      resolve(createdJobs);
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
        jobs[jobIndex].siteLocation = {
          site_id: "",
          siteName: "",
          siteContactPerson: "",
          siteContactPhone: "",
          AddressLine: "",
          City: "",
          Province: "",
          zipcode: "",
        }; // Reset or clear site info
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
        jobs[jobIndex].customer = {
          _id: newCustomer._id,
          businessName: newCustomer.businessName,
        };
        resolve(jobs[jobIndex]); // Resolve with the updated job
      } else {
        reject(new Error("Job not found")); // Reject if job is not found
      }
    }, 1000); // Simulate a delay
  });
};

export const addSiteToJob = async (
  jobId: string,
  newSite: SiteLocation
): Promise<Job | null> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const jobIndex = jobs.findIndex((job) => job._id === jobId);
      if (jobIndex !== -1) {
        // Assign the new customer to the job
        jobs[jobIndex].siteLocation = newSite;
        resolve(jobs[jobIndex]); // Resolve with the updated job
      } else {
        reject(new Error("Job not found")); // Reject if job is not found
      }
    }, 1000); // Simulate a delay
  });
};

// Function to delete the customer from a job
export const deleteSiteFromJob = async (jobId: string): Promise<Job | null> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const jobIndex = jobs.findIndex((job) => job._id === jobId);
      if (jobIndex !== -1) {
        // Clear the customer field

        jobs[jobIndex].siteLocation = {
          site_id: "",
          siteName: "",
          siteContactPerson: "",
          siteContactPhone: "",
          AddressLine: "",
          City: "",
          Province: "",
          zipcode: "",
        }; // Reset or clear site info
        resolve(jobs[jobIndex]); // Resolve with the updated job
      } else {
        reject(new Error("Job not found")); // Reject if job is not found
      }
    }, 1000); // Simulate a delay
  });
};

// Function to update a job's due date
export const updateJobDueDate = async (
  jobId: string,
  newDueDate: DateType
): Promise<Job> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = jobs.findIndex((job) => job._id === jobId);
      if (index !== -1) {
        jobs[index].dueDate = newDueDate; // Update dueDate
        resolve(jobs[index]);
      } else {
        reject(new Error("Job not found"));
      }
    }, 1000); // Simulate a delay
  });
};

// Function to fetch jobs with status "In Progress"
export const getInProgressJobs = async (user: User): Promise<Job[]> => {
  const allJobs = await getAllJobs(user); // Fetch all jobs

  // Filter jobs with status "In Progress"
  const inProgressJobs = allJobs.filter((job) => job.status === "In Progress");

  return inProgressJobs;
};

export const addChecklistToJob = async (
  jobId: string,
  checklistID: string
): Promise<Job | null> => {
  return new Promise((resolve, reject) => {
    console.log("Available checklists:", checklists);
    setTimeout(() => {
      const jobIndex = jobs.findIndex((job) => job._id === jobId);
      if (jobIndex !== -1) {
        // Assign the new customer to the job
        jobs[jobIndex].checklistID = checklistID;

        //get the checklist from the template
        const newChecklist = checklists.find(
          (checklist) => checklist.checklist_id === checklistID
        );

        if (newChecklist) {
          const newJobChecklist: JobChecklist = {
            job_id: jobId, // Reference the job ID
            checklist_id: newChecklist.checklist_id, // Checklist ID from the newChecklist
            checklist_name: newChecklist.checklist_name, // Checklist Name
            tasks: newChecklist.tasks, // Copy tasks from the checklist
          };

          jobchecklists.push(newJobChecklist); // Add new checklist
        } else {
          reject(new Error("Checklist not found")); // Reject if job is not found
        }

        resolve(jobs[jobIndex]); // Resolve with the updated job
      } else {
        reject(new Error("Job not found")); // Reject if job is not found
      }
    }, 1000); // Simulate a delay
  });
};

// Function to delete the customer from a job
export const deleteChecklistFromJob = async (
  jobId: string
): Promise<Job | null> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const jobIndex = jobs.findIndex((job) => job._id === jobId);
      if (jobIndex !== -1) {
        // Clear the customer field

        jobs[jobIndex].checklistID = ""; // Reset or clear site info

        jobchecklists = jobchecklists.filter(
          (checklist) => checklist.job_id !== jobId
        );

        resolve(jobs[jobIndex]); // Resolve with the updated job
      } else {
        reject(new Error("Job not found")); // Reject if job is not found
      }
    }, 1000); // Simulate a delay
  });
};

// Fetch a checklist by ID
export const fetchChecklistByJobId = async (
  jobId: string
): Promise<JobChecklist | undefined> => {
  const checklist = jobchecklists.find(
    (checklist) => checklist.job_id === jobId
  );

  return checklist;
};

// Toggle the status of a task (completed / pending)
export const toggleTaskStatus = async (
  jobId: string,
  taskId: string
): Promise<Task> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      jobchecklists = jobchecklists.map((checklist) => {
        if (checklist.job_id === jobId) {
          const updatedTasks = checklist.tasks.map((task) =>
            task.task_id === taskId
              ? {
                  ...task,
                  status: task.status === "pending" ? "completed" : "pending",
                }
              : task
          );
          return {
            ...checklist,
            tasks: updatedTasks, // Update the task status
          };
        }

        return checklist;
      });
      // Find the updated task and return it
      const updatedChecklist = jobchecklists.find(
        (checklist) => checklist.job_id === jobId
      );
      const updatedTask = updatedChecklist?.tasks.find(
        (task) => task.task_id === taskId
      );

      resolve(updatedTask!); // Return the updated task
    }, 500); // Simulating a delay
  });
};

// Function to update only job Recurrence
export const updateJobRecurrence = async (
  jobId: string,
  newRecrurence: JobRecurrence
): Promise<Job> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = jobs.findIndex((job) => job._id === jobId);
      if (index !== -1) {
        jobs[index].recurrence = newRecrurence; // Update status
        resolve(jobs[index]);
      } else {
        reject(new Error("Job not found"));
      }
    }, 1000); // Simulate a delay
  });
};

// Function to fetch jobs that are ready for Invoice and for a specific customer (job.status = "Accounts Receivable" and job.customer._id === customerId)
export const fetchReadyForInvoiceJobs = async (
  customerId: string
): Promise<Job[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Filter jobs that are in "Accounts Receivable" status and match the customerId
      const readyForInvoiceJobs = jobs.filter(
        (job) =>
          job.status === "Accounts Receivable" &&
          job.customer._id === customerId
      );
      resolve(readyForInvoiceJobs);
    }, 1000); // Simulate a delay
  });
};

// Function to add an image to a job
export const addImageToJob = async (
  jobId: string,
  newImage: string
): Promise<Job | null> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const jobIndex = jobs.findIndex((job) => job._id === jobId);
      if (jobIndex !== -1) {
        // Ensure the new image is not already in the images array
        if (!jobs[jobIndex].images.includes(newImage)) {
          // Add the new image to the job's images array
          jobs[jobIndex].images.push(newImage);
          resolve(jobs[jobIndex]); // Resolve with the updated job
        } else {
          reject(new Error("Image already exists in the job"));
        }
      } else {
        reject(new Error("Job not found")); // Reject if job is not found
      }
    }, 1000); // Simulate a delay
  });
};

// Function to delete an image from a job
export const deleteImageFromJob = async (
  jobId: string,
  imageToDelete: string
): Promise<Job | null> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const jobIndex = jobs.findIndex((job) => job._id === jobId);
      if (jobIndex !== -1) {
        // Find the index of the image to delete
        const imageIndex = jobs[jobIndex].images.indexOf(imageToDelete);
        if (imageIndex !== -1) {
          // Remove the image from the images array
          jobs[jobIndex].images.splice(imageIndex, 1);
          resolve(jobs[jobIndex]); // Resolve with the updated job
        } else {
          reject(new Error("Image not found in the job"));
        }
      } else {
        reject(new Error("Job not found")); // Reject if job is not found
      }
    }, 1000); // Simulate a delay
  });
};

// Function to add an image to a job
export const addNoteToJob = async (
  jobId: string,
  newNote: Comment
): Promise<Job | null> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const jobIndex = jobs.findIndex((job) => job._id === jobId);
      if (jobIndex !== -1) {
        newNote.commentId = generateUniqueId(); // Generate ID
        // Add the new image to the job's images array
        jobs[jobIndex].comments?.push(newNote);
        resolve(jobs[jobIndex]); // Resolve with the updated job
      } else {
        reject(new Error("Job not found")); // Reject if job is not found
      }
    }, 1000); // Simulate a delay
  });
};
