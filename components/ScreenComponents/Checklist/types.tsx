// Assuming this is your Task type definition
export type Task = {
  task_id: string;
  task_name: string;
  status: string; // "pending" | "completed"; // status should be a string literal, not a generic string
};

// Checklist type definition
export type Checklist = {
  checklist_id: string;
  checklist_name: string;
  tasks: Task[]; // tasks is an array of Task type
};
