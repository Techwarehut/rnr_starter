import React from "react";
import { useAuth } from "~/ctx/AuthContext";

interface RoleWrapperProps {
  children: React.ReactNode;
  roles: string[]; // Accepts an array of roles
}

const RoleWrapper: React.FC<RoleWrapperProps> = ({ children, roles }) => {
  const { user } = useAuth();

  // If user is not logged in or doesn't match any of the required roles, return nothing
  if (!user || !roles.includes(user.role)) return null;

  return <>{children}</>;
};

export default RoleWrapper;
