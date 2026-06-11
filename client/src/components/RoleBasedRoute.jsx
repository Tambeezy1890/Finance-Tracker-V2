import React from "react";
import { useAuthContext } from "../contexts/AuthContexts";
import { Navigate, useNavigate } from "react-router-dom";

function RoleBasedRoute({ children, requiredRole }) {
  const { user, isAuthenticated, isLoading } = useAuthContext();
  const navigate = useNavigate();
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#f8fafc]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        <p className="mt-4 text-slate-500 font-bold tracking-tight uppercase text-[10px]">
          Syncing Session....
        </p>
      </div>
    );
  }
  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user.role !== requiredRole) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#f8fafc]">
        <div className=""></div>
        <p className="">Access Denied</p>
      </div>
    );
  }
  return children;
}

export default RoleBasedRoute;
