import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Wallet,
  ReceiptText,
  BarChart3,
  Settings,
} from "lucide-react";
import { useAuthContext } from "../contexts/AuthContexts";

function SideBar({ sidebar }) {
  const location = useLocation();
  const { user } = useAuthContext();

  let links = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Finance", path: "/finance", icon: Wallet },
    { name: "Transactions", path: "/transactions", icon: ReceiptText },
    { name: "Analytics", path: "/analytics", icon: BarChart3 },
    { name: "Settings", path: "/settings", icon: Settings },
  ];

  if (user?.role === "user") {
    links = [
      { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
      { name: "Finance", path: "/finance", icon: Wallet },
      { name: "Settings", path: "/settings", icon: Settings },
    ];
  }

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={`
fixed left-0 top-0 h-screen w-64 bg-white border-r border-slate-100 px-4 py-6 z-10
transition-all duration-300 hidden lg:block ${sidebar ? "lg:translate-x-0" : "lg:-translate-x-full"}`}
      >
        <div className="text-xl font-black text-slate-900 mb-10">
          ⚡ Finance
        </div>

        <nav className="space-y-2">
          {links.map(({ name, path, icon: Icon }) => {
            const active = location.pathname === path;

            return (
              <Link
                key={path}
                to={path}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all ${
                  active
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <Icon size={18} />
                {name}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Mobile bottom nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 px-3 py-2">
        <div className="flex items-center justify-around">
          {links.map(({ name, path, icon: Icon }) => {
            const active = location.pathname === path;

            return (
              <Link
                key={path}
                to={path}
                className={`flex flex-col items-center gap-1 px-3 py-2 rounded-2xl text-xs font-bold transition-all ${
                  active ? "text-indigo-600 bg-indigo-50" : "text-slate-400"
                }`}
              >
                <Icon size={20} />
                <span>{name}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}

export default SideBar;
