import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContexts";

function PublicRoute({ children }) {
  const { isAuthenticated, isLoading, user } = useAuthContext();

  const location = useLocation();

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

  if (isAuthenticated) {
    const target = user?.role === "admin" ? "/admin-dashboard" : "/dashboard";

    if (location.pathname !== target) {
      return <Navigate to={target} replace />;
    }
  }
  return children;
}

export default PublicRoute;
