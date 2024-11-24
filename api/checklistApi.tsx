import { Checklist, Task } from "~/components/ScreenComponents/Checklist/types";
import checklistsData from "~/data/checklist.json"; // Your static JSON data
import { generateUniqueId } from "~/lib/utils";

let checklists: Checklist[] = checklistsData; // Initialize with JSON data

// Fetch all checklists
export const fetchChecklists = async (): Promise<Checklist[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(checklists);
    }, 1000); // Simulating a delay
  });
};

// Fetch a checklist by ID
export const fetchChecklistById = async (
  checklistId: string
): Promise<Checklist | undefined> => {
  const checklist = checklists.find(
    (checklist) => checklist.checklist_id === checklistId
  );
  return checklist;
};

// Add a new checklist
export const addChecklist = async (
  newChecklist: Checklist
): Promise<Checklist> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      newChecklist.checklist_id = generateUniqueId(); // Ensure a unique checklist ID
      checklists.push(newChecklist); // Add new checklist
      resolve(newChecklist); // Return the newly added checklist
    }, 500); // Simulating a delay
  });
};

// Edit an existing checklist
export const editChecklist = async (
  updatedChecklist: Checklist
): Promise<Checklist> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      checklists = checklists.map((checklist) =>
        checklist.checklist_id === updatedChecklist.checklist_id
          ? updatedChecklist
          : checklist
      );
      resolve(updatedChecklist); // Return the updated checklist
    }, 500); // Simulating a delay
  });
};

// Delete a checklist
export const deleteChecklist = async (checklistId: string): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      checklists = checklists.filter(
        (checklist) => checklist.checklist_id !== checklistId
      );
      resolve(); // Return nothing after deletion
    }, 500); // Simulating a delay
  });
};

// Function to add a task
export const addTaskToChecklist = async (
  checklistId: string,
  newTask: Task
): Promise<Task> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Ensure task status is either "pending" or "completed"
      if (newTask.status !== "pending" && newTask.status !== "completed") {
        throw new Error("Invalid task status");
      }

      newTask.task_id = generateUniqueId(); // Generate a unique task ID
      checklists = checklists.map((checklist) => {
        if (checklist.checklist_id === checklistId) {
          return {
            ...checklist,
            tasks: [...checklist.tasks, newTask], // Add the new task
          };
        }
        return checklist;
      });
      resolve(newTask); // Return the newly added task
    }, 500); // Simulating a delay
  });
};

// Delete a task from a checklist
export const deleteTaskFromChecklist = async (
  checklistId: string,
  taskId: string
): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      checklists = checklists.map((checklist) => {
        if (checklist.checklist_id === checklistId) {
          const updatedTasks = checklist.tasks.filter(
            (task) => task.task_id !== taskId
          );
          return {
            ...checklist,
            tasks: updatedTasks, // Remove the task from the checklist
          };
        }
        return checklist;
      });
      resolve(); // Return nothing after deletion
    }, 500); // Simulating a delay
  });
};

// Toggle the status of a task (completed / pending)
export const toggleTaskStatus = async (
  checklistId: string,
  taskId: string
): Promise<Task> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      checklists = checklists.map((checklist) => {
        if (checklist.checklist_id === checklistId) {
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
      const updatedChecklist = checklists.find(
        (checklist) => checklist.checklist_id === checklistId
      );
      const updatedTask = updatedChecklist?.tasks.find(
        (task) => task.task_id === taskId
      );

      resolve(updatedTask!); // Return the updated task
    }, 500); // Simulating a delay
  });
};
