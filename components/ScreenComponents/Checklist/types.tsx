// Type for individual task
export interface Task {
  task_id: string; // Unique ID for the task
  task_name: string; // Name of the task
  status: "pending" | "completed"; // Status of the task
}

// Type for the checklist
export interface Checklist {
  checklist_id: string; // Unique ID for the checklist
  checklist_name: string; // Name of the checklist (e.g., HVAC Maintenance)
  tasks: Task[]; // Array of tasks in this checklist
}
