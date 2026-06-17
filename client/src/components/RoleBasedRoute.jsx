import React from "react";
import { useAuthContext } from "../contexts/AuthContexts";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { TriangleAlert } from "lucide-react";

function RoleBasedRoute({ children, requiredRole }) {
  const { currentUser, isAuthenticated, isLoading, user } = useAuthContext();
  const navigate = useNavigate();
  const role = user?.data?.role || user?.role;

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
  if (!isAuthenticated || !currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (role !== requiredRole) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#f8fafc]">
        <div className="max-w-md w-full rounded-4xl shadow-xl p-8 bg-white">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-rose-50 rounded-3xl text-rose-800 shadow-inner group">
              <TriangleAlert
                size={20}
                className="group-hover:scale-120 transition-transform"
              />
            </div>
            <div>
              <h1 className="font-black text-slate-900 text-lg tracking-tight">
                Access Denied
              </h1>
              <h3 className="font-medium text-slate-400  tracking-tight">
                You do not have the required permissions{" "}
              </h3>
              <div className="p-4  bg-slate-100 rounded-lg mt-4 shadow-md">
                <div className="text-[12px] font-medium tracking-tight">
                  You do not have permission to access the current resource
                  <br />
                  <div>
                    <span className="text-sm">Administrative level: </span>
                    <span className="text-sm font-bold ml-[0.1px]">
                      {user.role}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <Link
              className="p-4 bg-slate-900 text-white w-full rounded-2xl hover:bg-indigo-600 disabled:opacity-5 flex items-center justify-center transition-colors"
              to="/login"
            >
              Return to login
            </Link>
          </div>
        </div>
      </div>
    );
  }
  return children;
}

export default RoleBasedRoute;
