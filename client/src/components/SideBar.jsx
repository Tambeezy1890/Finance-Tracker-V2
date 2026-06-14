import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Wallet,
  ReceiptText,
  BarChart3,
  Settings,
} from "lucide-react";
import { useAuthContext } from "../contexts/AuthContexts";

function SideBar() {
  const location = useLocation();
  const { user } = useAuthContext();

  let links = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Finance", path: "/finance", icon: Wallet },
    { name: "Transactions", path: "/transactions", icon: ReceiptText },
    { name: "Analytics", path: "/analytics", icon: BarChart3 },
    { name: "Settings", path: "/settings", icon: Settings },
  ];

  if (user.role == "user") {
    links = [
      { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
      { name: "Finance", path: "/finance", icon: Wallet },
      { name: "Settings", path: "/settings", icon: Settings },
    ];
  }
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-slate-100 px-4 py-6 hidden lg:block">
      <div className="text-xl font-black text-slate-900 mb-10">⚡ Finance</div>

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
  );
}

export default SideBar;
