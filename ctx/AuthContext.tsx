import React, { createContext, useContext, useState, ReactNode } from "react";
import { getUserById } from "~/api/UsersApi";
import { User } from "~/components/ScreenComponents/Team/types";

// Define the types for the AuthContext values
interface AuthContextType {
  user: User | null; // Ideally, replace `any` with the actual user type from Firebase (e.g., `User | null`)
  isAuthenticated: boolean;

  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; msg?: string }>;
  logout: () => Promise<{ success: boolean; msg?: string }>;
  register: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; msg?: string }>;
}

// Create the AuthContext with default values
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to use AuthContext
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }
  return context;
}

// Type for the AuthContextProvider props
interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null); // Set a proper user type here (e.g., `User` from Firebase)

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Login function (replace with Firebase login logic)
  const login = async (email: string, password: string) => {
    try {
      // Your authentication logic here (e.g., Firebase login)
      // const userCredential = await signInWithEmailAndPassword(auth, email, password);
      let userId: string = "";

      if (email === "Admin") userId = "1";
      else if (email === "Manager") userId = "2";
      else if (email === "Employee") userId = "3";
      if (userId) {
        const retUser = await getUserById(userId);
        if (retUser) {
          setUser(retUser);
          setIsAuthenticated(true);
          return { success: true };
        } else {
          return { success: false };
        }
      } else {
        return { success: false };
      }
    } catch (e: any) {
      let msg = e.message;
      if (msg.includes("auth/invalid-credential"))
        msg = "Please check your email and password.";
      console.error(msg);
      return { success: false, msg };
    }
  };

  // Logout function (replace with Firebase logout logic)
  const logout = async () => {
    try {
      // Your logout logic here (e.g., Firebase logout)
      // await signOut(auth);
      setIsAuthenticated(false);
      return { success: true };
    } catch (e: any) {
      let msg = e.message;
      console.error(msg);
      return { success: false, msg };
    }
  };

  // Register function (replace with Firebase register logic)
  const register = async (email: string, password: string) => {
    try {
      // Your registration logic here (e.g., Firebase register)
      // const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      return { success: true };
    } catch (e: any) {
      let msg = e.message;
      console.error(msg);
      if (msg.includes("auth/email-already-in-use"))
        msg = "Email is already in use. Please Sign In!";
      return { success: false, msg };
    }
  };

  // Provide the AuthContext value to children
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,

        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
