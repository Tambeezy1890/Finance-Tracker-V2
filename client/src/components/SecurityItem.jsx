import React from "react";

function SecurityItem({ icon, text }) {
  return (
    <div className="flex items-center gap-4 text-indigo-100/60 hover:text-white transition-all group cursor-default">
      <div className="text-indigo-500 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <span className="text-sm font-bold tracking-tight">{text}</span>
    </div>
  );
}

export default SecurityItem;
