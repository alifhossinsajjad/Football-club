"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout } from "@/redux/features/auth/authSlice";
import { UserRole } from "@/types/auth";
import toast from "react-hot-toast";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRole: UserRole;
}

const ProtectedRoute = ({ children, allowedRole }: ProtectedRouteProps) => {
  const { user, accessToken } = useAppSelector((state) => state.auth);
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Check if user is logged in
    if (!accessToken || !user) {
      router.replace("/login");
      return;
    }

    // Check if user has the correct role
    if (user.role !== allowedRole) {
      toast.error("Unauthorized access. You have been logged out.");
      dispatch(logout());
      router.replace("/login");
    }
  }, [user, accessToken, allowedRole, router, dispatch]);

  // If role matches, render children
  if (user && user.role === allowedRole) {
    return <>{children}</>;
  }

  // Otherwise, return null or a loading state while redirecting
  return null;
};

export default ProtectedRoute;
