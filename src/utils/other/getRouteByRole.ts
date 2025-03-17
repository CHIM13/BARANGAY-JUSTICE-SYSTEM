// utils/other/getRouteByRole.ts
import { createBrowserRouter } from "react-router-dom";
import authRoutes from "@/feature/public/auth/auth.routes";
import { AccountSchema } from "@/feature/shared/account/interfaces/account.interface";

// Type guard to check if a string is a valid role
export const isValidRole = (role: string): role is AccountSchema["role"] => {
  // Define valid roles - these should match AccountSchema['role']
  const validRoles: AccountSchema["role"][] = ["user", "admin"];
  return validRoles.includes(role as AccountSchema["role"]);
};

export const getRouteByRole = (
  role: string | undefined,
  roleMap: Record<AccountSchema["role"], ReturnType<typeof createBrowserRouter>>
): ReturnType<typeof createBrowserRouter> => {
  // If no role provided, return auth routes
  if (!role) return authRoutes;

  // Check if the role is valid
  if (!isValidRole(role)) {
    console.warn(
      `Invalid role provided: ${role}. Falling back to auth routes.`
    );
    return authRoutes;
  }

  // At this point, TypeScript knows role is a valid AccountSchema['role']
  return roleMap[role];
};
