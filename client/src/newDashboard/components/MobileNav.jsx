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

function MobileNav() {
  const links = [
    {
      section: "general",
      name: "dashboard",
      icon: <LayoutDashboard size={18} />,
      value: "Dashboard",
    },
    {
      section: "general",
      name: "customers",
      icon: <Users size={18} />,
      value: "Customers",
    },
    {
      section: "general",
      name: "payments",
      icon: <CreditCard size={18} />,
      value: "Payments",
    },
    {
      section: "general",
      name: "message",
      icon: <MessageSquareDot size={18} />,
      value: "Message",
    },
    {
      section: "tools",
      name: "product",
      icon: <ShoppingBag size={18} />,
      value: "Product",
    },
    {
      section: "tools",
      name: "invoice",
      icon: <FileText size={18} />,
      value: "Invoice",
    },
    {
      section: "tools",
      name: "analytics",
      icon: <ChartNoAxesCombined size={18} />,
      value: "Analytics",
    },
    {
      section: "tools",
      name: "automation",
      icon: <Bot size={18} />,
      value: "Automation",
    },
    {
      section: "support",
      name: "settings",
      icon: <Settings size={18} />,
      value: "Settings",
    },
    {
      section: "support",
      name: "security",
      icon: <Shield size={18} />,
      value: "Security",
    },
    {
      section: "support",
      name: "help",
      icon: <MessageCircleQuestion size={18} />,
      value: "Help",
    },
  ];
  const mobileLinks = links.filter((link) =>
    ["dashboard", "customers", "payments", "message"].includes(link.name)
  );
  return (
    <div className="fixed sm- bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 p-3 hidden sm:block lg:hidden ">
      <div className="flex justify-around">
        {mobileLinks.map((link) => (
          <button
            key={link.name}
            className="flex flex-col items-center text-xs"
          >
            {link.icon}
            <span>{link.value}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default MobileNav;
