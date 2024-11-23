import { useState } from "react";
import { View, Pressable } from "react-native";
import { Text } from "~/components/ui/text"; // Assuming Text component is custom
import { Checklist, Task } from "./types"; // Assuming these are correctly defined

interface InterfaceCheckListProps {
  checkList: Checklist[]; // Array of selected checklists
}

export default function Checklist({ checkList }: InterfaceCheckListProps) {
  // State to manage tasks for each checklist
  const [tasks, setTasks] = useState<Record<string, Task[]>>({});

  // Function to handle toggling task status
  // Function to handle toggling task status
  const toggleTaskStatus = (checklistId: string, taskId: string) => {
    /*     setTasks((prevTasks) => {
      // Get the current tasks for this checklist
      const checklistTasks = prevTasks[checklistId] || [];

      // Update the task status by toggling it between "pending" and "completed"
      const updatedTasks = checklistTasks.map((task) =>
        task.task_id === taskId
          ? {
              ...task,
              status: task.status === "pending" ? "completed" : "pending", // Ensure correct status type
            }
          : task
      );

      // Return the updated tasks in the state
      return {
        ...prevTasks,
        [checklistId]: updatedTasks,
      };
    }); */
  };
  return (
    <View className="flex-1 bg-secondary rounded-md p-4">
      {/* Iterate over the checklists */}
      {checkList.map((checklist) => {
        const checklistTasks = tasks[checklist.checklist_id] || checklist.tasks;

        return (
          <View key={checklist.checklist_id} className="mb-6">
            <Text className="text-2xl font-bold mb-4">
              {checklist.checklist_name}
            </Text>

            {/* Render tasks using map */}
            {checklistTasks.map((item) => (
              <View
                key={item.task_id}
                className="flex-row items-center justify-between mb-3"
              >
                <Text
                  className={`text-lg ${
                    item.status === "completed"
                      ? "text-green-600"
                      : "text-gray-800"
                  }`}
                >
                  {item.task_name}
                </Text>
                <Pressable
                  onPress={() =>
                    toggleTaskStatus(checklist.checklist_id, item.task_id)
                  }
                  className={`px-4 py-2 rounded-full ${
                    item.status === "completed" ? "bg-green-500" : "bg-gray-200"
                  }`}
                >
                  <Text className="text-white font-semibold">
                    {item.status === "completed" ? "Completed" : "Mark as Done"}
                  </Text>
                </Pressable>
              </View>
            ))}
          </View>
        );
      })}
    </View>
  );
}
