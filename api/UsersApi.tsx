// userApi.tsx
import { User } from "~/components/ScreenComponents/Team/types"; // Import your User type
import usersData from "~/data/team.json"; // Your static JSON data
import { generateUniqueId } from "~/lib/utils"; // Import the unique ID generator

// Function to get all users
export const getAllUsers = async (): Promise<User[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(usersData);
    }, 1000); // Simulate a delay
  });
};

// Function to get a user by ID
export const getUserById = async (userId: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = usersData.find((u) => u._id === userId);
      if (user) {
        resolve(user);
      } else {
        reject(new Error("User not found"));
      }
    }, 1000); // Simulate a delay
  });
};

// Function to add a new user
export const addUser = async (newUser: Omit<User, "_id">): Promise<User> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const userWithId: User = { ...newUser, _id: generateUniqueId() }; // Generate a unique ID
      usersData.push(userWithId);
      resolve(userWithId);
    }, 1000); // Simulate a delay
  });
};

// Function to update a user
export const updateUser = async (
  userId: string,
  updatedUser: Partial<User>
): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = usersData.findIndex((u) => u._id === userId);
      if (index !== -1) {
        usersData[index] = { ...usersData[index], ...updatedUser };
        resolve(usersData[index]);
      } else {
        reject(new Error("User not found"));
      }
    }, 1000); // Simulate a delay
  });
};

// Function to delete a user
export const deleteUser = async (userId: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = usersData.findIndex((u) => u._id === userId);
      if (index !== -1) {
        usersData.splice(index, 1);
        resolve(true);
      } else {
        reject(new Error("Error deleting user"));
      }
    }, 1000); // Simulate a delay
  });
};
