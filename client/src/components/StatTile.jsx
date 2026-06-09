import React from "react";

export default function StatTile({ icon, label, value, color }) {
  const colorMap = {
    blue: "bg-blue-50 text-blue-700 border-blue-600",
    emerald: "bg-emerald-50 text-emerald-700 border-emerald-600",
    red: "bg-red-50 text-red-700 border-red-600",
    yellow: "bg-yellow-50 text-yellow-700 border-yellow-600",
    purple: "bg-purple-50 text-purple-700 border-purple-600",
    indigo: "bg-indigo-50 text-indigo-700 border-indigo-600",
    slate: "bg-slate-50 text-slate-700 border-slate-600",
    amber: "bg-amber-50 text-amber-700 border-amber-600",
  };

  return (
    <div className="bg-white p-6 rounded-4xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
      <div className="flex items-center gap-4 ">
        <div className={`p-3.5 rounded-2xl ${colorMap[color]}`}>{icon}</div>
        <div>
          <p className="text-[10px] text-slate-400 font-medium tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {label}
          </p>
          <p className="text-md text-slate-600 font-medium uppercase tracking-tight ">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}
