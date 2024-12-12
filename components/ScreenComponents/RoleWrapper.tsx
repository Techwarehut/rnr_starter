import React from "react";
import { useAuth } from "~/ctx/AuthContext";

interface RoleWrapperProps {
  children: React.ReactNode;
  role: string;
}

const RoleWrapper: React.FC<RoleWrapperProps> = ({ children, role }) => {
  const { user } = useAuth();

  // If user is not logged in or doesn't match the required role, return nothing
  if (user?.role !== role) return null;

  return <>{children}</>;
};

export default RoleWrapper;
