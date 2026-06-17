import {
  ArrowUpDown,
  Bot,
  ChartNoAxesCombined,
  CreditCard,
  FileText,
  LayoutDashboard,
  MessageCircleQuestion,
  MessageSquareDot,
  Settings,
  Shield,
  ShoppingBag,
  User,
  Users,
} from "lucide-react";
import React from "react";
import IconCards from "./IconCards";
import AdminDashboard from "../../pages/AdminDashboard";
import { Link, useLocation } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContexts";

function Sidebar({ sidebar }) {
  const location = useLocation();
  const { isAdmin, user } = useAuthContext();
  const role = user?.data?.role || user?.role;
  const links = [
    {
      section: "general",
      name: "dashboard",
      icon: <LayoutDashboard size={18} />,
      value: "Dashboard",
      to: role === "admin" ? "/admin-dashboard" : "/dashboard",
    },
    {
      section: "general",
      name: "finance",
      icon: <Users size={18} />,
      value: "Finance",
      to: "/finance",
    },
    {
      section: "general",
      name: "transactions",
      icon: <CreditCard size={18} />,
      value: "Transactions",
      to: "/transactions",
    },
    {
      section: "general",
      name: "message",
      icon: <MessageSquareDot size={18} />,
      value: "Message",
      to: "#",
    },
    {
      section: "tools",
      name: "product",
      icon: <ShoppingBag size={18} />,
      value: "Product",
      to: "/transactions",
    },
    {
      section: "tools",
      name: "invoice",
      icon: <FileText size={18} />,
      value: "Invoice",
      to: "#",
    },
    {
      section: "tools",
      name: "analytics",
      icon: <ChartNoAxesCombined size={18} />,
      value: "Analytics",
      to: "/analytics",
    },
    {
      section: "tools",
      name: "automation",
      icon: <Bot size={18} />,
      value: "Automation",
      to: "#",
    },
    {
      section: "support",
      name: "settings",
      icon: <Settings size={18} />,
      value: "Settings",
      to: "#",
    },
    {
      section: "support",
      name: "security",
      icon: <Shield size={18} />,
      value: "Security",
      to: "#",
    },
    {
      section: "support",
      name: "help",
      icon: <MessageCircleQuestion size={18} />,
      value: "Help",
      to: "#",
    },
  ];
  const mobileLinks = links.filter((link) =>
    ["dashboard", "customers", "payments", "message"].includes(link.name)
  );

  return (
    <div
      className={`${sidebar ? "" : "hidden"} fixed  bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 p-3 lg:relative lg:w-full lg:bg-slate-50 lg:rounded-3xl lg:p-4 lg:min-h-[calc(100vh-62px)] lg:border`}
    >
      <div className="h-full overflow-y-auto pb-24 space-y-4 hidden lg:block">
        <p className="text-xs font-semibold text-slate-400 mb-3">GENERAL</p>

        <div className="flex flex-col gap-2 mb-4 border-b border-slate-400 pb-4">
          {links
            .filter((link) => link.section === "general")
            .map((link, index) => (
              <Link
                key={link.name}
                to={link.to}
                className={`w-full rounded-2xl p-2 text-left transition ${
                  location.pathname === link.to
                    ? "bg-indigo-100 text-indigo-700"
                    : "text-slate-600 hover:bg-indigo-50"
                }`}
              >
                <IconCards value={link.value} icon={link.icon} />
              </Link>
            ))}
        </div>
        <p className="text-xs font-semibold text-slate-400 mb-3">TOOLS</p>

        <div className="flex flex-col gap-2 mb-4 border-b border-slate-400 pb-4">
          {links
            .filter((link) => link.section === "tools")
            .map((link, index) => (
              <Link
                key={link.name}
                to={link.to}
                className={`w-full rounded-2xl p-2 text-left transition ${
                  location.pathname === link.to
                    ? "bg-indigo-100 text-indigo-700"
                    : "text-slate-600 hover:bg-indigo-50"
                }`}
              >
                <IconCards value={link.value} icon={link.icon} />
              </Link>
            ))}
        </div>
        <p className="text-xs font-semibold text-slate-400 mb-3">SUPPORT</p>

        <div className="flex flex-col gap-2 mb-20">
          {links
            .filter((link) => link.section === "support")
            .map((link, index) => (
              <Link
                key={link.name}
                to={link.to}
                className={`w-full rounded-2xl p-2 text-left transition ${
                  location.pathname === link.to
                    ? "bg-indigo-100 text-indigo-700"
                    : "text-slate-600 hover:bg-indigo-50"
                }`}
              >
                <IconCards value={link.value} icon={link.icon} />
              </Link>
            ))}
        </div>

        <div className="absolute bottom-5 w-full left-0 p-4">
          <div className="relative border border-slate-200 rounded-lg bg-blue-100/40 shadow-md">
            <div className="flex justify-center  rounded-xl p-3">
              <IconCards name="Team" value="Marketing" icon={<User />} />
            </div>
            <div>
              <ArrowUpDown
                size={12}
                className="absolute right-2 top-[50%] -translate-y-1"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
