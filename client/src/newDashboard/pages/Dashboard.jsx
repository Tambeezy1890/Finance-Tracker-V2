import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Analytics from "../components/Analytics";
import Navbar from "../components/Navbar";
import MobileNav from "../components/MobileNav";
import { useAuthContext } from "../../contexts/AuthContexts";
import AdminDashboard from "../../pages/AdminDashboard";
import { Outlet } from "react-router-dom";

function Dashboard() {
  const [sidebar, setSidebar] = useState(false);
  const sidebarOpen = sidebar;
  const { user } = useAuthContext();

  return (
    <div className="h-screen bg-slate-50 overflow-hidden p-4">
      <div className="h-full max-w-7xl mx-auto bg-slate-100 shadow-lg rounded-2xl overflow-hidden">
        <Navbar setSidebar={setSidebar} sidebar={sidebar} />

        <div
          className={`grid h-[calc(100%-96px)] px-4 grid-cols-1 bg-transparent gap-4 ${
            sidebarOpen
              ? "lg:grid-cols-[250px_minmax(0,1fr)]"
              : "lg:grid-cols-1"
          }`}
        >
          <aside
            className={`
    hidden lg:block
    overflow-hidden
    transition-all duration-500 ease-in-out
    ${
      sidebarOpen
        ? "w-63 opacity-100 translate-x-0"
        : "w-0 opacity-0 -translate-x-4"
    }
  `}
          >
            <div className="h-full overflow-y-auto scrollbar-none">
              <Sidebar sidebar={sidebar} />
            </div>
          </aside>

          <main className="h-full overflow-y-auto scrollbar-none bg-slate-50 pt-2 rounded-2xl pb-20 lg:pb-4">
            <Outlet />
          </main>
        </div>

        <MobileNav />
      </div>
    </div>
  );
}

export default Dashboard;
