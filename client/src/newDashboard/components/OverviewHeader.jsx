import { Signal } from "lucide-react";
import React from "react";

function OverviewHeader({
  icon1,
  icon2,
  icon3,
  icon4,
  name,
  value,
  color,
  stat,
  details,
}) {
  const palette = {
    slate: "bg-slate-400 text-slate-800",
    emerald: "bg-emerald-50 text-emerald-500",
    sky: "bg-sky-400 text-sky-800",
    rose: "bg-rose-50 text-rose-500",
  };
  return (
    <div className="w-full ">
      <div className="flex flex-col gap-4  ">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            {icon1}
            <p className="text-md font-bold text-slate-700">{name}</p>
          </div>
          <div className="flex justify-center gap-2">
            <button
              className={`flex items-center justify-center border border-slate-300 shadow-sm px-3 text-sm ${!icon2 ? "hidden" : ""}`}
            >
              {icon2} Filter
            </button>
            <button
              className={`flex items-center justify-center border border-slate-300 shadow-sm px-3 text-sm ${!icon3 ? "hidden" : ""}`}
            >
              {icon3}Sort
            </button>
            <button
              className={`flex items-center justify-center border border-slate-300 shadow-sm px-3 text-sm ${!icon4 ? "hidden" : ""}`}
            >
              {icon4}
            </button>
          </div>
        </div>
        <div>
          <h1>{value}</h1>
          <div className="flex gap-2">
            <p
              className={`${palette[color]} text-sm font-medium tracking-tight`}
            >
              {stat}
            </p>
            <p className=" text-sm font-medium tracking-tight text-slate-400">
              {details}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OverviewHeader;
