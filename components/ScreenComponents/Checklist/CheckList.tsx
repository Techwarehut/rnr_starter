import { useState, useEffect } from "react";
import { View, Pressable } from "react-native";
import { Text } from "~/components/ui/text"; // Assuming Text component is custom
import { Checklist, Task } from "./types"; // Assuming these are correctly defined
import { fetchChecklistById, toggleTaskStatus } from "~/api/checklistApi"; // Import your API function
import { Checkbox } from "~/components/ui/checkbox"; // Assuming Checkbox is a custom component

interface InterfaceCheckListProps {
  linkedCheckListId: string; // The linked checklist ID to fetch specific checklist
}

export default function DisplayChecklist({
  linkedCheckListId,
}: InterfaceCheckListProps) {
  const [tasks, setTasks] = useState<Task[]>([]); // Using a flat array of tasks
  const [selectedChecklist, setSelectedChecklist] = useState<Checklist | null>(
    null
  ); // Initialize as null

  // useEffect to fetch the checklist based on linkedCheckListId
  useEffect(() => {
    const fetchChecklist = async () => {
      const checklist = await fetchChecklistById(linkedCheckListId);
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
    const updatedTask = await toggleTaskStatus(linkedCheckListId, taskId);

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
    <View className="flex-1 bg-secondary rounded-md p-4">
      <View key={selectedChecklist.checklist_id} className="mb-6">
        <Text className="text-2xl font-bold mb-4">
          {selectedChecklist.checklist_name}
        </Text>

        {/* Render tasks */}
        {tasks.map((item) => (
          <View
            key={item.task_id}
            className="flex-row items-center justify-between mb-3"
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
