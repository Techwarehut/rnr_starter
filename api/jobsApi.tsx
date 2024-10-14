import { Job } from "~/components/ScreenComponents/Jobs/types"; // Import your Job type
import jobsData from "~/data/jobs.json"; // Your static JSON data
import { generateUniqueId } from "~/lib/utils"; // Import the unique ID generator

let jobs: Job[] = jobsData; // Initialize with JSON data

// Function to fetch all jobs
export const getAllJobs = async (): Promise<Job[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(jobsData);
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
