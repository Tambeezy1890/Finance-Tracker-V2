import React from "react";
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

import IconCards from "./IconCards";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContexts";

function MobileNav() {
  const { currentUser } = useAuthContext();
  const links = [
    {
      section: "general",
      name: "dashboard",
      icon: <LayoutDashboard size={18} />,
      value: "Dashboard",
      to: currentUser.role === "admin" ? "/admin-dashboard" : "/dashboard",
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
      name: "payments",
      icon: <CreditCard size={18} />,
      value: "Payments",
      to: "#",
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
      name: "transactions",
      icon: <ShoppingBag size={18} />,
      value: "Transactions",
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
    ["dashboard", "finance", "transactions", "analytics"].includes(link.name)
  );
  return (
    <div className="fixed sm- bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 p-3 block lg:hidden">
      <div className="flex justify-around">
        {mobileLinks.map((link) => (
          <Link
            key={link.name}
            className="flex flex-col items-center text-xs"
            to={link.to}
          >
            {link.icon}
            <span>{link.value}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default MobileNav;
