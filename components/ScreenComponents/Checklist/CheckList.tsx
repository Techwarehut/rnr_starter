import { useState, useEffect } from "react";
import { View, Pressable } from "react-native";
import { Text } from "~/components/ui/text"; // Assuming Text component is custom
import { Checklist, Task } from "./types"; // Assuming these are correctly defined
import { deleteChecklist, fetchChecklistById } from "~/api/checklistApi"; // Import your API function
import { Checkbox } from "~/components/ui/checkbox"; // Assuming Checkbox is a custom component
import { Muted } from "~/components/ui/typography";
import DeleteButton from "../DeleteButton";
import {
  deleteChecklistFromJob,
  fetchChecklistByJobId,
  toggleTaskStatus,
} from "~/api/jobsApi";

interface InterfaceCheckListProps {
  linkedCheckListId: string; // The linked checklist ID to fetch specific checklist
  jobId: string;
  handleDeleteChecklist: () => void;
}

export default function DisplayChecklist({
  linkedCheckListId,
  jobId,
  handleDeleteChecklist,
}: InterfaceCheckListProps) {
  const [tasks, setTasks] = useState<Task[]>([]); // Using a flat array of tasks
  const [selectedChecklist, setSelectedChecklist] = useState<Checklist | null>(
    null
  ); // Initialize as null
  const [refreshKey, setRefreshKey] = useState(0);

  // useEffect to fetch the checklist based on linkedCheckListId
  useEffect(() => {
    const fetchChecklist = async () => {
      const checklist = await fetchChecklistByJobId(jobId);
      if (checklist) {
        setSelectedChecklist(checklist); // Set the selected checklist
        setTasks(checklist.tasks); // Set tasks directly from the checklist
      }
    };

    fetchChecklist();
  }, [linkedCheckListId]); // Fetch whenever the linkedCheckListId changes

  // Function to handle toggling task status using the API
  const handleToggleTaskStatus = async (taskId: string) => {
    // Call the API function to toggle the task status
    const updatedTask = await toggleTaskStatus(jobId, taskId);

    // Update the tasks state with the updated task status
    setTasks((prevTasks) => {
      // Update the specific task in the state
      const updatedTasks = prevTasks.map((task) =>
        task.task_id === updatedTask.task_id ? updatedTask : task
      );
      return updatedTasks; // Return the updated task list
    });
  };

  // Show loading state if no checklist is selected yet
  if (!selectedChecklist) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Loading checklist...</Text>
      </View>
    );
  }

  return (
    <View className="flex gap-2">
      <View className="flex-row items-center justify-between">
        <View className="flex flex-1">
          <Text className="text-xl">{selectedChecklist.checklist_name}</Text>
          <Muted>
            This can be a safety, inspection or maintainence checklist
          </Muted>
        </View>
        <DeleteButton xIcon={true} onDelete={handleDeleteChecklist} />
      </View>

      <View
        key={selectedChecklist.checklist_id}
        className="flex bg-secondary gap-2 rounded-md p-4 "
      >
        {/* Render tasks */}
        {tasks.map((item) => (
          <View
            key={item.task_id}
            className="flex-row items-center justify-between"
          >
            <Text
              className={`text-lg ${
                item.status === "completed"
                  ? "line-through text-muted-foreground"
                  : ""
              }`}
            >
              {item.task_name}
            </Text>

            {/* Checkbox component that reflects task status */}
            <Checkbox
              checked={item.status === "completed"} // If task status is "completed", checkbox is checked
              onCheckedChange={() => handleToggleTaskStatus(item.task_id)} // Update task status
            />
          </View>
        ))}
      </View>
    </View>
  );
}
