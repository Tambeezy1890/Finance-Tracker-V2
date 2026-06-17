import {
  Info,
  MoveDownRight,
  MoveDownRightIcon,
  MoveUpRight,
} from "lucide-react";
import React from "react";

const palette = {
  slate: "bg-slate-400 text-slate-800",
  emerald: "bg-emerald-50 text-emerald-500",
  sky: "bg-sky-400 text-sky-800",
  rose: "bg-rose-50 text-rose-500",
};

function StatCard({ icon, name, value, stat, color = "slate" }) {
  return (
    <div className="max-w-md w-full relative p-4 shadow-lg rounded-2xl bg-slate-5 border-slate-200 border-t ">
      <Info className="absolute top-2 right-2 " strokeWidth={1} size={18} />
      <div className="flex items-center mb-6">
        <div className={` rounded-2xl flex  text-slate-600`}>{icon}</div>
        <p className="text-lg font-medium tracking-tight ml-2">{name}</p>
      </div>
      <div className="flex gap-4 ">
        <div className="">
          <h1 className="text-2xl font-bold text-slate-900">{value}</h1>
        </div>
        <div
          className={`${palette[color]} text-sm font-bold tracking-tight flex w-14 h-5 rounded-sm`}
        >
          {stat}
          {color == "rose" ? (
            <MoveDownRightIcon size={12} className="bg-transparent" />
          ) : (
            <MoveUpRight size={12} className="bg-transparent" />
          )}
        </div>
      </div>
    </div>
  );
}

export default StatCard;
